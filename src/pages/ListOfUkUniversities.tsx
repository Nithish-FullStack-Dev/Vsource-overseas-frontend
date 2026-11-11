import React, { useEffect } from "react";
import {
  ExploreUniversitiesResponse,
  useUniversities,
} from "@/lib/Universities";
import UniversityHomePageSkeleton from "@/Loaders/LandingPages/UniversityHomePageSkeleton";
import UniversityList from "@/components/UniversityList";
import { toast } from "sonner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchAllUkUniversities =
  async (): Promise<ExploreUniversitiesResponse> => {
    const baseUrl = "https://backend.vsourceoverseas.com/api/uni-directories";

    const fetchPage = async (page: number) => {
      const params = new URLSearchParams();

      // Same logo population
      params.append("populate[logo][fields][0]", "url");
      params.append("populate[logo][fields][1]", "documentId");
      params.append("populate[logo][fields][2]", "name");

      // Same banner population
      params.append("populate[banner][fields][0]", "url");
      params.append("populate[banner][fields][1]", "documentId");
      params.append("populate[banner][fields][2]", "name");

      // Filter UK universities
      params.append("filters[country][$in][0]", "UK");
      params.append("filters[country][$in][1]", "United Kingdom");

      // Strapi API pagination (internal only)
      params.append("pagination[page]", String(page));
      params.append("pagination[pageSize]", "100");

      const { data } = await axios.get(`${baseUrl}?${params.toString()}`);

      return {
        universities: data?.data || [],
        pagination: data?.meta?.pagination || {
          page: 1,
          pageSize: 100,
          pageCount: 1,
          total: 0,
        },
      };
    };

    // Fetch first page
    const firstPage = await fetchPage(1);

    const totalPages = firstPage.pagination.pageCount;

    // Fetch remaining pages
    const remainingPages =
      totalPages > 1
        ? await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, index) =>
              fetchPage(index + 2),
            ),
          )
        : [];

    const universities = [
      ...firstPage.universities,
      ...remainingPages.flatMap((result) => result.universities),
    ];

    return {
      universities,
      pagination: {
        page: 1,
        pageSize: universities.length,
        pageCount: 1,
        total: universities.length,
      },
    };
  };

export function useAllUkUniversities() {
  return useQuery<ExploreUniversitiesResponse>({
    queryKey: ["allUkUniversities"],
    queryFn: fetchAllUkUniversities,
    staleTime: 10 * 60 * 1000,
  });
}

const ListOfUkUniversities: React.FC = () => {
  const {
    data: UNIVERSITIES,
    isLoading,
    isError,
    error,
  } = useAllUkUniversities();

  useEffect(() => {
    if (isError) {
      console.error(error);
      toast.error("Failed to load UK universities");
    }
  }, [isError, error]);

  if (isLoading) {
    return <UniversityHomePageSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load UK universities.
      </div>
    );
  }

  const ukUniversities = UNIVERSITIES?.universities ?? [];

  return (
    <>
      {/* Banner */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            List of UK Universities
          </h1>
          <p className="text-xl text-gray-300">Study in Top UK Universities</p>
        </div>
      </section>

      {/* UK Universities */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 text-gray-700 font-medium">
          Showing{" "}
          <span className="font-semibold text-red-600">
            {ukUniversities.length}
          </span>{" "}
          UK universities
        </div>

        {ukUniversities.length > 0 ? (
          <UniversityList universities={ukUniversities} />
        ) : (
          <div className="text-center py-16 text-gray-500">
            No UK universities found.
          </div>
        )}
      </section>
    </>
  );
};

export default ListOfUkUniversities;
