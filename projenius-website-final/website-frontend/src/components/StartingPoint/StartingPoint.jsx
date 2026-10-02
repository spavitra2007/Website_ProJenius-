import React, { useMemo, useState } from "react";
import "./StartingPoint.css";

/* =========================================================
   STARTING POINT DATA
========================================================= */

const startingPoints = [
  {
    id: "01",
    question: "I only have an idea.",

    stage: "stage-01",

    needs: [
      "Idea clarification",
      "Problem understanding",
      "Feasibility assessment",
      "Technical direction",
      "Initial roadmap",
    ],

    description:
      "A clear starting point helps turn an early idea into a practical direction.",

    cta: "Talk to ProJenius",
  },

  {
    id: "02",
    question:
      "I understand the problem but need validation.",

    stage: "stage-02",

    needs: [
      "Problem validation",
      "Market research",
      "Solution validation",
      "Technical feasibility",
      "Product direction",
    ],

    description:
      "Validation helps confirm that the problem, solution and technical approach are worth pursuing.",

    cta: "Talk to ProJenius",
  },

  {
    id: "03",
    question: "I need to build a prototype.",

    stage: "stage-03",

    needs: [
      "Product planning",
      "3D design",
      "PCB",
      "Electronics",
      "Embedded systems",
      "Prototype development",
    ],

    description:
      "A working prototype turns the concept into something you can test, show and improve.",

    cta: "Talk to ProJenius",
  },

  {
    id: "04",
    question: "I need an MVP.",

    stage: "stage-04",

    needs: [
      "MVP planning",
      "Software development",
      "SaaS development",
      "Feature planning",
      "Testing",
      "Deployment",
    ],

    description:
      "An MVP gives you a focused product that can be tested with real users and improved through feedback.",

    cta: "Talk to ProJenius",
  },

  {
    id: "05",
    question: "I already have a startup.",

    stage: "stage-05",

    needs: [
      "Technical & product support",
      "Product roadmap",
      "Innovation support",
      "Pitch deck & documentation",
      "Startup mentoring",
    ],

    description:
      "Existing startups can use focused technical, product and innovation support to improve and move forward.",

    cta: "Talk to ProJenius",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const StartingPoint = () => {
  const [activeIndex, setActiveIndex] = useState(4);

  const activePoint = startingPoints[activeIndex];

  /* =======================================================
     CHANGE ACTIVE ITEM
  ======================================================= */

  const selectStartingPoint = (index) => {
    if (index < 0 || index >= startingPoints.length) return;

    setActiveIndex(index);
  };

  /* =======================================================
     PROGRESS SEGMENTS
  ======================================================= */

  const progressSegments = useMemo(() => {
    return startingPoints.map((point, index) => (
      <span
        key={point.id}
        className={`startingPoint__progress-segment ${
          index <= activeIndex
            ? "startingPoint__progress-segment--active"
            : ""
        }`}
      />
    ));
  }, [activeIndex]);

  return (
    <section className="startingPoint">

      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="startingPoint__background"
        aria-hidden="true"
      />

      <div className="startingPoint__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="startingPoint__header">

          <div className="startingPoint__eyebrow">
            <span className="startingPoint__eyebrow-line" />
            <span>FIND YOUR STARTING POINT</span>
          </div>

          <h2 className="startingPoint__heading">
            Where Are You Right Now?
          </h2>

          <p className="startingPoint__intro">
            You don’t need to have everything figured out. Start
            with where you are.
          </p>

        </header>

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div className="startingPoint__layout">

          {/* =================================================
              LEFT OPTIONS
          ================================================= */}

          <div className="startingPoint__options">

            {startingPoints.map((point, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={point.id}
                  type="button"
                  className={`startingPoint__option ${
                    isActive
                      ? "startingPoint__option--active"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    selectStartingPoint(index)
                  }
                  onFocus={() =>
                    selectStartingPoint(index)
                  }
                  onClick={() =>
                    selectStartingPoint(index)
                  }
                  aria-pressed={isActive}
                >

                  {/* NUMBER */}

                  <span className="startingPoint__option-number">
                    {point.id}
                  </span>

                  {/* QUESTION */}

                  <span className="startingPoint__option-text">
                    {point.question}
                  </span>

                  {/* RADIO */}

                  <span
                    className="startingPoint__radio"
                    aria-hidden="true"
                  >
                    <span />
                  </span>

                </button>
              );
            })}

          </div>

          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <aside
            key={activePoint.id}
            className="startingPoint__details"
          >

            {/* GRID */}

            <div
              className="startingPoint__details-grid"
              aria-hidden="true"
            />

            {/* TOP META */}

            <div className="startingPoint__meta">

              <div className="startingPoint__meta-label">
                <span className="startingPoint__meta-dot" />

                <span>
                  projenius / {activePoint.stage}
                </span>
              </div>

              {/* SEGMENTED PROGRESS */}

              <div className="startingPoint__progress">
                {progressSegments}
              </div>

            </div>

            {/* CONTENT */}

            <div className="startingPoint__details-content">

              <div className="startingPoint__needs-label">
                YOU MAY NEED
              </div>

              {/* NEEDS LIST */}

              <div className="startingPoint__needs">

                {activePoint.needs.map((need, index) => (
                  <div
                    key={`${activePoint.id}-${need}`}
                    className="startingPoint__need"
                    style={{
                      "--need-delay": `${index * 65}ms`,
                    }}
                  >
                    <span className="startingPoint__need-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="startingPoint__need-text">
                      {need}
                    </span>
                  </div>
                ))}

              </div>

              {/* DESCRIPTION */}

              <p className="startingPoint__description">
                {activePoint.description}
              </p>

              {/* CTA */}

              <a
                href="/contact"
                className="startingPoint__cta"
              >
                <span>{activePoint.cta}</span>

                <span aria-hidden="true">
                  →
                </span>
              </a>

            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default StartingPoint;