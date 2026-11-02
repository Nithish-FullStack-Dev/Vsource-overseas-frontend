import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { StudyIn } from "@/types/StudyInPage";
import { fetchStrapiCollection } from "@/lib/strapi";

const HeroBanner = lazy(() => import("../components/university/HeroBanner"));
const QuickLinksSection = lazy(
  () => import("../components/university/QuickLinksSection"),
);
const OverviewHighlights = lazy(
  () => import("../components/university/OverviewHighlights"),
);
const WhyStudyUK = lazy(() => import("../components/university/WhyStudyUK"));
const CityCostsTabs = lazy(
  () => import("../components/university/CityCostsTabs"),
);
const AdmissionRequirementsUK = lazy(
  () => import("../components/university/AdmissionRequirementsUK"),
);
const StudentVisaUK = lazy(
  () => import("../components/university/StudentVisaUK"),
);
const PopularCourses = lazy(
  () => import("../components/university/PopularCourses"),
);
const JobsInUK = lazy(() => import("../components/university/JobsInUK"));
const LogoMarquee = lazy(() => import("../components/university/LogoMarquee"));
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));

export const fetchStudyInUk = async (): Promise<StudyIn> => {
  return fetchStrapiCollection<StudyIn>("abroads", {
    "filters[key][$eq]": "uk",

    "populate[banner][fields][0]": "url",
    "populate[banner][fields][1]": "documentId",
    "populate[banner][fields][2]": "alternativeText",

    "populate[overview][populate][highlights]": "true",

    "populate[whyStudyin][populate][highlights_points]": "true",
    "populate[whyStudyin][populate][whyStudyin_cards]": "true",

    "populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]":
      "url",
    "populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]":
      "documentId",
    "populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]":
      "alternativeText",

    "populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]":
      "true",

    "populate[admissions][populate][checklist][populate][texts]": "true",

    "populate[visa_requirements][populate][details]": "true",

    "populate[students_expriences][populate][images][fields][0]": "url",
    "populate[students_expriences][populate][images][fields][1]": "documentId",
    "populate[students_expriences][populate][images][fields][2]":
      "alternativeText",
  });
};

const StudyUKPage: React.FC = () => {
  const {
    data: studyInUk,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<StudyIn, Error>({
    queryKey: ["studyInUk"],
    queryFn: fetchStudyInUk,

    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status && status >= 400 && status < 500) {
          return false;
        }
      }

      return failureCount < 3;
    },

    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  // Loading
  if (isPending) {
    return <BannerSkeleton />;
  }

  // Error handling
  if (isError || !studyInUk) {
    let errorMessage = "Please check your internet connection and try again.";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Server error (${error.response.status}). Please try again later.`;
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "The request timed out. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-5 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Unable to load Study in UK
        </h2>

        <p className="max-w-lg text-gray-500">{errorMessage}</p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetching ? "Loading..." : "Try Again"}
        </button>
      </div>
    );
  }

  // Success
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <HeroBanner banner={studyInUk.banner || null} title={studyInUk.title} />

        <QuickLinksSection />

        <section id="overview" className="anchor-section">
          <OverviewHighlights overview={studyInUk.overview || null} />

          <WhyStudyUK whyStudyin={studyInUk.whyStudyin || null} />
        </section>

        <section id="costs" className="anchor-section">
          <CityCostsTabs
            living_Cost_Tuition_Fee={studyInUk.Living_Cost_Tuition_Fee || null}
          />
        </section>

        <section id="admissions" className="anchor-section">
          <AdmissionRequirementsUK admissions={studyInUk.admissions || null} />

          <StudentVisaUK
            visa_requirements={studyInUk.visa_requirements || null}
          />
        </section>

        <section id="top-universities" className="anchor-section">
          <LogoMarquee />
        </section>

        <PopularCourses />

        <section id="jobs" className="anchor-section">
          <JobsInUK
            students_expriences={studyInUk.students_expriences || null}
          />
        </section>

        <VideoCarousel />
      </Suspense>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .anchor-section {
          scroll-margin-top: 100px;
        }
      `}</style>
    </>
  );
};

export default StudyUKPage;
