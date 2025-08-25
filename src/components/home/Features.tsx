import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FinancialAssistance.css";
import { Link } from "react-router-dom";

interface Feature {
  icon: string;
  bgColor: string;
  title: string;
}

const GREY = "#E5EBF0";       // card background from your palette
const BRAND_RED = "#E3000F";  // brand red for icons

// Paint PNG/SVG glyphs in brand red via CSS mask
const RedIcon: React.FC<{ src: string; alt?: string; size?: number; aosDelay?: number }> = ({
  src,
  alt = "icon",
  size = 56,
  aosDelay = 100,
}) => (
  <span
    role="img"
    aria-label={alt}
    data-aos="fade-right"
    data-aos-delay={aosDelay}
    className="fi-icon" // styled in CSS below
    style={{
      display: "inline-block",
      width: size,
      height: size,
      backgroundColor: BRAND_RED,      // <-- icon color
      marginBottom: 12,                // <-- space under the icon
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const features: Feature[] = [
  { icon: "/icons/rupee.png",                bgColor: GREY, title: "Collateral Free Loans Up to 85 lakhs*" },
  { icon: "/icons/money.png",                bgColor: GREY, title: "Up to 100% financing with flexible repayment options*" },
  { icon: "/icons/check-mark.png",           bgColor: GREY, title: "Quick & Easy Application Process" },
  { icon: "/icons/home-icon-silhouette.png", bgColor: GREY, title: "Income tax benefits under section 80E" },
];

const FinancialAssistance: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { dots: true } },
      { breakpoint: 769, settings: "unslick" as const },
    ],
  };

  return (
 <div className="financial-assistance bg-white py-12">
  <div className="w-full max-w-[1400px] mx-auto px-4">
    <h2 className="heading"   data-aos="fade-up" 
  data-aos-duration="800"
  data-aos-anchor-placement="center-bottom" >
      FINANCIAL ASSISTANCE
    </h2>

 {/* Desktop Cards */}
<div className="card-wrapper desktop">
  {features.map((item, i) => (
    <div
      className="card"
      key={i}
      style={{ backgroundColor: item.bgColor }}
      data-aos="fade-up"
      data-aos-delay={i * 200}   // staggered delay (0, 200, 400, 600…)
      data-aos-duration="800"
      data-aos-anchor-placement="center-bottom" 
    >
      <RedIcon src={item.icon} />
      <p
        className="text"
        style={{ color: "#111827" }}
        data-aos="fade-up"
        data-aos-delay={i * 200 + 100}   // slight delay after card anim
        data-aos-duration="800"
        data-aos-anchor-placement="center-bottom" 
      >
        {item.title}
      </p>
    </div>
  ))}
</div>


  {/* Mobile Slider */}
<div className="card-wrapper mobile">
  <Slider {...settings}>
    {features.map((item, i) => (
      <div key={i}>
        <div
          className="card"
          style={{ backgroundColor: item.bgColor }}
          data-aos="zoom-in"             // smoother for slider
          data-aos-delay={i * 200}       // stagger delay (0, 200, 400…)
          data-aos-duration="700"
          data-aos-anchor-placement="center-bottom" 
        >
          <RedIcon src={item.icon} />
          <p
            className="text"
            style={{ color: "#111827" }}
            data-aos="fade-up"           // different effect for variety
            data-aos-delay={i * 200 + 100}
            data-aos-duration="700"
            data-aos-anchor-placement="center-bottom" 
          >
            {item.title}
          </p>
        </div>
      </div>
    ))}
  </Slider>
</div>


<div className="button-group" data-aos="fade-up" data-aos-duration="700">
  <a 
    href="https://vsourcefintech.com/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <button
      className="btn primary"
      data-aos="zoom-in-right"
      data-aos-delay="200"
      data-aos-duration="700"
      data-aos-anchor-placement="center-bottom" 
    >
      CHECK ELIGIBILITY
    </button>
  </a>

  <a 
    href="https://vsourcefintech.com/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <button
      className="btn secondary"
      data-aos="zoom-in-left"
      data-aos-delay="400"
      data-aos-duration="700"
      data-aos-anchor-placement="center-bottom" 
    >
      FOR MORE INFORMATION
    </button>
  </a>
</div>


  </div>
</div>

  );
};

export default FinancialAssistance;
