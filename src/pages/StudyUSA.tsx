import { useEffect } from "react";
import HeroBanner from "../components/usa/HeroBanner";
import QuickLinksSection from "../components/usa/QuickLinksSection";
import OverviewHighlights from "../components/usa/OverviewHighlights";
import WhyStudyUSA from "../components/usa/WhyStudyUSA";
import CityCostsTabs from "../components/usa/CityCostsTabs";
import AdmissionRequirementsUSA from "../components/usa/AdmissionRequirementsUSA";
import StudentVisaUSA from "../components/usa/StudentVisaUSA";
import PopularCourses from "../components/usa/PopularCourses";
import JobsInUSA from "../components/usa/JobsInUSA";
import LogoMarquee from "../components/usa/LogoMarquee";
// import VideoCarousel from "../components/usa/VideoCarousel";
import VideoCarousel from "../components/home/VideoCarousel";

const StudyUSA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroBanner />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights />
        <WhyStudyUSA />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUSA />
        <StudentVisaUSA />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
      <LogoMarquee />
 </section>
      
        <PopularCourses />
     

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInUSA />
      </section>

      <VideoCarousel />

      {/* Small helpers for smooth anchor spacing under fixed header */}
      <style>{`
        html { scroll-behavior: smooth; }
        .anchor-section { scroll-margin-top: 100px; } /* adjust for your fixed header */
      `}</style>
    </>
  );
};

export default StudyUSA;
