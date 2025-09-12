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
// import VideoCarousel from "../components/ireland/VideoCarousel";
import VideoCarousel from "../components/home/VideoCarousel";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StudyIn } from "@/types/StudyInPage";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

export const fetchStudyInIreland = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/abroads?filters[id][$eq]=15&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][image][populate][image][fields][0]=url&populate[students_expriences][populate][image][populate][image][fields][1]=documentId&populate[students_expriences][populate][image][populate][image][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyIreland = () => {
  const {
    data: studyInIreland,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInIreland"],
    queryFn: fetchStudyInIreland,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in canada");
    console.error("failed to load study in canada", error);
  }

  if (isLoading || !studyInIreland) {
    return <BannerSkeleton />;
  }

  return (
    <>
      <HeroBanner
        banner={studyInIreland?.banner || null}
        title={studyInIreland?.title}
      />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInIreland?.overview || null} />
        <WhyStudyireland whyStudyin={studyInIreland?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={
            studyInIreland?.Living_Cost_Tuition_Fee || null || null
          }
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsireland
          admissions={studyInIreland?.admissions || null}
        />
        <StudentVisaireland
          visa_requirements={studyInIreland?.visa_requirements || null}
        />
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
