import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./CapabilityMap.css";

/* =========================================================
   LOGO
========================================================= */

const LOGO_SRC = "/images/logo.png";

/* =========================================================
   CAPABILITY DATA
========================================================= */

const capabilities = [
  {
    id: "01",
    title: "Software & SaaS",
    description:
      "Platforms, applications and web products built around clear user needs, scalable architecture and reliable delivery.",
    combined:
      "Often combined with: AI / ML, Automation",
  },
  {
    id: "02",
    title: "Mobile / Web",
    description:
      "Responsive mobile and web experiences designed for usability, performance and practical product delivery.",
    combined:
      "Often combined with: Software & SaaS, AI / ML",
  },
  {
    id: "03",
    title: "Product Development",
    description:
      "From concept to working product through planning, design, engineering, prototyping and structured development.",
    combined:
      "Often combined with: Software & SaaS, Electronics, Embedded Systems",
  },
  {
    id: "04",
    title: "Automation",
    description:
      "Workflows, control systems and integrations that reduce repetitive work and improve operational efficiency.",
    combined:
      "Often combined with: Software & SaaS, IoT, Embedded Systems",
  },
  {
    id: "05",
    title: "IoT",
    description:
      "Connected devices and systems that combine sensing, communication, software and hardware into one solution.",
    combined:
      "Often combined with: Embedded Systems, Electronics, Automation",
  },
  {
    id: "06",
    title: "Embedded Systems",
    description:
      "Firmware and embedded solutions for connected products, controllers, devices and real-world applications.",
    combined:
      "Often combined with: Electronics, PCB, IoT",
  },
  {
    id: "07",
    title: "Electronics",
    description:
      "Circuit design, component selection and integration for sensing, control and power.",
    combined:
      "Often combined with: PCB, Embedded Systems, IoT",
  },
  {
    id: "08",
    title: "PCB",
    description:
      "PCB design and development for reliable electronic systems, prototypes and production-ready hardware.",
    combined:
      "Often combined with: Electronics, Embedded Systems, Product Development",
  },
  {
    id: "09",
    title: "3D Design & Printing",
    description:
      "3D modelling, design and rapid physical prototyping for products, components and development work.",
    combined:
      "Often combined with: Product Development, Electronics, IoT",
  },
  {
    id: "10",
    title: "AI / ML",
    description:
      "Intelligent features, machine learning models and data-driven solutions for practical product applications.",
    combined:
      "Often combined with: Software & SaaS, Mobile / Web, Automation",
  },
];

/* =========================================================
   NODE POSITIONS
   CLOCKWISE
========================================================= */

const nodePositions = [
  { x: 50, y: 8 },
  { x: 77, y: 18 },
  { x: 91, y: 40 },
  { x: 78, y: 65 },
  { x: 67, y: 88 },
  { x: 50, y: 96 },
  { x: 32, y: 88 },
  { x: 19, y: 65 },
  { x: 9, y: 40 },
  { x: 23, y: 18 },
];

/* =========================================================
   COMPONENT
========================================================= */

const CapabilityMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const currentCapability = capabilities[activeIndex];

  /* =======================================================
     BUILD CURVED CONNECTION
  ======================================================= */

  const getPath = useCallback((position) => {
    const centerX = 50;
    const centerY = 50;

    const controlX =
      centerX +
      (position.x - centerX) * 0.48;

    const controlY =
      centerY +
      (position.y - centerY) * 0.48;

    return `
      M ${centerX} ${centerY}
      Q ${controlX} ${controlY}
        ${position.x} ${position.y}
    `;
  }, []);

  /* =======================================================
     AUTOMATIC ROTATION
     EVERY 3 SECONDS
  ======================================================= */

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((previousIndex) => {
        return (
          (previousIndex + 1) %
          capabilities.length
        );
      });

      setAnimationKey((previousKey) => previousKey + 1);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     ACTIVE PATH
  ======================================================= */

  const activePath = useMemo(() => {
    return getPath(
      nodePositions[activeIndex]
    );
  }, [activeIndex, getPath]);

  /* =======================================================
     SELECT CAPABILITY
  ======================================================= */

  const selectCapability = (index) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    setAnimationKey((previousKey) => previousKey + 1);
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      selectCapability(index);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setActiveIndex((previousIndex) => {
        return (
          (previousIndex + 1) %
          capabilities.length
        );
      });

      setAnimationKey((previousKey) => previousKey + 1);

      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setActiveIndex((previousIndex) => {
        return (
          (previousIndex - 1 + capabilities.length) %
          capabilities.length
        );
      });

      setAnimationKey((previousKey) => previousKey + 1);
    }
  };

  return (
    <section className="capabilityMap">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="capabilityMap__grid"
        aria-hidden="true"
      />

      <div className="capabilityMap__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="capabilityMap__header">

          <div className="capabilityMap__eyebrow">
            <span className="capabilityMap__eyebrow-line" />

            <span>CAPABILITY MAP</span>
          </div>

          <h2 className="capabilityMap__heading">
            One Idea. Multiple
            <br />
            Capabilities.
          </h2>

          <p className="capabilityMap__intro">
            The technology you need depends on the problem
            you’re solving.
          </p>

        </header>

        {/* =================================================
            MAP
        ================================================= */}

        <div className="capabilityMap__canvas">

          {/* =================================================
              CONNECTION LINES
          ================================================= */}

          <svg
            className="capabilityMap__svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            {/* BASE CONNECTIONS */}

            {capabilities.map((capability, index) => (
              <path
                key={`base-${capability.id}`}
                d={getPath(nodePositions[index])}
                className="capabilityMap__line"
              />
            ))}

            {/* ACTIVE CONNECTION */}

            <path
              key={`line-${animationKey}`}
              d={activePath}
              className="capabilityMap__line-active"
            />

            {/* ONE SMALL MOVING DOT */}

            <circle
              key={`dot-${animationKey}`}
              r="0.42"
              className="capabilityMap__travel-dot"
            >
              <animateMotion
                dur="0.65s"
                begin="0s"
                repeatCount="1"
                fill="freeze"
                path={activePath}
              />
            </circle>

          </svg>

          {/* =================================================
              CENTER
          ================================================= */}

          <div className="capabilityMap__center">

            <span
              className="
                capabilityMap__center-ring
                capabilityMap__center-ring--one
              "
              aria-hidden="true"
            />

            <span
              className="
                capabilityMap__center-ring
                capabilityMap__center-ring--two
              "
              aria-hidden="true"
            />

            <span
              className="
                capabilityMap__center-ring
                capabilityMap__center-ring--three
              "
              aria-hidden="true"
            />

            <div className="capabilityMap__center-core">

              <img
                src={LOGO_SRC}
                alt="ProJenius"
                className="capabilityMap__logo"
              />

            </div>

          </div>

          {/* =================================================
              CAPABILITY CARDS
          ================================================= */}

          <div className="capabilityMap__nodes">

            {capabilities.map((capability, index) => {
              const position =
                nodePositions[index];

              const isActive =
                index === activeIndex;

              return (
                <button
                  key={capability.id}
                  type="button"
                  className={`capabilityMap__node ${
                    isActive
                      ? "capabilityMap__node--active"
                      : ""
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  onMouseEnter={() =>
                    selectCapability(index)
                  }
                  onFocus={() =>
                    selectCapability(index)
                  }
                  onClick={() =>
                    selectCapability(index)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      event,
                      index
                    )
                  }
                  aria-pressed={isActive}
                >
                  <span
                    className="capabilityMap__node-dot"
                    aria-hidden="true"
                  />

                  <span className="capabilityMap__node-text">
                    {capability.title}
                  </span>

                </button>
              );
            })}

          </div>
        </div>

        {/* =================================================
            ACTIVE DESCRIPTION
        ================================================= */}

        <article
          key={`description-${animationKey}`}
          className="capabilityMap__description-card"
        >

          <div className="capabilityMap__description-content">

            <h3 className="capabilityMap__description-title">
              {currentCapability.title}
            </h3>

            <p className="capabilityMap__description-text">
              {currentCapability.description}
            </p>

            <p className="capabilityMap__description-combined">
              {currentCapability.combined}
            </p>

          </div>

        </article>

      </div>
    </section>
  );
};

export default CapabilityMap;