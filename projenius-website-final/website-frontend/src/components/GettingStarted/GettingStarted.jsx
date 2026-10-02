import React, { useEffect, useRef, useState } from "react";
import "./GettingStarted.css";

/* =========================================================
   PROCESS DATA
========================================================= */

const processSteps = [
  {
    id: "01",
    title: "Initial Conversation",
    description:
      "Tell us where you are and what you want to build.",
  },
  {
    id: "02",
    title: "Requirement Understanding",
    description:
      "We clarify the problem, the users and the constraints.",
  },
  {
    id: "03",
    title: "Scope & Direction",
    description:
      "We agree on the right first milestone and the technology behind it.",
  },
  {
    id: "04",
    title: "Execution Plan",
    description:
      "The approach, timeline and deliverables are laid out.",
  },
  {
    id: "05",
    title: "Development / Support",
    description:
      "We build, test and support the next step with you.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const GettingStarted = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =======================================================
     REVEAL ON SCROLL
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
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`gettingStarted ${
        isVisible ? "gettingStarted--visible" : ""
      }`}
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="gettingStarted__grid"
        aria-hidden="true"
      />

      <div className="gettingStarted__container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="gettingStarted__intro">

          <div className="gettingStarted__eyebrow">
            <span className="gettingStarted__eyebrow-line" />
            <span>GETTING STARTED</span>
          </div>

          <h2 className="gettingStarted__heading">
            What Happens
            <br />
            After You
            <br />
            Reach Out?
          </h2>

          <p className="gettingStarted__lead">
            You don't need a complete business plan or technical
            specification to start a conversation.
          </p>

          <a
            href="/contact"
            className="gettingStarted__cta"
          >
            <span>Start a Conversation</span>
            <span
              className="gettingStarted__cta-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>

        </div>

        {/* =================================================
            RIGHT TIMELINE
        ================================================= */}

        <div className="gettingStarted__timeline">

          {/* VERTICAL LINE */}

          <span
            className="gettingStarted__timeline-line"
            aria-hidden="true"
          />

          {/* STEPS */}

          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="gettingStarted__step"
              style={{
                "--step-delay": `${index * 120}ms`,
              }}
            >

              {/* NUMBER NODE */}

              <span className="gettingStarted__node">
                <span className="gettingStarted__node-number">
                  {step.id}
                </span>
              </span>

              {/* STEP CONTENT */}

              <div className="gettingStarted__step-content">

                <h3 className="gettingStarted__step-title">
                  {step.title}
                </h3>

                <p className="gettingStarted__step-description">
                  {step.description}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default GettingStarted;