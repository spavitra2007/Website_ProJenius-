import React, { useEffect, useRef, useState } from "react";
import "./StageSupport.css";

/* =========================================================
   STAGE DATA
========================================================= */

const stageSupportData = [
  {
    id: "01",
    title: "Idea-Stage Innovators",
    quote: "I have an idea but need clarity.",
    progress: "idea → startup",
    description:
      "You have a spark: a problem you have noticed or a concept you keep coming back to. We help you make it concrete by understanding the problem, testing whether it holds up and outlining a practical technical direction.",
    tags: [
      "Problem understanding",
      "Research & development",
      "Idea evaluation",
      "Feasibility assessment",
      "Technical roadmap",
    ],
  },

  {
    id: "02",
    title: "Student & Emerging Innovators",
    quote:
      "I want to turn a project or concept into something real.",
    progress: "project → product",
    description:
      "You have a project, prototype or concept and want to move beyond the initial stage. We help you refine the idea, strengthen the technical foundation and turn your work into something practical and presentable.",
    tags: [
      "Project refinement",
      "Prototype development",
      "Technical guidance",
      "Product direction",
      "Execution roadmap",
    ],
  },

  {
    id: "03",
    title: "Early-Stage Founders",
    quote: "I have a validated concept and need to build.",
    progress: "idea → startup",
    description:
      "You know the problem and have an early direction. Now the right technology has to be built properly. We scope, design and develop the prototype or MVP, and help you prepare for what comes next.",
    tags: [
      "MVP planning",
      "Software / SaaS",
      "AI / ML",
      "IoT & hardware",
      "Product roadmap",
      "Startup registration guidance",
    ],
  },

  {
    id: "04",
    title: "Existing Startups",
    quote:
      "I need technical, product or innovation support.",
    progress: "startup → scale",
    description:
      "You already have a startup and need focused support to improve, build or scale. We work across technology, product and innovation to identify gaps and create practical solutions that move the business forward.",
    tags: [
      "Technical support",
      "Product improvement",
      "Innovation strategy",
      "Technology optimisation",
      "Growth roadmap",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const StageSupport = () => {
  /*
    Start with 03 because the reference image
    shows Early-Stage Founders initially.
  */
  const [activeStage, setActiveStage] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const sectionRef = useRef(null);

  const currentStage = stageSupportData[activeStage];

  /* =======================================================
     SECTION REVEAL
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

  /* =======================================================
     CHANGE CONTENT
     Desktop = hover
     Mobile = click/focus
  ======================================================= */

  const changeStage = (index) => {
    if (index === activeStage) return;

    setActiveStage(index);
    setContentKey((prev) => prev + 1);
  };

  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      changeStage(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`stageSupport ${
        isVisible ? "stageSupport--visible" : ""
      }`}
    >
      <div className="stageSupport__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="stageSupport__header">
          <h2 className="stageSupport__heading">
            Built for Ideas at
            <br />
            Different Stages.
          </h2>

          <p className="stageSupport__intro">
            Not every innovator starts from the same place. Our
            support adapts to where you are today.
          </p>
        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="stageSupport__card">

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <div className="stageSupport__navigation">

            {stageSupportData.map((stage, index) => {
              const isActive = index === activeStage;

              return (
                <div
                  key={stage.id}
                  className={`stageSupport__stage ${
                    isActive
                      ? "stageSupport__stage--active"
                      : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-selected={isActive}
                  onMouseEnter={() => changeStage(index)}
                  onFocus={() => changeStage(index)}
                  onClick={() => changeStage(index)}
                  onKeyDown={(event) =>
                    handleKeyDown(event, index)
                  }
                >
                  {/* NUMBER */}

                  <div className="stageSupport__stage-number">
                    {stage.id}
                  </div>

                  {/* TITLE + QUOTE */}

                  <div className="stageSupport__stage-content">
                    <h3 className="stageSupport__stage-title">
                      {stage.title}
                    </h3>

                    <p className="stageSupport__stage-quote">
                      “{stage.quote}”
                    </p>
                  </div>

                  {/* ARROW */}

                  <span
                    className="stageSupport__stage-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="stageSupport__details">

            {/* DOT BACKGROUND */}

            <div
              className="stageSupport__pattern"
              aria-hidden="true"
            />

            {/* =================================================
                ONLY NUMBER IN RIGHT PANEL
            ================================================= */}

            <span
              className="stageSupport__background-number"
              aria-hidden="true"
            >
              {currentStage.id}
            </span>

            {/* =================================================
                TOP PROGRESS
            ================================================= */}

            <div className="stageSupport__meta">
              <div className="stageSupport__progress">
                {stageSupportData.map((stage, index) => (
                  <span
                    key={stage.id}
                    className={`stageSupport__dot ${
                      index === activeStage
                        ? "stageSupport__dot--active"
                        : ""
                    }`}
                  />
                ))}
              </div>

              <span className="stageSupport__progress-label">
                {currentStage.progress}
              </span>
            </div>

            {/* =================================================
                DYNAMIC CONTENT
            ================================================= */}

            <div
              key={contentKey}
              className="stageSupport__detail-content"
            >
              <h3 className="stageSupport__detail-title">
                {currentStage.title}
              </h3>

              <p className="stageSupport__description">
                {currentStage.description}
              </p>

              {/* WHERE WE CAN HELP */}

              <div className="stageSupport__help">
                <h4 className="stageSupport__help-title">
                  WHERE WE CAN HELP
                </h4>

                <div className="stageSupport__tags">
                  {currentStage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="stageSupport__tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}

              <button
                type="button"
                className="stageSupport__cta"
              >
                <span>Talk about this stage</span>

                <span
                  className="stageSupport__cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StageSupport;