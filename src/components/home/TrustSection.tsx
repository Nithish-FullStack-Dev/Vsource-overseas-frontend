import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, IndianRupee, MapPin } from "lucide-react";
import dedicatedImage from "@/assets/homepage/Dedicated_Counsellor.webp";
import loadnImage from "@/assets/homepage/Loan_Assistance.webp";
import accImage from "@/assets/homepage/accommodation-food.webp";
import preImage from "@/assets/homepage/pre-post-landing.webp";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706926/Dedicated_Counsellor_mypjj8.webp",
    icon: <User size={40} color="#ffffff" />,
    title: "Dedicated Counsellor",
    description:
      "You’ll have a dedicated counsellor who will provide personalized guidance & support throughout your educational journey",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706925/accommodation-food_suedpf.webp",
    icon: <GraduationCap size={40} color="#ffffffff" />,
    title: "Universities Shortlisting",
    description:
      "We assist in selecting the best-fit universities based on your academic goals and preferences",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706929/Loan_Assistance_u5idg4.webp",
    icon: <IndianRupee size={40} color="#ffffffff" />,
    title: "Loan Assistance",
    description:
      "We guide you through the edu-carm loan process with our trusted financial partners for a hassle-free experience",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706937/pre-post-landing_rk8hka.webp",
    icon: <MapPin size={40} color="#ffffffff" />,
    title: "Pre & Post Landing Support",
    description:
      "We make sure you are informed and prepared before and after you travel abroad, easing your transition",
  },
];

const OurServices: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title} data-aos="fade-up">
        Our Services
      </h2>
      <div className="scroll-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            style={{
              backgroundImage: ` url(${service.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-[16px]"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div className="icon-wrapper mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-blue-500">
                {service.title}
              </h3>
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS for responsive behavior & animation */}
      <style>{`
        .scroll-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 16px;
          scroll-snap-type: x mandatory;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          position: relative;
          flex: 0 0 90%;
          max-width: 90%;
          scroll-snap-align: start;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          height: 60px;
        }

        @media (min-width: 768px) {
          .scroll-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
            gap: 24px;
          }

          .service-card {
            flex: none;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "40px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px",
    color: "#000", // Black heading
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#ffffffff", // Red title
  },
  cardDesc: {
    fontSize: "14px",
    color: "#ffffff",
  },
};

export default OurServices;
