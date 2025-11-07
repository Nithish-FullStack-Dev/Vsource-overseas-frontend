import { AboutSectionSkeleton } from "@/Loaders/LandingPages/AboutSectionSkeleton";
import { AboutSectionProps } from "@/types/LandingPage";
import { BoldText } from "@/utils/BoldText";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
const stats = [
  {
    id: 1,
    value: 100000,
    suffix: "+",
    label: "Students Empowered",
    icon: "/assets/images/icons/hat.gif",
  },
  {
    id: 2,
    value: 20,
    suffix: "+",
    label: "Years of\nExperience",
    icon: "/assets/images/icons/handshake.gif",
  },
  {
    id: 3,
    value: 10,
    suffix: "+",
    label: "Study Destinations",
    icon: "/assets/images/icons/earth.gif",
  },
];
const AboutSection: React.FC<AboutSectionProps> = ({
  aboutData,
  isLoading,
  isError,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
  }

  if (isLoading || !aboutData) {
    return <AboutSectionSkeleton />;
  }
  // Counter animation hook
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
      <div className="w-full max-w-[1400px] mx-auto">
        <div className={`content ${isVisible ? "visible" : ""}`}>
          {/* LEFT TEXT SECTION */}
          <div
            className="text-section"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-anchor-placement="center-bottom"
            >
              About Vsource Overseas
            </h1>

            <p
              className="subheading my-4"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="400"
              data-aos-anchor-placement="center-bottom"
            >
              <strong>Your Gateway to Global Academic Excellence</strong>
            </p>

            {/* {aboutData &&
              aboutData?.subheadings &&
              aboutData?.subheadings?.map((text, i) => (
                <BoldText key={text?.id || i} text={text?.description} />
              ))} */}

            <p
              className="paragraph"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="800"
            >
              At VSource Overseas, we specialize in transforming academic
              ambition into international achievement. With a legacy of over 20
              years, we are proud to be South India’s premier consultancy for
              Master’s admissions abroad, guiding thousands of students to
              top-ranked universities across the and other leading destinations.
              <style>{`
        .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: black;
      margin-bottom: 15px;
      margin-top: 10px;
      
    }

    @media (max-width: 768px) {
      .paragraph {
        text-align:justify
      }
      }
      `}</style>
            </p>
            <p
              className="paragraph"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="800"
            >
              We partner with globally accredited universities known for
              academic excellence, innovation, and industry relevance, ensuring
              our students receive not only a quality education but also a
              launchpad for global careers.
              <style>{`
        .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: black;
      margin-bottom: 15px;
      margin-top: 10px;
      
    }

    @media (max-width: 768px) {
      .paragraph {
        text-align:justify
      }
      }
      `}</style>
            </p>
            <div className="my-2 ">
              <strong>Our Legacy in Numbers</strong>
            </div>
            {/* STATS SECTION */}
            <div
              className="stats"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              {stats.map((stat, i) => {
                const count = useCounter(stat.value);
                return (
                  <div
                    key={stat.id}
                    className="stat-box"
                    data-aos="fade-up"
                    data-aos-delay={i * 200}
                    data-aos-duration="1000"
                  >
                    <img src={stat.icon} alt="" className="icon" />
                    <div className="count">
                      {count.toLocaleString("en-US")}
                      {stat.suffix}
                    </div>
                    <div className="label">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div
            className="image-section"
            data-aos="fade-right"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            <img
              src={"/assets/images/about-us/imgi_5_founder.png"}
              alt="Founder"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
              data-aos-delay="500"
            />
            <p
              className="caption"
              data-aos="fade-left"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              <strong style={{ fontSize: "20px" }}>“</strong>
              Redefining Education for Tomorrow’s Innovators
              <strong style={{ fontSize: "20px" }}>”</strong>
            </p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
       .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }
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
        h2 { font-size: clamp(30px, 3.6vw, 32px); font-weight: 700; margin: 0; }
        .desc { font-size: clamp(18px, 2.3vw, 20px); margin-top: 12px; line-height: 1.6; }
        .features { list-style: none; padding: 0; margin-top: 16px; display: grid; gap: 10px; }
        .features li { display: grid; grid-template-columns: 24px 1fr; gap: 10px; font-size: clamp(15px, 2.3vw, 16px); align-items: center; }
        .features li img { width: 24px; height: 24px; }
        .right { display: flex; flex-direction: column; align-items: center; }
        .founder-img { width: 100%; max-width: 450px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .quote { font-style: italic; margin-top: 10px; text-align: center; font-size: 15px; }
        .bottom-section {
          margin-top: clamp(28px, 6vw, 50px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 80%;
          margin: clamp(28px, 6vw, 50px) auto 0;
        }
        @media (min-width: 640px) {
          .bottom-section { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .bottom-section { grid-template-columns: repeat(3, 1fr); }
        }
        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          color: #1e73be;
          white-space: nowrap;
        }
        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          text-align: right;
          margin-left: 10px;
        }
        @media (max-width: 380px) {
          .stat-box { gap: 8px; padding: 10px; }
          .count { font-size: 18px; }
          .label { font-size: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-section * {
            animation: none !important;
            transition: none !important;
          }
        }
    .about-section {
      font-family: 'Barlow', sans-serif;
      background-color: #fff;
      color: #333;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .content {
      display: flex;
      flex-direction: row;
      gap: 40px;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease-out;
    }

    .content.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .text-section {
     
    flex-basis: 60%;
    max-width: 60%;
    }

    .image-section {
      border: 1px solid grey;
    border-radius: 15px;
    padding: 5px;
    text-align: center;
    max-width: 40%;
    margin: 0 auto;
    flex-basis: 40%;
    }

    .stats {
    display: flex;
    gap: 20px;
    width: 100%;
    /* margin: 0 auto; */
    justify-items: center;
    align-items: center;
}

    .stat-block {
      display: flex;
      align-items: center;
      gap: 15px;
      text-align: left;
    }

    .stat-block .icon {
      width: 40px;
      height: 40px;
      object-fit: contain;
      flex-basis:30%
    }

    .stat-info {
      display: flex;
      flex-basis: 20%;
    justify-content: center;
    align-items: center;
    }

    .count {
      font-size: 27px;
      color: #1e73be;
      font-weight: bold;
    }

    .label {
      font-size: 20px;
      color: #555;
      margin-left: 8px;
      text-align:right;
      flex-basis: 50%;
    }
    @media (max-width: 1060px) {
          .content {
        flex-direction: column;
        align-items: center;
      }
         .text-section {
     
    flex-basis: 90%;
    max-width: 90%;
    }
      .image-section {
    max-width: 90%;
    flex-basis: 90%;
    }
    }

    @media (max-width: 485px) {
    
         .label {
        font-size: 15px;
        width: 100%;
        flex-basis: 30%;
    }
        label:first-child{
          margin-left: 0px;
        }
    }

    h1 {
      font-size: 29px;
      color: #1e73be;
      margin-top: 20px;
    }

    .subheading {
      font-size: 20px;
      margin-bottom: 20px;
      color: black;
      margin-top: 20px;
    }

    .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: black;
      margin-bottom: 15px;
      margin-top: 10px;
      
    }

    @media (max-width: 768px) {
     .about-section {
        padding: 20px ;
      }
      .paragraph {
        text-align:justify
      }
      h1 {
        font-size: 26px;
      }
      .subheading {
        font-size: 18px;
        margin-top: 10px;
      }
    }

    .caption {
      font-size: 15px;
      color: black;
      margin-top: 10px;
    }

    @media (max-width: 768px) {

      .stat-info {
        flex-direction: row !important;
        align-items: center;
      }

      .stats {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      .stat-block {
    width: 100%;
}

      .text-section {
    flex-basis: 100%;
    max-width: 100%;
}

.image-section {
    max-width: 100%;
    flex-basis: 100%;
}
    }
  `}</style>
    </section>
  );
};

export default AboutSection;
