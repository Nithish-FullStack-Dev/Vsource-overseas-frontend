import React, { useEffect, useRef, useState } from "react";

type Highlight = {
  label: string;
  value: string;
};

const firstRow: Highlight[] = [
  { label: "Capital", value: "Dublin" },
  { label: "Population", value: "49 lakhs+" }, // ≈ 4.9 million+
  { label: "Currency", value: "Euro (€)" },
  { label: "Quality of Life", value: "Very High" },
];

const secondRow: Highlight[] = [
  { label: "Major Cities", value: "Dublin, Cork, Galway, Maynooth, Limerick" },
  { label: "No. of International Students", value: "12% of students (160+ nationalities)" },
  { label: "Top Sectors", value: "Technology, Pharmaceuticals, Finance, Agriculture, Tourism" },
];

/* ---- Brand colors ---- */
const BRAND = {
  sectionBg: "#FFFCFB",   // base
  cardBg: "#E5EBF0",      // neutral surface
  accent: "#E3000F",      // for small accents
  text: "#111111",        // readable on light bg
};

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25, root: null, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function useCountUp({
  target,
  enabled,
  duration = 1500,
}: {
  target: number;
  enabled: boolean;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let startTime: number | null = null;

    const animate = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, duration]);

  return value;
}

function extractNumberParts(input: string) {
  // Require a digit; allow commas for grouping and an optional decimal part.
  const match = input.match(/\d[\d,]*(?:\.\d+)?/);

  if (!match)
    return {
      hasNumber: false as const,
      before: "",
      after: input,
      target: 0,
      decimals: 0,
    };

  const raw = match[0];
  const before = input.slice(0, match.index!);
  const after = input.slice(match.index! + raw.length);
  const cleaned = raw.replace(/,/g, "");
  const parsed = Number(cleaned);
  const decimals = cleaned.includes(".")
    ? (cleaned.split(".")[1]?.length || 0)
    : 0;

  return {
    hasNumber: true as const,
    before,
    after,
    target: isNaN(parsed) ? 0 : parsed,
    decimals,
  };
}

export default function OverviewHighlights() {
  return (
    <section
      className="container mx-auto px-4 md:px-6 py-10 md:py-14 rounded-2xl"
      style={{ backgroundColor: BRAND.sectionBg }}
    >
      {/* Heading + Subheading */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black">IRELAND OVERVIEW</h2>
        <p className="mt-2 text-base md:text-lg font-semibold" style={{ color: BRAND.accent }}>
          HIGHLIGHTS
        </p>
      </div>

      {/* First row: 4 boxes on desktop */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {firstRow.map((item, idx) => (
          <HighlightCard key={item.label} label={item.label} value={item.value} index={idx} />
        ))}
      </div>

      {/* Second row: 3 boxes on desktop */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {secondRow.map((item, idx) => (
          <HighlightCard
            key={item.label}
            label={item.label}
            value={item.value}
            index={firstRow.length + idx}
          />
        ))}
      </div>
    </section>
  );
}

function HighlightCard({ label, value, index = 0 }: Highlight & { index?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const parts = extractNumberParts(value);
  const countValue = useCountUp({
    target: parts.target,
    enabled: inView && parts.hasNumber,
    duration: 1500,
  });

  const formattedNumber = parts.hasNumber
    ? parts.decimals > 0
      ? Number(countValue.toFixed(parts.decimals)).toLocaleString("en-IN", {
          minimumFractionDigits: parts.decimals,
          maximumFractionDigits: parts.decimals,
        })
      : Math.round(countValue).toLocaleString("en-IN")
    : null;

  // stagger
  const delayMs = 80 * index;

  const cardStyle: React.CSSProperties = {
    backgroundColor: BRAND.cardBg,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0, 24px, 0)",
    opacity: inView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: inView ? `${delayMs}ms` : "0ms",
    border: "1px solid rgba(0,0,0,0.05)",
  };

  const valueStyle: React.CSSProperties = {
    transform: inView ? "translateX(0)" : "translateX(-16px)",
    opacity: inView ? 1 : 0,
    transition: `transform 520ms cubic-bezier(0.22,1,0.36,1) ${inView ? delayMs + 120 : 0}ms, opacity 520ms ${inView ? delayMs + 120 : 0}ms`,
    willChange: "transform, opacity",
  };

  return (
    <div
      ref={ref}
      style={cardStyle}
      className="rounded-xl px-5 py-4 md:py-5 shadow-sm will-change-transform"
    >
      {/* Accent label line */}
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          style={{ backgroundColor: BRAND.accent }}
          className="inline-block h-4 w-1.5 rounded"
        />
        <div className="text-lg md:text-base font-bold" style={{ color: BRAND.text }}>
          {label}
        </div>
      </div>

      <div className="mt-1 text-base md:text-lg leading-snug" style={{ ...valueStyle, color: BRAND.text }}>
        {parts.hasNumber ? (
          <>
            {parts.before}
            {formattedNumber}
            {parts.after}
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
