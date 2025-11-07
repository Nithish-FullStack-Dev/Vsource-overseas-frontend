import { useEffect } from "react";
// import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AboutSection from "../components/home/Aboutsectioninside";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AboutUsBanner, InnerAboutUs, Members } from "@/types/LandingPage";
import { toast } from "sonner";
import axios from "axios";
import TeamSkeleton from "@/Loaders/about-us/TeamSkeleton";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import SectionTitle from "@/components/SectionTitle";

const fetchAboutBanner = async () => {
  const url = `${
    import.meta.env.VITE_CMS_GLOBALURL
  }/api/about-us?populate[about][on][about-us.hero][populate][banner][fields][0]=url&populate[about][on][about-us.hero][populate][banner][fields][1]=alternativeText`;
  const res = await axios.get(url);
  return res?.data?.data?.about[0];
};

const fetchAboutUs = async () => {
  const url = `${
    import.meta.env.VITE_CMS_GLOBALURL
  }/api/about-us?populate[about][on][about-us.about][populate][subheadings]=true&populate[about][on][about-us.about][populate][about_cards][populate][image][fields][0]=url&populate[about][on][about-us.about][populate][about_cards][populate][image][fields][1]=alternativeText`;
  const res = await axios.get(url);
  return res?.data?.data?.about[0];
};

const fetchMembers = async () => {
  const url = `${
    import.meta.env.VITE_CMS_GLOBALURL
  }/api/about-us?populate[about][on][about-us.management-team][populate][members][populate][image][fields][0]=url&populate[about][on][about-us.management-team][populate][members][populate][image][fields][1]=alternativeText`;
  const res = await axios.get(url);
  return res?.data?.data?.about[0];
};

