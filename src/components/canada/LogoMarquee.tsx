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
              fetchPriority={idx < 3 ? "high" : "low"}
              decoding="async"
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
  // 🇨🇦 Canada Logos (Set 1)
  const canadaLogos1 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706590/algoma_dg1spg.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/UCalgary_f8xn7b.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/regina_u3nvqt.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/sfu_w4jhf6.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/toronto2_aecw39.png",
  ];

  // 🇨🇦 Canada Logos (Set 2)
  const canadaLogos2 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/NYIT_p7wh07.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/niagara_bpkxfd.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/laurentian_wcjq12.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/fairleigh_epfo5m.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/lakehead_ti6eyo.png",
  ];

  // 🇨🇦 Canada Logos (Set 3)
  const canadaLogos3 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/ibu_cp7aou.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/columbia_iic31u.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/Algoma_University_wordmark.svg_mrhchq.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/dalhousie_wkwdqn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/York_jmtgxc.png",
  ];

  // 🇨🇦 Canada Logos (Set 4)
  const canadaLogos4 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/brunswick_klqrtn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/Waterloo_mu4vuy.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/alberta_gxxb6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706585/windsor_zxf88y.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706585/vancouver_npgk4r.png",
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
              <MarqueeRow logos={canadaLogos1} />
              <MarqueeRow logos={canadaLogos2} reverse />
              <MarqueeRow logos={canadaLogos3} />
              <MarqueeRow logos={canadaLogos4} reverse />
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
