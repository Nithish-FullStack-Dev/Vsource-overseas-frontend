import React from "react";
import { useParams, Link } from "react-router-dom";
import { UNIVERSITIES, University } from "@/lib/Universities";

const UniversityDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const university = UNIVERSITIES.find((u: University) => u.id === slug);

  if (!university) {
    return (
      <div className="p-6 text-center text-gray-500">
        University not found.
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={university.logo}
          alt={university.name}
          className="w-28 h-28 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{university.name}</h1>
        <p className="text-gray-600 mb-2">
          {university.campus} • {university.country}
        </p>
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          Visit Website
        </a>
      </div>

      <div className="mt-4">
        <Link
          to="/explore-universities"
          className="text-indigo-600 hover:underline"
        >
          ← Back to Universities
        </Link>
      </div>
    </main>
  );
};

export default UniversityDetails;
