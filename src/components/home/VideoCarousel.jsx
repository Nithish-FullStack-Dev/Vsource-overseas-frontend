import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoCarousel.module.css"; // Import the CSS module

const videos = [
  {
    name: "Andrea",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
  {
    name: "Student 2",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
  {
    name: "Student 3",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
  {
    name: "Student 4",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
  {
    name: "Student 5",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
  {
    name: "Student 6",
    videoUrl: "https://www.youtube.com/embed/1QGRwv4iv64",
    thumbnail: "https://img.youtube.com/vi/1QGRwv4iv64/hqdefault.jpg",
  },
];

const OFFSET = 3;
const displayedVideos = [
  ...videos.slice(-OFFSET),
  ...videos,
  ...videos.slice(0, OFFSET),
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(OFFSET);
  const [playingIndex, setPlayingIndex] = useState(null);
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardCalculatedWidth, setCardCalculatedWidth] = useState(300);
  const gapSize = 10; // Keeping 10px gap as per your last CSS

  const updateCardWidthAndPadding = () => {
    const container = carouselRef.current;
    if (container && container.children.length > 0) {
      let newCardWidth;
      if (window.innerWidth >= 1024) {
        newCardWidth = (container.offsetWidth - 2 * gapSize) / 3;
        newCardWidth = Math.min(300, newCardWidth);
      } else if (window.innerWidth >= 768) {
        newCardWidth = (container.offsetWidth - gapSize) / 2;
        newCardWidth = Math.min(300, newCardWidth);
      } else {
        newCardWidth = container.offsetWidth - 2 * gapSize;
        newCardWidth = Math.min(300, newCardWidth);
      }
      setCardCalculatedWidth(newCardWidth);

      const padding = `calc(50% - ${newCardWidth / 2}px)`;
      if (container.style.paddingLeft !== padding) {
        container.style.paddingLeft = padding;
        container.style.paddingRight = padding;
      }
    }
  };

  const scrollToIndex = (index, behavior = "smooth") => {
    const container = carouselRef.current;
    if (!container) return;

    const videoCards = Array.from(container.children);
    const targetElement = videoCards[index];

    if (targetElement) {
      const containerWidth = container.offsetWidth;
      const elementOffsetLeft = targetElement.offsetLeft;
      const elementWidth = targetElement.offsetWidth;

      const scrollLeft =
        elementOffsetLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({ left: scrollLeft, behavior: behavior });
    }
    setCurrentIndex(index);
  };

  const goPrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= OFFSET) {
      // Only allow navigation if not at the start of the original content
      scrollToIndex(prevIndex);
    }
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videos.length + OFFSET) {
      // Only allow navigation if not at the end of the original content
      scrollToIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        updateCardWidthAndPadding();
        scrollToIndex(currentIndex, "auto");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let newActiveIndex = currentIndex;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      setCurrentIndex((prevIndex) => {
        if (newActiveIndex !== prevIndex) {
          return newActiveIndex;
        }
        return prevIndex;
      });

      // Handle infinite scroll looping
      const videoCards = Array.from(container.children);
      if (newActiveIndex >= videos.length + OFFSET) {
        // Jump back to the equivalent card in the first set
        container.scrollTo({
          left:
            videoCards[newActiveIndex - videos.length].offsetLeft -
            container.offsetWidth / 2 +
            videoCards[newActiveIndex - videos.length].offsetWidth / 2,
          behavior: "auto",
        });
        setCurrentIndex(newActiveIndex - videos.length); // Update current index to the new position
      } else if (
        newActiveIndex < OFFSET &&
        newActiveIndex >= 0 &&
        container.scrollLeft < 10
      ) {
        // Jump forward to the equivalent card in the last set
        container.scrollTo({
          left:
            videoCards[videos.length + newActiveIndex].offsetLeft -
            container.offsetWidth / 2 +
            videoCards[videos.length + newActiveIndex].offsetWidth / 2,
          behavior: "auto",
        });
        setCurrentIndex(videos.length + newActiveIndex); // Update current index to the new position
      }
    };

    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    container.addEventListener("scroll", debouncedHandleScroll);
    window.addEventListener("resize", updateCardWidthAndPadding);

    return () => {
      container.removeEventListener("scroll", debouncedHandleScroll);
      window.removeEventListener("resize", updateCardWidthAndPadding);
    };
  }, [currentIndex]); // Depend on currentIndex to re-evaluate scroll boundaries

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Determine if arrows should be disabled
  const isLeftArrowDisabled = currentIndex === OFFSET;
  const isRightArrowDisabled = currentIndex === videos.length + OFFSET - 1;

  return (
    <div
      ref={sectionRef}
      className={styles.wrapper}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(40px)",
        transition: "all 0.8s ease-in-out",
      }}
    >
      <h2 className={styles.title}>Our Student Testimonials</h2>


      <div className={styles.carouselContainer}>
        <button
          onClick={goPrev}
          className={styles.arrowButtonLeft}
          disabled={isLeftArrowDisabled}
        >
          ❮
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {displayedVideos.map((vid, index) => {
            const isActive = index === currentIndex;
            const isPlaying = index === playingIndex;
            return (
              <div
                key={index}
                className={`${styles.videoCard} ${
                  isActive ? styles.activeCard : ""
                }`}
                style={{
                  width: cardCalculatedWidth + "px",
                }}
                onClick={() => setPlayingIndex(index)}
              >
                {isPlaying ? (
                  <iframe
                    src={vid.videoUrl + "?autoplay=1&rel=0&modestbranding=1"}
                    className={styles.video}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title={vid.name}
                  />
                ) : (
                  <>
                    <img
                      src={vid.thumbnail}
                      alt={vid.name}
                      className={styles.video}
                    />
                    <div className={styles.playOverlay}>
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={styles.playIcon}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                )}
                {isActive && (
                  <>
                    <div className={styles.videoCardText}>
                      <span className={styles.studentTestimonials}>
                        › Student{" "}
                      </span>
                      <span className={styles.testimonialText}>
                        Testimonials
                      </span>
                    </div>
                    <div className={styles.nameTag}>{vid.name}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={goNext}
          className={styles.arrowButtonRight}
          disabled={isRightArrowDisabled}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
