import React from "react";
import {
  Lightbulb,
  Code2,
  Wifi,
  BookOpen,
  Boxes,
  ShieldCheck,
  Cpu,
  Rocket,
  GraduationCap,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import "./EcosystemSection.css";

/* =========================================================
   ECOSYSTEM DATA
========================================================= */

const ecosystemItems = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Turning ideas into practical solutions through creativity, research, and technology.",
    Icon: Lightbulb,
    position: "innovation",
  },
  {
    id: "software",
    title: "Software Development",
    description:
      "Building scalable, reliable, and user-focused software applications.",
    Icon: Code2,
    position: "software",
  },
  {
    id: "iot",
    title: "IoT & Embedded Systems",
    description:
      "Developing connected devices and intelligent embedded technology solutions.",
    Icon: Wifi,
    position: "iot",
  },
  {
    id: "academia",
    title: "Academia",
    description:
      "Supporting students, researchers, and institutions with technical innovation.",
    Icon: BookOpen,
    position: "academia",
  },
  {
    id: "product",
    title: "Product Development",
    description:
      "Transforming concepts into functional, market-ready products.",
    Icon: Boxes,
    position: "product",
  },
  {
    id: "patent",
    title: "Patent Support",
    description:
      "Helping innovators protect and strengthen their intellectual property.",
    Icon: ShieldCheck,
    position: "patent",
  },
  {
    id: "fabrication",
    title: "3D Design & Fabrication",
    description:
      "Creating accurate 3D designs, prototypes, and fabrication solutions.",
    Icon: Cpu,
    position: "fabrication",
  },
  {
    id: "startup",
    title: "Startup Support",
    description:
      "Helping startups move from an early concept toward a stronger product and business.",
    Icon: Rocket,
    position: "startup",
  },
  {
    id: "training",
    title: "Workshops & Training",
    description:
      "Providing practical technical training, workshops, and skill development.",
    Icon: GraduationCap,
    position: "training",
  },
];

/* =========================================================
   NETWORK CONFIGURATION
========================================================= */

const CENTER_X = 500;
const CENTER_Y = 300;
const NETWORK_RADIUS = 260;

const networkNodes = ecosystemItems.map((item, index) => {
  const angle = -90 + index * 40;
  const radians = (angle * Math.PI) / 180;

  return {
    ...item,
    index: index + 1,
    x2: CENTER_X + NETWORK_RADIUS * Math.cos(radians),
    y2: CENTER_Y + NETWORK_RADIUS * Math.sin(radians),
    duration: 3.8,
    delay: index * 0.35,
  };
});

/* =========================================================
   NETWORK LINE
========================================================= */

function NetworkLine({ x2, y2 }) {
  return (
    <line
      className="eco-network-line"
      x1={CENTER_X}
      y1={CENTER_Y}
      x2={x2}
      y2={y2}
    />
  );
}

/* =========================================================
   MOVING DOT
========================================================= */

function MovingDot({
  x2,
  y2,
  index,
  duration,
  delay,
}) {
  const pathId = `eco-motion-path-${index}`;

  return (
    <g
      className="eco-moving-dot-group"
      aria-hidden="true"
    >
      <path
        id={pathId}
        d={`M ${CENTER_X} ${CENTER_Y} L ${x2} ${y2}`}
        fill="none"
        stroke="none"
      />

      <circle
        className="eco-moving-dot"
        r="5"
      >
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/* =========================================================
   ECOSYSTEM NODE
========================================================= */

function EcosystemNode({ item }) {
  const { Icon } = item;

  return (
    <article
      className={`eco-node eco-node-${item.position}`}
      tabIndex="0"
    >
      {/* NODE ICON */}

      <div className="eco-node-card">
        <Icon
          className="eco-node-icon"
          size={30}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* NODE TITLE */}

      <span className="eco-node-label">
        {item.title}
      </span>

      {/* DESKTOP HOVER DESCRIPTION */}

      <div className="eco-node-description">
        <strong>{item.title}</strong>

        <p>{item.description}</p>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function EcosystemSection() {
  return (
    <section
      className="ecosystem-section"
      aria-labelledby="ecosystem-title"
    >
      <div className="ecosystem-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <header className="ecosystem-heading">

          <span className="ecosystem-eyebrow">
            OUR ECOSYSTEM
          </span>

          <h2 id="ecosystem-title">

            <span className="ecosystem-heading-white">
              A Connected
            </span>{" "}

            <span className="ecosystem-heading-blue">
              Innovation Network
            </span>

          </h2>

          <p className="ecosystem-heading-description">
            Every part of our ecosystem works together —
            technology, product, and people connected by
            a shared drive to innovate.
          </p>

        </header>

        {/* =================================================
            NETWORK
        ================================================= */}

        <div className="ecosystem-network">

          {/* SVG NETWORK */}

          <svg
            className="ecosystem-lines"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >

            {networkNodes.map((node) => (
              <NetworkLine
                key={`line-${node.index}`}
                x2={node.x2}
                y2={node.y2}
              />
            ))}

            {networkNodes.map((node) => (
              <MovingDot
                key={`dot-${node.index}`}
                x2={node.x2}
                y2={node.y2}
                index={node.index}
                duration={node.duration}
                delay={node.delay}
              />
            ))}

          </svg>

          {/* =================================================
              CENTER CORE
          ================================================= */}

          <div
            className="ecosystem-core"
            aria-label="Projenius ecosystem"
          >
            <div className="ecosystem-core-glow">

              <div className="ecosystem-core-ring">

                <div className="ecosystem-core-circle">

                  <img
                    src={logo}
                    alt="ProJenius"
                    className="ecosystem-company-logo"
                    loading="eager"
                    decoding="async"
                  />

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              ECOSYSTEM NODES
          ================================================= */}

          {networkNodes.map((item) => (
            <EcosystemNode
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>
    </section>
  );
}