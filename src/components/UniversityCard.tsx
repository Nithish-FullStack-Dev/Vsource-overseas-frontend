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
        className="w-full h-28 object-contain mb-3"
      />
      <hr className="my-3" />
      <h3 className="font-semibold text-gray-900 text-lg">
        {university.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {university.campus} • {university.country}
      </p>
      <p className="text-sm text-black mb-3">
        {university.website}
      </p>
      <div className="flex justify-between gap-2">
        <Link
          to={`/explore-universities/${university.country}/${university.key}`}
          className="flex-1 text-center mt-3 px-3 py-2 text-sm border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
        >
          Know More
        </Link>
        <Link
          to="/"
          className="flex-1 text-center mt-3 px-3 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded hover:opacity-90 transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;
