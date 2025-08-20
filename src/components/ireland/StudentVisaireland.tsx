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

export default function StudentVisaireland() {
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
            Study Visa (Ireland)
            <br className="hidden sm:block" />
            <span className="block text-black">Requirements for Students</span>
          </h2>

          <p className="mt-5 text-base md:text-lg font-semibold text-black">
            Part-time work & stay-back
          </p>
          <p className="mt-1 text-sm md:text-base text-neutral-800">
            Non-EEA students must register with local immigration when staying
            over 3 months. You may work up to <b>20 hours/week during semester</b>
            and up to <b>40 hours/week during vacations</b>. Stay-back options
            are available after graduation via the Third Level Graduate
            Programme.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Letter of acceptance from a recognized university confirming your candidature for a full-time course",
              "English language certification depicting a student’s ability to pursue a course in English",
              "Receipt for payment of course fee",
              "Evidence such as Bank statements to show access to enough funds to maintain through the initial years",
              "Private medical insurance",
              "A commitment letter to leave Ireland after the expiry of the Student Visa",
              "Certificates for all academic qualifications as required by the university",
              "Two recent colored passport sized photographs",
              "A signed application letter with full contact details",
              "Evidence for explaining any gaps in the educational history of the candidate.",
              "Current passport and copies of previous passports.",
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

          {/* timelines note */}
          <div className="mt-5 rounded-md bg-gray-50 p-3 ring-1 ring-gray-200/70">
            <p className="text-xs md:text-sm text-neutral-700">
              <b>Normal Visa:</b> Apply at least <b>6 weeks</b> before travel; must have an
              <b> unconditional offer</b> and pay a minimum deposit of <b>€6,000</b> if fees
              are €12,000 or less, or <b>50%</b> of tuition if fees exceed €12,000. Applications
              lodged <b>3 weeks or less</b> before travel will not be processed (deadline refers
              to the file reaching the visa office in New Delhi).
              <br />
              <b>API (Approval in Principle):</b> Apply with a <b>conditional offer</b> (pending
              final year mark sheets and provisional degree), pay at least <b>€6,000</b>, and
              lodge the application at least <b>7 weeks</b> before course start. After submitting
              final documents to the Ireland Embassy, New Delhi, the visa is issued.
            </p>
          </div>
        </div>

        {/* RIGHT: Intakes — small boxes */}
        <div className="w-full">
          <div className="rounded-[5px] bg-white p-6 md:p-7 shadow-[0_12px_28px_rgba(16,24,40,0.10)] ring-1 ring-gray-200/70">
            <h3 className="text-lg md:text-xl font-bold text-black">Ireland Intakes</h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 place-items-center">
              <IntakeSmallBox
                title="Autumn / September Intake"
                subtitle="Primary intake · deadlines Dec–Jun (prev. year)"
                color="#E38B00"
                delay={0}
              />
              <IntakeSmallBox
                title="Spring / January Intake"
                subtitle="Limited courses (mainly PG) · deadlines Aug–Nov (prev. year)"
                color="#3976D9"
                delay={120}
              />
            </div>

            <div className="mt-5 rounded-md bg-gray-50 p-3 ring-1 ring-gray-200/70">
              <p className="text-xs md:text-sm text-neutral-700">
                Tip: Under the <b>Third Level Graduate Programme</b>, graduates may stay back
                to seek work (commonly up to <b>2 years after a Master’s</b> and <b>1 year after
                a Bachelor’s (Hons)</b>).
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
