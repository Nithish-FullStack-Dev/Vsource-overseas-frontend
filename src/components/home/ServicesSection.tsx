import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

const services = [
  {
    title: "BTECH",
    description:
      "Igniting Your Journey To Engineering Excellence\nIn CSE (AI/ML)",
    imageSrc: "/assets/images/badges/btech.jpeg",
    externalUrl: "https://vsourcevarsity.com/",
    logoSrc: "/assets/images/logo varsity.png",
  },
  {
    title: "MBBS IN ABROAD",
    description:
      "Affordable, Globally Recognized\n MBBS Abroad\nGeorgia | Russia",
    imageSrc: "/assets/images/badges/mbbs.jpg",
    externalUrl: "https://vsourceadmissions.com/",
    logoSrc: "/assets/images/mini logo.png",
  },
  {
    title: "EDU LOAN",
    description:
      "100% EDUCATION LOAN\nFOR BTECH IN NAAC A, A+, A++\nFOR MASTER IN US | UK | IRELAND | CANADA | FRANCE",
    imageSrc: "/assets/images/badges/edu.jpg",
    externalUrl: "https://www.vsourcefintech.com/",
    logoSrc: "/assets/images/logo fintech.png",
  },
];

const ServicesSection = () => {
  return (
 <section className="py-16 md:py-24 bg-white text-black">
  <div className="w-full max-w-[1400px] mx-auto px-4">
    <h2
      className="text-3xl md:text-4xl font-bold text-center"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      Our Comprehensive Programs
    </h2>
    <p
      className="mt-3 text-center text-gray-600 max-w-2xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="800"
    >
      Comprehensive educational solutions to help you achieve your academic and career goals
    </p>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={service.title}
          onClick={() => window.open(service.externalUrl, "_blank")}
          className="relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat cursor-pointer transform transition-transform duration-300 hover:scale-105 min-h-[320px]"
          style={{ backgroundImage: `url(${service.imageSrc})` }}
          data-aos="fade-up"
          data-aos-delay={index * 200}   // stagger cards
          data-aos-duration="800"
        >
          <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col justify-between p-5">
            <div>
              <img
                src={service.logoSrc}
                alt="Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 mb-3"
                onClick={(e) => e.stopPropagation()}
                data-aos="zoom-in"
                data-aos-delay={index * 200 + 100}
                data-aos-duration="700"
              />
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight"
                data-aos="fade-up"
                data-aos-delay={index * 200 + 200}
                data-aos-duration="700"
              >
                {service.title}
              </h3>
              <p
                className="text-sm text-white whitespace-pre-line leading-snug"
                data-aos="fade-up"
                data-aos-delay={index * 200 + 300}
                data-aos-duration="700"
              >
                {service.description}
              </p>
            </div>

            <div
              className="mt-3 flex gap-3 flex-wrap sm:flex-nowrap"
              data-aos="fade-up"
              data-aos-delay={index * 200 + 400}
              data-aos-duration="700"
            >
              <a
                href="/assets/media/Brochure 16 pages _CTC.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm bg-white text-black font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-gray-200 transition text-center flex-1 sm:flex-none"
                onClick={(e) => e.stopPropagation()}
                data-aos="zoom-in"
                data-aos-delay={index * 200 + 500}
                data-aos-duration="700"
              >
                VIEW PROGRAM
              </a>
              <a
                href="tel:+919912611119"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm bg-red-600 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-red-700 transition text-center flex-1 sm:flex-none"
                onClick={(e) => e.stopPropagation()}
                data-aos="zoom-in"
                data-aos-delay={index * 200 + 600}
                data-aos-duration="700"
              >
                CALL NOW
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default ServicesSection;
