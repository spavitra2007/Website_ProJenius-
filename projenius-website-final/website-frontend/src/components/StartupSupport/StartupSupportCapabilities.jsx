import { useEffect, useMemo, useRef, useState } from "react";
import { CAPS } from "./StartupSupportData.js";
import { useInView } from "./StartupSupportHooks.js";
import "./StartupSupportCapabilities.css";

import pjLogo from "../../assets/images/pj_logo.jpeg";

/* =========================================================
   RING POSITION
========================================================= */

function ringPosition(index, total) {
  const angle =
    ((-90 + (index * 360) / total) * Math.PI) / 180;

  return {
    x: 50 + 39 * Math.cos(angle),
    y: 50 + 38 * Math.sin(angle),
  };
}

/* =========================================================
   STARTUP SUPPORT CAPABILITIES
========================================================= */

function StartupSupportCapabilities() {
  const sectionRef = useRef(null);

  const inView = useInView(sectionRef, {
    threshold: 0.1,
  });

  const [active, setActive] = useState(0);

  /* =========================================================
     POSITIONS
  ========================================================= */

  const positions = useMemo(
    () =>
      CAPS.map((_, index) =>
        ringPosition(index, CAPS.length)
      ),
    []
  );

  /* =========================================================
     CAPABILITY LOOKUP
  ========================================================= */

  const byName = useMemo(
    () =>
      Object.fromEntries(
        CAPS.map((capability, index) => [
          capability.name,
          index,
        ])
      ),
    []
  );

  /* =========================================================
     RELATED CAPABILITIES
  ========================================================= */

  const relatedIdx = useMemo(() => {
    if (active === null || !CAPS[active]) return [];

    return CAPS[active].related
      .map((name) => byName[name])
      .filter((index) => index !== undefined);
  }, [active, byName]);

  /* =========================================================
     AUTO ROTATION
     Changes every 5 seconds continuously.
  ========================================================= */

  useEffect(() => {
    if (!CAPS.length) return;

    const timer = setInterval(() => {
      setActive((current) =>
        current >= CAPS.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================================
     ACTIVE CAPABILITY
  ========================================================= */

  const activeCapability = CAPS[active];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="ssp-section ssp-section--dark ssp-gridbg"
      id="ssp-capabilities"
      aria-labelledby="ssp-caps-heading"
      ref={sectionRef}
    >
      <div className="ssp-wrap">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className={`ssp-section-head ssp-reveal${
            inView ? " ssp-reveal--in" : ""
          }`}
        >
          <p className="ssp-eyebrow">
            Capability map
          </p>

          <h2
            className="ssp-title"
            id="ssp-caps-heading"
          >
            One Idea. Multiple Capabilities.
          </h2>

          <p className="ssp-lede">
            The technology you need depends on the
            problem you're solving.
          </p>
        </div>

        {/* =====================================================
            DESKTOP MAP
        ===================================================== */}

        <div
          className={`ssp-caps-map ${
            active !== null
              ? "ssp-caps-map--has-active"
              : ""
          }`}
        >

          {/* ===================================================
              SVG CONNECTION SYSTEM
          =================================================== */}

          <svg
            className="ssp-caps-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Outer orbit */}

            <ellipse
              className="ssp-caps-ring ssp-caps-ring--dashed"
              cx="50"
              cy="50"
              rx="39"
              ry="38"
            />

            {/* Inner orbit */}

            <ellipse
              className="ssp-caps-ring"
              cx="50"
              cy="50"
              rx="22"
              ry="21"
            />

            {/* Connection lines */}

            {positions.map((position, index) => {
              const isActive = index === active;
              const isRelated =
                relatedIdx.includes(index);

              return (
                <line
                  key={CAPS[index].name}
                  className={[
                    "ssp-caps-line",
                    isActive
                      ? "ssp-caps-line--on"
                      : "",
                    isRelated
                      ? "ssp-caps-line--rel"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  x1="50"
                  y1="50"
                  x2={position.x.toFixed(2)}
                  y2={position.y.toFixed(2)}
                />
              );
            })}
          </svg>

          {/* ===================================================
              CENTER PROJENIUS LOGO
          =================================================== */}

          <div className="ssp-caps-core">

            <div className="ssp-caps-core-logo">
              <img
                src={pjLogo}
                alt="ProJenius"
                draggable="false"
              />
            </div>

          </div>

          {/* ===================================================
              CAPABILITY NODES
          =================================================== */}

          {CAPS.map((capability, index) => {
            const isActive = index === active;
            const isRelated =
              relatedIdx.includes(index);

            return (
              <button
                key={capability.name}
                type="button"
                className={[
                  "ssp-caps-node",
                  `ssp-caps-pos-${index}`,
                  isActive
                    ? "ssp-caps-node--active"
                    : "",
                  isRelated
                    ? "ssp-caps-node--rel"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={isActive}
              >
                <span className="ssp-caps-node-dot" />
                <span>{capability.name}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================
            ACTIVE INFORMATION
        ===================================================== */}

        <div
          className="ssp-caps-info"
          aria-live="polite"
          key={active}
        >
          <div className="ssp-caps-info-content">

            <span className="ssp-caps-info-name">
              {activeCapability.name}
            </span>

            <span className="ssp-caps-info-desc">
              {activeCapability.text}
            </span>

            <span className="ssp-caps-info-rel">
              Often combined with:{" "}
              {activeCapability.related.join(", ")}
            </span>

          </div>
        </div>

        {/* =====================================================
            MOBILE LIST
        ===================================================== */}

        <div className="ssp-caps-list">

          <div className="ssp-caps-list-core">

            <div className="ssp-caps-list-logo">
              <img
                src={pjLogo}
                alt="ProJenius"
                draggable="false"
              />
            </div>

            <span>PROJENIUS</span>

          </div>

          <ol>
            {CAPS.map((capability, index) => (
              <li
                key={capability.name}
                className={
                  index === active
                    ? "ssp-caps-mobile-active"
                    : ""
                }
              >
                <h3>{capability.name}</h3>

                <p>{capability.text}</p>
              </li>
            ))}
          </ol>

        </div>

      </div>
    </section>
  );
}

export default StartupSupportCapabilities;