import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import "./AboutProJenius.css";
import aboutLogo from "../../assets/images/logo.png";

/* =========================================================
   ORBIT ITEMS
========================================================= */

const orbitItems = [
  {
    id: "industry",
    label: "INDUSTRY",
    position: "top",
  },
  {
    id: "learning",
    label: "LEARNING",
    position: "top-right",
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    position: "right-top",
  },
  {
    id: "research",
    label: "R&D",
    position: "right",
  },
  {
    id: "startups",
    label: "STARTUPS",
    position: "right-bottom",
  },
  {
    id: "academia",
    label: "ACADEMIA",
    position: "bottom",
  },
  {
    id: "products",
    label: "PRODUCTS",
    position: "bottom-left",
  },
  {
    id: "innovation",
    label: "INNOVATION",
    position: "left",
  },
];

/* =========================================================
   ORBIT LABEL
========================================================= */

function OrbitLabel({ label, position }) {
  return (
    <span
      className={`about-projenius-orbit-label about-projenius-orbit-${position}`}
    >
      {label}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AboutProJenius() {
  return (
    <section
      className="about-projenius-section"
      aria-labelledby="about-projenius-title"
    >
      <div className="about-projenius-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="about-projenius-content">

          <span className="about-projenius-eyebrow">
            ABOUT PROJENIUS
          </span>

          <h2
            id="about-projenius-title"
            className="about-projenius-title"
          >
            <span className="about-projenius-title-white">
              Technology.
            </span>

            <span className="about-projenius-title-blue">
              Innovation.
            </span>

            <span className="about-projenius-title-white">
              Possibility.
            </span>
          </h2>

          <p className="about-projenius-description">
            A multidisciplinary organization bringing technology,
            learning, innovation and collaboration into one evolving
            ecosystem.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="about-projenius-actions">

            <a
              href="#ecosystem"
              className="about-projenius-primary-btn"
            >
              <span>Explore ProJenius</span>

              <ArrowDown
                size={19}
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>

            <a
              href="#services"
              className="about-projenius-secondary-btn"
            >
              <span>What We Do</span>

              <ArrowRight
                size={19}
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>

          </div>
        </div>

        {/* =================================================
            RIGHT ORBIT VISUAL
        ================================================= */}

        <div
          className="about-projenius-visual"
          aria-hidden="true"
        >
          <div className="about-projenius-orbit">

            {/* OUTER RING */}
            <div
              className="about-projenius-ring about-projenius-ring-outer"
            />

            {/* MIDDLE RING */}
            <div
              className="about-projenius-ring about-projenius-ring-middle"
            />

            {/* INNER RING */}
            <div
              className="about-projenius-ring about-projenius-ring-inner"
            />

            {/* CENTER GLOW */}
            <div className="about-projenius-center-glow" />

            {/* CENTER LOGO */}
            <div className="about-projenius-center">

              <div className="about-projenius-logo-circle">

                <img
                  src={aboutLogo}
                  alt="ProJenius"
                  className="about-projenius-logo"
                  loading="lazy"
                  decoding="async"
                />

              </div>

            </div>

            {/* ORBIT LABELS */}
            {orbitItems.map((item) => (
              <OrbitLabel
                key={item.id}
                label={item.label}
                position={item.position}
              />
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}