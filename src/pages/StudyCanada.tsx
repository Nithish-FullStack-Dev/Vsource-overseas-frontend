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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StudyIn } from "@/types/StudyInPage";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

export const fetchStudyInCanada = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/abroads?filters[id][$eq]=12&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][image][populate][image][fields][0]=url&populate[students_expriences][populate][image][populate][image][fields][1]=documentId&populate[students_expriences][populate][image][populate][image][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyCanada = () => {
  const {
    data: studyInCanada,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInCanada"],
    queryFn: fetchStudyInCanada,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in canada");
    console.error("failed to load study in canada", error);
  }

  if (isLoading || !studyInCanada) {
    return <BannerSkeleton />;
  }

  return (
    <>
      <HeroBanner
        banner={studyInCanada?.banner || null}
        title={studyInCanada?.title}
      />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInCanada?.overview || null} />
        <WhyStudycanada whyStudyin={studyInCanada?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={
            studyInCanada?.Living_Cost_Tuition_Fee || null
          }
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementscanada
          admissions={studyInCanada?.admissions || null}
        />
        <StudentVisacanada
          visa_requirements={studyInCanada?.visa_requirements || null}
        />
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
