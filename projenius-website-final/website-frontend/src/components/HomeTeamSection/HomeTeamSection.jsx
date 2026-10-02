import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeTeamSection.css";

import showcaseImage from "../../assets/images/projenius-banner-4.webp";

/* =====================================================
   ANIMATED SERVICE TEXT
===================================================== */

const animatedServices = [
  "Web & Mobile Development",
  "Custom Software Solutions",
  "AI & ML Solutions",
  "IoT & Hardware Solutions",
  "Product Development",
  "Training & Workshops",
  "Startup & Academic Support",
];

/* =====================================================
   STATS
===================================================== */

const stats = [
  {
    value: 1000,
    suffix: "+",
    label: "CLIENTS & LEARNERS SERVED",
  },
  {
    value: 30,
    suffix: "+",
    label: "PROJECTS & SOLUTIONS DELIVERED",
  },
  {
    value: 5,
    suffix: "+",
    label: "SERVICE AREAS",
  },
  {
    value: 2,
    suffix: "+",
    label: "YEARS OF EXPERIENCE",
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);

  const [counts, setCounts] = useState(() =>
    stats.map(() => 0)
  );

  /* =====================================================
     SERVICE TEXT ROTATION
     Every 5 seconds
  ===================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setServiceIndex(
        (prev) => (prev + 1) % animatedServices.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     SECTION REVEAL + COUNTERS
  ===================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const startCounters = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      setCounts(stats.map(() => 0));

      const duration = 5000;
      const startTime = performance.now();

      const animateCounters = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const easedProgress =
          1 - Math.pow(1 - progress, 3);

        setCounts(
          stats.map((stat) =>
            Math.floor(
              stat.value * easedProgress
            )
          )
        );

        if (progress < 1) {
          animationFrameRef.current =
            requestAnimationFrame(
              animateCounters
            );
        } else {
          setCounts(
            stats.map((stat) => stat.value)
          );

          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current =
        requestAnimationFrame(
          animateCounters
        );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          startCounters();
        } else {
          setVisible(false);

          if (animationFrameRef.current) {
            cancelAnimationFrame(
              animationFrameRef.current
            );

            animationFrameRef.current = null;
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact-hero-section ${
        visible ? "contact-visible" : ""
      }`}
    >
      <div className="contact-hero-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="contact-hero-heading">

          <span className="contact-hero-label">
            LET'S BUILD TOGETHER
          </span>

          <h2 className="contact-hero-title">

            {/* WHITE STATIC TEXT */}

            <span className="contact-title-static">
              Build Your Next
            </span>

            {/* BLUE ANIMATED TEXT */}

            <span className="contact-title-animation-wrapper">
              <span
                key={serviceIndex}
                className="contact-title-animated"
              >
                {animatedServices[serviceIndex]}
              </span>
            </span>

          </h2>

          <div
            className="contact-hero-line"
            aria-hidden="true"
          >
            <span />
          </div>

        </div>

        {/* =================================================
            SHOWCASE CARD
        ================================================= */}

        <div className="contact-showcase-card">

          <img
            src={showcaseImage}
            alt="ProJenius creative technology showcase"
            className="contact-showcase-image"
            loading="lazy"
          />

          <div
            className="contact-showcase-overlay"
            aria-hidden="true"
          />

          <div className="contact-showcase-content">

            <h3>
              Have an Idea?
            </h3>

            {/* REAL BUTTON */}

            <Link
              to="/contact"
              className="contact-talk-btn"
              aria-label="Let's Build It"
            >
              Let's Build It.
            </Link>

          </div>

        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="contact-stats">

          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>

              <div className="contact-stat">

                <strong>
                  {counts[index]}
                  {stat.suffix}
                </strong>

                <span>
                  {stat.label}
                </span>

              </div>

              {index < stats.length - 1 && (
                <div
                  className="contact-stat-divider"
                  aria-hidden="true"
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>
    </section>
  );
}