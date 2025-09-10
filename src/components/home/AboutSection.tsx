import { AboutSectionSkeleton } from "@/Loaders/LandingPages/AboutSectionSkeleton";
import { AboutUs } from "@/types/LandingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const fetchAboutus = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.about-us][populate][about_list][populate][Image_or_gif][fields][0]=url&populate[Sections][on][blocks.about-us][populate][about_list][populate][Image_or_gif][fields][1]=alternativeText&populate[Sections][on][blocks.about-us][populate][About_us_count][populate][image_or_gif][fields][0]=url&populate[Sections][on][blocks.about-us][populate][About_us_count][populate][image_or_gif][fields][1]=alternativeText&populate[Sections][on][blocks.about-us][populate][chairmanImage][fields][0]=url&populate[Sections][on][blocks.about-us][populate][chairmanImage][fields][1]=alternativeText`
  );
  return data.data[0].Sections[0];
};

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<AboutUs>({
    queryKey: ["about-us"],
    queryFn: fetchAboutus,
  });

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

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
  }

  if (isLoading || !aboutData) {
    return <AboutSectionSkeleton />;
  }

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="top-section">
          <div className="left">
            <h2
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="0"
              className="text-[#1e73be]"
            >
              {aboutData?.title}
            </h2>
            <p
              className="desc pb-3 sm:pb-0"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <strong className="font-bold">{aboutData?.SubTitle_1}</strong>
            </p>
            <p
              className="para"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              {aboutData?.SubTitle_2}
            </p>
            <p
              className="para pb-3"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              {aboutData?.SubTitle_3}
            </p>
            <hr />
            <ul className="features space-y-2">
              {aboutData?.about_list?.map((list) => (
                <li
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="800"
                  data-aos-anchor-placement="center-bottom"
                  key={list.id}
                >
                  <img
                    src={list?.Image_or_gif?.url}
                    alt="check"
                    className="w-6 h-6"
                  />
                  <span>
                    {list?.about_text}{" "}
                    <span className="font-bold">{list?.bold_text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 sm:hidden ">
            {aboutData?.About_us_count?.map((stat, i) => {
              return (
                <div
                  key={stat.id}
                  className="stat-box"
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                  data-aos-duration="1000"
                  data-aos-anchor-placement="center-bottom"
                >
                  <div className="left-box">
                    <img
                      src={stat?.image_or_gif?.url}
                      alt=""
                      className="icon"
                    />
                    <div className="count text-[#1e73be]">
                      {Number(stat?.count).toLocaleString("en-US")}+
                    </div>
                  </div>
                  <div className="label">{stat?.About_text}</div>
                </div>
              );
            })}
          </div>
          <div
            className="right"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            data-aos-anchor-placement="center-bottom"
          >
            <img
              src={
                aboutData?.chairmanImage?.url ||
                "https://vsourcevarsity.com/assets/images/founder.webp"
              }
              alt="Founder"
              className="founder-img"
            />
            <p className="quote">
              “Redefining Education for Tomorrow’s Innovators”
            </p>
          </div>
        </div>
        <div className="bottom-section">
          {aboutData?.About_us_count?.map((stat, i) => {
            return (
              <div
                key={stat.id}
                className="stat-box"
                data-aos="fade-up"
                data-aos-delay={i * 200}
                data-aos-duration="1000"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="left-box">
                  <img src={stat?.image_or_gif?.url} alt="" className="icon" />
                  <div className="count text-[#1e73be]">
                    {Number(stat?.count).toLocaleString("en-US")}+
                  </div>
                </div>
                <div className="label">{stat?.About_text}</div>
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
        h2 { font-size: clamp(30px, 3.6vw, 32px); font-weight: 700; margin: 0; }
        .desc { font-size: clamp(20px, 2.5vw, 25px); margin: 8px 0 0; line-height: 1.6; }
        .para { font-size: clamp(15px, 2.3vw, 15px); margin: 8px 0 0; }
        .features { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 10px; }
        .features li { display: grid; grid-template-columns: 22px 1fr; gap: 10px; font-size: clamp(15px, 2.3vw, 15px); }
        .features li img { width: 22px; height: 22px; margin-top: 2px; }
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
          .bottom-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .bottom-section {
            grid-template-columns: repeat(3, 1fr);
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
        .left-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .bottom-section .stat-box:first-child .icon {
          width: 52px;
          height: 52px;
        }
        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          margin: 0;
          white-space: nowrap;
        }
        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          line-height: 1.3;
          text-align: right;
          margin-left: 10px;
          width: 34%;
        }
        @media (max-width: 380px) {
          .stat-box { gap: 8px; padding: 10px; }
          .count { font-size: 18px; }
          .label { font-size: 12px; }
        }
        @media (max-width: 540px) {
          .left-box {
              width: 50%;
              justify-content: space-between;
            }
          .stat-box:first-child .left-box {
              width: 60%;
              justify-content: space-between;
            }
          }
        @media (max-width: 640px) {
          .bottom-section{
            display:none;
          }
        }
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
