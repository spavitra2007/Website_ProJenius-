import React, { useEffect, useState } from "react";
import "./WorkingProcess.css";

/* =========================================================
   WORKING PROCESS DATA
========================================================= */

const processStages = [
  {
    id: "01",
    name: "DISCUSS",
    description: "Tell us about your idea.",
    title: "Tell us about your idea.",
    body:
      "Share what you are trying to solve, what you have in mind and where you are today.",
    capabilities: [
      "Idea intake",
      "Project review",
      "Stage check",
    ],
  },

  {
    id: "02",
    name: "UNDERSTAND",
    description: "Understand the problem.",
    title: "Understand the problem.",
    body:
      "We identify the problem, context and requirements before deciding what needs to be built.",
    capabilities: [
      "Problem analysis",
      "Requirement study",
      "Technical assessment",
    ],
  },

  {
    id: "03",
    name: "PLAN",
    description: "Define the right path.",
    title: "Define the right path.",
    body:
      "We identify the appropriate scope, technology and next milestone.",
    capabilities: [
      "Scope definition",
      "Technology selection",
      "Milestone planning",
    ],
  },

  {
    id: "04",
    name: "BUILD",
    description: "Develop the solution.",
    title: "Develop the solution.",
    body:
      "We turn the agreed direction into a working solution through structured development and iteration.",
    capabilities: [
      "Architecture",
      "Development",
      "Integration",
    ],
  },

  {
    id: "05",
    name: "VALIDATE",
    description: "Test and refine.",
    title: "Test and refine.",
    body:
      "We test the solution, identify gaps and refine the product based on what we learn.",
    capabilities: [
      "Testing",
      "Quality review",
      "Refinement",
    ],
  },

  {
    id: "06",
    name: "SUPPORT",
    description: "Prepare for the next stage.",
    title: "Prepare for the next stage.",
    body:
      "We help prepare the solution for the next milestone with practical technical and product support.",
    capabilities: [
      "Launch preparation",
      "Documentation",
      "Continued support",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const WorkingProcess = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [contentKey, setContentKey] = useState(0);

  const currentStage = processStages[activeStage];

  /* =======================================================
     AUTO CHANGE EVERY 3 SECONDS
     
     01 → 02 → 03 → 04 → 05 → 06 → 01
  ======================================================= */

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStage((previousStage) => {
        const nextStage =
          (previousStage + 1) % processStages.length;

        return nextStage;
      });

      setContentKey((previousKey) => previousKey + 1);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     MANUAL STAGE CHANGE
  ======================================================= */

  const changeStage = (index) => {
    if (
      index < 0 ||
      index >= processStages.length ||
      index === activeStage
    ) {
      return;
    }

    setActiveStage(index);
    setContentKey((previousKey) => previousKey + 1);
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleStageKeyDown = (event, index) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      changeStage(index);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setActiveStage((previousStage) => {
        const nextStage =
          (previousStage + 1) %
          processStages.length;

        return nextStage;
      });

      setContentKey((previousKey) => previousKey + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setActiveStage((previousStage) => {
        const previous =
          (previousStage - 1 + processStages.length) %
          processStages.length;

        return previous;
      });

      setContentKey((previousKey) => previousKey + 1);
    }
  };

  return (
    <section className="workingProcess">

      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="workingProcess__grid"
        aria-hidden="true"
      />

      <div className="workingProcess__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="workingProcess__header">

          <div className="workingProcess__eyebrow">
            <span className="workingProcess__eyebrow-line" />

            <span>OUR WORKING PROCESS</span>
          </div>

          <h2 className="workingProcess__heading">
            From Conversation
            <br />
            to Execution.
          </h2>

          <p className="workingProcess__intro">
            We begin by understanding what you are trying to
            solve before deciding what needs to be built.
          </p>

        </header>

        {/* =================================================
            PROCESS TIMELINE
        ================================================= */}

        <div className="workingProcess__timeline">

          {/* BASE LINE */}

          <div
            className="workingProcess__timeline-line"
            aria-hidden="true"
          >
            <span
              className="workingProcess__timeline-progress"
              style={{
                width:
                  activeStage === 0
                    ? "0%"
                    : `${
                        (activeStage /
                          (processStages.length - 1)) *
                        100
                      }%`,
              }}
            />
          </div>

          {/* STAGES */}

          {processStages.map((stage, index) => {
            const isActive =
              index === activeStage;

            const isCompleted =
              index < activeStage;

            return (
              <button
                key={stage.id}
                type="button"
                className={`workingProcess__step ${
                  isActive
                    ? "workingProcess__step--active"
                    : ""
                } ${
                  isCompleted
                    ? "workingProcess__step--completed"
                    : ""
                }`}
                onClick={() =>
                  changeStage(index)
                }
                onMouseEnter={() =>
                  changeStage(index)
                }
                onFocus={() =>
                  changeStage(index)
                }
                onKeyDown={(event) =>
                  handleStageKeyDown(
                    event,
                    index
                  )
                }
                aria-pressed={isActive}
              >

                {/* NODE */}

                <span className="workingProcess__node">

                  <span className="workingProcess__node-number">
                    {stage.id}
                  </span>

                </span>

                {/* STAGE NAME */}

                <span className="workingProcess__step-name">
                  {stage.name}
                </span>

                {/* DESCRIPTION */}

                <span className="workingProcess__step-description">
                  {stage.description}
                </span>

              </button>
            );
          })}
        </div>

        {/* =================================================
            DETAIL CARD
        ================================================= */}

        <div
          key={contentKey}
          className="workingProcess__details"
        >

          {/* BLUE ACCENT */}

          <span
            className="workingProcess__details-accent"
            aria-hidden="true"
          />

          {/* LARGE NUMBER */}

          <span
            className="workingProcess__details-number"
            aria-hidden="true"
          >
            {currentStage.id}
          </span>

          {/* STAGE LABEL */}

          <div className="workingProcess__details-stage">
            {currentStage.name}
          </div>

          {/* MAIN CONTENT */}

          <div className="workingProcess__details-main">

            <h3 className="workingProcess__details-title">
              {currentStage.title}
            </h3>

            <p className="workingProcess__details-body">
              {currentStage.body}
            </p>

          </div>

          {/* CAPABILITIES */}

          <div className="workingProcess__capabilities">

            <span className="workingProcess__capabilities-label">
              CAPABILITIES INVOLVED
            </span>

            <div className="workingProcess__capability-list">
              {currentStage.capabilities.map(
                (capability) => (
                  <span
                    key={capability}
                    className="workingProcess__capability"
                  >
                    {capability}
                  </span>
                )
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkingProcess;