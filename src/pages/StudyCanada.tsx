import { useEffect } from "react";
import HeroBanner from "../components/canada/HeroBanner";
import QuickLinksSection from "../components/canada/QuickLinksSection";
import OverviewHighlights from "../components/canada/OverviewHighlights";
import WhyStudycanada from "../components/canada/WhyStudycanada";
import CityCostsTabs from "../components/canada/CityCostsTabs";
import AdmissionRequirementscanada from "../components/canada/AdmissionRequirementscanada";
import StudentVisacanada from "../components/canada/StudentVisacanada";
import PopularCourses from "../components/canada/PopularCourses";
import JobsIncanada from "../components/canada/JobsIncanada";
import LogoMarquee from "../components/canada/LogoMarquee";
// import VideoCarousel from "../components/canada/VideoCarousel";
import VideoCarousel from "../components/home/VideoCarousel";
const StudyCanada = () => {
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
        <WhyStudycanada />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementscanada />
        <StudentVisacanada />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
      <LogoMarquee />
 </section>
      
        <PopularCourses />
     

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsIncanada />
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

export default StudyCanada;
