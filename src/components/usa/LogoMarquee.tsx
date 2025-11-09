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
  const usLogos1 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706409/University_at_Buffalo_logo.svg__lf20y3.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706409/University_of_Texas_at_Arlington_logo.svg_iuu9im.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706405/UNF_logo_xendoz.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706404/UMB-Logo-1_1_ev3gvq.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706402/UCF-Logo_kda4l0.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706399/uab_yuiltc.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706337/centralmichiganuniv_yod3p1.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706336/california-state-university-long-beach2264-removebg-preview_abawfn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706334/California_State_University_Northridge_hz4muf.jpg",
  ];

  const usLogos2 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706398/The_University_of_Memphis_logo-removebg-preview_sqee94.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706397/Towson_University_Logo_ostzs2.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706397/saint_dbrgrx.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/seton-hill-university8023.logowik.com_uazibs.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/primary-logo-red_x0kyj3.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/s_t_leqcbu.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706381/Pace_University_Logo_2021_bvh0sx.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706334/california_usohpr.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706332/buffalo_ufhiet.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706332/bddec1e4632079e3085179fff5e0760d-removebg-preview_apinkn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706331/05_WRIGHTSTATE_BIPLANE_g5hkjs.png",
  ];

  const usLogos3 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706356/open-graph-logo_vtcjdn.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706354/NPU_Primary_RGB22-copy_shsvnh.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706354/northwooduniversity_2color_stacked_logo_Logo__1_-removebg-preview_kxbr6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706352/Northwest_Missouri_State_University_eqwswl.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706351/montclair-state-university-msu1147_frhiaj.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706350/Logo-University-of-Arizona_go56vo.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706350/kisspng-university-of-pennsylvania-college-student-graduat-5b2c918ccf62c4.4154677215296475008495_uezcbk.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__3_-removebg-preview_twpohs.png",
  ];

  const usLogos4 = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__5_-removebg-preview_wb1cgh.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__9_-removebg-preview_xejqzb.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706347/images_uwoieb.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706347/images_3_dkymve.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706342/FSUSig_Horizontal_Color_plx5jv.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706341/George_Mason_University_logo.svg-removebg-preview_mks6y5.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706340/download_1_zeqos7.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706339/cuc_colored_hxf94w.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706339/CSU-FullyStacked-1_1_ditmuz.jpg",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <SectionTitle
            title="Top Universities & Courses"
            // subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
          />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4 space-y-4">
              <MarqueeRow logos={usLogos1} />
              <MarqueeRow logos={usLogos2} reverse />
              <MarqueeRow logos={usLogos3} />
              <MarqueeRow logos={usLogos4} reverse />
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
