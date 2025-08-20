import React, { useEffect, useRef, useState } from "react";

/* Scroll-in animation hook */
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

const ACCENT = "#0A9CF9"; // theme accent

type Course = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

/* Updated for CANADA top programs */
const courses: Course[] = [
  { title: "MBA", Icon: BriefcaseIcon },
  { title: "Data Science & Analytics", Icon: ChartIcon },
  { title: "Artificial Intelligence", Icon: BrainCircuitIcon },
  { title: "Software Development", Icon: CodeIcon },
  { title: "Banking & Finance", Icon: BankIcon },
  { title: "Health Studies", Icon: MedIcon },
  { title: "MBA – Project Management", Icon: ClipboardIcon },
  { title: "BBA – Project Management", Icon: TargetIcon },
];

export default function PopularCourses() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "rgba(245,246,248,1)" }} // light grey
    >
      <div
        ref={ref}
        className="container mx-auto px-4 md:px-6"
        style={{
          transform: inView ? "translateY(0)" : "translateY(12px)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
        }}
      >
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-black tracking-wide">
          POPULAR COURSES (CANADA)
        </h2>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((c, i) => (
            <CourseCard key={c.title} course={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const delay = 80 * index;

  return (
    <div
      ref={ref}
      className="rounded-2xl shadow-[0_10px_24px_rgba(16,24,40,0.10)] overflow-hidden"
      style={{
        transform: inView ? "translateY(0)" : "translateY(16px)",
        opacity: inView ? 1 : 0,
        transition:
          `transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, ` +
          `opacity 600ms ${delay}ms`,
      }}
    >
      <div
        className="h-full rounded-2xl bg-white"
        style={{ boxShadow: "0 1px 0 rgba(16,24,40,0.04)" }}
      >
        <div
          className="group flex flex-col items-center justify-center text-white rounded-2xl p-7 md:p-8 hover:-translate-y-0.5 transition-transform"
          style={{ backgroundColor: ACCENT }}
        >
          <course.Icon
            width={46}
            height={46}
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:scale-110 will-change-transform"
          />
          <div className="mt-4 text-center text-base md:text-lg font-semibold">
            {course.title}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Icons (simple inline SVGs) ----------------- */

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <path strokeWidth="2" d="M9 9V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
      <path strokeWidth="2" d="M3 13h18" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="10" width="4" height="10" rx="1" strokeWidth="2" />
      <rect x="10" y="6" width="4" height="14" rx="1" strokeWidth="2" />
      <rect x="17" y="3" width="4" height="17" rx="1" strokeWidth="2" />
    </svg>
  );
}

function BrainCircuitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3v2a3 3 0 0 0 2 3v1a3 3 0 0 0 3 3" />
      <path strokeWidth="2" d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3v2a3 3 0 0 1-2 3v1a3 3 0 0 1-3 3" />
      <circle cx="12" cy="8" r="1.2" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.2" strokeWidth="2" />
      <circle cx="12" cy="16" r="1.2" strokeWidth="2" />
      <path strokeWidth="2" d="M12 9.2v1.6M12 13.2v1.6" />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
      <path strokeWidth="2" d="M13 6l-2 12" />
    </svg>
  );
}

function BankIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M3 10h18" />
      <path strokeWidth="2" d="M5 10v8M9 10v8M15 10v8M19 10v8" />
      <path strokeWidth="2" d="M2 10l10-6 10 6" />
      <path strokeWidth="2" d="M4 18h16" />
    </svg>
  );
}

function MedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="2" />
      <path strokeWidth="2" d="M12 7v10M7 12h10" />
    </svg>
  );
}

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M9 4h6v3H9z" />
      <path strokeWidth="2" d="M8 11h8M8 15h8" />
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="8" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
      <path strokeWidth="2" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}
