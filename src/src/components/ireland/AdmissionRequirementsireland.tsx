import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* tiny hook for a subtle scroll-in animation */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const ACCENT = "#e40000";

export default function AdmissionRequirementsireland() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section
      className="py-12 md:py-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(246,247,249,0.9) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div
        ref={ref}
        className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
        style={{
          transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
        }}
      >
        {/* LEFT: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-black">
            Ireland Admissions — What You Need
          </h2>

          <p className="mt-4 text-base md:text-lg font-semibold text-black">
            Why Study in Ireland?
          </p>

          <p
            className="mt-1 text-sm md:text-base font-semibold"
            style={{ color: ACCENT }}
          >
            World-Class Universities | 1-Year Master’s | Stamp 2 Work Rights
          </p>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-neutral-800">
            Ireland offers globally respected universities, research-driven
            programs, and welcoming campuses in an English-speaking country.
            With industry links to leading tech and pharma firms, clear post-study
            stay-back options, and a safe, vibrant culture, it’s a fantastic
            destination for international students.
          </p>

          <div className="mt-7">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-[5px] px-6 py-3 text-white font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: ACCENT }}
            >
              Talk to our Expert
            </Link>
          </div>
        </div>

        {/* RIGHT: Requirements card */}
        <div className="w-full">
          <div className="rounded-2xl bg-white shadow-[0_10px_24px_rgba(16,24,40,0.08)] ring-1 ring-gray-200/70 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-black">
              Application Checklist
            </h3>

            <ul className="mt-4 space-y-3">
              {CHECK_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-gray-50 px-3.5 py-3"
                >
                  <CheckIcon />
                  <span className="text-sm md:text-base text-neutral-900">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* subtle note */}
            <p className="mt-4 text-xs md:text-sm text-neutral-600">
              * Requirements vary by university and program. For Ireland visas
              (Normal/API), typical expectations include a tuition deposit
              (often €6,000+), private medical insurance, and proof of funds as
              per INIS guidelines. Aim to apply 6–7 weeks before course start.
              We’ll guide you on exact documents, scores, and timelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const CHECK_ITEMS = [
  "Completed Online Application & Payment",
  "Valid Passport (current) + copies of previous passports",
  "Academic Transcripts (10th/12th & Bachelor’s, as applicable)",
  "Degree Certificates / Provisional Certificate / CMM",
  "Medium of Instruction (MOI) — if applicable",
  "English Proficiency (IELTS/TOEFL/PTE/DET — course-specific scores)",
  "GRE/GMAT (only if required by the program)",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (2–3)",
  "Resume/CV (projects, internships, achievements)",
  "Work Experience Letters (if any)",
  "Financial Affidavit & Bank Statements (proof of funds)",
  "Tuition Fee Deposit Receipt (e.g., €6,000+ / or 50% if fees > €12,000)",
  "Private Medical Insurance (policy/quote)",
  "Letter of Acceptance (from the university, post-admission)",
  "Signed Application Letter & Gap Explanations (if applicable)",
  "Two Recent Passport-size Photographs",
];

/* simple accent check icon */
function CheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full"
      style={{ backgroundColor: "rgba(228,0,0,0.1)", color: ACCENT }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
