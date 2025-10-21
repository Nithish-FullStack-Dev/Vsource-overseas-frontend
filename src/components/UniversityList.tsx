import React, { useState } from "react";
import { University } from "@/lib/Universities";
import UniversityCard from "./UniversityCard";
import DelayedPopup from "./DelayedPopup";

interface Props {
  universities: University[];
}

const UniversityList: React.FC<Props> = ({ universities }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
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
        <UniversityCard
          key={uni?.documentId}
          university={uni}
          onClick={setShowPopup}
        />
      ))}
      {showPopup && (
        <DelayedPopup
          onMinimize={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default UniversityList;
