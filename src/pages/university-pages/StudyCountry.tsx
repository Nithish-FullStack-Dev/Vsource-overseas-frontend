import React, { useState } from "react";
import UniversityList from "../../components/UniversityList";
import { UNIVERSITIES } from "../../lib/Universities";

const countries = ["All", "USA", "UK", "Canada", "Ireland", "France"];

const StudyCountry: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = UNIVERSITIES.filter(
    (uni) =>
      (selectedCountry === "All" || uni.country === selectedCountry) &&
      uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Universities</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className="text-gray-600 text-sm">
            {filtered.length} Universities Found
          </span>
        </div>

        <input
          type="text"
          placeholder="Search Universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-64"
        />
      </div>

      <UniversityList universities={filtered} />
    </div>
  );
};

export default StudyCountry;
