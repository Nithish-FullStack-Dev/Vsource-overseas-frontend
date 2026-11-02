import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { StudyIn } from "@/types/StudyInPage";

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

const UK_API = "https://backend.vsourceoverseas.com/api/abroads";

const UK_PARAMS = {
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
};

export const fetchStudyInUk = async (): Promise<StudyIn> => {
  try {
    const response = await axios.get(UK_API, {
      params: UK_PARAMS,
      timeout: 30000,
      headers: {
        Accept: "application/json",
      },
    });

    const result = response.data?.data?.[0];

    if (!result) {
      throw new Error("UK data is missing from the API response");
    }

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("UK API request failed:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        response: error.response?.data,
        url: error.config?.url,
      });
    } else {
      console.error("UK API error:", error);
    }

    throw error;
  }
};

const StudyUKPage = () => {
  const {
    data: studyInUk,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<StudyIn>({
    queryKey: ["studyInUk"],
    queryFn: fetchStudyInUk,
    staleTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!isError || !error) return;

    toast.error("Failed to load Study in UK", {
      description: "Please check your connection and try again.",
    });
  }, [isError, error]);

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (isError || !studyInUk) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Unable to load Study in UK
        </h2>

        <p className="max-w-md text-sm text-gray-500">
          We couldn't retrieve the information. Please try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

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
