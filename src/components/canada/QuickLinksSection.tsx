import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  title: string;
  href: string; // page anchors like #overview, #costs, etc.
};

const items: Item[] = [
  { title: "Canada Overview", href: "#overview" },
  { title: "Living Cost & Tuition Fee", href: "#costs" },
  { title: "Admission Requirement in Canada", href: "#admissions" },
  { title: "Top Universities & Courses", href: "#top-universities" },
  { title: "Job Scope in Canada", href: "#jobs" },
];

// Simple IntersectionObserver hook that toggles whenever item enters/leaves view
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { root: null, threshold: 0.25, ...options }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [options]);

  return { ref, inView };
}

type Dir = "left" | "right" | "top" | "bottom";

// cycle directions: left → bottom → top → right → left …
const dirCycle: Dir[] = ["left", "bottom", "top", "right", "left"];

function getInitialTransform(dir: Dir) {
  switch (dir) {
    case "left":
      return "translate3d(-36px, 0, 0)";
    case "right":
      return "translate3d(36px, 0, 0)";
    case "top":
      return "translate3d(0, -36px, 0)";
    case "bottom":
      return "translate3d(0, 36px, 0)";
    default:
      return "translate3d(0, 0, 0)";
  }
}

export default function QuickLinksSection() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* 1 per row (mobile) → 2 → 3 → 4 → 5 on xl */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {items.map((it, i) => {
          const dir = dirCycle[i % dirCycle.length];
          return <AnimatedPill key={it.title} item={it} index={i} dir={dir} />;
        })}
      </div>
    </section>
  );
}

function AnimatedPill({ item, index, dir }: { item: Item; index: number; dir: Dir }) {
  const { ref, inView } = useInView<HTMLAnchorElement>();

  // stagger each tile a bit for a one-by-one feel
  const delayMs = 80 * index;

  const style: React.CSSProperties = {
    transform: inView ? "translate3d(0, 0, 0)" : getInitialTransform(dir),
    opacity: inView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: inView ? `${delayMs}ms` : "0ms",
  };

  // Smooth scroll with header offset if href is an on-page anchor
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (item.href.startsWith("#")) {
      const id = item.href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const headerOffset = 88; // adjust if your header height differs
        const rect = target.getBoundingClientRect();
        const top = window.scrollY + rect.top - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      ref={ref}
      to={item.href}
      onClick={handleClick}
      style={style}
      className="relative h-16 md:h-20 rounded-[10px] overflow-hidden shadow hover:shadow-lg transition-transform will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A9CF9]"  // accent ring
      aria-label={item.title}
    >
      {/* Solid background switched to brand Secondary Blue */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--brand-secondary, #2563eb)" }}
        aria-hidden="true"
      />
      {/* subtle overlay for a tiny depth effect */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors" aria-hidden="true" />
      {/* Text */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
        <span className="text-white font-semibold text-sm md:text-base text-center">
          {item.title}
        </span>
      </div>
    </Link>
  );
}
