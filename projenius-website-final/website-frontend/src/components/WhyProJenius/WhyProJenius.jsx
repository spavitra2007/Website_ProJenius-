import React, { useEffect, useRef, useState } from "react";
import "./WhyProJenius.css";

/* =========================================================
   WHY PROJENIUS DATA
========================================================= */

const benefits = [
  {
    id: "01",
    title: "Practical Execution",
    description:
      "We focus on building and validating real solutions.",
  },
  {
    id: "02",
    title: "Cross-Technology Capability",
    description:
      "Software, AI, IoT, electronics, embedded systems and product development can come together when required.",
  },
  {
    id: "03",
    title: "End-to-End Support",
    description:
      "From early research and validation to prototype, MVP and startup readiness.",
  },
  {
    id: "04",
    title: "Founder-Friendly Approach",
    description:
      "Start with the problem. We help define the next practical step.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const WhyProJenius = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =======================================================
     REVEAL WHEN SECTION ENTERS VIEWPORT
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`whyProJenius ${
        isVisible ? "whyProJenius--visible" : ""
      }`}
    >
      <div className="whyProJenius__container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="whyProJenius__intro">

          <div className="whyProJenius__eyebrow">
            <span className="whyProJenius__eyebrow-line" />
            <span>WHY PROJENIUS</span>
          </div>

          <h2 className="whyProJenius__heading">
            Why Work With
            <br />
            ProJenius?
          </h2>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="whyProJenius__list">

          {benefits.map((benefit, index) => (
            <article
              key={benefit.id}
              className="whyProJenius__item"
              style={{
                "--item-delay": `${index * 120}ms`,
              }}
            >

              {/* ===========================================
                  NUMBER
              =========================================== */}

              <div className="whyProJenius__number">
                {benefit.id}
              </div>

              {/* ===========================================
                  CONTENT
              =========================================== */}

              <div className="whyProJenius__content">

                <h3 className="whyProJenius__title">
                  {benefit.title}
                </h3>

                <p className="whyProJenius__description">
                  {benefit.description}
                </p>

              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyProJenius;