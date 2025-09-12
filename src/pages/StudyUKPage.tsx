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
// import VideoCarousel from "../components/university/VideoCarousel";
import VideoCarousel from "../components/home/VideoCarousel";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { toast } from "sonner";
import { StudyIn } from "@/types/StudyInPage";

export const fetchStudyInUk = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/abroads?filters[id][$eq]=8&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][image][populate][image][fields][0]=url&populate[students_expriences][populate][image][populate][image][fields][1]=documentId&populate[students_expriences][populate][image][populate][image][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyUKPage = () => {
  const {
    data: studyInUk,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInUk"],
    queryFn: fetchStudyInUk,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in uk");
    console.error("failed to load study in uk", error);
  }

  if (isLoading || !studyInUk) {
    return <BannerSkeleton />;
  }

  return (
    <>
      <HeroBanner banner={studyInUk.banner || null} title={studyInUk.title} />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInUk?.overview || null} />
        <WhyStudyUK whyStudyin={studyInUk?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={studyInUk?.Living_Cost_Tuition_Fee || null}
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUK admissions={studyInUk?.admissions || null} />
        <StudentVisaUK
          visa_requirements={studyInUk?.visa_requirements || null}
        />
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
