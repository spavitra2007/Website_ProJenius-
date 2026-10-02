import React, { useEffect, useMemo, useState } from "react";
import "./StartupJourney.css";

/* =========================================================
   STARTUP JOURNEY DATA
========================================================= */

const journeyStages = [
  {
    id: "01",
    name: "DISCOVER",
    subtitle: "Research & Problem Understanding",
    items: [
      "Problem identification",
      "User/problem research",
      "Technology research",
      "Requirements understanding",
      "Research & Development",
    ],
  },
  {
    id: "02",
    name: "VALIDATE",
    subtitle: "Idea & Technical Validation",
    items: [
      "Idea evaluation",
      "Feasibility assessment",
      "Solution definition",
      "Technical validation",
      "MVP planning",
    ],
  },
  {
    id: "03",
    name: "BUILD",
    subtitle: "Prototype & MVP Development",
    items: [
      "Software",
      "SaaS",
      "AI/ML",
      "IoT",
      "Embedded systems",
      "PCB",
      "3D design & printing",
      "Hardware integration",
      "MVP development",
    ],
  },
  {
    id: "04",
    name: "PROTECT",
    subtitle: "IP & Patent Support",
    items: [
      "Patent support",
      "IP documentation",
      "Technical documentation",
      "Prior-art research support",
      "Filing coordination/support",
    ],
  },
  {
    id: "05",
    name: "ESTABLISH",
    subtitle: "Startup & Registration Support",
    items: [
      "Company registration guidance",
      "Startup registration guidance",
      "Documentation support",
      "Relevant government/startup scheme guidance",
    ],
  },
  {
    id: "06",
    name: "PREPARE",
    subtitle: "Startup Readiness",
    items: [
      "Business model support",
      "Product positioning",
      "Pitch deck support",
      "Product roadmap",
      "Demo preparation",
      "Startup documentation",
    ],
  },
  {
    id: "07",
    name: "GROW",
    subtitle: "Continued Innovation Support",
    items: [
      "Product roadmap",
      "Technical mentoring",
      "Innovation support",
      "Startup mentoring",
      "Growth planning",
    ],
  },
];

/* =========================================================
   JOURNEY NODE POSITIONS
========================================================= */

const journeyNodes = [
  { x: 110, y: 40, labelX: 72, anchor: "end" },
  { x: 300, y: 140, labelX: 340, anchor: "start" },
  { x: 110, y: 240, labelX: 72, anchor: "end" },
  { x: 300, y: 340, labelX: 340, anchor: "start" },
  { x: 110, y: 440, labelX: 72, anchor: "end" },
  { x: 300, y: 540, labelX: 340, anchor: "start" },
  { x: 110, y: 640, labelX: 72, anchor: "end" },
];

/* =========================================================
   CURVED JOURNEY PATHS
========================================================= */

const journeyPaths = [
  "M 110 40 C 168 65, 246 108, 300 140",
  "M 300 140 C 245 171, 165 210, 110 240",
  "M 110 240 C 165 270, 245 309, 300 340",
  "M 300 340 C 245 371, 165 410, 110 440",
  "M 110 440 C 165 470, 245 509, 300 540",
  "M 300 540 C 245 570, 165 610, 110 640",
];

/* =========================================================
   COMPONENT
========================================================= */

