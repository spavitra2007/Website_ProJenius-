import { useCallback, useEffect, useRef, useState } from "react";
import "./DevelopmentProcess.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

/* =========================================================
   PROCESS DATA
========================================================= */

const STAGES = [
  {
    n: "01",
    title: "Discover",
    verb: "Understand",
    note: "before anything is built",
    chips: [
      "Business",
      "Users",
      "Goals",
      "Requirements",
      "Existing systems",
    ],
  },
  {
    n: "02",
    title: "Plan",
    verb: "Define",
    note: "what gets built and why",
    chips: [
      "Scope",
      "Priorities",
      "Features",
      "User journeys",
      "Solution direction",
    ],
  },
  {
    n: "03",
    title: "Design",
    verb: "Create",
    note: "the experience first",
    chips: [
      "User flows",
      "Wireframes",
      "UI",
      "Prototypes",
      "Experience structure",
    ],
  },
  {
    n: "04",
    title: "Develop",
    verb: "Build",
    note: "the right solution",
    chips: [
      "Website",
      "Application",
      "SaaS",
      "AI solution",
      "Automation",
      "Digital platform",
    ],
  },
  {
    n: "05",
    title: "Integrate",
    verb: "Connect",
    note: "everything it depends on",
    chips: [
      "APIs",
      "Data",
      "AI services",
      "External systems",
      "Required infrastructure",
    ],
  },
  {
    n: "06",
    title: "Test",
    verb: "Validate",
    note: "it works for real people",
    chips: [
      "Functionality",
      "Responsiveness",
      "Usability",
      "Performance",
      "Security",
    ],
  },
  {
    n: "07",
    title: "Deploy",
    verb: "Launch",
    note: "to real users",
    text: "Prepare the solution for real users and launch.",
  },
  {
    n: "08",
    title: "Support",
    verb: "Improve",
    note: "and evolve",
    text: "Maintain, monitor, improve and evolve the solution.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentProcess() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const frameRef = useRef(null);

  const [active, setActive] = useState(0);

  /* =======================================================
     SCROLL CALCULATION
  ======================================================= */

  const updateFromScroll = useCallback(() => {
    frameRef.current = null;

    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const rect =
      rail.getBoundingClientRect();

    const viewportCenter =
      window.innerHeight * 0.5;

    /*
     * Distance from the top of the process rail
     * to the center of the viewport.
     */
    const distance =
      viewportCenter - rect.top;

    /*
     * Convert that distance into 0 → 1 progress.
     */
    const progress = clamp(
      distance / rect.height,
      0,
      1
    );

    /* =====================================================
       BLUE RAIL
    ===================================================== */

    if (fillRef.current) {
      fillRef.current.setAttribute(
        "stroke-dashoffset",
        String(1 - progress)
      );
    }

    /* =====================================================
       LEFT NUMBER / CONTENT
       
       Divide the complete process into 8 equal
       scroll zones.
    ===================================================== */

    const stageSize =
      1 / STAGES.length;

    let nextStage = Math.floor(
      progress / stageSize
    );

    /*
     * Keep the value inside 0 → 7.
     */
    nextStage = clamp(
      nextStage,
      0,
      STAGES.length - 1
    );

    setActive((current) =>
      current === nextStage
        ? current
        : nextStage
    );
  }, []);

  /* =======================================================
     REQUEST FRAME
  ======================================================= */

  const requestUpdate = useCallback(() => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current =
      window.requestAnimationFrame(
        updateFromScroll
      );
  }, [updateFromScroll]);

  /* =======================================================
     SCROLL LISTENER
  ======================================================= */

  useEffect(() => {
    requestUpdate();

    const handleScroll = () => {
      requestUpdate();
    };

    const handleResize = () => {
      requestUpdate();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (
        frameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          frameRef.current
        );

        frameRef.current = null;
      }
    };
  }, [requestUpdate]);

  /* =======================================================
     HEADER HEIGHT SYNC
     The heading remains in its original position and stays
     above the scrolling process content. The stage panel uses
     this measured height as its sticky offset.
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) {
      return undefined;
    }

    const updateHeaderHeight = () => {
      section.style.setProperty(
        "--process-header-height",
        `${header.offsetHeight}px`
      );

      requestUpdate();
    };

    updateHeaderHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeaderHeight);

      return () => {
        window.removeEventListener("resize", updateHeaderHeight);
      };
    }

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, [requestUpdate]);

  const currentStage =
    STAGES[active];

  return (
    <section
      id="pjdev-process"
      ref={sectionRef}
      className="pjdev-process pjdev-theme-dark"
      aria-labelledby="pjdev-process-title"
    >
      <div className="pjdev-process__wrap">

        {/* =================================================
            STICKY SECTION HEADING
            Kept in the original top position. Its opaque
            background creates a clean boundary so scrolling
            stage content can never show through the heading.
        ================================================= */}

        <div
          ref={headerRef}
          className="pjdev-process__header-sticky"
        >
          <DevelopmentSectionHead
            id="pjdev-process-title"
            title="How We Turn a Requirement Into Reality."
            text="A structured journey from the first conversation to a working digital product."
          />
        </div>

        {/* =================================================
            PROCESS LAYOUT
        ================================================= */}

        <div className="pjdev-process__layout">

          {/* ===============================================
              LEFT STICKY STAGE PANEL
          =============================================== */}

          <aside
            className="pjdev-process__side"
            aria-live="polite"
          >
            <div className="pjdev-process__current">

              {/* BIG NUMBER */}
              <div
                key={currentStage.n}
                className="pjdev-process__num"
              >
                {currentStage.n}
              </div>

              {/* STAGE TITLE */}
              <div
                key={`word-${currentStage.n}`}
                className="pjdev-process__word"
              >
                {currentStage.title}
              </div>

              {/* STAGE COUNT */}
              <div className="pjdev-process__count">
                Stage {active + 1} of {STAGES.length}
              </div>

              {/* PROGRESS TICKS */}
              <div
                className="pjdev-process__ticks"
                aria-hidden="true"
              >
                {STAGES.map((stage, index) => (
                  <i
                    key={stage.n}
                    className={[
                      "pjdev-process__tick",
                      index <= active
                        ? "pjdev-process__tick--on"
                        : "",
                      index === active
                        ? "pjdev-process__tick--cur"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                ))}
              </div>

            </div>
          </aside>

          {/* ===============================================
              RIGHT-SIDE PROCESS
          =============================================== */}

          <div className="pjdev-process__content">

            <div
              ref={railRef}
              className="pjdev-process__rail"
            >

              {/* =============================================
                  PROCESS LINE
              ============================================= */}

              <svg
                className="pjdev-process__railsvg"
                width="4"
                aria-hidden="true"
                focusable="false"
              >
                <line
                  className="pjdev-process__railtrack"
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="100%"
                />

                <line
                  ref={fillRef}
                  className="pjdev-process__railfill"
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="100%"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
              </svg>

              {/* =============================================
                  STAGES
              ============================================= */}

              <ol className="pjdev-process__stages">
                {STAGES.map((stage, index) => {
                  let state = "";

                  if (index === active) {
                    state = " pjdev-process__stage--active";
                  } else if (index < active) {
                    state = " pjdev-process__stage--done";
                  } else if (index === active + 1) {
                    state = " pjdev-process__stage--next";
                  }

                  return (
                    <li
                      key={stage.n}
                      className={`pjdev-process__stage${state}`}
                    >
                      <span className="pjdev-process__stage-n">
                        {stage.n}
                      </span>

                      <h3 className="pjdev-process__stage-title">
                        {stage.title}
                      </h3>

                      <span className="pjdev-process__stage-verb">
                        <b>{stage.verb}</b>{" "}
                        {stage.note}
                      </span>

                      <div className="pjdev-process__stage-body">
                        {stage.chips ? (
                          <ul className="pjdev-process__chips">
                            {stage.chips.map((chip) => (
                              <li key={chip}>{chip}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{stage.text}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className="pjdev-process__loop">
              <DevelopmentIcon name="loop" />

              <span>
                And then the journey continues:
                new requirements, new opportunities,
                new growth.
              </span>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}