import React from "react";
import { University } from "@/lib/Universities";
import UniversityCard from "./UniversityCard";

interface Props {
  universities: University[];
}

const UniversityList: React.FC<Props> = ({ universities }) => {
  if (universities.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        No universities found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {universities.map((uni) => (
        <UniversityCard key={uni?.slug} university={uni} />
      ))}
    </div>
  );
};

export default UniversityList;
