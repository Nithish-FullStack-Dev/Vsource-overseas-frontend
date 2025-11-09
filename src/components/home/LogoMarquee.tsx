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
  title: string;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  logos,
  reverse = false,
  title,
}) => {
  const repeated = [...logos, ...logos, ...logos, ...logos]; // Prevent gaps

  return (
    <div className="relative overflow-hidden w-full py-8 md:py-8">
      {/* Country heading */}
      <div className="flex justify-center">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-blue-800 mb-6 tracking-wide relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-blue-600 after:mx-auto after:mt-2">
          {title}
        </h3>
      </div>
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
              loading="lazy"
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
  const usLogos = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706409/University_at_Buffalo_logo.svg__lf20y3.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706409/University_of_Texas_at_Arlington_logo.svg_iuu9im.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706405/UNF_logo_xendoz.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706404/UMB-Logo-1_1_ev3gvq.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706402/UCF-Logo_kda4l0.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706399/uab_yuiltc.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706398/The_University_of_Memphis_logo-removebg-preview_sqee94.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706397/Towson_University_Logo_ostzs2.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706397/saint_dbrgrx.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/seton-hill-university8023.logowik.com_uazibs.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/primary-logo-red_x0kyj3.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706396/s_t_leqcbu.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706381/Pace_University_Logo_2021_bvh0sx.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706356/open-graph-logo_vtcjdn.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706354/NPU_Primary_RGB22-copy_shsvnh.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706354/northwooduniversity_2color_stacked_logo_Logo__1_-removebg-preview_kxbr6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706352/Northwest_Missouri_State_University_eqwswl.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706351/montclair-state-university-msu1147_frhiaj.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706350/Logo-University-of-Arizona_go56vo.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706350/kisspng-university-of-pennsylvania-college-student-graduat-5b2c918ccf62c4.4154677215296475008495_uezcbk.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__3_-removebg-preview_twpohs.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__5_-removebg-preview_wb1cgh.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706349/images__9_-removebg-preview_xejqzb.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706347/images_uwoieb.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706347/images_3_dkymve.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706342/FSUSig_Horizontal_Color_plx5jv.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706341/George_Mason_University_logo.svg-removebg-preview_mks6y5.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706340/download_1_zeqos7.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706339/cuc_colored_hxf94w.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706339/CSU-FullyStacked-1_1_ditmuz.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706337/centralmichiganuniv_yod3p1.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706336/california-state-university-long-beach2264-removebg-preview_abawfn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706334/California_State_University_Northridge_hz4muf.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706334/california_usohpr.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706332/buffalo_ufhiet.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706332/bddec1e4632079e3085179fff5e0760d-removebg-preview_apinkn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706331/05_WRIGHTSTATE_BIPLANE_g5hkjs.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706330/auburn-at-montgomery_uc9zqn.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706329/UTSA-logo-650x149_futhz5.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706329/Webster_University_pu8lrt.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706329/university-of-toledo9856_wfnrul.jpg",
  ];

  const ukLogos = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/coventry-university-logo-scaled_jppw86.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/images_3_n1nq6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706162/download_1_wzjwjn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/Black-Logo_jyb0kz.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/images_2_syfvrd.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/download_2_x6lwap.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/cardiff-university_x0fjta.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706161/images_2_mavkir.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/AU_Birmingham_logo_Purple_RGB_b00brl.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/images_1_pbwhxj.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/bcu-birmingham-city-university5078_rjeicm.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706160/Heriot-Watt_University_logo.svg-removebg-preview_cyewlq.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/ARU-logo-1440x1080-1-1_rxd2ag.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/images_1_fniupj.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/avg07l8ep_ni8ned.webp",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706159/Heriot-Watt_University_logo.svg_eju2ub.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/187302_dncwat.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/ARU-logo-1440x1080-1-1-1024x768_zoqhg2.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706158/1551096064_brandmark_rgb_colourway-1_jd4cpg.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/980_university_liverpool_logo-removebg-preview2_n5tz6e.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/Edinburgh_Napier_University_f1szhs.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/download_pu3xvf.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706157/download_8_fxoi5g.png",
  ];

  const canadaLogos = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706590/algoma_dg1spg.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/UCalgary_f8xn7b.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/regina_u3nvqt.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/sfu_w4jhf6.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706589/toronto2_aecw39.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/NYIT_p7wh07.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/niagara_bpkxfd.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/laurentian_wcjq12.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/fairleigh_epfo5m.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/lakehead_ti6eyo.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706588/ibu_cp7aou.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/columbia_iic31u.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/Algoma_University_wordmark.svg_mrhchq.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706587/dalhousie_wkwdqn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/York_jmtgxc.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/brunswick_klqrtn.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/Waterloo_mu4vuy.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706586/alberta_gxxb6l.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706585/windsor_zxf88y.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706585/vancouver_npgk4r.png",
  ];

  const irelandLogos = [
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/mtu_nzcq2g.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/ollscil_esowex.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/nci_xgvilr.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/SETU_vcxa6d.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/ollscol_caelht.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/maynooth_cije7g.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/griffith_gm9bzo.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706609/limerick_oqrlpd.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/dundaik_sol9bb.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/ibat_ugljkq.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/Atlantic_ubiflk.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/dublin_vz84yc.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/University_College_Cork_tbds4a.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/tusmidland_z2c7ye.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706608/ATU_hjjju9.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706607/university-college-dublin_njf4pu.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706606/trinity_ks3dcj.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706606/university-of-limerick_dxzf98.png",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706605/tus_vwlhph.jpg",
    "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_300,c_limit/v1762706604/tollscoil_m0crr3.png",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <SectionTitle title="250+ GLOBAL UNIVERSITY PARTNERS" />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4">
              <MarqueeRow logos={ukLogos} title="UK Universities" />
              <MarqueeRow logos={usLogos} reverse title="USA Universities" />
              <MarqueeRow logos={canadaLogos} title="Canada Universities" />
              <MarqueeRow
                logos={irelandLogos}
                reverse
                title="Ireland Universities"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default LogoMarquee;
