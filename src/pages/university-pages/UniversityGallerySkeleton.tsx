import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UniversityGallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`rounded-lg overflow-hidden ${
            index === 0 ? "lg:row-span-2" : ""
          }`}
        >
          <Skeleton
            height={index === 0 ? 400 : 200}
            baseColor="#2e2e2e" // dark grey base
            highlightColor="#444" // lighter shimmer
            borderRadius="0.5rem"
          />
        </div>
      ))}
    </div>
  );
};

export default UniversityGallerySkeleton;
