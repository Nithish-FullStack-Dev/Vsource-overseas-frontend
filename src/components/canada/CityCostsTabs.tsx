import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- small hook to animate on scroll ---------- */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { root: null, threshold: 0.2, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ---------- utility: single manual image ---------- */
function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}

/* ---------- data (CANADA) ---------- */

type CityKey = "toronto" | "vancouver" | "montreal" | "calgary" | "ottawa";
type TableRow = { label: string; value: string };

type CityContent = {
  title: string;
  description: string;
  image: string; // single manual image like "Toronto.jpg"
  costOfLiving: TableRow[];
  weather: TableRow[];
  tuitionFees: TableRow[];
};

/**
 * NOTE on images:
 * - Using single manual file per city (e.g., "Toronto.jpg").
 * - Ensure these files exist in your public/assets path as referenced below.
 */
const CITY_DATA: Record<CityKey, CityContent> = {
  toronto: {
    title: "Toronto",
    description:
      "Canada’s largest city and financial–tech hub. Multicultural, transit-connected, and packed with co-op and internship opportunities across finance, tech, media, and health.",
    image: "/assets/images/Toronto.jpg",
    costOfLiving: [
      { label: "Rent", value: "CAD $1,300 – $2,400" },
      { label: "Transportation", value: "CAD $110 – $160" },
      { label: "Food", value: "CAD $250 – $450" },
      { label: "Entertainment", value: "CAD $100 – $250" },
      { label: "Miscellaneous", value: "CAD $80 – $180" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "−10–3°C · Cold, occasional snow" },
      { label: "Spring (Mar–May)", value: "2–15°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "18–28°C · Warm, humid" },
      { label: "Autumn (Sep–Nov)", value: "5–15°C · Cool, crisp" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "CAD $15,000 – $35,000" },
      { label: "PG Taught (per year)", value: "CAD $16,000 – $40,000" },
      { label: "MBA (per year)", value: "CAD $35,000 – $65,000" },
    ],
  },

  vancouver: {
    title: "Vancouver",
    description:
      "Ocean, mountains, and innovation. Strong ecosystems in clean tech, gaming/VFX, AI, and sustainability with mild weather and an outdoor lifestyle.",
    image: "/assets/images/Vancouver.jpg",
    costOfLiving: [
      { label: "Rent", value: "CAD $1,300 – $2,500" },
      { label: "Transportation", value: "CAD $110 – $150" },
      { label: "Food", value: "CAD $250 – $430" },
      { label: "Entertainment", value: "CAD $100 – $230" },
      { label: "Miscellaneous", value: "CAD $80 – $170" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "0–8°C · Mild, rainy" },
      { label: "Spring (Mar–May)", value: "6–16°C · Pleasant" },
      { label: "Summer (Jun–Aug)", value: "15–25°C · Warm, dry" },
      { label: "Autumn (Sep–Nov)", value: "7–12°C · Cool, wet" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "CAD $18,000 – $38,000" },
      { label: "PG Taught (per year)", value: "CAD $18,000 – $42,000" },
      { label: "MBA (per year)", value: "CAD $40,000 – $70,000" },
    ],
  },

  montreal: {
    title: "Montréal",
    description:
      "Bilingual, student-friendly city with leading AI and arts scenes. Affordable living, rich culture, and top universities with global research impact.",
    image: "/assets/images/Montréal.jpg",
    costOfLiving: [
      { label: "Rent", value: "CAD $900 – $1,800" },
      { label: "Transportation", value: "CAD $95 – $120" },
      { label: "Food", value: "CAD $220 – $380" },
      { label: "Entertainment", value: "CAD $80 – $200" },
      { label: "Miscellaneous", value: "CAD $70 – $150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "−15–−5°C · Very cold, snowy" },
      { label: "Spring (Mar–May)", value: "0–15°C · Cool to mild" },
      { label: "Summer (Jun–Aug)", value: "18–27°C · Warm" },
      { label: "Autumn (Sep–Nov)", value: "3–12°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "CAD $14,000 – $30,000" },
      { label: "PG Taught (per year)", value: "CAD $16,000 – $35,000" },
      { label: "MBA (per year)", value: "CAD $32,000 – $55,000" },
    ],
  },

  calgary: {
    title: "Calgary",
    description:
      "Gateway to the Rockies and a hub for energy, engineering, and emerging tech. Clean, safe, and great value with growing startup activity.",
    image: "/assets/images/Calgary.jpg",
    costOfLiving: [
      { label: "Rent", value: "CAD $900 – $1,700" },
      { label: "Transportation", value: "CAD $100 – $125" },
      { label: "Food", value: "CAD $200 – $350" },
      { label: "Entertainment", value: "CAD $70 – $170" },
      { label: "Miscellaneous", value: "CAD $60 – $140" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "−20–−5°C · Very cold, chinooks" },
      { label: "Spring (Mar–May)", value: "−2–15°C · Variable" },
      { label: "Summer (Jun–Aug)", value: "10–24°C · Mild to warm" },
      { label: "Autumn (Sep–Nov)", value: "−1–12°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "CAD $15,000 – $30,000" },
      { label: "PG Taught (per year)", value: "CAD $16,000 – $34,000" },
      { label: "MBA (per year)", value: "CAD $30,000 – $55,000" },
    ],
  },

  ottawa: {
    title: "Ottawa",
    description:
      "Canada’s capital—policy, public service, and a growing tech corridor (Kanata). High quality of life, green spaces, and bilingual advantages.",
    image: "/assets/images/Ottawa.jpg",
    costOfLiving: [
      { label: "Rent", value: "CAD $1,000 – $1,900" },
      { label: "Transportation", value: "CAD $110 – $135" },
      { label: "Food", value: "CAD $220 – $380" },
      { label: "Entertainment", value: "CAD $80 – $190" },
      { label: "Miscellaneous", value: "CAD $70 – $150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "−15–−5°C · Cold, snowy" },
      { label: "Spring (Mar–May)", value: "0–15°C · Cool to mild" },
      { label: "Summer (Jun–Aug)", value: "18–27°C · Warm" },
      { label: "Autumn (Sep–Nov)", value: "4–14°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "CAD $15,000 – $32,000" },
      { label: "PG Taught (per year)", value: "CAD $16,000 – $36,000" },
      { label: "MBA (per year)", value: "CAD $32,000 – $58,000" },
    ],
  },
};

const TABS: { key: CityKey; label: string }[] = [
  { key: "toronto", label: "Toronto" },
  { key: "vancouver", label: "Vancouver" },
  { key: "montreal", label: "Montréal" },
  { key: "calgary", label: "Calgary" },
  { key: "ottawa", label: "Ottawa" },
];

const ACCENT = "#e40000";

/* ---------- component ---------- */

export default function CityCostsTabs() {
  const [active, setActive] = useState<CityKey>("toronto");
  const { ref, inView } = useInView<HTMLDivElement>();
  const content = useMemo(() => CITY_DATA[active], [active]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Canada: Living Costs & Tuition Fees
        </h2>
      </div>

      {/* Tabs (centered) */}
      <div className="mt-6">
        <div className="w-fit mx-auto border-b">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-center">
            {TABS.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className="relative pb-2 text-sm md:text-base font-semibold transition-colors"
                  style={{ color: isActive ? ACCENT : "#444" }}
                >
                  {t.label}
                  <span
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full"
                    style={{
                      backgroundColor: isActive ? ACCENT : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="mt-8 max-w-3xl mx-auto"
        style={{
          transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
        }}
      >
        {/* City title */}
        <h3 className="text-xl md:text-2xl font-bold text-black text-center">
          {content.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm md:text-base text-neutral-700 text-center">
          {content.description}
        </p>

        {/* Image */}
        {content.image && (
          <div className="mt-6 rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200/70">
            <SmartImage
              src={content.image}
              alt={content.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Cost of Living */}
        <SectionBlock title="Cost of Living">
          {content.costOfLiving.length ? (
            <CardTable
              rows={content.costOfLiving}
              headers={["Expense", "Amount (per month)"]}
            />
          ) : (
            <Placeholder />
          )}
        </SectionBlock>

        {/* Weather */}
        <SectionBlock title="Weather">
          {content.weather.length ? (
            <CardTable rows={content.weather} headers={["Season", "Typical Climate"]} />
          ) : (
            <Placeholder />
          )}
        </SectionBlock>

        {/* Tuition Fees */}
        <SectionBlock title="Tuition Fees">
          {content.tuitionFees.length ? (
            <CardTable
              rows={content.tuitionFees}
              headers={["Program", "Tuition (per year)"]}
            />
          ) : (
            <Placeholder />
          )}
        </SectionBlock>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h4 className="text-lg md:text-xl font-bold text-black text-center">
        {title}
      </h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * CardTable: consistent, centered, “3D” look with light grey borders.
 * - Optional headers for better semantics per section
 * - columns are 50/50 so the vertical divider sits dead-center under the heading
 * - all cell edges have borders (no missing bottom/outer lines)
 */
function CardTable({
  rows,
  headers = ["Label", "Value"],
}: {
  rows: TableRow[];
  headers?: [string, string] | string[];
}) {
  const [h1, h2] = headers as [string, string];
  return (
    <div className="overflow-x-auto">
      <div className="rounded-xl shadow-[0_10px_24px_rgba(16,24,40,0.08)] ring-1 ring-gray-200/80">
        <table className="w-full table-fixed border-collapse">
          {/* Center the vertical divider: 50% / 50% */}
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>

          <thead>
            <tr>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }} // grey
              >
                {h1}
              </th>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }} // grey
              >
                {h2}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="bg-white">
                {/* All cell edges get a border to avoid gaps, including last row */}
                <td className="px-5 py-3 align-top border border-gray-200">
                  {r.label}
                </td>
                <td className="px-5 py-3 align-top border border-gray-200">
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="text-center text-neutral-500 text-sm md:text-base rounded-xl py-6 shadow-[0_6px_16px_rgba(16,24,40,0.06)] ring-1 ring-gray-200/80">
      Add content for this city…
    </div>
  );
}
