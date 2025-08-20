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

export default function StudentVisaUSA() {
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
            Student Visa
            <br className="hidden sm:block" />
            <span className="block text-black">Requirements for Indians (USA)</span>
          </h2>

          <p className="mt-5 text-base md:text-lg font-semibold text-black">
            Most students apply for an <span className="font-bold">F-1</span> visa (academic).
            <span className="hidden md:inline"> </span>
            <span className="block md:inline text-neutral-800 font-normal">
              <b>M-1</b> is for vocational programs and <b>J-1</b> is for exchange visitors.
            </span>
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Valid passport",
              "Form I-20 from an SEVP-certified school (or DS-2019 for J-1)",
              "SEVIS I-901 fee payment receipt",
              "DS-160 confirmation page & visa appointment confirmation",
              "MRV (visa application) fee receipt",
              "US-spec passport photo (or digital upload as required)",
              "Academic transcripts/marksheets & degree certificates",
              "English test scores (TOEFL/IELTS/PTE/DET) and SAT/ACT or GRE/GMAT as applicable",
              "Financial proof: bank statements/affidavit/loan sanction to cover tuition + 1 year living",
              "Resume/CV and any work-experience letters (if applicable)",
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
            * Carry your SEVIS ID, school contact details, and all originals to the visa
            interview. Requirements can vary by consulate and program.
          </p>
        </div>

        {/* RIGHT: Intakes — small boxes */}
        <div className="w-full">
          <div className="rounded-[5px] bg-white p-6 md:p-7 shadow-[0_12px_28px_rgba(16,24,40,0.10)] ring-1 ring-gray-200/70">
            <h3 className="text-lg md:text-xl font-bold text-black">Intakes</h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 place-items-center">
              <IntakeSmallBox
                title="Fall Intake"
                subtitle="(Aug – Dec)"
                color="#E38B00"
                delay={0}
              />
              <IntakeSmallBox
                title="Spring Intake"
                subtitle="(Jan – May)"
                color="#3976D9"
                delay={100}
              />
              <IntakeSmallBox
                title="Summer Intake"
                subtitle="(May – Jul)"
                color="#22A065"
                delay={200}
              />
            </div>

            <p className="mt-5 text-xs md:text-sm text-neutral-600">
              * Intake windows may vary by university/program; some offer rolling admissions.
            </p>
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
