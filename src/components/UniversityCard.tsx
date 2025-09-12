import React from "react";
import { Link } from "react-router-dom";
import { University } from "@/lib/Universities";

interface Props {
  university: University;
  delay?: number;
}

const UniversityCard: React.FC<Props> = ({ university, delay = 0 }) => {
  return (
    <div
      className="bg-white border border-gray-300 rounded-xl overflow-hidden  hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay={delay + 200}
    >
      <div className="w-[90%] mx-auto p-6 flex justify-center items-center h-40 border-b border-gray-300">
        <img
          src={university?.logo?.url}
          alt={`${university.name} logo`}
          className="max-w-full max-h-full object-contain"
          data-aos="zoom-out-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 400}
        />
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <h3
          className="font-bold text-xl text-gray-900 mb-1"
          data-aos="fade-up-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 450}
        >
          {university.name}
        </h3>
        <p
          className="text-sm text-gray-500 mb-2"
          data-aos="fade-up-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 500}
        >
          {university.campus}, {university.country}
        </p>
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate max-w-full"
          data-aos="fade-up-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 550}
        >
          {university.website}
        </a>
      </div>
      <div className="flex border-t border-gray-200">
        <Link
          to={`/explore-universities/${university.country}/${university?.slug}`}
          className="flex-1 px-4 py-3 text-center text-sm font-medium text-red-600 "
          data-aos="fade-up-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 600}
        >
          Know More
        </Link>
        <Link
          to="/"
          className="flex-1 px-4 py-3 text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          data-aos="fade-up-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay={delay + 650}
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;
