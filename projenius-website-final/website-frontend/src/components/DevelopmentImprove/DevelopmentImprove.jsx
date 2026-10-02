import { useEffect, useRef, useState } from "react";
import "./DevelopmentImprove.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";

import DevelopmentMockScreen, {
  MockBefore,
  MockAfter,
} from "../DevelopmentMockScreen/DevelopmentMockScreen";

/* =========================================================
   DATA
========================================================= */

const STEPS = [
  {
    title: "Audit",
    text: "Review the current experience, structure and performance.",
  },
  {
    title: "Insights",
    text: "Find what is holding users and the business back.",
  },
  {
    title: "Improvement",
    text: "Redesign and rebuild what matters most.",
  },
  {
    title: "Optimization",
    text: "Tune, measure and keep refining.",
  },
];

const AREAS = [
  "UI/UX",
  "Performance",
  "Features",
  "Workflow",
  "Automation",
  "Mobile experience",
  "Content",
  "Digital visibility",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentImprove() {
  const [position, setPosition] = useState(97);
  const [inView, setInView] = useState(false);

  const compareRef = useRef(null);
  const touchedRef = useRef(false);

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const reducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /* =======================================================
     INITIAL SWIPE ANIMATION
  ======================================================= */

  useEffect(() => {
    const element = compareRef.current;

    if (!element) {
      return undefined;
    }

    if (
      reducedMotion ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      setInView(true);
      setPosition(50);
      return undefined;
    }

    let frame = 0;
    let timer = null;
    let startTime = null;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer.disconnect();

          setInView(true);

          timer = window.setTimeout(() => {
            const animate = (time) => {
              if (touchedRef.current) {
                return;
              }

              if (startTime === null) {
                startTime = time;
              }

              const progress = Math.min(
                1,
                (time - startTime) / 1800
              );

              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  3
                );

              const nextPosition =
                97 +
                (50 - 97) * eased;

              setPosition(nextPosition);

              if (progress < 1) {
                frame =
                  window.requestAnimationFrame(
                    animate
                  );
              }
            };

            frame =
              window.requestAnimationFrame(
                animate
              );
          }, 300);
        },
        {
          threshold: 0.35,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timer) {
        window.clearTimeout(timer);
      }

      if (frame) {
        window.cancelAnimationFrame(
          frame
        );
      }
    };
  }, [reducedMotion]);

  /* =======================================================
     STEP
  ======================================================= */

  const revealed = 100 - position;

  const stepIndex =
    revealed < 25
      ? 0
      : revealed < 50
      ? 1
      : revealed < 75
      ? 2
      : 3;

  /* =======================================================
     SLIDER
  ======================================================= */

  const handleSliderChange = (event) => {
    touchedRef.current = true;

    setPosition(
      Number(event.target.value)
    );
  };

  return (
    <section
      id="pjdev-improve"
      className={`pjdev-improve${
        inView
          ? " pjdev-improve--in"
          : ""
      }`}
      aria-labelledby="pjdev-improve-title"
    >
      <div className="pjdev-improve__wrap">

        {/* =================================================
            HEADER
        ================================================= */}

        <DevelopmentSectionHead
          id="pjdev-improve-title"
          title="Already Built Doesn't Mean Finished."
          text="Digital products evolve. New users, new requirements and new business goals create new opportunities to improve."
        />

        {/* =================================================
            COMPARISON
        ================================================= */}

        <div className="pjdev-improve__block">

          <div
            ref={compareRef}
            className="pjdev-improve__compare"
            style={{
              "--pjdev-improve-position":
                `${position}%`,
            }}
          >

            {/* =================================================
                FIXED BEFORE LAYER

                IMPORTANT:
                This is a complete independent screen.
            ================================================= */}

            <div
              className="
                pjdev-improve__layer
                pjdev-improve__layer--before
              "
              aria-hidden="true"
            >
              <DevelopmentMockScreen wide>
                <MockBefore />
              </DevelopmentMockScreen>
            </div>

            {/* =================================================
                FIXED AFTER LAYER

                IMPORTANT:
                Same exact dimensions and starting point
                as the BEFORE layer.
            ================================================= */}

            <div
              className="
                pjdev-improve__layer
                pjdev-improve__layer--after
              "
              aria-hidden="true"
            >
              <DevelopmentMockScreen wide>
                <MockAfter />
              </DevelopmentMockScreen>
            </div>

            {/* =================================================
                LABELS
            ================================================= */}

            <span
              className="
                pjdev-improve__tag
                pjdev-improve__tag--left
              "
            >
              Existing experience
            </span>

            <span
              className="
                pjdev-improve__tag
                pjdev-improve__tag--right
              "
            >
              Improved experience
            </span>

            {/* =================================================
                INVISIBLE RANGE
            ================================================= */}

            <input
              className="pjdev-improve__range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={position}
              aria-label="Drag to compare the existing and improved experience"
              onChange={handleSliderChange}
              onPointerDown={() => {
                touchedRef.current = true;
              }}
            />

            {/* =================================================
                HANDLE
            ================================================= */}

            <div
              className="
                pjdev-improve__handle
              "
              aria-hidden="true"
            >
              <span className="pjdev-improve__handle-line" />

              <span className="pjdev-improve__handle-knob">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M9 7L4 12L9 17" />
                  <path d="M15 7L20 12L15 17" />
                </svg>
              </span>
            </div>
          </div>

          {/* =================================================
              STEPS
          ================================================= */}

          <ol className="pjdev-improve__steps">
            {STEPS.map(
              (step, index) => (
                <li
                  key={step.title}
                  className={[
                    "pjdev-improve__step",
                    index === stepIndex
                      ? "pjdev-improve__step--on"
                      : "",
                    index < stepIndex
                      ? "pjdev-improve__step--past"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <b>
                    {step.title}
                  </b>

                  <span>
                    {step.text}
                  </span>
                </li>
              )
            )}
          </ol>

          {/* =================================================
              AREAS
          ================================================= */}

          <p className="pjdev-improve__areas-title">
            Where improvements usually happen
          </p>

          <ul className="pjdev-improve__areas">
            {AREAS.map(
              (area) => (
                <li key={area}>
                  {area}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}