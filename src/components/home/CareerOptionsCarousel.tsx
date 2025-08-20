import React from "react";
import {
  FaBrain,
  FaDatabase,
  FaShieldAlt,
  FaBusinessTime,
  FaHandsHelping,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";

const categories = [
  {
    title: "Artificial Intelligence",
    icon: (
      <FaBrain className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Data science & Analytics",
    icon: (
      <FaDatabase className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Cyber Security",
    icon: (
      <FaShieldAlt className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Business",
    icon: (
      <FaBusinessTime className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Human Welfare",
    icon: (
      <FaHandsHelping className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "MBA",
    icon: (
      <FaGraduationCap className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Software Developer",
    icon: (
      <FaCode className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
  {
    title: "Machine Learning",
    icon: (
      <FaLaptopCode  className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95" />
    ),
  },
];

const PopularCategories = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          POPULAR CATEGORIES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-[#0A9CF9] rounded-xl shadow-md hover:shadow-lg p-6 text-center transition duration-300"
            >
              {category.icon}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
