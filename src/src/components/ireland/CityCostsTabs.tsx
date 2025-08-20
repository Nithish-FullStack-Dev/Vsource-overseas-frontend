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

/* ---------- data (IRELAND) ---------- */

type CityKey = "dublin" | "cork" | "galway" | "limerick" | "maynooth";
type TableRow = { label: string; value: string };

type CityContent = {
  title: string;
  description: string;
  image: string; // single manual image
  costOfLiving: TableRow[];
  weather: TableRow[];
  tuitionFees: TableRow[];
};

const CITY_DATA: Record<CityKey, CityContent> = {
  dublin: {
    title: "Dublin",
    description:
      "Capital and tech/business hub with global companies and vibrant culture. Highest living costs, excellent connectivity, and strong graduate opportunities.",
    image: "/assets/images/dublin.jpg",
    costOfLiving: [
      { label: "Rent", value: "€1,200 – €2,400" },
      { label: "Transportation (monthly)", value: "€100 – €160" },
      { label: "Food (groceries)", value: "€220 – €350" },
      { label: "Entertainment", value: "€90 – €220" },
      { label: "Miscellaneous", value: "€70 – €150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "2–8°C · Cool, frequent rain" },
      { label: "Spring (Mar–May)", value: "6–13°C · Mild" },
      { label: "Summer (Jun–Aug)", value: "15–22°C · Pleasant" },
      { label: "Autumn (Sep–Nov)", value: "7–13°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "€10,000 – €25,000" },
      { label: "PG Taught (per year)", value: "€11,000 – €25,000" },
      { label: "MBA (per year)", value: "€20,000 – €40,000" },
    ],
  },

  cork: {
    title: "Cork",
    description:
      "Historic port city with strong pharma, engineering, and food sectors. Slightly lower living costs than Dublin; friendly student atmosphere.",
    image: "/assets/images/cork.jpg",
    costOfLiving: [
      { label: "Rent", value: "€900 – €1,600" },
      { label: "Transportation (monthly)", value: "€80 – €120" },
      { label: "Food (groceries)", value: "€200 – €320" },
      { label: "Entertainment", value: "€70 – €180" },
      { label: "Miscellaneous", value: "€60 – €120" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "3–9°C · Mild, rainy" },
      { label: "Spring (Mar–May)", value: "6–14°C · Changeable" },
      { label: "Summer (Jun–Aug)", value: "15–21°C · Mild" },
      { label: "Autumn (Sep–Nov)", value: "7–13°C · Breezy, showers" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "€10,000 – €22,000" },
      { label: "PG Taught (per year)", value: "€11,000 – €24,000" },
      { label: "MBA (per year)", value: "€20,000 – €35,000" },
    ],
  },

  galway: {
    title: "Galway",
    description:
      "West-coast university city known for arts, festivals, and med-tech. Compact, walkable, and popular with international students.",
    image: "/assets/images/galway.webp",
    costOfLiving: [
      { label: "Rent", value: "€850 – €1,500" },
      { label: "Transportation (monthly)", value: "€70 – €110" },
      { label: "Food (groceries)", value: "€200 – €320" },
      { label: "Entertainment", value: "€70 – €170" },
      { label: "Miscellaneous", value: "€60 – €120" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "3–8°C · Cool, windy, wet" },
      { label: "Spring (Mar–May)", value: "5–13°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "14–20°C · Mild" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "€10,000 – €22,000" },
      { label: "PG Taught (per year)", value: "€11,000 – €24,000" },
      { label: "MBA (per year)", value: "€20,000 – €35,000" },
    ],
  },

  limerick: {
    title: "Limerick",
    description:
      "Growing tech and manufacturing base along the River Shannon. Good value accommodation and a strong sports and engineering culture.",
    image: "/assets/images/limerick.jpg",
    costOfLiving: [
      { label: "Rent", value: "€800 – €1,400" },
      { label: "Transportation (monthly)", value: "€70 – €110" },
      { label: "Food (groceries)", value: "€190 – €300" },
      { label: "Entertainment", value: "€60 – €160" },
      { label: "Miscellaneous", value: "€60 – €120" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "3–9°C · Cool, showers" },
      { label: "Spring (Mar–May)", value: "6–14°C · Mild" },
      { label: "Summer (Jun–Aug)", value: "14–21°C · Mild to warm" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "€10,000 – €22,000" },
      { label: "PG Taught (per year)", value: "€11,000 – €24,000" },
      { label: "MBA (per year)", value: "€20,000 – €35,000" },
    ],
  },

  maynooth: {
    title: "Maynooth",
    description:
      "Thriving university town just west of Dublin with strong humanities, science, and IT programmes. Student-centric with lower costs than the capital.",
    image: "/assets/images/maynooth.jpg",
    costOfLiving: [
      { label: "Rent", value: "€750 – €1,300" },
      { label: "Transportation (monthly)", value: "€80 – €120" },
      { label: "Food (groceries)", value: "€180 – €300" },
      { label: "Entertainment", value: "€60 – €150" },
      { label: "Miscellaneous", value: "€60 – €110" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "2–8°C · Cool, overcast" },
      { label: "Spring (Mar–May)", value: "5–13°C · Mild" },
      { label: "Summer (Jun–Aug)", value: "14–21°C · Pleasant" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "€10,000 – €20,000" },
      { label: "PG Taught (per year)", value: "€11,000 – €22,000" },
      { label: "MBA (per year)", value: "€20,000 – €32,000" },
    ],
  },
};

const TABS: { key: CityKey; label: string }[] = [
  { key: "dublin", label: "Dublin" },
  { key: "cork", label: "Cork" },
  { key: "galway", label: "Galway" },
  { key: "limerick", label: "Limerick" },
  { key: "maynooth", label: "Maynooth" },
];

const ACCENT = "#e40000";

/* ---------- component ---------- */

export default function CityCostsTabs() {
  const [active, setActive] = useState<CityKey>("dublin");
  const { ref, inView } = useInView<HTMLDivElement>();
  const content = useMemo(() => CITY_DATA[active], [active]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Ireland: Living Costs & Tuition Fees
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
            <CardTable
              rows={content.weather}
              headers={["Season", "Typical Climate"]}
            />
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
                style={{ backgroundColor: "#E5EBF0" }}
              >
                {h1}
              </th>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }}
              >
                {h2}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="bg-white">
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
