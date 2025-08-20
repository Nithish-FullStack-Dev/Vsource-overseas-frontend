import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Hareesh Makireddi",
      message:
        "Vsource is best in supporting the students through out the process from selecting the Institute to the end of the education in every way possible.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/harish_new.jpeg",
    },
    {
      name: "Sai Teja Reddy Sulguti",
      message:
        "I have always received the guidance from VSource when ever needed through out my course. They are very honest in their job.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/saiteja_new.jpeg",
    },
    {
      name: "KARUMURU MURARI",
      message:
        "It is the best consultancy compared to any other consultancy. The services provided there are top class... highly recommend this consultancy 10/10 👌👌if you want to make a plan for your future.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/murari_new.jpeg",
    },
    {
      name: "Marneni Mani Shashank",
      message:
        "I feel really happy to continue my studies under control of you... I think Vsource is the best. Thank you for your guidance.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/manishashank_new.jpeg",
    },
    {
      name: "Thungathurthi Shashank",
      message:
        "I am studing in Auburn University at Montgomery...I am really very thankful to Vsource they treat students like family.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/thungathurthi_new.jpeg",
    },
    {
      name: "Munagala Jaya Prakash Reddy",
      message:
        "I'm super grateful for the awesome support I got from the V-source consultant... I totally recommend V-source Consultant for their outstanding guidance and personalized support.",
      image: "https://vsourceoverseas.com/assets/TESTIMONIALS/jayaprakash_new.jpeg",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="overlay">
        <div className="content">
          <h3 className="heading">TESTIMONIALS</h3>
          <div className="carousel">
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className="img-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="text-wrap">
                  <p className="message">
                    <span className="quote">“</span>
                    {item.message}
                  </p>
                  <p className="name">- {item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background: url('https://vsourceoverseas.com/assets/images/map.png') center/cover no-repeat;
          padding: 60px 0;
          color: #fff;
          position: relative;
        }

        .overlay {
          background-color: rgba(0, 0, 0, 0.6);
          padding: 40px 20px;
        }

        .heading {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 40px;
        }

        .carousel {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          width: 300px;
          transition: 0.3s;
        }

        .testimonial-card:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .img-wrap {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #fff;
        }

        .text-wrap {
          text-align: center;
        }

        .message {
          font-style: italic;
          font-size: 0.95rem;
        }

        .quote {
          font-size: 2rem;
          vertical-align: top;
        }

        .name {
          margin-top: 15px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .carousel {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
