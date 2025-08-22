import React, { useState, useEffect, useRef } from "react";

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: "+",
      label: "Students Empowered",
      icon: "https://cdn-icons-gif.flaticon.com/6454/6454106.gif",
    },
    {
      id: 2,
      value: 20,
      suffix: "+",
      label: "Years of\nExperience",
      icon: "https://cdn-icons-gif.flaticon.com/15370/15370761.gif",
    },
    {
      id: 3,
      value: 10,
      suffix: "+",
      label: "Study Destinations",
      icon: "https://cdn-icons-gif.flaticon.com/15747/15747340.gif",
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);
    useEffect(() => {
      if (!isVisible) return;
      let startTime: number | null = null;
      const step = (t: number) => {
        if (startTime === null) startTime = t;
        const p = Math.min((t - startTime) / duration, 1);
        setCount(Math.floor(p * (end - start) + start));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);
    return count;
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="top-section">
          <div className="left">
            {/* Heading */}
            <h2
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="0"
            >
              About Vsource Overseas
            </h2>

            {/* Paragraph */}
            <p
              className="desc"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              At Vsource Overseas, we specialize in transforming{" "}
              <strong>academic ambition into international achievement</strong>.
              With a legacy spanning over 20 years, we proudly stand as South
              India’s premier consultancy for master’s admissions abroad.
            </p>

            {/* Features List */}
            <ul className="features">
              <li
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="800"
                data-aos-anchor-placement="center-bottom"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10490/10490249.png"
                  alt="check"
                />
                Guided thousands of students to top-ranked universities
              </li>

              <li
                data-aos="fade-right"
                data-aos-delay="600"
                data-aos-duration="800"
                data-aos-anchor-placement="center-bottom"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3176/3176293.png"
                  alt="globe"
                />
                Expertise in destinations like the USA, UK, Canada, Ireland, and
                more
              </li>

              <li
                data-aos="fade-right"
                data-aos-delay="800"
                data-aos-duration="800"
                data-aos-anchor-placement="center-bottom"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/7339/7339281.png"
                  alt="university"
                />
                Direct partnerships with globally accredited universities
              </li>
            </ul>
          </div>

          <div
            className="right"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            data-aos-anchor-placement="center-bottom"
          >
            <img
              src="https://vsourcevarsity.com/assets/images/founder.webp"
              alt="Founder"
              className="founder-img"
            />
            <p className="quote">
              “Redefining Education for Tomorrow’s Innovators”
            </p>
          </div>
        </div>

        <div className="bottom-section">
          {stats.map((stat, i) => {
            const count = useCounter(stat.value);
            return (
              <div
                key={stat.id}
                className="stat-box"
                data-aos="fade-up"
                data-aos-delay={i * 200}
                data-aos-duration="1000"
                data-aos-anchor-placement="center-bottom"
              >
                <img src={stat.icon} alt="" className="icon" />
                <div className="count">
                  {count.toLocaleString("en-IN")}
                  {stat.suffix}
                </div>
                <div className="label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }
        .container { max-width: 1200px; margin: 0 auto; }

      .top-section {
          display: grid;
          grid-template-columns: 1fr;   
          gap: 24px;
        }

        @media (min-width: 768px) {
          .top-section {
            grid-template-columns: 65% 30%; 
            gap: 32px;
            align-items: start;
          }
        }

        .left { min-width: 0; }
        .right { display: flex; flex-direction: column; align-items: center; }
        h2 { font-size: clamp(22px, 3.6vw, 32px); font-weight: 700; margin: 0; }
        .desc { font-size: clamp(14px, 2.5vw, 15px); margin: 12px 0 0; line-height: 1.6; }

        .features { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 10px; }
        .features li { display: grid; grid-template-columns: 22px 1fr; gap: 10px; font-size: clamp(13px, 2.3vw, 15px); }
        .features li img { width: 22px; height: 22px; margin-top: 2px; }

        .founder-img { width: 100%; max-width: 380px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .quote { font-style: italic; margin-top: 10px; text-align: center; font-size: 15px; }

        /* Stats grid */
       .bottom-section {
          margin-top: clamp(28px, 6vw, 50px);
          display: grid;
          grid-template-columns: 1fr; /* mobile */
          gap: 20px;
          width: 80%;
    margin: clamp(28px, 6vw, 50px) auto 0;
        }
        @media (min-width: 640px) {
          .bottom-section {
            grid-template-columns: repeat(2, 1fr); /* tablet */
          }
        }
        @media (min-width: 1024px) {
          .bottom-section {
            grid-template-columns: repeat(3, 1fr); /* desktop */
          }
        }

        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #0069E9;
          border-radius: 8px;
          padding: 13px;
          min-height: 80px;
          background: #fff;
          box-sizing: border-box;
        }

        .icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }

        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          color: #000;
          margin: 0 12px;
          white-space: nowrap;
        }

        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          line-height: 1.3;
          text-align: right;
              width: 34%;
        }

        /* Ultra-small phones */
        @media (max-width: 380px) {
          .stat-box { gap: 10px; padding: 12px; }
          .count { font-size: 18px; }
        }

        /* Accessibility: disable motion */
        @media (prefers-reduced-motion: reduce) {
          .about-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
