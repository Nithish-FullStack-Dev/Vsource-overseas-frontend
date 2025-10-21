// src/services/ChatBot.tsx
import React, { useEffect } from "react";

interface ChatBotProps {
  token: string;
  openOnLoad?: boolean;
  /** How many px to nudge the widget up on mobile */
  mobileNudge?: number;
  /** How many px to nudge the widget up on desktop */
  desktopNudge?: number;
  /** breakpoint for mobile */
  mobileBreakpoint?: number;
  widgetSelector?: string; // optional explicit selector if you know it
}

declare global {
  interface Window {
    Chatty?: any;
    VsourceOpenChat?: () => void;
    VsourceCloseChat?: () => void;
  }
}

const defaultSelectors = [
  "iframe[src*='gallabox']",
  "iframe[src*='chatty']",
  ".chatty-launcher",
  ".chatty-widget",
  ".gallabox-launcher",
  "[id^='chatty']",
];

const ChatBot: React.FC<ChatBotProps> = ({
  token,
  openOnLoad = false,
  mobileNudge = 68,
  desktopNudge = 10,
  mobileBreakpoint = 480,
  widgetSelector,
}) => {
  useEffect(() => {
    if (!token) {
      console.error("ChatBot: missing token");
      return;
    }

    // inject script (if not present)
    if (!document.getElementById("gallabox-chatty")) {
      (function (w: any, d: Document, s: string, u: string, t: string) {
        w.Chatty = function (c: any) {
          (w.Chatty._ = w.Chatty._ || []).push(c);
        };
        w.Chatty._ = w.Chatty._ || [];
        w.Chatty.url = u;
        w.Chatty.hash = t;

        const h = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        j.id = "gallabox-chatty";
        j.async = true;
        j.src =
          "https://widget.gallabox.com/chatty-widget.min.js?_=" + Math.random();
        h.parentNode?.insertBefore(j, h);
      })(window, document, "script", "https://widget.gallabox.com", token);
    } else if (openOnLoad && typeof window.Chatty === "function") {
      // try to open if requested
      try {
        window.Chatty({ open: true });
      } catch {
        try {
          window.Chatty("show");
        } catch {}
      }
    }

    // Expose safe open/close
    window.VsourceOpenChat = () => {
      try {
        window.Chatty?.({ open: true });
      } catch {
        try {
          window.Chatty?.("show");
        } catch {}
      }
    };
    window.VsourceCloseChat = () => {
      try {
        window.Chatty?.({ open: false });
      } catch {
        try {
          window.Chatty?.("hide");
        } catch {}
      }
    };

    const selectors = widgetSelector
      ? [widgetSelector, ...defaultSelectors]
      : defaultSelectors;

    // Safely apply a small transform to avoid overlap without altering layout:
    const applyNudge = (el: HTMLElement, nudgePx: number) => {
      try {
        // mark adjusted to avoid repeated changes
        if (
          (el.dataset && el.dataset.gbAdjusted) ||
          el.getAttribute("data-gb-adjusted") === "1"
        )
          return;

        const prevTransform = el.style.transform || "";
        const translate = ` translateY(-${nudgePx}px)`;
        el.style.transform = prevTransform.includes("translateY(")
          ? prevTransform
          : prevTransform + translate;
        el.style.zIndex = (
          Number(el.style.zIndex) > 0 ? el.style.zIndex : 50
        ).toString();
        el.style.pointerEvents = "auto";

        el.setAttribute("data-gb-adjusted", "1");
        // console.info(
        //   "[ChatBot] adjusted Gallabox element (nudge px):",
        //   nudgePx,
        //   el
        // );
      } catch (e) {
        // ignore; keep site stable
      }
    };

    const findAndAdjustOnce = () => {
      const w = window.innerWidth;
      const isMobile = w <= mobileBreakpoint;
      const nudge = isMobile ? mobileNudge : desktopNudge;

      for (const sel of selectors) {
        try {
          const nodes = Array.from(
            document.querySelectorAll(sel)
          ) as HTMLElement[];
          if (nodes.length) {
            // prefer the first visible node
            const visible =
              nodes.find((n) => {
                const rect = n.getBoundingClientRect();
                return (
                  rect.width > 3 &&
                  rect.height > 3 &&
                  window.getComputedStyle(n).visibility !== "hidden"
                );
              }) || nodes[0];

            // If it's inside an iframe, we adjust the iframe element itself (the host)
            if (visible.tagName.toLowerCase() === "iframe") {
              applyNudge(visible, nudge);
            } else {
              // apply to the element, and cautiously to its nearest fixed-position ancestor if needed
              applyNudge(visible, nudge);
              const fixedAncestor = Array.from(
                visible.parentElement
                  ? visible.parentElement.querySelectorAll("*")
                  : []
              ).find(
                (el) =>
                  window.getComputedStyle(el as Element).position === "fixed"
              ) as HTMLElement | undefined;
              if (fixedAncestor) applyNudge(fixedAncestor, nudge);
            }
            return true;
          }
        } catch (err) {
          // ignore invalid selectors etc.
        }
      }
      return false;
    };

    // Give the widget some time to load. We'll try a few times but stop quickly to avoid site impact.
    let tries = 0;
    const maxTries = 12; // ~12 * 500ms = 6s
    const intervalId = window.setInterval(() => {
      tries += 1;
      const ok = findAndAdjustOnce();
      if (ok || tries >= maxTries) {
        clearInterval(intervalId);
      }
    }, 500);

    // Also try once on resize (user rotates phone)
    const onResize = () => findAndAdjustOnce();
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", onResize);
      // do not remove injected script — safe to leave
    };
  }, [
    token,
    openOnLoad,
    mobileNudge,
    desktopNudge,
    mobileBreakpoint,
    widgetSelector,
  ]);

  return null;
};

export default ChatBot;
