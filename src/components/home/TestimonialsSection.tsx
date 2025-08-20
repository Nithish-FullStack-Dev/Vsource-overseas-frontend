import React, { useState } from 'react';

const testimonialsData = [
  {
    id: 1,
    name: "Mameni Mani Shashank",
    quote: "I feel really happy to continue my studies under control of you. And thank you so much for your responding towards my queries and you teach me well about course you gave me a good University to complete my course. lot of people waiting for studying in a good University's and Colleges for their better future I think Vsource is the best. Thank you for your guidance.",
    image: "https://vsourceoverseas.com/assets/TESTIMONIALS/thungathurthi_new.jpeg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    quote: "Joining this program was the best decision for my career. The mentors are incredibly supportive, and the course material is highly relevant. I've gained practical skills that I use daily. Highly recommended for anyone looking to upskill!",
    image: "https://vsourceoverseas.com/assets/TESTIMONIALS/murari_new.jpeg",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    quote: "The personalized guidance helped me choose the perfect university abroad. The application process seemed daunting, but their team made it seamless. I'm now pursuing my dream course, all thanks to their expert advice.",
    image: "https://vsourceoverseas.com/assets/TESTIMONIALS/jayaprakash_new.jpeg",
  },
  {
    id: 4,
    name: "Anjali Singh",
    quote: "From initial consultation to visa application, the entire journey was smooth. They genuinely care about your future and provide transparent information. My parents are also very happy with the choice I made with their help.",
    image: "https://via.placeholder.com/150/FF33A8/FFFFFF?text=AS", // Still a placeholder, replace this
  },
  {
    id: 5,
    name: "Sandeep Reddy",
    quote: "Exceptional support and deep knowledge of various international institutions. They helped me find scholarships that significantly reduced my financial burden. Truly a life-changing experience!",
    image: "https://via.placeholder.com/150/33A8FF/FFFFFF?text=SR", // Still a placeholder, replace this
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <section className="testimonial-section">
      <h2 className="section-title">TESTIMONIALS</h2>
      <div className="testimonial-content-area"> {/* New div to center the testimonial content */}
        <div className="testimonial-image-wrapper">
          <img
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            className="testimonial-image"
          />
        </div>
        <p className="testimonial-quote">
          <span className="quote-icon">“</span>{currentTestimonial.quote}
        </p>
        <p className="testimonial-author">
          - {currentTestimonial.name}
        </p>
      </div>
      <div className="pagination-dots">
        {testimonialsData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>

      {/* Contact icons moved outside the testimonial content area */}
     

      <style jsx>{`
        .testimonial-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50px 20px;
          background-color: #f8f8f8;
          position: relative;
          overflow: hidden;
          background-image: url('https://vsourceoverseas.com/assets/images/map.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          min-height: 500px; /* Adjust min-height as needed for content and icons */
        }

        .section-title {
          font-size: 2.5em;
          font-weight: bold;
          color: #333;
          margin-bottom: 50px;
          text-align: center;
          text-transform: uppercase;
        }

        /* New container for centering testimonial text content */
        .testimonial-content-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px; /* Keeps the text width reasonable */
          text-align: center;
          position: relative; /* For image positioning */
          margin-bottom: 30px;
          min-height: 250px; /* Ensure consistent height for different quotes */
          justify-content: center;
          /* Removed background-color, padding, border-radius, box-shadow */
        }

        .testimonial-image-wrapper {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #f00; /* Red border for the image */
          position: absolute; /* Relative to .testimonial-content-area */
          top: -60px; /* Position image above the text content */
          background-color: #fff; /* White background for the image border itself */
          padding: 5px; /* Creates a small white border effect */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          z-index: 1; /* Ensure image is above other elements if overlaps */
          margin:20px 0px;
        }

        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          
        }

        .testimonial-quote {
          font-size: 1.2em;
          line-height: 1.6;
          color: #555; /* Adjusted color for better contrast on map background */
          padding-top:30px;
          margin-top: 60px; /* Space for the image */
          margin-bottom: 20px;
          position: relative;
          font-style: italic;
          transition: opacity 0.5s ease-in-out;
        }

        .quote-icon {
          font-family: Georgia, serif;
          font-size: 4em;
          color: #f00;
          position: absolute;
          left: -40px;
          top: -20px;
          opacity: 0.7;
          /* Ensure this icon is visible if it was behind the map previously */
          z-index: 0; 
        }

        .testimonial-author {
          font-size: 1.1em;
          font-weight: bold;
          color: #f00;
          text-align: center;
          margin-top: 15px;
          transition: opacity 0.5s ease-in-out;
        }

        .pagination-dots {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .dot {
          width: 10px;
          height: 10px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .dot.active {
          background-color: #f00;
          transform: scale(1.2);
        }

        /* Contact icons - positioned globally within the section */
        .contact-icons-left {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 10; /* Ensure icons are above other content */
        }

        .contact-icons-right {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 10; /* Ensure icons are above other content */
        }

        .phone-icon,
        .whatsapp-icon {
          font-size: 2em;
          color: #fff;
          background-color: #007bff; /* Phone icon color */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .whatsapp-icon {
          background-color: #25d366; /* WhatsApp green */
        }

        .phone-icon:hover,
        .whatsapp-icon:hover {
          transform: scale(1.1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .testimonial-content-area {
            padding: 30px 15px; /* Add some horizontal padding for text on smaller screens */
            min-height: 200px;
          }

          .section-title {
            font-size: 2em;
          }

          .testimonial-quote {
            font-size: 1em;
            margin-top: 50px;
          }

          .testimonial-image-wrapper {
            width: 100px;
            height: 100px;
            top: -50px;
          }

          .quote-icon {
            font-size: 3em;
            left: -20px;
            top: -10px;
          }

          .contact-icons-left,
          .contact-icons-right {
            bottom: 10px;
            left: 10px; /* Adjust positioning for small screens */
            right: 10px;
            flex-direction: row; /* Make them horizontal on small screens if desired */
            gap: 10px;
          }
          .contact-icons-right {
              left: auto; /* Reset left for right icon */
          }


          .phone-icon,
          .whatsapp-icon {
            width: 40px;
            height: 40px;
            font-size: 1.5em;
          }
        }

        @media (max-width: 480px) {
          .testimonial-section {
            padding: 30px 15px;
            min-height: 450px;
          }

          .section-title {
            font-size: 1.8em;
            margin-bottom: 40px;
          }

          .testimonial-content-area {
            padding: 20px 10px;
            min-height: 180px;
          }

          .testimonial-image-wrapper {
            width: 80px;
            height: 80px;
            top: -40px;
          }

          .testimonial-quote {
            margin-top: 40px;
          }

          .quote-icon {
            font-size: 2.5em;
            left: -15px;
            top: -5px;
          }

          .contact-icons-left,
          .contact-icons-right {
            bottom: 5px; /* Further reduce spacing */
            left: 5px;
            right: 5px;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;