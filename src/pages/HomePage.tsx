import AppSkeleton from "@/AppSkeleton";
import LazyRender from "@/utils/LazyRender";
import { lazy, Suspense, useEffect } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const AboutSection = lazy(() => import("../components/home/AboutSection"));
const AccreditationSection = lazy(
  () => import("../components/home/AccreditationSection"),
);
const ServicesSection = lazy(
  () => import("../components/home/ServicesSection"),
);
const VideoSection = lazy(() => import("../components/home/VideoSection"));
const CoursesSection = lazy(() => import("../components/home/CoursesSection"));
const LogoMarquee = lazy(() => import("../components/home/LogoMarquee"));
const TestimonialsSection = lazy(
  () => import("../components/home/TestimonialsSection"),
);
const Features = lazy(() => import("../components/home/Features"));
const CareerOptionsCarousel = lazy(
  () => import("../components/home/CareerOptionsCarousel"),
);
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));
const TrustSection = lazy(() => import("../components/home/TrustSection"));

interface HomePageProps {
  faqRef?: React.RefObject<HTMLDivElement>;
}

const HomePage = ({ faqRef }: HomePageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Suspense fallback={<AppSkeleton />}>
        <Hero />
        <AboutSection />
      </Suspense>

      <LazyRender minHeight="60vh">
        <AccreditationSection />
      </LazyRender>

      <LazyRender minHeight="100vh">
        <CoursesSection />
      </LazyRender>

      <LazyRender minHeight="80vh">
        <Features />
      </LazyRender>

      <LazyRender minHeight="60vh">
        <TrustSection />
      </LazyRender>

      <LazyRender minHeight="100vh">
        <ServicesSection />
      </LazyRender>

      <LazyRender minHeight="80vh">
        <CareerOptionsCarousel />
      </LazyRender>

      <LazyRender minHeight="70vh">
        <VideoSection />
      </LazyRender>

      <LazyRender minHeight="100vh">
        <LogoMarquee />
      </LazyRender>

      {/* <LazyRender minHeight="100vh" rootMargin="150px 0px">
        <VideoCarousel />
      </LazyRender> */}

      <LazyRender minHeight="80vh">
        <TestimonialsSection />
      </LazyRender>
    </>
  );
};

export default HomePage;