const AboutPage = () => {
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<AboutUsBanner>({
    queryKey: ["bannerAbout"],
    queryFn: fetchAboutBanner,
    staleTime: Infinity,
  });

  const {
    data: aboutUsData,
    isLoading: aboutLoading,
    isError: aboutError,
    error: aboutErr,
  } = useQuery<InnerAboutUs>({
    queryKey: ["aboutUs"],
    queryFn: fetchAboutUs,
    staleTime: Infinity,
  });

  const {
    data: members,
    isLoading: memberLoading,
    isError: memberError,
    error: memberErr,
  } = useQuery<Members>({
    queryKey: ["members"],
    queryFn: fetchMembers,
    staleTime: Infinity,
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load banner");
    console.log("failed to load banner", error);
  }

  if (memberError) {
    toast.error("failed to load Members");
    console.log("failed to load Members", memberErr);
  }

  if (isLoading || !aboutData) {
    return <BannerSkeleton />;
  }

  if (memberLoading || !members) {
    return <TeamSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-40 pb-36 bg-cover bg-center bg-no-repeat relative text-white"
        style={{
          backgroundImage: `url(/assets/images/about-banner.jpg)`,
        }}
      >
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/60 to-gray-900/90"></div>

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-300">
              Learn about our journey, our team, and our mission to provide
              exceptional educational consultancy for over 20 years.
            </p>
          </div>
        </div>
      </section>
      <style>{`
      .py-16 {
    padding-top:0.5rem !important;
    padding-bottom: 4rem;
}

      `}</style>

      {/* About Content */}

      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <AboutSection
            aboutData={aboutUsData}
            error={aboutErr}
            isError={aboutError}
            isLoading={aboutLoading}
          />
        </div>
      </section>

      {/* Team Section */}

      <>
        <section className="py-16 md:py-24">
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <SectionTitle title="Management Team" />
            <StyledTeamWrapper>
              <div className="main">
                {teamMembers?.map((member, index) => {
                  const delay = 50 + index * 50; // 100ms base + 100ms per index
                  return (
                    <div
                      className="profile-card"
                      key={index}
                      data-aos="fade-up"
                      data-aos-anchor-placement="center-bottom"
                    >
                      <div className="img">
                        <img
                          src={teamMembers[index]?.image}
                          alt={teamMembers[index]?.name}
                          data-aos="flip-left"
                          data-aos-anchor-placement="center-bottom"
                          data-aos-delay={delay}
                        />
                      </div>
                      <div className="caption">
                        <h3
                          data-aos="fade-right"
                          data-aos-anchor-placement="center-bottom"
                          data-aos-delay={delay}
                        >
                          {teamMembers[index]?.name || "failed to load"}
                        </h3>
                        <p
                          data-aos="fade-right"
                          data-aos-anchor-placement="center-bottom"
                          data-aos-delay={delay}
                        >
                          {teamMembers[index]?.position || "failed to load"}
                        </p>
                      </div>
                      <div className="extra-info">
                        {teamMembers[index]?.bio || "failed to load"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </StyledTeamWrapper>
          </div>
        </section>
      </>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <AnimateOnScroll>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#0052CC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#0052CC]">
                  Our Vision
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To be the leading educational consultancy in India, recognized
                  for our integrity, personalized approach, and consistent
                  delivery of successful academic and career outcomes for our
                  students.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll delay={200}>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#FFC107]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#FFC107]">
                  Our Mission
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To empower students with comprehensive guidance, and
                  supportive resources that enable them to make informed
                  decisions about their educational and career paths, both in
                  India and abroad.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

const StyledTeamWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px 20px;
    padding: 10px;
  }

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 260px;
    height: 355px;
    background: #fff;
    padding: 20px 20px 0px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    display: flex;
    flex-direction: column;
  }
  .jIozqo .img img {
    width: 200px !important;
    height: 200px !important;
    /* object-fit: cover; */
    border-radius: 15px;
    -shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
  }
  .profile-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }

  .profile-card .img {
    width: 100%;
    height: 200px; /* Fixed height for image container */
    position: relative;
    transform: translateY(-45px);
    margin-bottom: 15px;
  }

  .img img {
    width: 200px !important;
    height: 200px !important;
    // object-fit: cover; /* Ensures images maintain aspect ratio */
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    margin-left: 20px;
  }

  .profile-card:hover .img img {
    transform: scale(1.05);
  }

  .caption {
    margin-top: 10px;
    transform: translateY(-45px);
  }

  .caption h3 {
    font-size: clamp(0.7rem, 2.5vw, 1.1rem);
    margin: 0;
    color: #333;
    word-wrap: break-word;
  }

  .caption p {
    font-size: clamp(0.7rem, 2vw, 1rem);
    color: rgb(243, 35, 8);
    margin: 5px 0 5px;
    word-wrap: break-word;
  }

  .extra-info {
    font-size: clamp(0.5rem, 2vw, 1rem);
    color: #555;
    opacity: 1;
    transform: translateY(-45px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .profile-card,
  .img img,
  .extra-info {
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 768px) {
    .main {
      gap: 50px 30px;
    }

    .profile-card {
      max-width: 280px;
      height: 395px; /* Maintain same height on desktop */
      padding: 30px 30px 0px 30px;
    }

    .profile-card .img {
      height: 220px; /* Slightly larger images on desktop */
    }
  }

  @media (max-width: 460px) {
    .main {
      gap: 50px 30px;
    }
    .profile-card {
      max-width: 260px;
      height: 320px; /* Slightly smaller on mobile */
      padding: 10px 10px 0px 10px;
    }

    .profile-card .img {
      height: 180px; /* Slightly smaller images on mobile */
    }

    .caption h3 {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
    }

    .caption p {
      font-size: clamp(1.1rem, 2vw, 0.9rem);
    }
    .extra-info {
      font-size: clamp(0.8rem, 2vw, 0.9rem);
    }
  }
`;

const teamMembers = [
  {
    name: "Mr. Mohammed Mustafa",
    position: "Founder",
    image: "/assets/images/about-us/imgi_6_1698599558.jpg",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Nagender Rao",
    position: "Managing Director",
    image: "/assets/images/about-us/imgi_7_1742728530.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Charan Teja",
    position: "CEO",
    image: "/assets/images/about-us/imgi_8_1742879268.jpg",
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Y Ranjith",
    position: "CFO",
    image: "/assets/images/about-us/imgi_9_1698845224.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  // {
  //   name: "Mr. Sai Siva Nag",
  //   position: "Executive Director",
  //   image: "/assets/images/about-us/imgi_10_1742793595",
  //   bio: "20 YEARS WITH VSOURCE",
  // },
  {
    name: "Mr. Shaik Yasin",
    position: "Executive Director",
    image: "/assets/images/about-us/imgi_10_1742793595.jpg",
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Akram",
    position: "Director, Admissions",
    image: "/assets/images/about-us/imgi_11_1746726161.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Satyam Tomer",
    position: "Chief Technical Officer",
    image: "/assets/images/about-us/imgi_12_1659255847.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Virendra Singh",
    position: "Vice President",
    image: "/assets/images/about-us/imgi_13_1633425065.jpg",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Vijay Kumar",
    position: "Chief Advisor",
    image: "/assets/images/about-us/imgi_14_1681479951.jpg",
    bio: "VSOURCE GROUP",
  },
  {
    name: "Mr. Arun",
    position: "Chief Operating Officer",
    image: "/assets/images/about-us/1653732726.jpg",
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Tejesh Naidu",
    position: "Director, Operations",
    image: "/assets/images/about-us/imgi_16_1698838414.jpg",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Rajashekar",
    position: "Director, Education",
    image: "/assets/images/about-us/imgi_18_1653732679.jpg",
    bio: "9 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Habib",
    position: "Director, Marketing",
    image: "/assets/images/about-us/imgi_17_1746727815.jpg",
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mrs. Pushpalatha Reddy",
    position: "Director, Overseas",
    image: "/assets/images/about-us/imgi_20_1700658713.jpg",
    bio: "7 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Moulali",
    position: "Director, Fintech",
    image: "/assets/images/about-us/imgi_19_1746799571.jpg",
    bio: " ",
  },
  {
    name: "Dr. Giorgi Mikadze",
    position: "Director, Services. LLC",
    image: "/assets/images/about-us/imgi_22_1742967303.jpg",
    bio: "Based in Georgia, specializing in services management.",
  },
  {
    name: "Dr. Mariam Kandelaki",
    position: "Director, Student Welfare",
    image: "/assets/images/about-us/imgi_21_1653732920.jpg",
    bio: "Focused on student welfare initiatives in Georgia.",
  },
  {
    name: "Mr. Sreenath Reddy",
    position: "Director, Administration",
    image: "/assets/images/about-us/imgi_23_1698835988.jpg",
    bio: "Leads administrative operations at VSOURCE Company.",
  },
  {
    name: "Ms. K Chaithanya",
    position: "HR",
    image: "/assets/images/about-us/imgi_24_1742794381.jpg",
    bio: "Human Resources specialist at VSOURCE Company.",
  },
  {
    name: "Mr. Narun Reddy",
    position: "Head, Marketing",
    image: "/assets/images/about-us/imgi_25_1702922280.jpg",
    bio: "Heads marketing operations for VSOURCE Varsity.",
  },
  {
    name: "Ms. Navya",
    position: "Head, Marketing",
    image: "/assets/images/about-us/imgi_26_1698841744.jpg",
    bio: "Marketing lead for VSOURCE Overseas.",
  },
  {
    name: "Ms. Deepika",
    position: "Incharge, B.P.O",
    image: "/assets/images/about-us/imgi_27_1702989960.jpg",
    bio: "Manages B.P.O operations at VSOURCE Fintech.",
  },

  {
    name: "Ms. Radha",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_35_1653733108.jpg",
    bio: "Branch Manager for Bengaluru operations.",
  },
  {
    name: "Mr. Mahesh",
    position: "B.P.O Incharge",
    image: "/assets/images/about-us/imgi_28_1746788220.jpg",
    bio: "Overseeing B.P.O operations at VSOURCE Overseas.",
  },
  // {
  //   name: "Mr. Kumar",
  //   position: "Branch Manager",
  //   image: "/assets/images/about-us/imgi_36_1681473173.jpg",
  //   bio: "Leading the Ongole branch.",
  // },
  {
    name: "Mr. Srinivas Chowdary",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_29_1742733198.jpg",
    bio: "Managing branch operations in Tirupati.",
  },
  {
    name: "Mr. Srinadh Yadav",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_30_1706010104.jpg",
    bio: "Branch Manager for Vijayawada.",
  },
  {
    name: "Mr. Kiran Kumar",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_31_1698844684.jpg",
    bio: "Heading the Vizag branch.",
  },
  {
    name: "Ms. Nikhitha",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_32_1702915574.jpg",
    bio: "Branch Manager for Dilsukhnagar.",
  },
  {
    name: "Mr. Raj",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_33_1698841454.jpg",
    bio: "Managing the Ameerpet branch.",
  },
  {
    name: "Ms. Spandana",
    position: "Branch Manager",
    image: "/assets/images/about-us/imgi_34_1698839202.jpg",
    bio: "Branch Manager in Kukatpally.",
  },
  {
    name: "Mrs. Tako",
    position: "Administration",
    image: "/assets/images/about-us/imgi_37_1742967370.jpg",
    bio: "Part of the administrative team in Georgia.",
  },
  {
    name: "Mr. Zaza",
    position: "Administration",
    image: "/assets/images/about-us/imgi_38_1702987001.jpg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Aleksandre",
    position: "Accountant",
    image: "/assets/images/about-us/imgi_39_1653732858.jpg",
    bio: "Accountant based in Georgia.",
  },
  {
    name: "Ms. Nino",
    position: "Administration",
    image: "/assets/images/about-us/imgi_40_1742967444.jpg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Dimitrilp",
    position: "Administration",
    image: "/assets/images/about-us/imgi_41_1703151553.jpg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Noorbaz Khan Qaderi",
    position: "Administration",
    image: "/assets/images/about-us/imgi_42_1653732795.jpg",
    bio: "Administrative team member in Russia.",
  },
  {
    name: "Mrs. Shaista Ashraf",
    position: "Head of Admissions",
    image: "/assets/images/about-us/imgi_43_1684232284.jpg",
    bio: "Oversees admissions in UAE and Saudi Arabia.",
  },
  // {
  //   name: "Mr. Nithin",
  //   position: "Senior Associate",
  //   image:
  //     "https://vsourceoverseas.com/uploads/about_team/IMG_20231220_093457.jpg",
  //   bio: "Senior Associate at VSOURCE Overseas.",
  // },
  {
    name: "Mr. Shaik Gafoor",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_44_1698835021.jpg",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Venkata Sasi kumar",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_45_1709625617.jpg",
    bio: "Senior Associate at VSOURCE Varsity.",
  },
  {
    name: "Mr. Mahesh Patil",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_46_1711625393.jpg",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Bhanu Sai Prakash",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_47_1720255503.jpg",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Radha Krishna",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_48_1746798079.jpg",
    bio: "Senior Associate at VSOURCE Varsity.",
  },
  {
    name: "Mr. Venkat",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_49_1746798440.jpg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  // {
  //   name: "Mr. Shaik Moulali",
  //   position: "Senior Associate",
  //   image: "/assets/images/about-us/imgi_49_1746798440.jpg",
  //   bio: "Senior Associate at VSOURCE Fintech.",
  // },
  {
    name: "Mr. Nagaraju",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_50_1746799685.jpg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Ms. Kavyasree",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_55_1746800414.jpg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Mr. Mahesh Goud",
    position: "Senior Associate",
    image: "/assets/images/about-us/imgi_51_1746799807.jpg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },

  {
    name: "Mr. RAKESH",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_52_1746800109.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. SHAIK MUNEER",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_53_1746800202.jpg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. M PAVAN",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_54_1746800299.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  // {
  //   name: "Ms. DIVYA",
  //   position: "Jr. ASSOCIATE",
  //   image: "https://vsourceoverseas.com/uploads/about_team/DIVYA.jpeg",
  //   bio: "Associated with VSOURCE OVERSEAS.",
  // },
  // {
  //   name: "Mr. ATHAR PASHA",
  //   position: "Jr. ASSOCIATE",
  //   image: "https://vsourceoverseas.com/uploads/about_team/ATHAR.jpeg",
  //   bio: "Associated with VSOURCE VARSITY.",
  // },
  {
    name: "Mr. NAGA VENKATESH",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_56_1746800837.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. S PAVAN",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_57_1746800915.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. BHANU SAIRAM",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_58_1746801341.jpg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. VIJAY",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_59_1746801607.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. SUBRAHMANYAM",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_60_1746802086.jpg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. LAKSHMAN",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_61_1746802279.jpg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. MOHAN KRISHNA",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_62_1746802437.jpg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. RAMU",
    position: "Jr. ASSOCIATE",
    image: "/assets/images/about-us/imgi_63_1746802584.jpg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. FAHAD",
    position: "DIGITAL MARKETING",
    image: "/assets/images/about-us/imgi_64_1702915314.jpg",
    bio: "Specialist in digital marketing for VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. VAMSHI",
    position: "DIGITAL MARKETING",
    image: "/assets/images/about-us/imgi_65_1746802945.jpg",
    bio: "Specialist in digital marketing for VSOURCE VARSITY.",
  },
  {
    name: "Mr. Purushotham Reddy",
    position: "GROUND MARKETING",
    image: "/assets/images/about-us/imgi_66_1657097156.jpg",
    bio: "Ground marketing expert for Andhra & Telangana.",
  },
];
