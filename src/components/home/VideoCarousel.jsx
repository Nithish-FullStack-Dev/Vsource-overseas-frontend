import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoCarousel.module.css";

const videos = [
  { name: "SAMSRUTHI", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762691780/student4_bjqhnt.mp4" },
  { name: "AMITH REDDY", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762694135/student8_blnbpq.mp4" },
  { name: "BEDRE VISHWAS", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762694056/student7_fuwbjh.mp4" },
  { name: "DEEKSHITHA", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762693376/student1_kbxkmk.mp4" },
  { name: "SHAIK MUNEER AHMED", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762693862/student6_bajxom.mp4" },
  { name: "KHASHIKA", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762693691/student2_y8tg7j.mp4" },
  { name: "SATHVIKA", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762693758/student5_n9mezn.mp4" },
  { name: "LOVLISH REDDY", video: "https://res.cloudinary.com/dch00stdh/video/upload/v1762692631/student3_kpisvc.mp4" },
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
  const videoRefs = useRef([]);
  const [cardCalculatedWidth, setCardCalculatedWidth] = useState(280);

  /* 🔵 FIX: Smooth stable card width */
  const updateCardWidth = () => {
    const c = carouselRef.current;
    if (!c) return;

    let W = 280;
    if (window.innerWidth >= 1024) W = 300;
    else if (window.innerWidth >= 768) W = 260;
    else W = 220;

    setCardCalculatedWidth(W);
  };

  /* 🔵 FIX: No jump initial load */
  useEffect(() => {
    updateCardWidth();
    setTimeout(() => {
      scrollToIndex(OFFSET, "auto");
    }, 60);

    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  /* 🔵 Smooth scrollToIndex */
  const scrollToIndex = (index, behavior = "smooth") => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children);
    const target = cards[index];
    if (!target) return;

    const scrollPos =
      target.offsetLeft -
      container.clientWidth / 2 +
      target.clientWidth / 2;

    container.scrollTo({ left: scrollPos, behavior });
    setCurrentIndex(index);
  };

  const goPrev = () => scrollToIndex(currentIndex - 1);
  const goNext = () => scrollToIndex(currentIndex + 1);

  /* 🔵 FIX: Proper smooth active-card detection */
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2;

        let nearest = currentIndex;
        let minDist = Infinity;

        Array.from(container.children).forEach((child, i) => {
          const childCenter =
            child.offsetLeft + child.clientWidth / 2;

          const dist = Math.abs(center - childCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });

        setCurrentIndex(nearest);
        ticking = false;
      });
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* 🔵 FIX: Stop videos on inactive */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== playingIndex) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [playingIndex]);

  /* 🔵 FIX: Video play logic stable */
  const handlePlay = (i) => {
    scrollToIndex(i);
    setTimeout(() => {
      const v = videoRefs.current[i];
      if (v) {
        v.play().catch(() => {});
        setPlayingIndex(i);
      }
    }, 150);
  };

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      <h2 className={styles.title}>Our Student Testimonials</h2>

      <div className={styles.carouselContainer}>
        <button onClick={goPrev} className={styles.arrowButtonLeft}>
          ❮
        </button>

        <div ref={carouselRef} className={styles.carousel}>
          {displayedVideos.map((vid, index) => {
            const isActive = index === currentIndex;
            const isPlaying = index === playingIndex;

            return (
              <div
                key={index}
                className={`${styles.videoCard} ${
                  isActive ? styles.activeCard : ""
                }`}
                style={{ width: cardCalculatedWidth }}
              >
                <div className={styles.videoArea}>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={vid.video}
                    className={styles.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={isPlaying}
                    onEnded={() => setPlayingIndex(null)}
                    onPause={() => setPlayingIndex(null)}
                  />

                  {/* Play Button */}
                  {isActive && !isPlaying && (
                    <button
                      className={styles.playButton}
                      onClick={() => handlePlay(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" />
                        <polygon points="80,60 150,100 80,140" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Labels */}
                {isActive && (
                  <>
                    <div className={styles.videoCardText}>
                      <span className={styles.studentTestimonials}>› Student </span>
                      <span className={styles.testimonialText}>Testimonials</span>
                    </div>
                    <div className={styles.nameTag}>{vid.name}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={goNext} className={styles.arrowButtonRight}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
