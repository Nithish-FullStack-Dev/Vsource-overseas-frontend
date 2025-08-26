import React, { useMemo, useState, useEffect } from "react";
import {
  UNIVERSITIES,
  COUNTRIES,
  Country,
  University,
} from "@/lib/Universities";
import UniversityList from "@/components/UniversityList";
import { useNavigate, useParams } from "react-router-dom";

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
      <div className="bg-cover bg-center bg-no-repeat pt-36 pb-20 relative z-0 " style={{
        backgroundImage: `url(/assets/images/universitiess/universityHomeBg.jpg)`,
      }}>
        <div className="bg-black/70 absolute inset-0 z-0"></div>
        <div className="mb-6 relative z-2 container mx-auto max-w-6xl p-4 ">
          <div className="mx-auto max-w-3xl text-white rounded-xl p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-red-600">Explore Top Universities</h2>
            <p className="mt-2 text-sm opacity-90">
              Filter by country and search to find the right match.
            </p>
          </div>
        </div>

      </div>
      {/* Dropdown filter */}
      <div className="w-full max-w-[1400px] mx-auto px-4">

        <div className="relative z-10 -mt-16 flex justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 flex justify-center">
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
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
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 max-w-6xl mx-auto px-4 mt-3">
          {/* Count */}
          <div className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
            Showing{" "}
            <span className="font-semibold text-indigo-600">{filteredUniversities.length}</span>{" "}
            universities
            {selectedCountry !== "All" && (
              <span className="ml-2">
                in <span className="font-semibold text-indigo-600">{selectedCountry}</span>
              </span>
            )}
          </div>

          {/* Search */}
          <div className="w-full md:w-64">
            <input
              type="search"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
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
