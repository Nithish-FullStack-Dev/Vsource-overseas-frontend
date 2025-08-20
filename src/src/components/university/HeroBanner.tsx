// src/components/university/HeroBanner.tsx
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage?: string; // e.g. /assets/images/uk.jpeg
  // Optional fine-tuning for where the subject sits in the photo
  mobileObjectPosition?: string;   // e.g. "center 30%"
  desktopObjectPosition?: string;  // e.g. "center"
};

export default function HeroBanner({
  title = "Study in UK",
  ctaText = "Start your UK Journey →",
  ctaHref = "/contact",
  bgImage = "/assets/images/uk.jpeg",
  mobileObjectPosition = "center 25%",
  desktopObjectPosition = "center",
}: Props) {
  return (
    <section
      className="
        relative w-full
        min-h-[320px] sm:min-h-[380px]
        h-[55vh] md:h-[75vh]
        overflow-x-clip overflow-y-hidden
      "
      aria-label={title}
    >
      {/* Responsive image instead of CSS background */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 w-full h-full
          object-cover
          [object-position:var(--mob-pos)]
          md:[object-position:var(--desk-pos)]
          select-none pointer-events-none
        "
        style={
          {
            // Tailwind can't read dynamic object-position values, so we pass CSS vars
            // Mobile position first, overridden on md+ via the utility above
            ["--mob-pos" as any]: mobileObjectPosition,
            ["--desk-pos" as any]: desktopObjectPosition,
          } as React.CSSProperties
        }
      />

      {/* Dark overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Content */}
<div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center">
  <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-tight">
    {title}
  </h1>

  <div className="mt-6">
    <Link
      to={ctaHref}
      className="inline-block rounded-md bg-[#F59E0B] px-6 py-3 text-white font-medium text-base md:text-lg shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition"
    >
      {ctaText}
    </Link>
  </div>
</div>


    </section>
  );
}
