import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const images = [
  "assets/success-stories/2 done h/DEVI VARA LAKSHMI ATLA (UK).png",
  "assets/success-stories/2 done h/GAJJELA POOJA (UK).png",
  "assets/success-stories/2 done h/JALA ANUSHA (UK).png",
  "assets/success-stories/2 done h/KALLEDA SHESHANK (UK).png",
  "assets/success-stories/2 done h/KUNCHALA BALAJI (UK).png",
  "assets/success-stories/2 done h/VARDHAN REDDY (UK).png",
  "assets/success-stories/2 done h/KURAM UDAY KIRAN (UK).png",
  "assets/success-stories/2 done h/MADARA SUMANTH (UK).png",
  "assets/success-stories/2 done h/MOLLA HYDER ABBAS (UK).png",
  "assets/success-stories/2 done h/SUSHMITHA KARRI (UK).png",
  // Add remaining WebP image paths
];

const IMAGES_PER_PAGE = 12;

const SuccessStories: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;

  const currentImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate a compact page range
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("left-ellipsis");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <>
      {/* Banner */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-300">Study in Top UK Universities</p>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="w-full py-10 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {currentImages.map((img, index) => (
              <div
                key={startIndex + index}
                className="w-full max-w-[300px] overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={img}
                  alt={`UK Success Story ${startIndex + index + 1}`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Image Count */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Showing {startIndex + 1} - {startIndex + currentImages.length} of{" "}
            {images.length} success stories
          </p>

          {/* Shadcn Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent className="flex-wrap">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={`${page}-${index}`}>
                    {typeof page === "number" ? (
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </>
  );
};

export default SuccessStories;
