import React from "react";
import ContactButton from "../ContactButton/ContactButton";
import { CONTACT_TYPES } from "../ContactConfig/ContactConfig";
import "./ContactHero.css";
import logo from "../../assets/images/logo.png";

/* =========================================================
   CONTACT ECOSYSTEM NODES
========================================================= */

const HERO_NODES = [
  ["STARTUP", "startup"],
  ["DEVELOPMENT", "development"],
  ["WORKSHOP", "workshop"],
  ["LEARNING", "course"],
  ["INTERNSHIP", "internship"],
  ["CAREER", "career"],
];

/* =========================================================
   SVG GEOMETRY
========================================================= */

const CX = 220;
const CY = 220;

const RADIUS = 150;

const CORE_RADIUS = 54;

const NODE_W = 150;
const NODE_H = 42;

/* =========================================================
   NODE POSITIONS
========================================================= */

const NODES = HERO_NODES.map(([label, key], index) => {
  const angle = ((-90 + index * 60) * Math.PI) / 180;

  return {
    label,
    key,
    x: +(CX + RADIUS * Math.cos(angle)).toFixed(1),
    y: +(CY + RADIUS * Math.sin(angle)).toFixed(1),
  };
});

/* =========================================================
   COMPONENT
========================================================= */

export default function ContactHero({
  onStartEnquiry,
  onReachDirect,
  onSelectType,
}) {
  return (
    <section
      className="pjct-hero"
      aria-labelledby="pjct-hero-title"
    >
      <div className="pjct-hero__inner">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="pjct-hero__copy">

          <h1
            className="pjct-hero__title"
            id="pjct-hero-title"
          >
            Let’s Start a Conversation.
          </h1>

          <p className="pjct-hero__lead">
            Tell us what you’re looking for. We’ll help you
            find the right ProJenius pathway.
          </p>

          <p className="pjct-hero__sub">
            Whether you have an idea to develop, a workshop
            to conduct, a technology to learn, an internship
            to explore, or a project to discuss — tell us
            what you’re looking for.
          </p>

          <div className="pjct-hero__actions">

            <ContactButton
              size="lg"
              tone="dark"
              fluidMobile
              onClick={onStartEnquiry}
            >
              Start an Enquiry
            </ContactButton>

            <ContactButton
              size="lg"
              tone="dark"
              variant="secondary"
              fluidMobile
              onClick={onReachDirect}
            >
              Reach Us Directly
            </ContactButton>

          </div>
        </div>

        {/* =================================================
            RIGHT ECOSYSTEM VISUAL
        ================================================= */}

        <figure className="pjct-hero__visual">

          <svg
            className="pjct-hero__svg"
            viewBox="0 0 440 440"
            role="group"
            aria-label="The ProJenius ecosystem: startup, development, workshop, learning, internship and career, all connected"
          >

            {/* =================================================
                DEFINITIONS
            ================================================= */}

            <defs>

              {/* Main logo clipping circle */}
              <clipPath id="pjct-logo-clip">
                <circle
                  cx={CX}
                  cy={CY}
                  r={CORE_RADIUS}
                />
              </clipPath>

              {/* Soft glow around logo */}
              <filter
                id="pjct-core-glow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

            </defs>

            {/* =================================================
                OUTER ECOSYSTEM RING
            ================================================= */}

            <circle
              className="pjct-hero__ring"
              cx={CX}
              cy={CY}
              r={RADIUS}
            />

            {/* =================================================
                CONNECTION LINES
            ================================================= */}

            <g className="pjct-hero__links">

              {NODES.map((node) => (
                <line
                  key={`link-${node.key}`}
                  className="pjct-hero__link"
                  x1={CX}
                  y1={CY}
                  x2={node.x}
                  y2={node.y}
                />
              ))}

            </g>

            {/* =================================================
                CENTRAL CORE
            ================================================= */}

            <g className="pjct-hero__core">

              {/* Outer glowing ring */}
              <circle
                className="pjct-hero__core-ring"
                cx={CX}
                cy={CY}
                r={CORE_RADIUS + 4}
              />

              {/* Existing pulse animation */}
              <circle
                className="pjct-hero__pulse"
                cx={CX}
                cy={CY}
                r={CORE_RADIUS}
              />

              <circle
                className="pjct-hero__pulse pjct-hero__pulse--late"
                cx={CX}
                cy={CY}
                r={CORE_RADIUS}
              />

              {/* White circular logo background */}
              <circle
                className="pjct-hero__logo-bg"
                cx={CX}
                cy={CY}
                r={CORE_RADIUS}
              />

              {/* =================================================
                  ACTUAL PROJENIUS LOGO

                  The image is deliberately larger than the
                  circle and clipped using the circular clipPath.
                  This makes the logo completely cover the core
                  without showing rectangular edges.
              ================================================= */}

              <image
                className="pjct-hero__logo"
                href={logo}
                x={CX - CORE_RADIUS}
                y={CY - CORE_RADIUS}
                width={CORE_RADIUS * 2}
                height={CORE_RADIUS * 2}
                preserveAspectRatio="xMidYMid meet"
                clipPath="url(#pjct-logo-clip)"
                filter="url(#pjct-core-glow)"
              />

              {/* =================================================
                  LOGO BORDER
              ================================================= */}

              <circle
                className="pjct-hero__logo-border"
                cx={CX}
                cy={CY}
                r={CORE_RADIUS}
              />

            </g>

            {/* =================================================
                CLICKABLE NODES
            ================================================= */}

            <g className="pjct-hero__nodes">

              {NODES.map((node) => (

                <g
                  key={node.key}
                  className="pjct-hero__node"
                  role="button"
                  tabIndex={0}
                  aria-label={`Start an enquiry about ${
                    CONTACT_TYPES[node.key].label
                  }`}
                  onClick={() => onSelectType(node.key)}
                  onKeyDown={(event) => {

                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      onSelectType(node.key);
                    }

                  }}
                >

                  <g className="pjct-hero__float">

                    <g
                      transform={`translate(${node.x} ${node.y})`}
                    >

                      {/* Node pill */}
                      <rect
                        className="pjct-hero__pill"
                        x={-NODE_W / 2}
                        y={-NODE_H / 2}
                        width={NODE_W}
                        height={NODE_H}
                        rx={NODE_H / 2}
                      />

                      {/* Green status dot */}
                      <circle
                        className="pjct-hero__dot"
                        cx={-NODE_W / 2 + 20}
                        cy="0"
                        r="3.5"
                      />

                      {/* Node label */}
                      <text
                        className="pjct-hero__label"
                        x="9"
                        y="4.5"
                        textAnchor="middle"
                      >
                        {node.label}
                      </text>

                    </g>

                  </g>

                </g>

              ))}

            </g>

          </svg>

          <figcaption className="pjct-hero__caption">
            One ecosystem. Multiple ways to connect.
          </figcaption>

        </figure>

      </div>
    </section>
  );
}