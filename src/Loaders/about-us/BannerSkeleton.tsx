import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BannerSkeleton() {
  return (
    <section className="pt-40 pb-36 relative bg-gray-800">
      {/* Dark overlay simulation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/60 to-gray-900/90" />

      {/* Content */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Title Skeleton */}
          <Skeleton
            width={300}
            height={60}
            baseColor="#374151"
            highlightColor="#6B7280"
            borderRadius={8}
          />

          {/* Description Skeleton */}
          <div className="space-y-3">
            <Skeleton
              width="100%"
              height={24}
              baseColor="#374151"
              highlightColor="#6B7280"
              borderRadius={6}
            />
            <Skeleton
              width="90%"
              height={24}
              baseColor="#374151"
              highlightColor="#6B7280"
              borderRadius={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
