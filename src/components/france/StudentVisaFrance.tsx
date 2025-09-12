import { Visa_requirements } from "@/types/StudyInPage";
import { BoldText } from "@/utils/BoldText";
import { HighlightedText } from "@/utils/HighlightedText";
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

type Prop = {
  visa_requirements: Visa_requirements;
};

export default function StudentVisaFrance({ visa_requirements }: Prop) {
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
          {visa_requirements?.title ? (
            <HighlightedText
              text={visa_requirements?.title}
              mobileSize="42px"
              color="red"
            />
          ) : (
            <h2
              className="text-2xl md:text-3xl font-extrabold leading-tight"
              style={{ color: ACCENT }}
            >
              France Student Visa
              <br className="hidden sm:block" />
              <span className="block text-black">Requirements for Indians</span>
            </h2>
          )}
          <p className="mt-5 text-base md:text-lg font-semibold text-black">
            {visa_requirements?.subheading ? (
              <BoldText text={visa_requirements?.subheading} />
            ) : (
              "Indian students typically apply for the long-stay student visa (VLS-TS) to study in France."
            )}
          </p>
          <ul className="mt-6 space-y-3">
            {visa_requirements &&
              visa_requirements?.details &&
              visa_requirements?.details.map((item, idx) => (
                <li
                  key={item?.id || idx}
                  className="flex items-start gap-3 rounded-lg border border-gray-200/80 bg-white px-4 py-3 shadow-[0_3px_10px_rgba(16,24,40,0.05)]"
                >
                  <Dot />
                  <span className="text-sm md:text-base text-neutral-900">
                    {item?.text}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* RIGHT: Intakes — small boxes like your image */}
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
              * Actual intake windows can vary by university and program.
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
 * - Matches the reference look
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
