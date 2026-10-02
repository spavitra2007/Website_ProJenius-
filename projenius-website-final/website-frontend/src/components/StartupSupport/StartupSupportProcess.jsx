import { useEffect, useRef, useState } from "react";
import { PROCESS } from "./StartupSupportData.js";
import {
  useInView,
  useReducedMotion,
} from "./StartupSupportHooks.js";
import "./StartupSupportProcess.css";

const N = PROCESS.length;

/* =========================================================
   RAIL POSITIONS
========================================================= */

const CX = Array.from(
  { length: N },
  (_, i) => ((i + 0.5) * 100) / N
);

const X0 = CX[0];
const X1 = CX[N - 1];

/* =========================================================
   AUTO PLAY INTERVAL
   One step every 5 seconds
========================================================= */

const AUTO_PLAY_DELAY = 5000;

/* =========================================================
   STARTUP SUPPORT PROCESS
========================================================= */

function StartupSupportProcess() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const timerRef = useRef(null);

  const inView = useInView(sectionRef, {
    threshold: 0.1,
  });

  const railInView = useInView(railRef, {
    threshold: 0.5,
  });

  const reduced = useReducedMotion();

  /* =========================================================
     UPDATE RAIL + RUNNING DOT
  ========================================================= */

  useEffect(() => {
    if (!N) return;

    const fraction = N === 1
      ? 0
      : active / (N - 1);

    const x2 = X0 + (X1 - X0) * fraction;

    if (fillRef.current) {
      fillRef.current.setAttribute(
        "x2",
        x2.toFixed(2)
      );
    }

    if (dotRef.current) {
      dotRef.current.setAttribute(
        "cx",
        x2.toFixed(2)
      );
    }
  }, [active]);

  /* =========================================================
     AUTOMATIC PROCESS
     
     Every 5 seconds:
     01 → 02 → 03 → 04 → 05 → 06 → 01
  ========================================================= */

  useEffect(() => {
    if (
      !railInView ||
      reduced ||
      N <= 1
    ) {
      return undefined;
    }

    timerRef.current = setInterval(() => {
      setActive((current) => {
        return (current + 1) % N;
      });
    }, AUTO_PLAY_DELAY);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [railInView, reduced]);

  /* =========================================================
     MANUAL STEP SELECTION
     
     Clicking a number immediately moves the dot there.
     Automatic 5-second movement continues.
  ========================================================= */

  const pick = (index) => {
    setActive(index);
  };

  const p = PROCESS[active];

  return (
    <section
      className="ssp-section ssp-section--light"
      id="ssp-process"
      aria-labelledby="ssp-process-heading"
      ref={sectionRef}
    >
      <div className="ssp-wrap">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div
          className={`ssp-section-head ssp-reveal${
            inView ? " ssp-reveal--in" : ""
          }`}
        >
          <p className="ssp-eyebrow">
            Our working process
          </p>

          <h2
            className="ssp-title"
            id="ssp-process-heading"
          >
            From Conversation to Execution.
          </h2>

          <p className="ssp-lede">
            We begin by understanding what you are trying
            to solve before deciding what needs to be built.
          </p>
        </div>

        {/* =====================================================
            PROCESS
        ===================================================== */}

        <div className="ssp-process-wrap">

          <div
            className="ssp-process-rail"
            ref={railRef}
          >

            {/* =================================================
                CONNECTING RAIL
            ================================================= */}

            <svg
              className="ssp-process-rail-svg"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="sspProcessGrad"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0"
                    stopColor="#1D5BDB"
                  />

                  <stop
                    offset="1"
                    stopColor="#0A7C9B"
                  />
                </linearGradient>
              </defs>

              {/* Base rail */}

              <line
                className="ssp-process-rail-base"
                x1={X0}
                y1="5"
                x2={X1}
                y2="5"
              />

              {/* Active rail */}

              <line
                ref={fillRef}
                className="ssp-process-rail-fill"
                x1={X0}
                y1="5"
                x2={X0}
                y2="5"
              />

              {/* =================================================
                  VERY SMALL RUNNING DOT
              ================================================= */}

              <circle
                ref={dotRef}
                className="ssp-process-rail-dot"
                cx={X0}
                cy="5"
                r="0.35"
              />
            </svg>

            {/* =================================================
                PROCESS STEP BUTTONS
            ================================================= */}

            <div className="ssp-process-rail-row">

              {PROCESS.map((step, i) => (
                <button
                  key={step.verb}
                  type="button"
                  className={[
                    "ssp-process-step-btn",
                    i < active
                      ? "ssp-process-step-btn--done"
                      : "",
                    i === active
                      ? "ssp-process-step-btn--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`Step ${step.num}: ${step.verb}`}
                  aria-current={
                    i === active
                      ? "step"
                      : undefined
                  }
                  onClick={() => pick(i)}
                >
                  <span className="ssp-process-step-num">
                    {step.num}
                  </span>

                  <span className="ssp-process-step-verb">
                    {step.verb}
                  </span>

                  <span className="ssp-process-step-hint">
                    {step.title}
                  </span>
                </button>
              ))}

            </div>
          </div>

          {/* ===================================================
              ACTIVE PROCESS PANEL
          =================================================== */}

          <div
            className="ssp-process-panel"
            aria-live="polite"
            key={active}
          >

            {/* =================================================
                STEP NUMBER
            ================================================= */}

            <div>
              <div
                className="ssp-process-panel-num"
                aria-hidden="true"
              >
                {p.num}
              </div>

              <div className="ssp-process-panel-verb">
                {p.verb}
              </div>
            </div>

            {/* =================================================
                STEP CONTENT
            ================================================= */}

            <div>
              <h3>{p.title}</h3>

              <p className="ssp-process-panel-desc">
                {p.text}
              </p>
            </div>

            {/* =================================================
                CAPABILITIES
            ================================================= */}

            <div>
              <p className="ssp-mini-label">
                Capabilities involved
              </p>

              <ul className="ssp-chip-list">
                {p.chips.map((chip) => (
                  <li
                    key={chip}
                    className="ssp-chip"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportProcess;