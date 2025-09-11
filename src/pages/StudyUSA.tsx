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
import { useQuery } from "@tanstack/react-query";
import { StudyIn } from "@/types/StudyInPage";
import axios from "axios";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

export const fetchStudyInUsa = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/abroads?filters[id][$eq]=9&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][image][populate][image][fields][0]=url&populate[students_expriences][populate][image][populate][image][fields][1]=documentId&populate[students_expriences][populate][image][populate][image][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyUSA = () => {
  const {
    data: studyInUsa,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInUSA"],
    queryFn: fetchStudyInUsa,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in usa");
    console.error("failed to load study in usa", error);
  }

  if (isLoading || !studyInUsa) {
    return <BannerSkeleton />;
  }

  return (
    <>
      <HeroBanner banner={studyInUsa?.banner} title={studyInUsa?.title} />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInUsa?.overview} />
        <WhyStudyUSA whyStudyin={studyInUsa?.whyStudyin} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={studyInUsa?.Living_Cost_Tuition_Fee}
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUSA admissions={studyInUsa?.admissions} />
        <StudentVisaUSA visa_requirements={studyInUsa?.visa_requirements} />
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
