import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FaqAccordionSkeleton: React.FC = () => {
  return (
    <div className="p-6 w-full font-sans">
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 animate-pulse"
          >
            {/* Question Line */}
            <div className="flex justify-between items-center py-3">
              <Skeleton
                width="80%"
                height={20}
                baseColor="#2e2e2e"
                highlightColor="#444"
                borderRadius="0.25rem"
              />
              <Skeleton
                circle
                width={20}
                height={20}
                baseColor="#2e2e2e"
                highlightColor="#444"
              />
            </div>

            {/* Answer lines (collapsed simulation) */}
            <div className="pl-2">
              <Skeleton
                width="90%"
                height={12}
                baseColor="#2e2e2e"
                highlightColor="#444"
                borderRadius="0.25rem"
              />
              <Skeleton
                width="75%"
                height={12}
                baseColor="#2e2e2e"
                highlightColor="#444"
                borderRadius="0.25rem"
                className="mt-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordionSkeleton;
