import React from "react";
import { useSearchParams } from "react-router-dom";
import { useUniversities } from "@/lib/Universities";
import UniversityHomePageSkeleton from "@/Loaders/LandingPages/UniversityHomePageSkeleton";
import UniversityList from "@/components/UniversityList";
import { toast } from "sonner";
import Pagination from "./university-pages/Pagination";

const ListOfUkUniversities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });

  const page = Number(searchParams.get("page")) || 1;

  // Fetch only UK universities
  const {
    data: UNIVERSITIES,
    isLoading,
    isError,
    error,
  } = useUniversities(page, "UK");

  if (isError) {
    console.error(error);
    toast.error("Failed to load UK universities");
    return null;
  }

  if (isLoading || !UNIVERSITIES?.universities) {
    return <UniversityHomePageSkeleton />;
  }

  const ukUniversities = UNIVERSITIES.universities.filter(
    (university) =>
      university.country?.toLowerCase() === "united kingdom" ||
      university.country?.toLowerCase() === "uk",
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        <div className="h-8" />

        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={UNIVERSITIES.pagination?.pageCount || 1}
        />
      </section>
    </>
  );
};

export default ListOfUkUniversities;
