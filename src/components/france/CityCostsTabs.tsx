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

type CityKey = "paris" | "marseille" | "lyon" | "reims" | "dijon" | "toulouse";
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
  paris: {
    title: "Paris",
    description:
      "France’s capital of art, fashion, and research—home to iconic universities and a dynamic startup scene.",
    image: "/assets/images/paris.jpg",
    costOfLiving: [
      { label: "Rent", value: "€700 – €1,200" },
      { label: "Transportation", value: "€35 – €75" },
      { label: "Food", value: "€250 – €400" },
      { label: "Entertainment", value: "€80 – €200" },
      { label: "Miscellaneous", value: "€80 – €180" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "2–7°C · Cool, occasional rain" },
      { label: "Spring (Mar–May)", value: "7–15°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "15–25°C · Warm, sunnier" },
      { label: "Autumn (Sep–Nov)", value: "8–15°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },

  marseille: {
    title: "Marseille",
    description:
      "Mediterranean port city with sunny weather, maritime heritage, and growing innovation districts.",
    image: "/assets/images/marseille.webp",
    costOfLiving: [
      { label: "Rent", value: "€500 – €900" },
      { label: "Transportation", value: "€30 – €60" },
      { label: "Food", value: "€200 – €320" },
      { label: "Entertainment", value: "€70 – €160" },
      { label: "Miscellaneous", value: "€70 – €150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "5–12°C · Mild, occasional Mistral" },
      { label: "Spring (Mar–May)", value: "10–18°C · Bright, breezy" },
      { label: "Summer (Jun–Aug)", value: "22–30°C · Hot, dry" },
      { label: "Autumn (Sep–Nov)", value: "12–20°C · Warm, drier" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },

  lyon: {
    title: "Lyon",
    description:
      "Historic UNESCO city and biotech/engineering hub—renowned for gastronomy and strong industry links.",
    image: "/assets/images/lyon.jpg",
    costOfLiving: [
      { label: "Rent", value: "€550 – €950" },
      { label: "Transportation", value: "€30 – €60" },
      { label: "Food", value: "€200 – €320" },
      { label: "Entertainment", value: "€70 – €160" },
      { label: "Miscellaneous", value: "€70 – €150" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "1–7°C · Cold snaps possible" },
      { label: "Spring (Mar–May)", value: "7–16°C · Mild, changeable" },
      { label: "Summer (Jun–Aug)", value: "18–29°C · Warm, sunnier" },
      { label: "Autumn (Sep–Nov)", value: "8–16°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },

  reims: {
    title: "Reims",
    description:
      "Historic Champagne capital—calm student city with accessible living costs and quality institutions.",
    image: "/assets/images/Reims.jpg",
    costOfLiving: [
      { label: "Rent", value: "€450 – €800" },
      { label: "Transportation", value: "€25 – €45" },
      { label: "Food", value: "€180 – €300" },
      { label: "Entertainment", value: "€60 – €140" },
      { label: "Miscellaneous", value: "€60 – €130" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "0–6°C · Cold, crisp" },
      { label: "Spring (Mar–May)", value: "5–13°C · Fresh, showery" },
      { label: "Summer (Jun–Aug)", value: "14–24°C · Mild, brighter" },
      { label: "Autumn (Sep–Nov)", value: "6–12°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },

  dijon: {
    title: "Dijon",
    description:
      "Cultural heart of Burgundy—compact, student-friendly, and known for food science and arts.",
    image: "/assets/images/Dijon.webp",
    costOfLiving: [
      { label: "Rent", value: "€450 – €800" },
      { label: "Transportation", value: "€25 – €45" },
      { label: "Food", value: "€180 – €300" },
      { label: "Entertainment", value: "€60 – €140" },
      { label: "Miscellaneous", value: "€60 – €130" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "0–6°C · Cold, occasional frost" },
      { label: "Spring (Mar–May)", value: "6–14°C · Mild, showery" },
      { label: "Summer (Jun–Aug)", value: "16–26°C · Warm spells" },
      { label: "Autumn (Sep–Nov)", value: "7–13°C · Cool, breezy" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },

  toulouse: {
    title: "Toulouse",
    description:
      "Aerospace capital of Europe—strong engineering ecosystem with warm climate and lively student life.",
    image: "/assets/images/Toulouse.jpg",
    costOfLiving: [
      { label: "Rent", value: "€500 – €850" },
      { label: "Transportation", value: "€25 – €50" },
      { label: "Food", value: "€180 – €300" },
      { label: "Entertainment", value: "€60 – €140" },
      { label: "Miscellaneous", value: "€60 – €130" },
    ],
    weather: [
      { label: "Winter (Dec–Feb)", value: "4–11°C · Mild, occasional rain" },
      { label: "Spring (Mar–May)", value: "8–17°C · Fresh, bright" },
      { label: "Summer (Jun–Aug)", value: "20–30°C · Hot, sunny" },
      { label: "Autumn (Sep–Nov)", value: "10–18°C · Mild, breezy" },
    ],
    tuitionFees: [
      { label: "UG (public, per year)", value: "From €2,770+" },
      { label: "PG (public, per year)", value: "From €3,770+" },
      { label: "MBA (per year)", value: "Varies by school (€25,000 – €60,000)" },
    ],
  },
};

const TABS: { key: CityKey; label: string }[] = [
  { key: "paris", label: "Paris" },
  { key: "marseille", label: "Marseille" },
  { key: "lyon", label: "Lyon" },
  { key: "reims", label: "Reims" },
  { key: "dijon", label: "Dijon" },
  { key: "toulouse", label: "Toulouse" },
];

const ACCENT = "#e40000"; // French blue

/* ---------- component ---------- */

export default function CityCostsTabsFrance() {
  const [active, setActive] = useState<CityKey>("paris");
  const { ref, inView } = useInView<HTMLDivElement>();
  const content = useMemo(() => CITY_DATA[active], [active]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Living Costs, Weather & Tuition — France
        </h2>
        <p className="mt-2 text-sm md:text-base text-neutral-700">
          Average monthly spend: Paris €1,200–€1,800 · Many other cities €800–€1,000
        </p>
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
