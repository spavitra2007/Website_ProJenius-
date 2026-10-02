import React, { useState } from "react";
import "./TechnologyPathways.css";

/* =========================================================
   TECHNOLOGY PATHWAY DATA
========================================================= */

const technologyPaths = [
  {
    id: "01",
    title: "SaaS / Software",
    description: "Platforms, apps and web products",
    exampleTitle: "SaaS / Software",
    exampleDescription:
      "Software starts with understanding the user problem, then defining the product and building the right technical foundation.",
    journey: [
      "Problem",
      "Product Definition",
      "UX / UI",
      "Development",
      "Testing",
      "Deployment",
    ],
  },

  {
    id: "02",
    title: "AI / Data",
    description: "Models, data and intelligent features",
    exampleTitle: "AI / Data",
    exampleDescription:
      "AI products begin with the right problem and data, followed by model development, validation and integration.",
    journey: [
      "Problem",
      "Data Study",
      "Model Design",
      "Training",
      "Validation",
      "Deployment",
    ],
  },

  {
    id: "03",
    title: "IoT / Embedded",
    description: "Connected devices and firmware",
    exampleTitle: "IoT / Embedded",
    exampleDescription:
      "Connected products require coordinated hardware, firmware and communication layers working together as one system.",
    journey: [
      "Problem",
      "Hardware Study",
      "Circuit Design",
      "Firmware",
      "Integration",
      "Testing",
    ],
  },

  {
    id: "04",
    title: "Hardware / Product",
    description: "Physical products and devices",
    exampleTitle: "Hardware / Product",
    exampleDescription:
      "Physical products move from concept and engineering into prototyping, testing and product readiness.",
    journey: [
      "Problem",
      "Product Study",
      "Engineering",
      "Prototype",
      "Testing",
      "Production",
    ],
  },

  {
    id: "05",
    title: "Automation",
    description: "Workflows, control and integration",
    exampleTitle: "Automation",
    exampleDescription:
      "Automation starts with mapping how the work is done today, then designing what should change.",
    journey: [
      "Problem",
      "Process Study",
      "Workflow Design",
      "Integration",
      "Testing",
      "Deployment",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const TechnologyPathways = () => {
  const [activePath, setActivePath] = useState(0);

  const currentPath = technologyPaths[activePath];

  /* =======================================================
     CHANGE PATH
  ======================================================= */

  const handlePathChange = (index) => {
    setActivePath(index);
  };

  /* =======================================================
     KEYBOARD SUPPORT
  ======================================================= */

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePathChange(index);
    }
  };

  return (
    <section className="technologyPathways">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="technologyPathways__grid"
        aria-hidden="true"
      />

      <div className="technologyPathways__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="technologyPathways__header">

          <div className="technologyPathways__eyebrow">
            <span className="technologyPathways__eyebrow-line" />
            <span>TECHNOLOGY PATHWAYS</span>
          </div>

          <h2 className="technologyPathways__heading">
            Your Idea
            <br />
            Determines the Path.
          </h2>

          <p className="technologyPathways__intro">
            Different ideas require different combinations of
            technology, validation and support. Pick a direction
            to see an example route.
          </p>

        </header>

        {/* =================================================
            PATHWAY MAP
        ================================================= */}

        <div className="technologyPathways__map">

          {/* ===============================================
              BRANCHING SVG
          =============================================== */}

          <svg
            className="technologyPathways__svg"
            viewBox="0 0 1240 430"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            {/* BASE BRANCHES */}

            {technologyPaths.map((path, index) => {
              const cardY = 40 + index * 88;

              const branchPath =
                index === 0
                  ? `M 205 215
                     C 275 215, 300 ${cardY},
                     405 ${cardY}`
                  : `M 205 215
                     C 285 215, 315 ${cardY},
                     405 ${cardY}`;

              return (
                <path
                  key={`base-${path.id}`}
                  d={branchPath}
                  className="technologyPathways__branch"
                />
              );
            })}

            {/* ACTIVE BRANCH */}

            {(() => {
              const cardY =
                40 + activePath * 88;

              const activeBranch =
                activePath === 0
                  ? `M 205 215
                     C 275 215, 300 ${cardY},
                     405 ${cardY}`
                  : `M 205 215
                     C 285 215, 315 ${cardY},
                     405 ${cardY}`;

              return (
                <path
                  key={`active-${currentPath.id}`}
                  d={activeBranch}
                  className="technologyPathways__branch-active"
                />
              );
            })()}

            {/* MOVING DOT */}

            {(() => {
              const cardY =
                40 + activePath * 88;

              const activeBranch =
                activePath === 0
                  ? `M 205 215
                     C 275 215, 300 ${cardY},
                     405 ${cardY}`
                  : `M 205 215
                     C 285 215, 315 ${cardY},
                     405 ${cardY}`;

              return (
                <circle
                  key={`travel-${activePath}`}
                  r="3.5"
                  className="technologyPathways__travel-dot"
                >
                  <animateMotion
                    dur="0.9s"
                    begin="0s"
                    repeatCount="indefinite"
                    path={activeBranch}
                  />
                </circle>
              );
            })()}

          </svg>

          {/* ===============================================
              YOUR IDEA CARD
          =============================================== */}

          <div className="technologyPathways__source">

            <div className="technologyPathways__source-content">

              <h3>YOUR IDEA</h3>

              <p>Where every path begins</p>

            </div>

            <span
              className="technologyPathways__source-node"
              aria-hidden="true"
            />

          </div>

          {/* ===============================================
              TECHNOLOGY CARDS
          =============================================== */}

          <div className="technologyPathways__cards">

            {technologyPaths.map((path, index) => {

              const isActive =
                activePath === index;

              return (
                <article
                  key={path.id}
                  className={`technologyPathways__card ${
                    isActive
                      ? "technologyPathways__card--active"
                      : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onMouseEnter={() =>
                    handlePathChange(index)
                  }
                  onFocus={() =>
                    handlePathChange(index)
                  }
                  onClick={() =>
                    handlePathChange(index)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(event, index)
                  }
                >

                  <span className="technologyPathways__card-number">
                    {path.id}
                  </span>

                  <div className="technologyPathways__card-content">

                    <h3>
                      {path.title}
                    </h3>

                    <p>
                      {path.description}
                    </p>

                  </div>

                  <span
                    className="technologyPathways__card-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>

                </article>
              );
            })}

          </div>
        </div>

        {/* =================================================
            EXAMPLE JOURNEY
        ================================================= */}

        <div
          key={currentPath.id}
          className="technologyPathways__journey"
        >

          <div className="technologyPathways__journey-pattern" />

          {/* ===============================================
              JOURNEY HEADER
          =============================================== */}

          <div className="technologyPathways__journey-header">

            <div className="technologyPathways__journey-heading">

              <span className="technologyPathways__journey-eyebrow">
                EXAMPLE JOURNEY
              </span>

              <h3>
                {currentPath.exampleTitle}
              </h3>

            </div>

            <p>
              {currentPath.exampleDescription}
            </p>

          </div>

          {/* ===============================================
              JOURNEY TRACK
          =============================================== */}

          <div className="technologyPathways__journey-track">

            <div
              className="technologyPathways__journey-line"
              aria-hidden="true"
            />

            {currentPath.journey.map(
              (step, index) => (
                <div
                  key={`${currentPath.id}-${step}`}
                  className="technologyPathways__journey-step"
                  style={{
                    "--journey-delay":
                      `${index * 80}ms`,
                  }}
                >

                  <span className="technologyPathways__journey-dot">
                    <span />
                  </span>

                  <span className="technologyPathways__journey-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h4>{step}</h4>

                </div>
              )
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnologyPathways;