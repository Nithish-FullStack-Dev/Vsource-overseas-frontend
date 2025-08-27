// import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { UNIVERSITIES, University } from "@/lib/Universities";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "rankings", label: "Rankings" },
  { id: "intakes", label: "Intakes" },
  { id: "courses", label: "Top Courses" },
  { id: "cost", label: "Cost to Study" },
  { id: "scholarships", label: "Scholarships" },
  { id: "admissions", label: "Admissions" },
  { id: "placements", label: "Placements" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQs" },
];

const UniversityDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const university = UNIVERSITIES.find((u: University) => u.id === slug);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const courses = university?.courses || [];
  const coursesPerPage = 4;
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = Math.ceil(courses.length / coursesPerPage);

  const startIdx = currentSlide * coursesPerPage;
  const visibleCourses = courses.slice(startIdx, startIdx + coursesPerPage);

  // Pad with nulls if less than 4
  const paddedCourses = [...visibleCourses];
  while (paddedCourses.length < coursesPerPage) {
    paddedCourses.push(null);
  }

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };
  // Add handleToggle function
  const handleToggle = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  };
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {};
  TABS.forEach((tab) => {
    sectionRefs[tab.id] = useRef<HTMLDivElement>(null);
  });

  if (!university) {
    return (
      <div className="p-6 text-center text-gray-500">University not found.</div>
    );
  }

  const handleScrollTo = (id: string) => {
    const ref = sectionRefs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white">
        <img
          src={university.banner || "/assets/images/university-default.jpg"}
          alt={university.name}
          className="w-full h-64 md:h-96 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20">
          <img
            src={university.logo}
            alt={university.name}
            className="w-28 h-28 object-contain bg-white rounded-lg p-2 shadow mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold">{university.name}</h1>
          <p className="text-lg">
            {university.campus} • {university.country}
          </p>
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-orange-600"
          >
            Apply with VSource
          </a>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4 text-sm text-gray-600">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/explore-universities" className="hover:text-orange-500">
              Universities
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{university.country}</li>

          <li>/</li>
          <li className="text-gray-900 font-medium">{university.name}</li>
        </ol>
      </nav>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleScrollTo(tab.id)}
              className="px-4 md:px-6 py-3 text-gray-700 font-medium hover:text-orange-500 whitespace-nowrap"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content + Form */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div ref={sectionRefs["overview"]}>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {Array.isArray(university.overview) ? (
                university.overview.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>
                  {university.name} is a modern university globally recognized for high-quality education, applied research, and international collaborations.
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <p className="text-xl font-bold text-red-600">{university.stats.acceptanceRate}</p>
                <p className="text-sm">Acceptance Rate</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-xl font-bold text-blue-600">{university.stats.intlStudents}</p>
                <p className="text-sm">Total International Students</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <p className="text-xl font-bold text-yellow-600">{university.stats.ratio}</p>
                <p className="text-sm">Student to Faculty Ratio</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-xl font-bold text-green-600">{university.stats.placement}</p>
                <p className="text-sm">Placement Rate</p>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div ref={sectionRefs["rankings"]} className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg">
                <span className="text-orange-500 text-2xl">⭐</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Rankings</h2>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              With over 2,000 expert teaching staff and state-of-the-art facilities, {university.name}
              is committed to putting students first. This dedication has earned it a strong reputation
              and rising rankings worldwide. Notably, {university.name} has achieved its highest-ever
              placement by moving up in global rankings.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              The university’s commitment to teaching quality is further highlighted by its awards in
              various ranking frameworks, recognizing exceptional student experiences and outcomes.
              This growth is due to continual investment in facilities and a supportive environment
              designed to help students reach their potential.
            </p>

            {/* Ranking Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {university.rankings.map((ranking, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full shadow">
                    <span className="text-orange-500 text-xl">⭐</span>
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xl font-bold text-gray-900">{ranking.rank}</p>
                    <p className="text-gray-600">{ranking.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Intakes */}
          <div ref={sectionRefs["intakes"]}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 p-2 rounded">📄</span>
              Intakes
            </h2>

            {/* Intro Text */}
            <p className="text-gray-700 mb-6">
              {university.intakes?.[0]?.text?.map((text, idx) => (
                <span key={idx} className="block mb-2">
                  {text}
                </span>
              )) ??
                "The university offers multiple intakes throughout the year, with the main intakes in September, January, and May."}
            </p>

            {/* Accordion */}
            <div className="space-y-4">
              {university.intakes.slice(1).map((intake, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md transition-all duration-300"
                >
                  {/* Summary / Toggle */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full text-left p-4 font-semibold text-lg text-gray-800 flex justify-between items-center"
                  >
                    <span>{intake.month} Intake</span>
                    <span>{activeIndex === index ? "▲" : "▼"}</span>
                  </button>

                  {/* Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${activeIndex === index ? "max-h-40 py-2" : "max-h-0 py-0"
                      }`}
                  >
                    <p className="text-gray-600">{intake.dropText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Top Courses */}
          <div ref={sectionRefs["courses"]}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 p-2 rounded">📚</span>
              Top Courses at {university.name}
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {university.name} is well-known for offering many courses at undergraduate and postgraduate levels...
            </p>

            {/* Course Tabs */}
            <div className="mb-6">
              <div className="flex gap-4 mb-8">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full">Masters</button>
                <button className="px-6 py-2 border border-gray-300 rounded-full">Bachelors</button>
              </div>
            </div>
            <div className="w-full max-w-4xl mx-auto">
              {/* Course List */}
              {/* Course List Container with Fixed Height for 4 Cards */}
              <div className="grid grid-rows-4 gap-4 min-h-[700px] transition-all duration-500 ease-in-out">
                {visibleCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col justify-between"
                  >
                    <h3 className="font-semibold text-lg mb-2">{course}</h3>
                    <hr className="border-gray-200 mb-3" />
                    <div className="flex justify-between items-center text-sm text-gray-700">
                      <div>
                        <div className="font-medium text-black">£18,600</div>
                        <div className="text-xs">Annual Fee</div>
                      </div>
                      <div>
                        <div className="font-medium text-black">12 Months</div>
                        <div className="text-xs">Duration</div>
                      </div>
                      <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty Rows for Layout Padding Only */}
                {Array.from({ length: coursesPerPage - visibleCourses.length }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="invisible" />
                ))}
              </div>


              {/* Navigation Arrows */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  className={`p-2 rounded-full border transition ${currentSlide === 0
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-black border-gray-400 hover:bg-gray-100"
                    }`}
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSlide >= totalSlides - 1}
                  className={`p-2 rounded-full border transition ${currentSlide >= totalSlides - 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-black border-gray-400 hover:bg-gray-100"
                    }`}
                >
                  <FaChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Cost to Study */}
          <div ref={sectionRefs["cost"]}>
            <h2 className="text-2xl font-bold mb-4">Cost to Study</h2>
            <p className="text-gray-700">
              The average tuition fees range between $15,000 - $25,000 per year
              depending on the program.
            </p>
          </div>

          {/* Scholarships */}
          <div ref={sectionRefs["scholarships"]}>
            <h2 className="text-2xl font-bold mb-4">Scholarships</h2>
            <p className="text-gray-700">
              Multiple merit and need-based scholarships are available for
              international students.
            </p>
          </div>

          {/* Admissions */}
          <div ref={sectionRefs["admissions"]}>
            <h2 className="text-2xl font-bold mb-4">Admissions</h2>
            <p className="text-gray-700">
              Students must apply online with academic transcripts, English
              proficiency, and other required documents.
            </p>
          </div>

          {/* Placements */}
          <div ref={sectionRefs["placements"]}>
            <h2 className="text-2xl font-bold mb-4">Placements</h2>
            <p className="text-gray-700">
              Strong industry connections help graduates secure employment
              globally.
            </p>
          </div>

          {/* Gallery */}
          <div ref={sectionRefs["gallery"]}>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img
                src="/assets/images/university1.jpg"
                alt="gallery"
                className="rounded-lg shadow"
              />
              <img
                src="/assets/images/university2.jpg"
                alt="gallery"
                className="rounded-lg shadow"
              />
              <img
                src="/assets/images/university3.jpg"
                alt="gallery"
                className="rounded-lg shadow"
              />
            </div>
          </div>

          {/* FAQs */}
          <div ref={sectionRefs["faq"]}>
            <h2 className="text-2xl font-bold mb-4">FAQs</h2>
            <p className="text-gray-700">
              Frequently asked questions about studying at {university.name}.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-center">
              Want to Study in {university.country}?
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                type="tel"
                placeholder="Mobile"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <select className="w-full border rounded-lg px-3 py-2" required>
                <option value="">Preferred Destination</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UniversityDetails;
