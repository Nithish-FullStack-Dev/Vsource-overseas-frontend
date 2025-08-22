import { useEffect } from "react";
import HeroBanner from "../components/france/HeroBanner";
import QuickLinksSection from "../components/france/QuickLinksSection";
import OverviewHighlights from "../components/france/OverviewHighlights";
import WhyStudyFrance from "../components/france/WhyStudyFrance";
import CityCostsTabs from "../components/france/CityCostsTabs";
import AdmissionRequirementsFrance from "../components/france/AdmissionRequirementsFrance";
import StudentVisaFrance from "../components/france/StudentVisaFrance";
import PopularCourses from "../components/france/PopularCourses";
import JobsInFrance from "../components/france/JobsInFrance";
import LogoMarquee from "../components/france/LogoMarquee";
// import VideoCarousel from "../components/france/VideoCarousel";
import VideoCarousel from "../components/home/VideoCarousel";


const StudyFrance = () => {
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
        <WhyStudyFrance />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsFrance />
        <StudentVisaFrance />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
      <LogoMarquee />
 </section>
      
        <PopularCourses />
     

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInFrance />
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

export default StudyFrance;