const StartupJourney = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const currentStage = journeyStages[activeStage];

  /* =======================================================
     SECTION REVEAL
  ======================================================= */

  useEffect(() => {
    const observerTarget = document.querySelector(
      ".startupJourney"
    );

    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(observerTarget);

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     STAGE CHANGE
  ======================================================= */

  const changeStage = (index) => {
    if (index < 0 || index >= journeyStages.length) return;
    if (index === activeStage) return;

    setActiveStage(index);
    setContentKey((value) => value + 1);
  };

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress = useMemo(() => {
    return ((activeStage + 1) / journeyStages.length) * 100;
  }, [activeStage]);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handlePrevious = () => {
    changeStage(activeStage - 1);
  };

  const handleNext = () => {
    changeStage(activeStage + 1);
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleNodeKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      changeStage(index);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeStage(activeStage + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeStage(activeStage - 1);
    }
  };

  return (
    <section
      className={`startupJourney ${
        isVisible ? "startupJourney--visible" : ""
      }`}
    >
      {/* ===================================================
          GRID BACKGROUND
      =================================================== */}

      <div
        className="startupJourney__grid"
        aria-hidden="true"
      />

      <div className="startupJourney__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="startupJourney__header">

          <div className="startupJourney__eyebrow">
            <span className="startupJourney__eyebrow-line" />
            <span>THE STARTUP JOURNEY</span>
          </div>

          <h2 className="startupJourney__heading">
            Every Idea Has
            <br />
            a Different Path.
          </h2>

          <p className="startupJourney__intro">
            There is no single formula for building a startup. The
            right path depends on the problem, technology, stage and
            goals.
          </p>

        </header>

        {/* =================================================
            JOURNEY BODY
        ================================================= */}

        <div className="startupJourney__main">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="startupJourney__content">

            {/* STAGE COUNTER */}

            <div className="startupJourney__counter">

              <span className="startupJourney__counter-text">
                STAGE {currentStage.id} / 07
              </span>

              <div
                className="startupJourney__progress"
                aria-hidden="true"
              >
                <span
                  className="startupJourney__progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>

            {/* DYNAMIC CONTENT */}

            <div
              key={contentKey}
              className="startupJourney__stage-content"
            >

              {/* TITLE AREA */}

              <div className="startupJourney__stage-heading">

                <span
                  className="startupJourney__large-number"
                  aria-hidden="true"
                >
                  {currentStage.id}
                </span>

                <h3 className="startupJourney__stage-title">
                  {currentStage.name}
                </h3>

              </div>

              {/* SUBTITLE */}

              <h4 className="startupJourney__stage-subtitle">
                {currentStage.subtitle}
              </h4>

              {/* ITEMS */}

              <div className="startupJourney__items">
                {currentStage.items.map((item, index) => (
                  <div
                    key={`${currentStage.id}-${item}`}
                    className="startupJourney__item"
                    style={{
                      "--item-delay": `${index * 70}ms`,
                    }}
                  >
                    <span
                      className="startupJourney__item-dot"
                      aria-hidden="true"
                    />

                    <span className="startupJourney__item-text">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* NAVIGATION */}

            <div className="startupJourney__controls">

              <button
                type="button"
                className="startupJourney__control"
                onClick={handlePrevious}
                disabled={activeStage === 0}
                aria-label="Previous startup stage"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M15 5L8 12L15 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="startupJourney__control"
                onClick={handleNext}
                disabled={
                  activeStage === journeyStages.length - 1
                }
                aria-label="Next startup stage"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </div>
          </div>

          {/* =================================================
              RIGHT JOURNEY
          ================================================= */}

          <div className="startupJourney__visual">

            <svg
              className="startupJourney__svg"
              viewBox="0 0 410 690"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Seven-stage startup journey"
            >

              {/* =================================================
                  DOTTED BASE PATH
              ================================================= */}

              {journeyPaths.map((path, index) => (
                <path
                  key={`base-${index}`}
                  d={path}
                  className="startupJourney__path-base"
                />
              ))}

              {/* =================================================
                  COMPLETED SOLID PATH
              ================================================= */}

              {journeyPaths.map((path, index) => {
                const isCompleted = index < activeStage;

                return (
                  <path
                    key={`completed-${index}`}
                    d={path}
                    className={`startupJourney__path-active ${
                      isCompleted
                        ? "startupJourney__path-active--visible"
                        : ""
                    }`}
                  />
                );
              })}

              {/* =================================================
                  CURRENT ACTIVE PATH
              ================================================= */}

              {activeStage < journeyPaths.length && (
                <path
                  key={`current-${activeStage}`}
                  d={journeyPaths[activeStage]}
                  className="startupJourney__path-current"
                />
              )}

              {/* =================================================
                  MOVING WHITE DOT
              ================================================= */}

              {activeStage < journeyPaths.length && (
                <circle
                  key={`travel-${activeStage}`}
                  r="3.7"
                  className="startupJourney__travel-dot"
                >
                  <animateMotion
                    dur="1.15s"
                    begin="0s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={journeyPaths[activeStage]}
                  />
                </circle>
              )}

              {/* =================================================
                  NODES
              ================================================= */}

              {journeyStages.map((stage, index) => {
                const node = journeyNodes[index];

                const isActive = index === activeStage;
                const isCompleted = index < activeStage;

                return (
                  <g
                    key={stage.id}
                    className={`startupJourney__node-group ${
                      isActive
                        ? "startupJourney__node-group--active"
                        : ""
                    } ${
                      isCompleted
                        ? "startupJourney__node-group--completed"
                        : ""
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Stage ${stage.id}: ${stage.name}`}
                    onClick={() => changeStage(index)}
                    onMouseEnter={() => changeStage(index)}
                    onKeyDown={(event) =>
                      handleNodeKeyDown(event, index)
                    }
                  >

                    {/* ACTIVE GLOW */}

                    {isActive && (
                      <>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="37"
                          className="startupJourney__node-glow"
                        />

                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="29"
                          className="startupJourney__node-glow-inner"
                        />
                      </>
                    )}

                    {/* NODE */}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 22 : 20}
                      className="startupJourney__node-circle"
                    />

                    {/* NODE NUMBER */}

                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className="startupJourney__node-number"
                    >
                      {stage.id}
                    </text>

                    {/* ACTIVE INNER DOT */}

                    {isActive && (
                      <rect
                        x={node.x - 3.5}
                        y={node.y - 3.5}
                        width="7"
                        height="7"
                        rx="1.5"
                        className="startupJourney__node-inner"
                      />
                    )}

                    {/* LABEL */}

                    <text
                      x={node.labelX}
                      y={node.y + 4}
                      textAnchor={node.anchor}
                      className="startupJourney__node-label"
                    >
                      {stage.name}
                    </text>

                  </g>
                );
              })}

            </svg>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupJourney;