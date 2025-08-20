import React, { useRef } from "react";

const StudyDestinationsCarousel = () => {
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    const container = carouselRef.current;
    const containerWidth = container.offsetWidth;
    const scrollAmount = dir === "left" ? -containerWidth : containerWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const destinations = [
    {
      image: "assets/images/universitiess/Picture1.png",
      country: "Study In USA",
      tagline: "One of the best places in the world to live!",
      color: "#6366f1",
      details: [
        "International students: 0.4%",
        "Avg. annual salary: €31,700+",
       
      ],
    },
    {
      image: "assets/images/universitiess/Picture2.png",
      country: "Study In UK",
      tagline: "The promise of an American dream!",
      color: "#6366f1",
      details: [
        "International students: 16.1%",
        "Avg. annual salary: $44,400+",
        
      ],
    },
    {
      image: "assets/images/universitiess/Picture3.png",
      country: "Study In CANADA",
      tagline: "For the best quality of life!",
      color: "#6366f1",
      details: [
        "International students: 4.6%",
        "Avg. annual salary: CAD 51,000+",
        
      ],
    },
    {
      image: "assets/images/universitiess/Picture4.png",
      country: "Study In IRELAND",
      tagline: "Popular for international education!",
      color: "#6366f1",
      details: [
        "International students: 18.3%",
        "Avg. annual salary: AUD 65,000+",
       
      ],
    },
    {
      image: "assets/images/universitiess/Picture5.png",
      country: "Study In FRANCE",
      tagline: "Top tech and engineering hub in Europe!",
      color: "#6366f1",
      details: [
        "International students: 12.8%",
        "Avg. annual salary: €45,000+",
       
      ],
    },
  ];

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🎓 Know about popular study destinations!</h2>

      <div style={styles.carouselWrapper}>
        <button style={styles.arrowLeft} onClick={() => scroll("left")}>◀</button>

        <div className="carousel-track" style={styles.carousel} ref={carouselRef}>
          {destinations.map((dest, idx) => (
            <div className="carousel-card" key={idx} style={styles.card}>
              <img src={dest.image} alt={dest.country} style={styles.image} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{dest.country}</h3>
                <p style={styles.tagline}>{dest.tagline}</p>
                <ul style={styles.list}>
                  {dest.details.map((item, i) => (
                    <li key={i} style={{ ...styles.listItem, color: dest.color }}>
                      ● <span style={{ color: "#333" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button style={styles.arrowRight} onClick={() => scroll("right")}>▶</button>
      </div>

      {/* Responsive Carousel Styles */}
      <style>{`
        .carousel-track {
          scroll-behavior: smooth;
          display: flex;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .carousel-track {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          .carousel-card {
            flex: 0 0 100% !important;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    padding: "30px 10px",
    background: "#f4f7fa",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "25px",
    fontWeight: "600",
  },
  carouselWrapper: {
    position: "relative",
    padding: "0 40px",
  },
  carousel: {
    display: "flex",
    overflowX: "hidden",
    gap: "20px",
  },
  card: {
    flex: "0 0 calc(33.333% - 20px)",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s",
    height: "380px", // increased height
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  tagline: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "14px",
    marginBottom: "6px",
    display: "flex",
    alignItems: "flex-start",
  },
  arrowLeft: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    borderRadius: "50%",
    padding: "6px 12px",
    fontSize: "18px",
    cursor: "pointer",
    border: "1px solid #ccc",
    zIndex: 1,
  },
  arrowRight: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    borderRadius: "50%",
    padding: "6px 12px",
    fontSize: "18px",
    cursor: "pointer",
    border: "1px solid #ccc",
    zIndex: 1,
  },
};

export default StudyDestinationsCarousel;
