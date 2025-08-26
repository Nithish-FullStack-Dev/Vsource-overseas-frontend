import React from "react";
import { Link } from "react-router-dom";
import { University } from "@/lib/Universities";

interface Props {
  university: University;
}

const UniversityCard: React.FC<Props> = ({ university }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition">
      <img
        src={university.logo}
        alt={university.name}
        className="w-20 h-20 object-contain mb-3"
      />
      <h3 className="font-semibold text-gray-900">{university.name}</h3>
      <p className="text-sm text-gray-500">
        {university.campus} • {university.country}
      </p>
      <Link
        to={`/explore-universities/${university.country}/${university.id}`}
        className="inline-block mt-3 px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
      >
        View
      </Link>
    </div>
  );
};

export default UniversityCard;
