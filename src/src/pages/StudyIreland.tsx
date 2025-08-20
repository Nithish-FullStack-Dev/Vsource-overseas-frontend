import { useEffect } from "react";
import HeroBanner from "../components/ireland/HeroBanner";
import QuickLinksSection from "../components/ireland/QuickLinksSection";
import OverviewHighlights from "../components/ireland/OverviewHighlights";
import WhyStudyireland from "../components/ireland/WhyStudyireland";
import CityCostsTabs from "../components/ireland/CityCostsTabs";
import AdmissionRequirementsireland from "../components/ireland/AdmissionRequirementsireland";
import StudentVisaireland from "../components/ireland/StudentVisaireland";
import PopularCourses from "../components/ireland/PopularCourses";
import JobsInireland from "../components/ireland/JobsInireland";
import LogoMarquee from "../components/ireland/LogoMarquee";
import VideoCarousel from "../components/ireland/VideoCarousel";

const StudyIreland = () => {
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
        <WhyStudyireland />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsireland />
        <StudentVisaireland />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
      <LogoMarquee />
 </section>
      
        <PopularCourses />
     

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInireland />
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

export default StudyIreland;
