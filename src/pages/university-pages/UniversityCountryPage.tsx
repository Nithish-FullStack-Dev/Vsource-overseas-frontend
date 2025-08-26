import React from "react";
import { useParams } from "react-router-dom";
import { UNIVERSITIES, University } from "@/lib/Universities";
import UniversityList from "@/components/UniversityList";

const UniversityCountryPage: React.FC = () => {
  const { country } = useParams<{ country: string }>();

  const universities = UNIVERSITIES.filter(
    (uni: University) => uni.country === country
  );

  return (
    <main className="container mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-bold mb-4">{country} Universities</h2>
      <UniversityList universities={universities} />
    </main>
  );
};

export default UniversityCountryPage;
