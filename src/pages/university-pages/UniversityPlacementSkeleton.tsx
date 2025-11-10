import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UniversityPlacementSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* ===== Description Section ===== */}
      <div className="space-y-2">
        <Skeleton
          count={3}
          height={14}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
        />
      </div>

      {/* ===== Top Recruiters Section ===== */}
      <div>
        <Skeleton
          width={160}
          height={24}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
          className="mb-3"
        />

        <div className="relative w-full overflow-hidden py-3">
          {/* Recruiter logos shimmer grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-xl p-6 h-40 flex items-center justify-center"
              >
                <Skeleton
                  width={100}
                  height={40}
                  baseColor="#2e2e2e"
                  highlightColor="#444"
                  borderRadius="0.5rem"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-4">
            <Skeleton
              circle
              width={32}
              height={32}
              baseColor="#2e2e2e"
              highlightColor="#444"
            />
            <Skeleton
              circle
              width={32}
              height={32}
              baseColor="#2e2e2e"
              highlightColor="#444"
            />
          </div>
        </div>
      </div>

      {/* ===== Jobs Table Section ===== */}
      <div className="overflow-x-auto rounded-lg">
        <Skeleton
          width={180}
          height={24}
          baseColor="#2e2e2e"
          highlightColor="#444"
          borderRadius="0.25rem"
          className="mb-3"
        />

        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left">
                <Skeleton
                  width={140}
                  height={18}
                  baseColor="#2e2e2e"
                  highlightColor="#444"
                />
              </th>
              <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left">
                <Skeleton
                  width={160}
                  height={18}
                  baseColor="#2e2e2e"
                  highlightColor="#444"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-3">
                  <Skeleton
                    width="80%"
                    height={14}
                    baseColor="#2e2e2e"
                    highlightColor="#444"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  <Skeleton
                    width="60%"
                    height={14}
                    baseColor="#2e2e2e"
                    highlightColor="#444"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityPlacementSkeleton;
