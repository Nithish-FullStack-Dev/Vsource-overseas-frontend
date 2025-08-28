import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Placement {
  description: string[];
  TopRecruitersImg: string[];
  jobs: Array<{
    JobProfiles: string;
    AverageSalary: string;
  }>;
}

interface PlacementProps {
  items: Placement;
}

const UniversityPlacement: React.FC<PlacementProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(items.TopRecruitersImg.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="space-y-2">
        {items.description.map((desc, index) => (
          <p key={index} className="text-gray-700 text-justify tracking-tight">
            {desc}
          </p>
        ))}
      </div>

      {/* Recruiters Carousel */}
      <div>
        <h2 className="text-xl font-bold mb-4">Top Recruiters</h2>
        <div className="relative w-full overflow-hidden py-3">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${(items.TopRecruitersImg.length / itemsPerView) * 100}%`,
              transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
            }}
          >
            {items.TopRecruitersImg.map((src, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center p-4"
              >
                <div className="bg-white shadow-md rounded-xl p-6 flex justify-center items-center h-40 w-full">
                  <img
                    src={src}
                    alt={`Recruiter ${index}`}
                    className="max-h-16 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <button
              onClick={prevSlide}
              className="  p-2 rounded-full shadow-md"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="  p-2 rounded-full shadow-md"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border border-gray-300rounded-lg ">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 bg-red-200 text-black px-4 py-2 text-left">
                Job Profiles
              </th>
              <th className="border border-gray-300 bg-red-600 text-white px-4 py-2 text-left">
                Average Salary in £
              </th>
            </tr>
          </thead>
          <tbody>
            {items.jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {job.JobProfiles}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.AverageSalary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityPlacement;
