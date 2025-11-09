import AppSkeleton from "@/AppSkeleton";
import { lazy, Suspense, useEffect } from "react";
const Hero = lazy(() => import("../components/home/Hero"));
const AboutSection = lazy(() => import("../components/home/AboutSection"));
const AccreditationSection = lazy(
  () => import("../components/home/AccreditationSection")
);
const ServicesSection = lazy(
  () => import("../components/home/ServicesSection")
);
const VideoSection = lazy(() => import("../components/home/VideoSection"));
const CoursesSection = lazy(() => import("../components/home/CoursesSection"));
const LogoMarquee = lazy(() => import("../components/home/LogoMarquee"));
const TestimonialsSection = lazy(
  () => import("../components/home/TestimonialsSection")
);
const Features = lazy(() => import("../components/home/Features"));
const CareerOptionsCarousel = lazy(
  () => import("../components/home/CareerOptionsCarousel")
);
const VideoCarousel = lazy(() => import("../components/home/VideoCarousel"));
const TrustSection = lazy(() => import("../components/home/TrustSection"));

interface HomePageProps {
  faqRef?: React.RefObject<HTMLDivElement>;
}

const HomePage = ({ faqRef }: HomePageProps) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<AppSkeleton />}>
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
      <VideoCarousel />

      {/* <ScholarshipsSection />
      <StudyAbroadSection /> */}
      {/* <ExperienceSection /> */}
      <TestimonialsSection />
      {/* <FaqSection ref={faqRef} /> */}
      {/* <CtaSection /> */}
    </Suspense>
  );
};

export default HomePage;
