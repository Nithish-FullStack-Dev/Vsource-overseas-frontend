import { useState, useEffect, useRef, useMemo } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Courses, StudyCards } from "@/types/LandingPage";

type Course = {
  country: string;
  tag: string;
  description: string[];
  image: string;
  url: string;
};

const fetchCourseSection = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.study-destination][populate][study_cards][populate][image][fields][0]=url&populate[Sections][on][blocks.study-destination][populate][study_cards][populate][image][fields][1]=alternativeText&populate[Sections][on][blocks.study-destination][populate][study_cards][populate][descriptions]=true`
  );
  return data.data[0].Sections[0];
};

export default function CoursesSection() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery<Courses>({
    queryKey: ["courses"],
    queryFn: fetchCourseSection,
  });

  const [processedCourses, setProcessedCourses] = useState<Courses | null>(
    null
  );

  useEffect(() => {
    if (courses) {
      const updatedCards = courses.study_cards.map((card) => {
        let url = "";
        const countryName = card.country.toLowerCase().trim();
        if (countryName === "united kingdom") {
          url = "/study-in-uk";
        } else if (countryName === "usa") {
          url = "/study-in-usa";
        } else if (countryName === "canada") {
          url = "/study-in-canada";
        } else if (countryName === "ireland") {
          url = "/study-in-ireland";
        } else if (countryName === "france") {
          url = "/study-in-france";
        }
        return { ...card, url };
      });

      setProcessedCourses({ ...courses, study_cards: updatedCards });
    }
  }, [courses]);

  const computeVisible = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };
  const [visible, setVisible] = useState<number>(computeVisible());
  useEffect(() => {
    const onResize = () => setVisible(computeVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = useMemo(() => {
    if (!processedCourses) return [];
    const head = processedCourses?.study_cards?.slice(0, visible);
    const tail = processedCourses?.study_cards?.slice(-visible);
    return [...tail, ...processedCourses?.study_cards, ...head];
  }, [visible, processedCourses]);

  const N = processedCourses?.study_cards?.length;
  const [index, setIndex] = useState<number>(visible);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    setIsAnimating(false);
    setIndex(visible);
    const id = requestAnimationFrame(() => setIsAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!isHoveringRef.current) setIndex((i) => i + 1);
    }, 3500);
  };
  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const handleTransitionEnd = () => {
    if (index >= visible + N) {
      setIsAnimating(false);
      setIndex(visible);
    } else if (index < visible) {
      setIsAnimating(false);
      setIndex(visible + N - 1);
    }
  };
  useEffect(() => {
    if (!isAnimating) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);
  const shortLabel = (country: string) =>
    country === "UNITED KINGDOM" ? "UK" : country;

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    isHoveringRef.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const dx = e.touches[0].clientX - touchStartXRef.current;
    touchDeltaXRef.current = dx;
    if (Math.abs(dx) > 10) e.preventDefault();
  };
  const onTouchEnd = () => {
    const dx = touchDeltaXRef.current;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    isHoveringRef.current = false;
  };

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const Card = ({ c }: { c: StudyCards }) => {
    const bg = encodeURI(c?.image?.url);
    return (
      <div className="px-3 box-border h-full py-6">
        <div className="relative rounded-[15px]  overflow-hidden shadow-[0_10px_24px_rgba(16,24,40,0.10)] border border-gray-200 bg-white">
          <div className="relative aspect-square">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${bg}')` }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.9) 82%, #ffffff 100%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 grid grid-cols-12 pt-6 pr-4 pb-4 pl-4 md:pt-10 md:pr-5 md:pb-5 md:pl-5 lg:pt-12 lg:pr-6 lg:pb-6 lg:pl-6 overflow-hidden">
              <div className="col-span-6 md:col-span-5" aria-hidden />
              <div className="col-span-6 md:col-span-7 flex flex-col md:mt-0 md:pl-3 lg:pl-4 md:pt-10 sm:pt-0 sm:mt-0 overflow-hidden mt-6">
                <div className="text-[#2563EB] text-xs md:text-sm font-semibold uppercase tracking-wide">
                  {c.tag}
                </div>
                <div className="mt-1 text-[20px] leading-tight md:text-3xl lg:text-4xl font-extrabold text-[#E3000F] uppercase">
                  {c.country}
                </div>
                <div className="mt-2 md:mt-3 text-[#0F172A] font-semibold">
                  Why Study in {shortLabel(c.country)}
                </div>
                <ul className="mt-2 space-y-1.5 md:space-y-2 max-h-28 sm:max-h-none overflow-hidden sm:overflow-visible">
                  {c &&
                    c.descriptions &&
                    c.descriptions.map((line, i) => (
                      <li
                        key={line?.id || i}
                        className={`flex items-start gap-2 text-[13px] md:text-[15px] lg:text-base text-[#334155] ${
                          i > 1 ? "hidden sm:flex" : ""
                        } sm:text-left`}
                      >
                        <span className="mt-[7px] inline-block h-2 w-2 rounded-full bg-[#2563EB]" />
                        <span className="leading-snug">
                          {line?.description}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-5 lg:px-6 pb-4">
            <Link
              to={c.url}
              target="_self"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#e40000] px-4 py-3 text-white text-sm font-semibold hover:bg-[#9c0201] transition"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const slideBasis = `${100 / visible}%`;
  const translatePercent = (100 / visible) * index;

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto sm:px-10 px-5">
        <SectionTitle
          title={
            processedCourses?.title ||
            "🎓 Know about popular study destinations!"
          }
          subtitle={
            processedCourses?.description ||
            "Discover globally ranked universities and career-ready opportunities across the world."
          }
        />
        <AnimateOnScroll>
          <div
            className="relative mt-6"
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
          >
            <div
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                onTransitionEnd={handleTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translateX(-${translatePercent}%)`,
                  transition: isAnimating ? "transform 600ms ease" : "none",
                  width: "100%",
                }}
              >
                {slides.map((course, i) => (
                  <div
                    key={`${course.country}-${i}`}
                    className="shrink-0"
                    style={{ flexBasis: slideBasis }}
                  >
                    <Card c={course} />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="flex sm:hidden absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              <h1 className="text-xl">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="flex sm:hidden absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              <h1 className="text-xl">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 7L14 12L9 17"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="hidden sm:flex absolute right-[0%] top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ›
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
