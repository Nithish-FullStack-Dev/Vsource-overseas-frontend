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
      <FaBrain className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Data science & Analytics",
    icon: (
      <FaDatabase className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Cyber Security",
    icon: (
      <FaShieldAlt className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Business",
    icon: (
      <FaBusinessTime className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Human Welfare",
    icon: (
      <FaHandsHelping className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "MBA",
    icon: (
      <FaGraduationCap className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Software Developer",
    icon: (
      <FaCode className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
  {
    title: "Machine Learning",
    icon: (
      <FaLaptopCode className="text-white text-6xl mb-4 mx-auto transform transition-transform duration-300 ease-out " />
    ),
  },
];

const PopularCategories = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          POPULAR CATEGORIES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-[#0A9CF9] rounded-xl shadow-md hover:shadow-lg p-6 text-center transition duration-300"
              data-aos="flip-left"
              data-aos-duration="800"
            >
              <div className="hi-icon-wrap">{category.icon}</div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mt-3">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
      .hi-icon-wrap {
  position: relative;
  display: inline-flex;  /* keeps things centered */
  align-items: center;
  justify-content: center;
  width: 100px;  /* adjust size based on icon */
  height: 100px;
}

.hi-icon-wrap svg {
  position: relative;
  z-index: 2;
  font-size: 48px;  /* icon size */
  margin: 0;
}

/* Circle border */
.hi-icon-wrap::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 3px solid #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: all 0.3s ease;
}

/* Hover effect */
.group:hover .hi-icon-wrap::after {
  border-style: dashed;
  animation: spinAround 9s linear infinite;
}

@keyframes spinAround {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

    `}
      </style>
    </section>
  );
};

export default PopularCategories;
