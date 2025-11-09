import React, { Suspense, useEffect } from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import AccreditationSection from "../components/home/AccreditationSection";
// import StudyAbroadSection from "../components/home/StudyAbroadSection";
// import ServicesSection from "../components/home/ServicesSection";
// import VideoSection from "../components/home/VideoSection";
// import CoursesSection from "../components/home/CoursesSection";
// import LogoMarquee from "../components/home/LogoMarquee";
// import ScholarshipsSection from "../components/home/ScholarshipsSection";
// import ExperienceSection from "../components/home/ExperienceSection";
// import TestimonialsSection from "../components/home/TestimonialsSection";
import Features from "../components/home/Features";
// import CareerOptionsCarousel from "../components/home/CareerOptionsCarousel";
// import VideoCarousel from "../components/home/VideoCarousel";
// import CtaSection from "../components/home/CtaSection";
import TrustSection from "../components/home/TrustSection";
// import CounterSection from "../components/home/CounterSection";

// import StudyDestinationsCarousel from "../components/home/StudyDestinationsCarousel";

const CoursesSection = React.lazy(
  () => import("../components/home/CoursesSection")
);
const ServicesSection = React.lazy(
  () => import("../components/home/ServicesSection")
);
const CareerOptionsCarousel = React.lazy(
  () => import("../components/home/CareerOptionsCarousel")
);
const VideoSection = React.lazy(
  () => import("../components/home/VideoSection")
);
const LogoMarquee = React.lazy(() => import("../components/home/LogoMarquee"));
const VideoCarousel = React.lazy(
  () => import("../components/home/VideoCarousel")
);
const TestimonialsSection = React.lazy(
  () => import("../components/home/TestimonialsSection")
);

interface HomePageProps {
  faqRef?: React.RefObject<HTMLDivElement>;
}

const HomePage = ({ faqRef }: HomePageProps) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <AboutSection />
      <AccreditationSection />
      <Features />
      <TrustSection />

      {/* 🟡 Heavy sections load AFTER first paint */}
      <Suspense fallback={<div style={{ height: 200 }} />}>
        <CoursesSection />
      </Suspense>

      <Suspense fallback={<div style={{ height: 200 }} />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<div style={{ height: 200 }} />}>
        <CareerOptionsCarousel />
      </Suspense>

      <Suspense fallback={<div style={{ height: 200 }} />}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={<div style={{ height: 200 }} />}>
        <LogoMarquee />
      </Suspense>

      <Suspense fallback={<div style={{ height: 300 }} />}>
        <VideoCarousel />
      </Suspense>

      <Suspense fallback={<div style={{ height: 300 }} />}>
        <TestimonialsSection />
      </Suspense>
      {/* <FaqSection ref={faqRef} /> */}
      {/* <CtaSection /> */}
    </>
  );
};

export default HomePage;
