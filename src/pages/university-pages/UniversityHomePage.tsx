import React, { useState } from "react";

interface University {
  id: number;
  name: string;
  country: string;
  description: string;
  website: string;
}

const universities: University[] = [
  {
    id: 1,
    name: "University of Connecticut",
    country: "USA",
    description: "Storrs, Connecticut (Public Research University)",
    website: "https://uconn.edu",
  },
  {
    id: 2,
    name: "University of Bristol",
    country: "UK",
    description: "Bristol, England (Top-ranked UK University)",
    website: "https://bristol.ac.uk",
  },
  {
    id: 3,
    name: "Trinity College Dublin",
    country: "Ireland",
    description: "Dublin, Ireland (Historic Research University)",
    website: "https://tcd.ie",
  },
  {
    id: 4,
    name: "University of Melbourne",
    country: "Australia",
    description: "Melbourne, Australia (Leading Global University)",
    website: "https://unimelb.edu.au",
  },
  {
    id: 5,
    name: "University of Toronto",
    country: "Canada",
    description: "Toronto, Ontario (World’s Top Public Research University)",
    website: "https://utoronto.ca",
  },
  {
    id: 6,
    name: "University of Auckland",
    country: "New Zealand",
    description: "Auckland, New Zealand (Top University in NZ)",
    website: "https://auckland.ac.nz",
  },
];

const countries = ["All", "UK", "USA",  "Canada", "Ireland", "France"];

const UniversityHomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUniversities = universities.filter((uni) => {
    const matchesCountry =selectedCountry === "All" || uni.country === selectedCountry;
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          List of Top Universities To Study Abroad
        </h1>
        <p className="text-gray-600 mt-2">
          Choose a university that fuels your passion & purpose and that quenches your academic & career pursuits.
        </p>
        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600">
          Talk to an Expert
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {/* Country Dropdown */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm w-64"
        >
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search Universities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm w-64"
        />
      </div>

      {/* University Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Uni Logo Placeholder - replace with your images */}
              <div className="h-16 w-16 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
                Logo
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{uni.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{uni.description}</p>
              <div className="flex gap-2 mt-4">
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
                >
                  Know More
                </a>
                <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No universities found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UniversityHomePage;
