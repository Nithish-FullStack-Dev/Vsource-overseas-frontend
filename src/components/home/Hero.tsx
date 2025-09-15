import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import HeroSkeleton from "@/Loaders/LandingPages/HeroSkeleton";
import { HighlightedText } from "@/utils/HighlightedText";

const fetchHero = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Badge][fields][0]=name&populate[Badge][fields][1]=url&populate[Badge][fields][2]=alternativeText&populate[Background_image][fields][0]=name&populate[Background_image][fields][1]=url&populate[Background_image][fields][2]=alternativeText&populate[girl_image][fields][0]=name&populate[girl_image][fields][1]=url&populate[girl_image][fields][2]=alternativeText&populate[Mobile_background_image][fields][0]=name&populate[Mobile_background_image][fields][1]=url&populate[Mobile_background_image][fields][2]=alternativeText`
  );
  return data.data[0];
};

const Hero = () => {
  const {
    data: heroData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["heroData"],
    queryFn: fetchHero,
  });

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !heroData) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 md:pt-0">
      {/* Desktop Background Image */}
      <motion.div
        className="absolute inset-0 hidden md:block z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${heroData?.Background_image?.url})`,
          }}
        />
        <div className="absolute inset-0 bg-grey opacity-30 z-10 mix-blend-overlay" />
      </motion.div>

      {/* Mobile Background */}
      <motion.div
        className="block md:hidden absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${heroData?.Mobile_background_image?.url})`,
        }}
      />

      {/* Right-side Girl Image (Hidden on Mobile) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:flex justify-end">
        <motion.img
          src={`${heroData?.girl_image?.url}`}
          alt="Girl"
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="object-contain h-full max-h-[120vh]"
          style={{ right: 0 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="w-full max-w-[1400px] mx-auto px-4 z-20 text-center lg:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Desktop Left Content */}
          <div className="hidden md:block space-y-6 pt-28">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-md max-w-3xl space-y-4">
              <HighlightedText
                text={heroData?.Title}
                mobileSize={"42px"}
                color={"red"}
              />

              <div className="space-y-1">
                <p className="text-lg text-black font-medium">
                  {heroData?.Study_in}
                </p>
              </div>
            </div>

            {/* 20 Years Logo */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-start pt-6"
            >
              <img
                src={`${heroData?.Badge?.url}`}
                alt="20 Years Logo"
                className="w-36 h-auto"
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/explore-universities"
                className="bg-[#D93F36] text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-[#c2352d] transition-colors"
              >
                Explore Universities
              </Link>
              <Link
                to="/book-counseling"
                className="bg-white border border-white text-black px-6 py-3 rounded-md font-semibold text-lg hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Book Free Counseling</span>
              </Link>
            </motion.div>

            {/* Rating Info */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm text-black">{heroData?.ratings}</span>
              </div>
              <div className="text-sm font-semibold text-black">
                {heroData?.Students_Guided}
              </div>
              <div className="text-sm font-semibold text-black">
                {heroData?.University_Partners}
              </div>
            </motion.div>
          </div>

          {/* Mobile Content */}
          <div className="md:hidden relative flex flex-col min-h-screen pt-[250px] px-4 z-10 font-[Poppins]">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[40px] left-[-10px] bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-[200px] text-left shadow-sm "
            >
              <p className="text-red-600 text-[18px] font-bold leading-tight uppercase tracking-wide">
                {heroData?.mobile_title}
              </p>
              <p className="text-[10px] text-orange-400 font-semibold mt-2 animate-blink">
                {heroData?.intakes}
              </p>
              <div className="bg-white rounded-xl px-2 py-1 mt-3 flex justify-center gap-1 w-fit">
                {heroData?.country_names &&
                  heroData?.country_names.map((flag, idx) => (
                    <img
                      key={idx}
                      src={`https://flagcdn.com/${flag}.svg`}
                      alt={flag.toUpperCase()}
                      className="w-5 h-5 object-cover rounded-full"
                    />
                  ))}
              </div>
              <motion.button
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 bg-red-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow hover:bg-red-700 transition"
              >
                APPLY NOW
              </motion.button>
              <img
                src={`${heroData?.Badge?.url}`}
                alt="20 Years Logo"
                className="w-20 h-auto mt-4 "
              />
            </motion.div>

            <div className="mt-auto pb-20 w-full text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 backdrop-blur-md px-6 py-5 rounded-2xl max-w-xl mx-auto shadow-lg border border-white/30 flex flex-col items-center text-center"
              >
                {/* Highlighted headline */}
                <HighlightedText
                  text={heroData?.gateway}
                  mobileSize="18px"
                  color="red"
                />

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    to="/explore-universities"
                    className="flex-1 bg-[#D93F36] text-white px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-[#c2352d] hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Explore Universities
                  </Link>

                  <Link
                    to="/book-counseling"
                    className="flex-1 bg-white/80 border border-white text-black px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Book Free Counseling
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');
      `}</style>
    </section>
  );
};

export default Hero;
