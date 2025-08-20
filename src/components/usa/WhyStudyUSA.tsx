import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* Small hook: toggles inView when element enters/leaves viewport */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { root: null, threshold: 0.25, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function WhyStudyUSA() {
  // Animate the whole left content block
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();

  const leftStyle: React.CSSProperties = {
    transform: leftInView ? "translate3d(0,0,0)" : "translate3d(-40px,0,0)",
    opacity: leftInView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "650ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Intro (slides from LEFT) */}
        <div ref={leftRef} style={leftStyle}>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            Study in the USA — Build a Global-Ready Career
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700">
            The United States combines world-leading universities, flexible programs,
            and unmatched research & industry ecosystems. Earn a globally recognized
            degree, learn from renowned faculty, and experience a multicultural campus
            life that prepares you for high-growth careers.
          </p>

          {/* Accent divider */}
          <div
            className="mt-6 h-1 w-20 rounded-full"
            style={{ backgroundColor: "#e40000" }}
          />

          {/* Bulleted highlights */}
          <ul className="mt-6 space-y-3">
            {[
              "Flexible, interdisciplinary course choices",
              "Assistantships & scholarships available",
              "STEM OPT: up to 36 months of post-study work",
              "Vibrant campus life with 1M+ international students",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#e40000" }}
                />
                <span className="text-sm md:text-base text-neutral-800">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-white font-semibold shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: "#e40000" }}
            >
              Get a Free Profile Evaluation
            </Link>
          </div>
        </div>

        {/* Right: Feature cards (each slides from LEFT with stagger) */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "World-Leading Universities",
              body:
                "Earn globally recognized degrees from top-ranked institutions known for teaching and research excellence.",
              icon: "🎓",
            },
            {
              title: "STEM OPT Advantage",
              body:
                "Gain real-world US experience with 12 months of OPT plus a 24-month extension for eligible STEM programs.",
              icon: "🧪",
            },
            {
              title: "Industry & Research Edge",
              body:
                "Work on cutting-edge projects, internships, and labs with tech leaders, startups, and research centers.",
              icon: "💼",
            },
          ].map((c, i) => (
            <AnimatedFeatureCard
              key={c.title}
              title={c.title}
              body={c.body}
              icon={c.icon}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedFeatureCard({
  title,
  body,
  icon,
  index = 0,
}: {
  title: string;
  body: string;
  icon: string;
  index?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayMs = 120 * index; // stagger

  const style: React.CSSProperties = {
    transform: inView ? "translate3d(0,0,0)" : "translate3d(-32px,0,0)",
    opacity: inView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "650ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: inView ? `${delayMs}ms` : "0ms",
  };

  return (
    <div
      ref={ref}
      style={style}
      className="rounded-xl border bg-white p-5 md:p-6 shadow-sm hover:shadow transition will-change-transform"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <h3 className="text-base md:text-lg font-semibold text-black">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-neutral-700">
        {body}
      </p>

      <div
        className="mt-4 h-0.5 w-12 rounded-full"
        style={{ backgroundColor: "#e40000" }}
      />
    </div>
  );
}
