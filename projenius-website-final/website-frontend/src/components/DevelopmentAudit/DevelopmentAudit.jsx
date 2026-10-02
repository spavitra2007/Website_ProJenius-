import { useEffect, useRef, useState } from "react";
import "./DevelopmentAudit.css";

import DevelopmentEyebrow from "../DevelopmentEyebrow/DevelopmentEyebrow";
import DevelopmentButton from "../DevelopmentButton/DevelopmentButton";

const CONTACT_HREF = "/contact";

/* =========================================================
   AUDIT CATEGORIES
========================================================= */

const CATEGORIES = [
  "UI / UX",
  "Performance",
  "Mobile experience",
  "SEO health",
  "Functionality",
  "Security review",
  "Content structure",
  "Technical health",
];

/* =========================================================
   RADAR GEOMETRY
========================================================= */

const CX = 200;
const CY = 200;
const R = 150;
const COUNT = CATEGORIES.length;

const point = (index, factor = 1) => {
  const angle =
    ((-90 + index * 45) * Math.PI) / 180;

  return [
    CX + Math.cos(angle) * R * factor,
    CY + Math.sin(angle) * R * factor,
  ];
};

const formatPoint = (value) =>
  value.toFixed(1);

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentAudit() {
  const [revealed, setRevealed] =
    useState(false);

  const [run, setRun] =
    useState(false);

  const [scanned, setScanned] =
    useState(0);

  const [hot, setHot] =
    useState(null);

  const sectionRef =
    useRef(null);

  const radarRef =
    useRef(null);

  /* =======================================================
     SECTION REVEAL
  ======================================================= */

  useEffect(() => {
    const element =
      sectionRef.current;

    if (!element) return undefined;

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setRevealed(true);
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -4% 0px",
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     RADAR SCAN
  ======================================================= */

  useEffect(() => {
    const element =
      radarRef.current;

    if (!element) return undefined;

    const reduced =
      typeof window.matchMedia ===
        "function" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      reduced ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      setScanned(COUNT);
      return undefined;
    }

    const timers = [];

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer.disconnect();

          setRun(true);

          for (
            let index = 0;
            index < COUNT;
            index += 1
          ) {
            const timer =
              window.setTimeout(
                () => {
                  setScanned(
                    index + 1
                  );
                },
                250 +
                  index * 380
              );

            timers.push(timer);
          }
        },
        {
          threshold: 0.45,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();

      timers.forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  /* =======================================================
     RADAR GRID
  ======================================================= */

  const radarLevels = [
    0.25,
    0.5,
    0.75,
    1,
  ];

  return (
    <section
      id="pjdev-audit"
      ref={sectionRef}
      className={`pjdev-audit${
        revealed
          ? " pjdev-audit--in"
          : ""
      }`}
      aria-labelledby="pjdev-audit-title"
    >
      <div className="pjdev-audit__wrap">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="pjdev-audit__content">

          <div className="pjdev-audit__rv">
            <DevelopmentEyebrow>
              Already have a digital product?
            </DevelopmentEyebrow>
          </div>

          <h2
            id="pjdev-audit-title"
            className="
              pjdev-audit__title
              pjdev-audit__rv
              pjdev-audit__rv--d1
            "
          >
            Let's See What
            <br />
            Can Be Improved.
          </h2>

          <p
            className="
              pjdev-audit__lead
              pjdev-audit__rv
              pjdev-audit__rv--d2
            "
          >
            Your website or application may
            already be live. We can help
            identify opportunities across
            experience, performance,
            functionality and digital
            visibility.
          </p>

          {/* =================================================
              AUDIT LIST
          ================================================= */}

          <ul
            className="
              pjdev-audit__list
              pjdev-audit__rv
              pjdev-audit__rv--d3
            "
          >
            {CATEGORIES.map(
              (name, index) => {
                const isScanned =
                  index < scanned;

                const isHot =
                  hot === index;

                return (
                  <li key={name}>
                    <button
                      type="button"
                      className={`pjdev-audit__item${
                        isScanned
                          ? " pjdev-audit__item--on"
                          : ""
                      }${
                        isHot
                          ? " pjdev-audit__item--hot"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        setHot(index)
                      }
                      onMouseLeave={() =>
                        setHot(null)
                      }
                      onFocus={() =>
                        setHot(index)
                      }
                      onBlur={() =>
                        setHot(null)
                      }
                    >
                      <span className="pjdev-audit__status">
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M2 6.5l2.5 2.5L10 3.5" />
                        </svg>
                      </span>

                      <span>
                        {name}
                      </span>
                    </button>
                  </li>
                );
              }
            )}
          </ul>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              pjdev-audit__actions
              pjdev-audit__rv
              pjdev-audit__rv--d3
            "
          >
            <DevelopmentButton
              href={CONTACT_HREF}
            >
              Request a Digital Audit
            </DevelopmentButton>

            <DevelopmentButton
              href={CONTACT_HREF}
              variant="ghost"
            >
              Improve My Existing Product
            </DevelopmentButton>
          </div>
        </div>

        {/* =================================================
            RIGHT RADAR CARD
        ================================================= */}

        <div
          className="
            pjdev-audit__card
            pjdev-audit__rv
            pjdev-audit__rv--d2
          "
        >
          <div className="pjdev-audit__card-head">
            <b>
              Digital product health check
            </b>

            <span>
              Illustrative view, not a real score
            </span>
          </div>

          <svg
            ref={radarRef}
            className="pjdev-audit__radar"
            viewBox="0 0 400 400"
            role="img"
            aria-label="Illustrative radar showing eight areas reviewed in a digital audit"
          >
            <defs>
              <linearGradient
                id="pjdev-audit-wedge"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#35D9EE"
                  stopOpacity="0"
                />

                <stop
                  offset="100%"
                  stopColor="#35D9EE"
                  stopOpacity="0.42"
                />
              </linearGradient>

              <linearGradient
                id="pjdev-audit-point"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#54A0FF"
                />

                <stop
                  offset="100%"
                  stopColor="#35D9EE"
                />
              </linearGradient>
            </defs>

            {/* ===========================================
                RADAR LEVELS
            =========================================== */}

            {radarLevels.map(
              (factor) => (
                <polygon
                  key={factor}
                  className="pjdev-audit__grid"
                  points={CATEGORIES.map(
                    (_, index) =>
                      point(
                        index,
                        factor
                      )
                        .map(
                          formatPoint
                        )
                        .join(",")
                  ).join(" ")}
                />
              )
            )}

            {/* ===========================================
                AXES
            =========================================== */}

            {CATEGORIES.map(
              (name, index) => {
                const [x, y] =
                  point(index);

                return (
                  <line
                    key={`axis-${name}`}
                    className={`pjdev-audit__axis${
                      hot === index
                        ? " pjdev-audit__axis--hot"
                        : ""
                    }`}
                    x1={CX}
                    y1={CY}
                    x2={formatPoint(x)}
                    y2={formatPoint(y)}
                  />
                );
              }
            )}

            {/* ===========================================
                SWEEP
            =========================================== */}

            <g
              className={`pjdev-audit__sweep${
                run
                  ? " pjdev-audit__sweep--run"
                  : ""
              }`}
            >
              <path
                d="
                  M200 200
                  L85.1 103.6
                  A150 150 0 0 1
                  200 50
                  Z
                "
                fill="url(#pjdev-audit-wedge)"
              />

              <path
                d="
                  M200 200
                  L200 50
                "
                stroke="#35D9EE"
                strokeWidth="2"
              />
            </g>

            {/* ===========================================
                VERTICES
            =========================================== */}

            {CATEGORIES.map(
              (name, index) => {
                const [x, y] =
                  point(index);

                const isOn =
                  index < scanned;

                const isHot =
                  hot === index;

                return (
                  <circle
                    key={`vertex-${name}`}
                    className={`pjdev-audit__vertex${
                      isOn
                        ? " pjdev-audit__vertex--on"
                        : ""
                    }${
                      isHot
                        ? " pjdev-audit__vertex--hot"
                        : ""
                    }`}
                    cx={formatPoint(x)}
                    cy={formatPoint(y)}
                    r={isHot ? 9 : 6}
                  />
                );
              }
            )}

            {/* ===========================================
                CENTER
            =========================================== */}

            <circle
              className="pjdev-audit__centre-ring"
              cx={CX}
              cy={CY}
              r="8"
            />

            <circle
              className="pjdev-audit__centre"
              cx={CX}
              cy={CY}
              r="4"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}