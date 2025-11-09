import React from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

// Inject animation styles with mobile-specific speed
const style = `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Default speed: Desktop (30s) */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

/* Faster on mobile: override animation duration */
@media (max-width: 768px) {
  .animate-marquee {
    animation-duration: 15s;
  }
  .animate-marquee-reverse {
    animation-duration: 15s;
  }
}
`;

interface MarqueeRowProps {
  logos: string[];
  reverse?: boolean;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, reverse = false }) => {
  const repeated = [...logos, ...logos, ...logos, ...logos]; // Prevent gaps

  return (
    <div className="relative overflow-hidden w-full py-2 md:py-4">
      <div
        className={`flex w-[200%] whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {repeated.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-4 w-[140px] md:w-[180px] h-[60px] md:h-[80px] flex items-center justify-center"
          >
            <img
              src={logo}
              alt="university logo"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
              }}
              decoding="async"
              fetchPriority={idx < 3 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      {/* Edge gradients for blur effect */}
      <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
};

const LogoMarquee = () => {
  // 🇬🇧 UK Logos (Set 1)
  const ukLogos1 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/coventry-university-logo-scaled_jppw86.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/Black-Logo_jyb0kz.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/cardiff-university_x0fjta.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/AU_Birmingham_logo_Purple_RGB_b00brl.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/bcu-birmingham-city-university5078_rjeicm.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/Heriot-Watt_University_logo.svg-removebg-preview_cyewlq.png",
  ];

  // 🇬🇧 UK Logos (Set 2)
  const ukLogos2 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/images_3_n1nq6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/download_1_wzjwjn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/download_2_x6lwap.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/images_2_syfvrd.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/images_2_mavkir.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/images_1_pbwhxj.png",
  ];

  // 🇬🇧 UK Logos (Set 3)
  const ukLogos3 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/187302_dncwat.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/ARU-logo-1440x1080-1-1-1024x768_zoqhg2.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/1551096064_brandmark_rgb_colourway-1_jd4cpg.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/980_university_liverpool_logo-removebg-preview2_n5tz6e.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/Edinburgh_Napier_University_f1szhs.png",
  ];

  // 🇬🇧 UK Logos (Set 4 – additional, reserved for expansion if needed)
  const ukLogos4 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/ARU-logo-1440x1080-1-1_rxd2ag.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/avg07l8ep_ni8ned.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/download_pu3xvf.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/download_8_fxoi5g.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/images_1_fniupj.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/Heriot-Watt_University_logo.svg_eju2ub.png",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Top Universities & Courses"
            // subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
          />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4 space-y-4">
              <MarqueeRow logos={ukLogos1} />
              <MarqueeRow logos={ukLogos2} reverse />
              <MarqueeRow logos={ukLogos3} />
              <MarqueeRow logos={ukLogos4} reverse />
            </div>
          </AnimateOnScroll>

          {/* <AnimateOnScroll delay={200}>
            <div className="mt-8 md:mt-12 text-center">
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Our strong partnerships with these universities ensure that our students receive
                preferential admissions consideration, specialized programs, and exclusive scholarship opportunities.
              </p>
            </div>
          </AnimateOnScroll> */}
        </div>
      </section>
    </>
  );
};

export default LogoMarquee;
