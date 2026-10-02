import { useEffect, useRef, useState } from "react";
import "./DevelopmentLifecycle.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

/* =========================================================
   LIFECYCLE DATA
========================================================= */

const STAGES = [
  [
    "Requirement",
    "Every journey starts with a clear need.",
  ],
  [
    "Discovery",
    "Understanding users, goals and existing systems.",
  ],
  [
    "Design",
    "Shaping the experience before building it.",
  ],
  [
    "Development",
    "Building the solution, step by step.",
  ],
  [
    "Launch",
    "Going live for real users.",
  ],
  [
    "Monitor",
    "Watching how the product performs.",
  ],
  [
    "Maintain",
    "Keeping it stable, secure and current.",
  ],
  [
    "Improve",
    "Refining based on what we learn.",
  ],
  [
    "Optimize",
    "Tuning for speed, clarity and value.",
  ],
  [
    "Grow",
    "Growth opens the next opportunity, and the cycle begins again.",
  ],
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentLifecycle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const ringRef = useRef(null);

  const userPicked = useRef(false);
  const hovering = useRef(false);

  /* =======================================================
     OBSERVE RING
  ======================================================= */

  useEffect(() => {
    const element = ringRef.current;

    if (!element) {
      return undefined;
    }

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setVisible(true);
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        {
          threshold: 0.35,
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     AUTO PLAY
  ======================================================= */

  useEffect(() => {
    const reduced =
      typeof window.matchMedia ===
        "function" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      !visible ||
      reduced
    ) {
      return undefined;
    }

    const timer =
      window.setInterval(() => {
        if (
          userPicked.current ||
          hovering.current
        ) {
          return;
        }

        setIndex(
          (current) =>
            (current + 1) %
            STAGES.length
        );
      }, 2600);

    return () =>
      window.clearInterval(timer);
  }, [visible]);

  /* =======================================================
     SELECT STAGE
  ======================================================= */

  const selectStage = (stageIndex) => {
    userPicked.current = false;
    setIndex(stageIndex);
  };

  return (
    <section
      id="pjdev-lifecycle"
      className="pjdev-lifecycle"
      aria-labelledby="pjdev-lifecycle-title"
    >
      <div className="pjdev-lifecycle__wrap">

        {/* =================================================
            HEADER
        ================================================= */}

        <DevelopmentSectionHead
          id="pjdev-lifecycle-title"
          center
          title="Build. Launch. Improve."
          text="We don't see development as a one-time event."
        />

        {/* =================================================
            LIFECYCLE RING
        ================================================= */}

        <div
          ref={ringRef}
          className="pjdev-lifecycle__ring"
        >

          {/* =================================================
              RETURN MESSAGE
          ================================================= */}

          <div className="pjdev-lifecycle__return">
            <DevelopmentIcon name="loop" />

            <span>
              Every cycle returns to a new requirement
            </span>
          </div>

          {/* =================================================
              RING SVG
          ================================================= */}

          <svg
            className="pjdev-lifecycle__svg"
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="pjdev-lifecycle-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#5C89FF"
                />

                <stop
                  offset="100%"
                  stopColor="#44CFF0"
                />
              </linearGradient>
            </defs>

            {/* BASE RING */}

            <circle
              className="pjdev-lifecycle__track"
              cx="50"
              cy="50"
              r="38"
            />

            {/* PROGRESS */}

            <circle
              className={`pjdev-lifecycle__prog pjdev-lifecycle__prog--${index}`}
              cx="50"
              cy="50"
              r="38"
              pathLength="1"
              stroke="url(#pjdev-lifecycle-gradient)"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* =================================================
              CENTER
          ================================================= */}

          <div
            className="pjdev-lifecycle__centre"
            aria-live="polite"
          >
            <div className="pjdev-lifecycle__count">
              Stage {index + 1} of {STAGES.length}
            </div>

            <div
              key={`name-${index}`}
              className="pjdev-lifecycle__name"
            >
              {STAGES[index][0]}
            </div>

            <p
              key={`line-${index}`}
              className="pjdev-lifecycle__line"
            >
              {STAGES[index][1]}
            </p>
          </div>

          {/* =================================================
              NODES
          ================================================= */}

          {STAGES.map(
            ([name], stageIndex) => {
              const current =
                stageIndex === index;

              const past =
                stageIndex < index;

              return (
                <div
                  key={name}
                  className={[
                    "pjdev-lifecycle__node",
                    `pjdev-lifecycle__node--${stageIndex}`,
                    current
                      ? "pjdev-lifecycle__node--cur"
                      : "",
                    past
                      ? "pjdev-lifecycle__node--past"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <button
                    type="button"
                    aria-label={`${name}, stage ${
                      stageIndex + 1
                    } of ${STAGES.length}`}
                    aria-pressed={
                      current
                    }
                    onClick={() =>
                      selectStage(
                        stageIndex
                      )
                    }
                    onMouseEnter={() => {
                      hovering.current =
                        true;

                      if (
                        !userPicked.current
                      ) {
                        setIndex(
                          stageIndex
                        );
                      }
                    }}
                    onMouseLeave={() => {
                      hovering.current =
                        false;
                    }}
                  >
                    {name}
                  </button>
                </div>
              );
            }
          )}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <p className="pjdev-lifecycle__statement">
          Your digital product can continue
          to evolve as your business grows.
        </p>
      </div>
    </section>
  );
}