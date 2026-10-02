import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Target,
  ListChecks,
  Compass,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";
import "./GuidanceProcess.css";

/* =========================================================
   GUIDANCE DATA
========================================================= */

const guidanceSteps = [
  {
    id: 1,
    title: "Profile Review",
    icon: Search,
    color: "blue",
    position: "top",
    description:
      "Review your profile, resume, strengths and career direction.",
  },
  {
    id: 2,
    title: "Goal Discussion",
    icon: Target,
    color: "orange",
    position: "top-right",
    description:
      "Understand your career goals and identify the right direction.",
  },
  {
    id: 3,
    title: "Skill Gap Analysis",
    icon: ListChecks,
    color: "teal",
    position: "right",
    description:
      "Identify the skills you need to build for your target role.",
  },
  {
    id: 4,
    title: "Career Roadmap",
    icon: Compass,
    color: "blue",
    position: "bottom",
    description:
      "Create a practical roadmap based on your goals and current skills.",
  },
  {
    id: 5,
    title: "Resume & Prep",
    icon: FileText,
    color: "orange",
    position: "bottom-left",
    description:
      "Improve your resume and prepare for interviews and opportunities.",
  },
  {
    id: 6,
    title: "Placement Support",
    icon: BriefcaseBusiness,
    color: "teal",
    position: "top-left",
    description:
      "Get guidance and support as you move toward placement opportunities.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const GuidanceProcess = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

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
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`guidance-process-section ${
        isVisible ? "guidance-process-visible" : ""
      }`}
    >
      <div className="guidance-process-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="guidance-process-heading">
          <span className="guidance-process-label">
            GUIDANCE PROCESS
          </span>

          <h2>
            A Practical Path for{" "}
            <span>Students and Freshers</span>
          </h2>
        </div>

        {/* =================================================
            PROCESS
        ================================================= */}

        <div className="guidance-process-area">

          <div className="guidance-process-circle">

            {/* OUTER RING */}

            <div className="guidance-process-ring" />

            {/* CENTER */}

            <div className="guidance-process-center">
              <div className="guidance-center-line" />

              <h3>
                6 Steps to Your Career
                <br />
                Breakthrough
              </h3>

              <p>
                Hover over any step to see details.
              </p>
            </div>

            {/* STEPS */}

            {guidanceSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`
                    guidance-step
                    guidance-step-${step.position}
                    guidance-step-${step.color}
                  `}
                  style={{
                    "--step-delay": `${index * 0.08}s`,
                  }}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >

                  {/* TITLE */}

                  <div className="guidance-step-title">
                    {step.title}
                  </div>

                  {/* NODE */}

                  <div className="guidance-step-node">
                    <Icon
                      size={19}
                      strokeWidth={2.2}
                    />

                    <span>{step.id}</span>
                  </div>

                  {/* TOOLTIP */}

                  <div
                    className={`guidance-step-tooltip ${
                      activeStep === step.id
                        ? "guidance-tooltip-active"
                        : ""
                    }`}
                  >
                    {step.description}
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceProcess;