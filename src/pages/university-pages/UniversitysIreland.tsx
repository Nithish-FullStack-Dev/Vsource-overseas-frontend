import React from "react";
import UniversityList from "../../components/UniversityList";
import { UNIVERSITIES } from "@/lib/Universities";

const UniversitiesIreland = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="text-center mb-8 bg-cover bg-center shadow-md p-[120px] relative"
        style={{
          backgroundImage:
            "url(/assets/images/universitiess/universityHomeBg.jpg)",
        }}
      >
        <div className="bg-black/50 absolute inset-0 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Study in USA
          </h1>
          <p className="text-gray-100 mt-2">
            Explore the top universities in the USA
          </p>
        </div>
      </div>

      <UniversityList
        universities={UNIVERSITIES.filter((u) => u.country === "USA")}
      />

    </div>
  );
};

export default UniversitiesIreland;
