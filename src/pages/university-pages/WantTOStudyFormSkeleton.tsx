import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WantTOStudyFormSkeleton: React.FC = () => {
  return (
    <div className="p-7 space-y-5">
      {/* ===== Name Input ===== */}
      <div className="space-y-2">
        <Skeleton
          width={120}
          height={16}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
        />
        <Skeleton
          height={42}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.5rem"
        />
      </div>

      {/* ===== Mobile Input ===== */}
      <div className="space-y-2">
        <Skeleton
          width={100}
          height={16}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
        />
        <Skeleton
          height={42}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.5rem"
        />
      </div>

      {/* ===== Dropdown ===== */}
      <div className="space-y-2">
        <Skeleton
          width={150}
          height={16}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
        />
        <Skeleton
          height={42}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.5rem"
        />
      </div>

      {/* ===== Submit Button ===== */}
      <div className="pt-2">
        <Skeleton
          height={48}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.75rem"
        />
      </div>
    </div>
  );
};

export default WantTOStudyFormSkeleton;
