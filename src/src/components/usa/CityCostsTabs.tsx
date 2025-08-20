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

/* ---------- data (USA) ---------- */

type CityKey = "newyork" | "losangeles" | "chicago" | "houston" | "phoenix";
type TableRow = { label: string; value: string };

type CityContent = {
  title: string;
  description: string;
  image: string; // single manual image like /assets/images/NewYork.jpg
  costOfLiving: TableRow[];
  weather: TableRow[];
  tuitionFees: TableRow[];
};

/**
 * NOTE on images:
 * - Using single manual file per city (e.g., "/assets/images/NewYork.jpg").
 * - Ensure these files exist in your public/assets path.
 */
const CITY_DATA: Record<CityKey, CityContent> = {
  newyork: {
    title: "New York",
    description:
      "The ultimate global city—Wall Street, Broadway, world-class universities, and a fast-paced lifestyle. Endless networking and internship opportunities in finance, media, tech, and healthcare.",
    image: "/assets/images/New York.jpg",
    costOfLiving: [
      { label: "Rent", value: "$1,800 – $3,500" },
      { label: "Transportation", value: "$100 – $140" },
      { label: "Food", value: "$250 – $450" },
      { label: "Entertainment", value: "$100 – $250" },
      { label: "Miscellaneous", value: "$80 – $180" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "-5–5°C · Cold, occasional snow" },
      { label: "Spring (Mar–May)", value: "5–18°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "20–30°C · Warm, humid" },
      { label: "Autumn (Sep–Nov)", value: "8–18°C · Cool, crisp" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "$15,000 – $30,000" },
      { label: "PG Taught (per year)", value: "$18,000 – $35,000" },
      { label: "MBA (per year)", value: "$30,000 – $65,000" },
    ],
  },

  losangeles: {
    title: "Los Angeles",
    description:
      "Sun, beaches, and startups. A creative capital spanning entertainment, gaming, aerospace, and clean tech—with a laid-back lifestyle and year-round internships.",
    image: "/assets/images/Los Angeles.webp",
    costOfLiving: [
      { label: "Rent", value: "$1,300 – $2,800" },
      { label: "Transportation", value: "$70 – $100" },
      { label: "Food", value: "$220 – $400" },
      { label: "Entertainment", value: "$90 – $220" },
      { label: "Miscellaneous", value: "$70 – $160" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "8–20°C · Mild" },
      { label: "Spring (Mar–May)", value: "12–23°C · Pleasant" },
      { label: "Summer (Jun–Aug)", value: "18–29°C · Warm, dry" },
      { label: "Autumn (Sep–Nov)", value: "13–24°C · Mild" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "$15,000 – $30,000" },
      { label: "PG Taught (per year)", value: "$18,000 – $35,000" },
      { label: "MBA (per year)", value: "$30,000 – $65,000" },
    ],
  },

  chicago: {
    title: "Chicago",
    description:
      "America’s heartland for finance, consulting, and research. Beautiful lakefront campuses, strong transportation, and a vibrant arts and food scene.",
    image: "/assets/images/Chicago.jpg",
    costOfLiving: [
      { label: "Rent", value: "$1,100 – $2,200" },
      { label: "Transportation", value: "$60 – $85" },
      { label: "Food", value: "$200 – $350" },
      { label: "Entertainment", value: "$80 – $200" },
      { label: "Miscellaneous", value: "$70 – $150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "-10–2°C · Very cold, snowy" },
      { label: "Spring (Mar–May)", value: "3–18°C · Changeable" },
      { label: "Summer (Jun–Aug)", value: "18–29°C · Warm" },
      { label: "Autumn (Sep–Nov)", value: "6–18°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "$15,000 – $30,000" },
      { label: "PG Taught (per year)", value: "$18,000 – $35,000" },
      { label: "MBA (per year)", value: "$30,000 – $60,000" },
    ],
  },

  houston: {
    title: "Houston",
    description:
      "Energy, aerospace, and healthcare powerhouse with affordable living. Home to the Texas Medical Center and a booming tech ecosystem.",
    image: "/assets/images/Houston.webp",
    costOfLiving: [
      { label: "Rent", value: "$900 – $1,800" },
      { label: "Transportation", value: "$60 – $90" },
      { label: "Food", value: "$180 – $320" },
      { label: "Entertainment", value: "$70 – $170" },
      { label: "Miscellaneous", value: "$60 – $140" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "7–18°C · Mild" },
      { label: "Spring (Mar–May)", value: "15–28°C · Warm, humid" },
      { label: "Summer (Jun–Aug)", value: "25–36°C · Hot, humid" },
      { label: "Autumn (Sep–Nov)", value: "15–27°C · Warm" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "$15,000 – $28,000" },
      { label: "PG Taught (per year)", value: "$17,000 – $32,000" },
      { label: "MBA (per year)", value: "$28,000 – $55,000" },
    ],
  },

  phoenix: {
    title: "Phoenix",
    description:
      "A fast-growing tech and manufacturing hub with sunshine most of the year. Great value for money and strong campus innovation culture.",
    image: "/assets/images/Phoenix.jpg",
    costOfLiving: [
      { label: "Rent", value: "$1,000 – $1,900" },
      { label: "Transportation", value: "$60 – $90" },
      { label: "Food", value: "$180 – $320" },
      { label: "Entertainment", value: "$70 – $170" },
      { label: "Miscellaneous", value: "$60 – $140" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "5–20°C · Mild, sunny" },
      { label: "Spring (Mar–May)", value: "12–30°C · Warm" },
      { label: "Summer (Jun–Aug)", value: "27–41°C · Very hot, dry" },
      { label: "Autumn (Sep–Nov)", value: "16–30°C · Warm" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "$14,000 – $26,000" },
      { label: "PG Taught (per year)", value: "$16,000 – $30,000" },
      { label: "MBA (per year)", value: "$26,000 – $50,000" },
    ],
  },
};

const TABS: { key: CityKey; label: string }[] = [
  { key: "newyork", label: "New York" },
  { key: "losangeles", label: "Los Angeles" },
  { key: "chicago", label: "Chicago" },
  { key: "houston", label: "Houston" },
  { key: "phoenix", label: "Phoenix" },
];

const ACCENT = "#e40000";

/* ---------- component ---------- */

export default function CityCostsTabs() {
  const [active, setActive] = useState<CityKey>("newyork");
  const { ref, inView } = useInView<HTMLDivElement>();
  const content = useMemo(() => CITY_DATA[active], [active]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Living Cost & Tuition Fee
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
