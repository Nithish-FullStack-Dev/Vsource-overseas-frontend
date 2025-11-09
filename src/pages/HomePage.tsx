import React, { Suspense, useEffect } from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import AccreditationSection from "../components/home/AccreditationSection";
import StudyAbroadSection from "../components/home/StudyAbroadSection";
import ServicesSection from "../components/home/ServicesSection";
import VideoSection from "../components/home/VideoSection";
import CoursesSection from "../components/home/CoursesSection";
import LogoMarquee from "../components/home/LogoMarquee";
import ScholarshipsSection from "../components/home/ScholarshipsSection";
// import ExperienceSection from "../components/home/ExperienceSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import Features from "../components/home/Features";
import CareerOptionsCarousel from "../components/home/CareerOptionsCarousel";
// import VideoCarousel from "../components/home/VideoCarousel";
// import CtaSection from "../components/home/CtaSection";
import TrustSection from "../components/home/TrustSection";
// import CounterSection from "../components/home/CounterSection";

// import StudyDestinationsCarousel from "../components/home/StudyDestinationsCarousel";
const VideoCarousel = React.lazy(
  () => import("../components/home/VideoCarousel")
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

      {/* <CounterSection /> */}
      <AccreditationSection />
      <CoursesSection />
      <Features />
      <TrustSection />
      <ServicesSection />
      <CareerOptionsCarousel />
      <VideoSection />

      <LogoMarquee />
      {/* <VideoCarousel/> */}
      <Suspense fallback={<div style={{ height: 300 }}></div>}>
        <VideoCarousel />
      </Suspense>

      {/* <ScholarshipsSection />
      <StudyAbroadSection /> */}
      {/* <ExperienceSection /> */}
      <TestimonialsSection />
      {/* <FaqSection ref={faqRef} /> */}
      {/* <CtaSection /> */}
    </>
  );
};

export default HomePage;
