import React, { useEffect, useRef, useState } from "react";

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

const ACCENT = "#0A9CF9";

type Course = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const courses: Course[] = [
  { title: "Business & Management", Icon: BriefcaseIcon },
  { title: "Computer Science", Icon: CodeIcon },
  { title: "Engineering", Icon: CogIcon },
  { title: "Life Sciences", Icon: DnaIcon },
  { title: "Psychology", Icon: BrainIcon },
  { title: "Medicine", Icon: MedIcon },
  { title: "Humanities", Icon: BookIcon },
];

export default function PopularCourses() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "rgba(245,246,248,1)" }}
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
          POPULAR COURSES
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((c, i) => (
            <CourseCard key={c.title} course={c} index={i} />
          ))}
        </div>
      </div>

      <style>
        {`
          .hi-icon-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
          }

          .hi-icon-wrap svg {
            position: relative;
            z-index: 2;
          }

          /* Circle border */
          .hi-icon-wrap::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border: 3px solid #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            transition: all 0.3s ease;
          }

          /* Hover effect with spinAround */
          .group:hover .hi-icon-wrap::after {
            border-style: dashed;
            animation: spinAround 9s linear infinite;
          }

          @keyframes spinAround {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `}
      </style>
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
          className="group flex flex-col items-center justify-center text-white rounded-2xl p-7 md:p-8 transition-transform"
          style={{ backgroundColor: ACCENT }}
        >
          <div className="hi-icon-wrap">
            <course.Icon
              width={46}
              height={46}
              aria-hidden
              className="transition-transform duration-500 ease-out will-change-transform"
            />
          </div>
          <div className="mt-4 text-center text-base md:text-lg font-semibold">
            {course.title}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ICON COMPONENTS */
function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <path strokeWidth="2" d="M9 9V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
      <path strokeWidth="2" d="M3 13h18" />
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

function CogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
      <path
        strokeWidth="2"
        d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .34 1.7 1.7 0 0 0-.87.34l-.26.15a2 2 0 0 1-2 0l-.26-.15a1.7 1.7 0 0 0-.87-.34A1.7 1.7 0 0 0 8 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.34-1 1.7 1.7 0 0 0-.34-.87l-.15-.26a2 2 0 0 1 0-2l.15-.26c.18-.32.28-.61.34-.87A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-1.87-.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 5 4.6c.26-.06.55-.16.87-.34l.26-.15a2 2 0 0 1 2 0l.26.15c.32.18.61.28.87.34A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.34c.32-.18.61-.28.87-.34l.26-.15a2 2 0 0 1 2 0l.26.15c.32.18.61.28.87.34A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.06.26.16.55.34.87l.15.26a2 2 0 0 1 0 2l-.15.26c-.18.32-.28.61-.34.87z"
      />
    </svg>
  );
}

function DnaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M7 4c3 3 7 3 10 0M7 20c3-3 7-3 10 0" />
      <path strokeWidth="2" d="M7 4v16M17 4v16" />
      <path strokeWidth="2" d="M8 9h8M8 15h8" />
    </svg>
  );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3v2a3 3 0 0 0 2 3v1a3 3 0 0 0 3 3"
      />
      <path
        strokeWidth="2"
        d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3v2a3 3 0 0 1-2 3v1a3 3 0 0 1-3 3"
      />
      <path strokeWidth="2" d="M12 6v12" />
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

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path strokeWidth="2" d="M8 3v18" />
    </svg>
  );
}
