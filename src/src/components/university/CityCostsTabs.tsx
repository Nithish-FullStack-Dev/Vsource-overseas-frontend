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

/* ---------- data ---------- */

type CityKey = "london" | "edinburgh" | "manchester" | "glasgow" | "bristol";
type TableRow = { label: string; value: string };

type CityContent = {
  title: string;
  description: string;
  image: string;
  costOfLiving: TableRow[];
  weather: TableRow[];
  tuitionFees: TableRow[];
};

const CITY_DATA: Record<CityKey, CityContent> = {
  london: {
    title: "London",
    description:
      "A captivating city of iconic landmarks, rich history, and vibrant culture, inviting students to immerse themselves in its enchanting tapestry. Discover a treasure trove of experiences, from royal palaces to bustling markets, that will leave you spellbound.",
    image: "/assets/images/london.jpg",
    costOfLiving: [
      { label: "Rent", value: "£750 – £1,400" },
      { label: "Transportation", value: "£90 – £120" },
      { label: "Food", value: "£200 – £350" },
      { label: "Entertainment", value: "£80 – £200" },
      { label: "Miscellaneous", value: "£80 – £180" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "0–8°C · Occasional rain" },
      { label: "Spring (Mar–May)", value: "7–15°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "15–24°C · Warm, sunnier" },
      { label: "Autumn (Sep–Nov)", value: "8–15°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "£12,000 – £22,000" },
      { label: "PG Taught (per year)", value: "£13,000 – £28,000" },
      { label: "MBA (per year)", value: "£25,000 – £45,000" },
    ],
  },

  edinburgh: {
    title: "Edinburgh",
    description:
      "A dramatic capital where medieval closes meet Georgian elegance. World-class festivals, iconic castles, and rugged hills create a study experience that’s both inspiring and intimate.",
    image: "/assets/images/edin.webp",
    costOfLiving: [
      { label: "Rent", value: "£650 – £1,200" },
      { label: "Transportation", value: "£60 – £80" },
      { label: "Food", value: "£180 – £300" },
      { label: "Entertainment", value: "£70 – £180" },
      { label: "Miscellaneous", value: "£70 – £150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "-1–6°C · Cold, brisk, showery" },
      { label: "Spring (Mar–May)", value: "5–12°C · Fresh, changeable" },
      { label: "Summer (Jun–Aug)", value: "12–20°C · Mild, brighter" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "£11,000 – £21,000" },
      { label: "PG Taught (per year)", value: "£12,000 – £26,000" },
      { label: "MBA (per year)", value: "£23,000 – £40,000" },
    ],
  },

  manchester: {
    title: "Manchester",
    description:
      "A dynamic northern hub for music, sport, and media with a buzzing student scene. Affordable living, excellent connectivity, and fast-growing tech and creative sectors.",
    image: "/assets/images/man.webp",
    costOfLiving: [
      { label: "Rent", value: "£600 – £1,100" },
      { label: "Transportation", value: "£60 – £85" },
      { label: "Food", value: "£180 – £300" },
      { label: "Entertainment", value: "£70 – £180" },
      { label: "Miscellaneous", value: "£70 – £150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "1–7°C · Cool, frequent showers" },
      { label: "Spring (Mar–May)", value: "6–13°C · Mild, changeable" },
      { label: "Summer (Jun–Aug)", value: "14–22°C · Warm spells" },
      { label: "Autumn (Sep–Nov)", value: "7–13°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "£10,000 – £20,000" },
      { label: "PG Taught (per year)", value: "£12,000 – £24,000" },
      { label: "MBA (per year)", value: "£22,000 – £40,000" },
    ],
  },

  glasgow: {
    title: "Glasgow",
    description:
      "Scotland’s friendly cultural powerhouse—legendary music venues, striking architecture, and renowned universities, all with a down-to-earth vibe and great value.",
    image: "/assets/images/glasgow.jpg",
    costOfLiving: [
      { label: "Rent", value: "£550 – £1,000" },
      { label: "Transportation", value: "£55 – £75" },
      { label: "Food", value: "£170 – £290" },
      { label: "Entertainment", value: "£60 – £160" },
      { label: "Miscellaneous", value: "£60 – £140" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "0–6°C · Cool, frequent rain" },
      { label: "Spring (Mar–May)", value: "5–12°C · Fresh, showery" },
      { label: "Summer (Jun–Aug)", value: "12–20°C · Mild, brighter" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "£10,000 – £20,000" },
      { label: "PG Taught (per year)", value: "£12,000 – £24,000" },
      { label: "MBA (per year)", value: "£22,000 – £38,000" },
    ],
  },

  bristol: {
    title: "Bristol",
    description:
      "A creative, green port city with a thriving aerospace scene, independent culture, and lively harbourside—ideal for hands-on learners and innovators.",
    image: "/assets/images/bristol.jpg",
    costOfLiving: [
      { label: "Rent", value: "£650 – £1,200" },
      { label: "Transportation", value: "£60 – £85" },
      { label: "Food", value: "£180 – £310" },
      { label: "Entertainment", value: "£70 – £180" },
      { label: "Miscellaneous", value: "£70 – £150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "2–8°C · Cool, occasional rain" },
      { label: "Spring (Mar–May)", value: "7–14°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "15–23°C · Warm, sunnier" },
      { label: "Autumn (Sep–Nov)", value: "8–14°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (per year)", value: "£11,000 – £21,000" },
      { label: "PG Taught (per year)", value: "£12,000 – £26,000" },
      { label: "MBA (per year)", value: "£23,000 – £40,000" },
    ],
  },
};


const TABS: { key: CityKey; label: string }[] = [
  { key: "london", label: "London" },
  { key: "edinburgh", label: "Edinburgh" },
  { key: "manchester", label: "Manchester" },
  { key: "glasgow", label: "Glasgow" },
  { key: "bristol", label: "Bristol" },
];

const ACCENT = "#e40000";

/* ---------- component ---------- */

export default function CityCostsTabs() {
  const [active, setActive] = useState<CityKey>("london");
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
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Cost of Living */}
        <SectionBlock title="Cost of Living">
          {content.costOfLiving.length ? (
            <CardTable rows={content.costOfLiving} />
          ) : (
            <Placeholder />
          )}
        </SectionBlock>

        {/* Weather */}
        <SectionBlock title="Weather">
          {content.weather.length ? (
            <CardTable rows={content.weather} />
          ) : (
            <Placeholder />
          )}
        </SectionBlock>

        {/* Tuition Fees */}
        <SectionBlock title="Tuition Fees">
          {content.tuitionFees.length ? (
            <CardTable rows={content.tuitionFees} />
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
 * - columns are 50/50 so the vertical divider sits dead-center under the heading
 * - all cell edges have borders (no missing bottom/outer lines)
 */
function CardTable({ rows }: { rows: TableRow[] }) {
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
                Expense
              </th>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }} // grey
              >
                Amount
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
