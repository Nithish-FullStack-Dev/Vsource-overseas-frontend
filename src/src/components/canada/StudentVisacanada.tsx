import React, { useEffect, useRef, useState } from "react";

/* tiny hook for scroll-in animation */
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

export default function StudentVisacanada() {
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
        {/* LEFT: Text content */}
        <div>
          <h2
            className="text-2xl md:text-3xl font-extrabold leading-tight"
            style={{ color: ACCENT }}
          >
            Study Permit (Canada)
            <br className="hidden sm:block" />
            <span className="block text-black">Requirements for Indian Students</span>
          </h2>

          <p className="mt-5 text-base md:text-lg font-semibold text-black">
            Most students apply for a <span className="font-bold">Study Permit</span> (SDS/Non-SDS).
            <span className="hidden md:inline"> </span>
            <span className="block md:inline text-neutral-800 font-normal">
              Work up to <b>24 hours/week</b> off-campus during classes (if eligible) and full-time in scheduled breaks.{" "}
              {/* IRCC change Nov 8, 2024 */}
            </span>
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Valid passport",
              "Letter of Acceptance (LOA) from a Designated Learning Institution (DLI)",
              "Provincial/Territorial Attestation Letter (PAL/TAL), if required",
              "Proof of funds: first-year tuition paid receipt + living costs meeting IRCC threshold",
              "SDS applicants: Guaranteed Investment Certificate (GIC)—amount aligned to IRCC living cost (e.g., CAD $20,635; rising to CAD $22,895 for apps on/after Sep 1, 2025)",
              "Biometrics appointment confirmation & fee receipt",
              "Upfront medical exam (IME), if instructed by IRCC",
              "Digital photo meeting IRCC specs",
              "Academic transcripts/marksheets & degree certificates",
              "English proficiency (IELTS/TOEFL/PTE/DET) as required by the institution",
              "Study plan / Statement of Purpose (SOP)",
              "Quebec only: CAQ attestation before applying for the study permit",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-gray-200/80 bg-white px-4 py-3 shadow-[0_3px_10px_rgba(16,24,40,0.05)]"
              >
                <Dot />
                <span className="text-sm md:text-base text-neutral-900">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs md:text-sm text-neutral-600">
            * Requirements vary by province, institution, and program. Financial thresholds are
            updated periodically by IRCC. We’ll guide you on exact documents and timelines.
          </p>
        </div>

        {/* RIGHT: Intakes — small boxes */}
        <div className="w-full">
          <div className="rounded-[5px] bg-white p-6 md:p-7 shadow-[0_12px_28px_rgba(16,24,40,0.10)] ring-1 ring-gray-200/70">
            <h3 className="text-lg md:text-xl font-bold text-black">Canada Intakes</h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 place-items-center">
              <IntakeSmallBox
                title="Fall Intake"
                subtitle="(Sep – Dec)"
                color="#E38B00"
                delay={0}
              />
              <IntakeSmallBox
                title="Winter Intake"
                subtitle="(Jan – Apr)"
                color="#3976D9"
                delay={100}
              />
              <IntakeSmallBox
                title="Spring/Summer Intake"
                subtitle="(May – Aug)"
                color="#22A065"
                delay={200}
              />
            </div>

            <div className="mt-5 rounded-md bg-gray-50 p-3 ring-1 ring-gray-200/70">
              <p className="text-xs md:text-sm text-neutral-700">
                Tip: Eligible graduates may apply for a{" "}
                <b>Post-Graduation Work Permit (PGWP)</b>—often up to 3 years—depending on program length and other criteria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- subcomponents ---- */

function Dot() {
  return (
    <span
      className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-[5px]"
      style={{ backgroundColor: ACCENT }}
      aria-hidden
    />
  );
}

/**
 * IntakeSmallBox
 * - Compact card with rounded border
 * - Colored top band (title), white bottom (subtitle)
 */
function IntakeSmallBox({
  title,
  subtitle,
  color,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  color: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className="w-full max-w-xs rounded-[5px] border border-gray-200 bg-white shadow-sm px-4 py-3"
      style={{
        transform: inView ? "translateY(0)" : "translateY(10px)",
        opacity: inView ? 1 : 0,
        transition:
          `transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, ` +
          `opacity 520ms ${delay}ms`,
      }}
    >
      {/* Colored top pill */}
      <div
        className="rounded-[5px] text-white text-center font-semibold px-4 py-2"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>

      {/* White lower caption */}
      <div className="mt-2 text-center text-xs md:text-sm text-neutral-800">
        {subtitle}
      </div>
    </div>
  );
}
