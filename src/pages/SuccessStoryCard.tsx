import React, { memo, useCallback, useRef, useState } from "react";
import { useViewportWindow } from "./useViewportWindow";
import {
  SUCCESS_STORY_FALLBACK_ASPECT_RATIO,
  SuccessStory,
} from "./successStoriesData";

interface SuccessStoryImageProps {
  src: string;
  alt: string;
  priority: boolean;
  onMeasured: (aspectRatio: number) => void;
  onFailed: () => void;
}

interface SuccessStoryCardProps {
  story: SuccessStory;
  priority: boolean;
}

const MOUNT_MARGIN = "1000px 0px";
const RELEASE_MARGIN = "2500px 0px";
const MOUNT_DELAY_MS = 120;

const measuredAspectRatios = new Map<string, number>();

const SuccessStoryImage: React.FC<SuccessStoryImageProps> = ({
  src,
  alt,
  priority,
  onMeasured,
  onFailed,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const commitLoaded = useCallback(
    (image: HTMLImageElement) => {
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        onMeasured(image.naturalWidth / image.naturalHeight);
      }
      setIsLoaded(true);
    },
    [onMeasured],
  );

  const attachImage = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image || !image.complete) {
        return;
      }

      if (image.naturalWidth > 0) {
        commitLoaded(image);
      } else {
        onFailed();
      }
    },
    [commitLoaded, onFailed],
  );

  return (
    <img
      ref={attachImage}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onLoad={(event) => commitLoaded(event.currentTarget)}
      onError={onFailed}
      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  story,
  priority,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(
    () =>
      measuredAspectRatios.get(story.src) ??
      SUCCESS_STORY_FALLBACK_ASPECT_RATIO,
  );

  const isActive = useViewportWindow(containerRef, {
    mountMargin: MOUNT_MARGIN,
    releaseMargin: RELEASE_MARGIN,
    mountDelayMs: MOUNT_DELAY_MS,
    initiallyActive: priority,
  });

  const handleMeasured = useCallback(
    (measured: number) => {
      measuredAspectRatios.set(story.src, measured);
      setAspectRatio(measured);
    },
    [story.src],
  );

  const handleFailed = useCallback(() => setHasFailed(true), []);

  return (
    <div
      ref={containerRef}
      style={{ aspectRatio }}
      className={`relative w-full max-w-[300px] overflow-hidden rounded-lg bg-gray-200 shadow-md transition-shadow duration-300 hover:shadow-xl ${
        hasFailed ? "hidden" : ""
      }`}
    >
      {isActive && (
        <SuccessStoryImage
          src={story.src}
          alt={story.alt}
          priority={priority}
          onMeasured={handleMeasured}
          onFailed={handleFailed}
        />
      )}
    </div>
  );
};

export default memo(SuccessStoryCard);
