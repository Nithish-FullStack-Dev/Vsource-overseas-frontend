import { RefObject, useEffect, useState } from "react";

type IntersectionListener = (isIntersecting: boolean) => void;

interface ObserverRegistry {
  observer: IntersectionObserver;
  listeners: Map<Element, IntersectionListener>;
}

export interface ViewportWindowOptions {
  mountMargin: string;
  releaseMargin: string;
  mountDelayMs: number;
  initiallyActive: boolean;
}

const registries = new Map<string, ObserverRegistry>();

const getRegistry = (rootMargin: string): ObserverRegistry => {
  const existing = registries.get(rootMargin);
  if (existing) {
    return existing;
  }

  const listeners = new Map<Element, IntersectionListener>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        listeners.get(entry.target)?.(entry.isIntersecting);
      });
    },
    { rootMargin },
  );

  const registry: ObserverRegistry = { observer, listeners };
  registries.set(rootMargin, registry);
  return registry;
};

const observeElement = (
  element: Element,
  rootMargin: string,
  listener: IntersectionListener,
): (() => void) => {
  const { observer, listeners } = getRegistry(rootMargin);
  listeners.set(element, listener);
  observer.observe(element);

  return () => {
    listeners.delete(element);
    observer.unobserve(element);
  };
};

export const useViewportWindow = (
  ref: RefObject<HTMLElement | null>,
  {
    mountMargin,
    releaseMargin,
    mountDelayMs,
    initiallyActive,
  }: ViewportWindowOptions,
): boolean => {
  const [isActive, setIsActive] = useState<boolean>(initiallyActive);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsActive(true);
      return undefined;
    }

    let mountTimerId: number | null = null;

    const cancelPendingMount = () => {
      if (mountTimerId !== null) {
        window.clearTimeout(mountTimerId);
        mountTimerId = null;
      }
    };

    const stopMountWatch = observeElement(element, mountMargin, (isNear) => {
      if (!isNear) {
        cancelPendingMount();
        return;
      }

      if (mountTimerId !== null) {
        return;
      }

      mountTimerId = window.setTimeout(() => {
        mountTimerId = null;
        setIsActive(true);
      }, mountDelayMs);
    });

    const stopReleaseWatch = observeElement(
      element,
      releaseMargin,
      (isInRange) => {
        if (isInRange) {
          return;
        }

        cancelPendingMount();
        setIsActive(false);
      },
    );

    return () => {
      cancelPendingMount();
      stopMountWatch();
      stopReleaseWatch();
    };
  }, [ref, mountMargin, releaseMargin, mountDelayMs]);

  return isActive;
};
