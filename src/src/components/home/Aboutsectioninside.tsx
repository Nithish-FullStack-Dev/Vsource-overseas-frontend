import React, { useState, useEffect, useRef } from 'react';

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: '+',
      label: 'Students Empowered',
      icon: 'https://cdn-icons-gif.flaticon.com/6454/6454106.gif',
    },
    {
      id: 2,
      value: 20,
      suffix: '+',
      label: 'Years of Experience',
      icon: 'https://cdn-icons-gif.flaticon.com/15370/15370761.gif',
    },
    {
      id: 3,
      value: 10,
      suffix: '+',
      label: 'Study Destinations',
      icon: 'https://cdn-icons-gif.flaticon.com/15747/15747340.gif',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);

    return count;
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className={`content ${isVisible ? 'visible' : ''}`}>
          <div className="text-section">
            <h1>About Vsource Overseas</h1>
            <p className="subheading">
              <strong>Your Gateway to Global Academic Excellence</strong>
            </p>
            <p className="paragraph">
              At VSource Overseas, we specialize in transforming academic ambition into international achievement. With a legacy of over 20 years, we are proud to be South India’s premier consultancy for Master’s admissions abroad, guiding thousands of students to top-ranked universities across the <strong>USA, UK, Canada, Ireland, France</strong> and other leading destinations.
            </p>
            <p className="paragraph">
              We partner with globally accredited universities known for <strong>academic excellence, innovation, </strong>and <strong>industry relevance,</strong> ensuring our students receive not only a quality education but also a launchpad for global careers.
            </p>
            <p className="paragraph">
              <strong>Our Legacy in Numbers</strong>
            </p>
            <div className="stats">
              {stats.map((stat) => {
                const count = useCounter(stat.value);
                return (
                  <div key={stat.id} className="stat-block">
                    <img src={stat.icon} alt={stat.label} className="icon" />
                    <div className="stat-info">
                      <div className="count">{count}{stat.suffix}</div>
                      <div className="label">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="image-section">
            <img src="https://vsourcevarsity.com/assets/images/founder.webp" alt="Founder" />
            <p className="caption">
              <strong style={{ fontSize: '20px' }}>“</strong>Redefining Education for Tomorrow’s Innovators<strong style={{ fontSize: '20px' }}>”</strong>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          font-family: 'Barlow', sans-serif;
          background-color: #fff;
          color: #333;
          padding: 40px 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          box-sizing: border-box;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 40px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .text-section {
          flex: 2;
        }

        .image-section {
          flex: 1;
          border: 1px solid grey;
          border-radius: 15px;
          padding: 5px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 20px 0;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          padding: 20px 0;
        }

        .stat-block {
          display: flex;
          align-items: center;
          gap: 15px;
          text-align: left;
        }

        .stat-block .icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
        }

        .count {
          font-size: 20px;
          color: #1e73be;
          font-weight: bold;
        }

        .label {
          font-size: 20px;
          color: #555;
          margin-left: 8px;
        }

        h1 {
          font-size: 29px;
          color: #1e73be;
          margin-top: 20px;
        }

        .subheading {
          font-size: 20px;
          margin-bottom: 20px;
          color: black;
          margin-top: 20px;
        }

        .paragraph {
          font-size: 15px;
          line-height: 1.6;
          color: black;
          margin-bottom: 15px;
          margin-top: 10px;
        }

        .caption {
          font-size: 15px;
          color: black;
          margin-top: 10px;
        }

        @media (min-width: 768px) {
          .content {
            flex-direction: row;
            align-items: center;
          }

          .stat-info {
            flex-direction: row !important;
            align-items: center;
          }

          .stats {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .stat-block {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
