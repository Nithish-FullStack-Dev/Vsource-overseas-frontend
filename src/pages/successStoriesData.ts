export interface SuccessStory {
  id: string;
  src: string;
  alt: string;
}

export const SUCCESS_STORIES_BASE_PATH = "/assets/success-stories";

export const SUCCESS_STORY_COUNT = 360;

export const SUCCESS_STORY_FALLBACK_ASPECT_RATIO = 3 / 4;

export const successStories: SuccessStory[] = Array.from(
  { length: SUCCESS_STORY_COUNT },
  (_, index) => {
    const imageNumber = index + 1;

    const folder = Math.ceil(imageNumber / 10);

    return {
      id: String(imageNumber),
      src: `${SUCCESS_STORIES_BASE_PATH}/${folder}/${imageNumber}.webp`,
      alt: `UK Success Story ${imageNumber}`,
    };
  },
);
