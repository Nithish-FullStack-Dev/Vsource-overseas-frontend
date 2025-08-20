import { useEffect } from "react";
import HeroBanner from "../components/university/HeroBanner";
import QuickLinksSection from "../components/university/QuickLinksSection";
import OverviewHighlights from "../components/university/OverviewHighlights";
import WhyStudyUK from "../components/university/WhyStudyUK";
import CityCostsTabs from "../components/university/CityCostsTabs";
import AdmissionRequirementsUK from "../components/university/AdmissionRequirementsUK";
import StudentVisaUK from "../components/university/StudentVisaUK";
import PopularCourses from "../components/university/PopularCourses";
import JobsInUK from "../components/university/JobsInUK";
import LogoMarquee from "../components/university/LogoMarquee";
import VideoCarousel from "../components/university/VideoCarousel";

const StudyUKPage = () => {
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
        <WhyStudyUK />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUK />
        <StudentVisaUK />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
      <LogoMarquee />
 </section>
      
        <PopularCourses />
     

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInUK />
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

export default StudyUKPage;
