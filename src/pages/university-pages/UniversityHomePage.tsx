import React, { useMemo, useState, useEffect } from "react";
import {
  UNIVERSITIES,
  COUNTRIES,
  Country,
  University,
} from "@/lib/Universities";
import UniversityList from "@/components/UniversityList";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";

const UniversityHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { country } = useParams<{ country?: string }>();

  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync dropdown with URL param on mount/param change
  useEffect(() => {
    if (country) {
      setSelectedCountry(country);
    } else {
      setSelectedCountry("All");
    }
  }, [country]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    if (value === "All") {
      navigate("/explore-universities");
    } else {
      navigate(`/explore-universities/${value}`);
    }
  };

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((uni: University) => {
      const matchesCountry =
        selectedCountry === "All" || uni.country === selectedCountry;
      const matchesQuery =
        searchQuery === "" ||
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.campus.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesQuery;
    });
  }, [selectedCountry, searchQuery]);

  return (
    <main>
      {/* Banner */}
      <div
        className="relative bg-cover bg-center bg-no-repeat pt-36 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url(/assets/images/universitiess/universityHomeBg.jpg)`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 mb-6 container mx-auto max-w-6xl p-4">
          <div className="mx-auto max-w-3xl text-white rounded-xl p-6 text-center shadow " data-aos="fade-down-right">
            <h2 className="text-4xl font-bold text-red-600" data-aso-delay="200">
              Explore Top Universities
            </h2>
            <p className="mt-2 text-sm sm:text-base opacity-90" data-aso-delay="300">
              Filter by country and search to find the right match.
            </p>
          </div>
        </div>
      </div>

      {/* Dropdown filter */}
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="relative z-10 -mt-16 flex justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col space-y-3"  data-aos="zoom-in-up" data-aso-delay="100">
            <label
              htmlFor="countrySelect"
              className="text-black-700 font-semibold text-2xl  text-center"
           >
              Select Country
            </label>
            <select
              id="countrySelect"
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 10L12 15L17 10' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25rem",
              }}
            >
              <option value="All">All Countries</option>
              {COUNTRIES.map((c: Country) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count + Search */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6 gap-4  mx-auto px-4 mt-3">
          {/* Count */}
          <div className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
            Showing{" "}
            <span className="font-semibold text-red-600">
              {filteredUniversities.length}
            </span>{" "}
            universities
            {selectedCountry !== "All" && (
              <span className="ml-2">
                in{" "}
                <span className="font-semibold text-red-600">
                  {selectedCountry}
                </span>
              </span>
            )}
          </div>

          {/* Search */}
          <div className="w-full md:w-80 flex items-center bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
            <input
              type="search"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 rounded-2xl focus:outline-none"
            />
            <button className="p-3 text-gray-500 hover:text-blue-500 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* University List */}
        <UniversityList universities={filteredUniversities} />

        <div className="h-8" />
      </div>
    </main>
  );
};

export default UniversityHomePage;
