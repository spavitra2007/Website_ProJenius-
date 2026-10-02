import { useEffect, useRef, useState } from "react";
import "./DevelopmentEcosystem.css";

/* =========================================================
   NODES
========================================================= */

const NODES = [
  {
    label: "UI/UX",
    x: 50,
    y: 13,
    cap: "Experiences designed before they are built.",
  },
  {
    label: "Automation",
    x: 74,
    y: 23.8,
    cap: "Connected, repeatable workflows.",
  },
  {
    label: "SaaS",
    x: 84,
    y: 50,
    cap: "Multi-user platforms that scale with you.",
  },
  {
    label: "Integrations",
    x: 74,
    y: 76.2,
    cap: "APIs and systems working together.",
  },
  {
    label: "Data",
    x: 50,
    y: 87,
    cap: "Dashboards, reporting and insight.",
  },
  {
    label: "Mobile",
    x: 26,
    y: 76.2,
    cap: "Applications for phones and tablets.",
  },
  {
    label: "AI",
    x: 16,
    y: 50,
    cap: "Intelligent features where they add value.",
  },
  {
    label: "Web",
    x: 26,
    y: 23.8,
    cap: "Websites, portals and web applications.",
  },
];

const DEFAULT_CAPTION =
  "Hover or tap a node to see how it connects.";

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentEcosystem() {
  const [hot, setHot] = useState(null);
  const [inView, setInView] = useState(false);

  const stageRef = useRef(null);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const element = stageRef.current;

    if (!element) return undefined;

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setInView(true);
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.25,
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     SELECT NODE
  ======================================================= */

  const handleNodeClick = (index) => {
    setHot((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="pjdev-ecosystem"
      className="pjdev-eco"
      aria-labelledby="pjdev-eco-title"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="pjdev-eco__bg"
        aria-hidden="true"
      />

      <div className="pjdev-eco__wrap">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="pjdev-eco__copy">
          <h2
            id="pjdev-eco-title"
            className="pjdev-eco__title"
          >
            Different Technologies.
            <br />
            <span className="pjdev-eco__title-accent">
              One Requirement.
            </span>
          </h2>

          <p className="pjdev-eco__statement">
            We don't force every project into
            the same technology or architecture.
            The solution is shaped around the
            requirement.
          </p>
        </div>

        {/* =================================================
            RIGHT DIAGRAM
        ================================================= */}

        <div className="pjdev-eco__diagram-wrap">

          <div
            ref={stageRef}
            className={`pjdev-eco__stage${
              inView
                ? " pjdev-eco__stage--in"
                : ""
            }`}
          >

            {/* ===========================================
                OUTER ORBIT
            =========================================== */}

            <div
              className="
                pjdev-eco__ring
                pjdev-eco__ring--outer
              "
              aria-hidden="true"
            />

            {/* ===========================================
                INNER ORBIT
            =========================================== */}

            <div
              className="
                pjdev-eco__ring
                pjdev-eco__ring--inner
              "
              aria-hidden="true"
            />

            {/* ===========================================
                CONNECTION LINES
            =========================================== */}

            <svg
              className="pjdev-eco__lines"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              {NODES.map(
                (node, index) => (
                  <line
                    key={node.label}
                    className={`pjdev-eco__line${
                      hot === index
                        ? " pjdev-eco__line--hot"
                        : ""
                    }`}
                    x1="50%"
                    y1="50%"
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    pathLength="1"
                  />
                )
              )}
            </svg>

            {/* ===========================================
                CENTER CORE
            =========================================== */}

            <div className="pjdev-eco__core">
              <span>
                Your business
                <br />
                requirement
              </span>
            </div>

            {/* ===========================================
                NODES
            =========================================== */}

            {NODES.map(
              (node, index) => {
                const isHot =
                  hot === index;

                return (
                  <button
                    key={node.label}
                    type="button"
                    className={`pjdev-eco__node pjdev-eco__node--${
                      index + 1
                    }${
                      isHot
                        ? " pjdev-eco__node--hot"
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
                    onClick={() =>
                      handleNodeClick(index)
                    }
                    aria-pressed={isHot}
                  >
                    <span className="pjdev-eco__node-text">
                      {node.label}
                    </span>
                  </button>
                );
              }
            )}

          </div>

          {/* =================================================
              CAPTION
          ================================================= */}

          <p
            className="pjdev-eco__caption"
            aria-live="polite"
          >
            {hot === null
              ? DEFAULT_CAPTION
              : `${NODES[hot].label}: ${NODES[hot].cap}`}
          </p>
        </div>
      </div>
    </section>
  );
}