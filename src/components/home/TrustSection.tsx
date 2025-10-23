import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, IndianRupee, MapPin } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Service } from "@/types/LandingPage";
import ServicesSkeleton from "@/Loaders/LandingPages/ServicesSkeleton";

// Static icons mapped by known service titles
const iconsMap: Record<string, JSX.Element> = {
  "Dedicated Counsellor": <User size={40} color="#ffffff" />,
  "Universities Shortlisting": <GraduationCap size={40} color="#ffffff" />,
  "Loan Assistance": <IndianRupee size={40} color="#ffffff" />,
  "Pre & Post Landing Support": <MapPin size={40} color="#ffffff" />,
};

const fetchService = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.services][populate][services_list][populate][image][fields][0]=url&populate[Sections][on][blocks.services][populate][services_list][populate][image][fields][1]=alternativeText&populate[Sections][on][blocks.services][populate][services_list][populate][image][fields][2]=name`
  );
  return data.data[0].Sections[0];
};

const OurServices: React.FC = () => {
  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useQuery<Service>({
    queryKey: ["service"],
    queryFn: fetchService,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (isError) {
    toast.error("Failed to load services");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !services) {
    return <ServicesSkeleton />;
  }

  return (
    <section style={styles.section}>
      <h2
        style={styles.title}
        data-aos-anchor-placement="center-bottom"
        data-aos="zoom-in"
      >
        {services?.title || "Our Services"}
      </h2>

      <div className="scroll-container">
        {services?.services_list?.map((service, index) => (
          <div
            key={service.id}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{
              backgroundImage: `url(${service?.image?.url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition:
                index === services?.services_list?.length - 1
                  ? "center 15%"
                  : "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-[16px]"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div
                className="icon-wrapper mb-4"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {iconsMap[service.title] || <User size={40} color="#ffffff" />}
              </div>
              <h3
                className="text-lg font-bold mb-2 text-blue-500"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.title}
              </h3>
              <p
                className="text-sm"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

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
    color: "#000",
  },
};

export default OurServices;
