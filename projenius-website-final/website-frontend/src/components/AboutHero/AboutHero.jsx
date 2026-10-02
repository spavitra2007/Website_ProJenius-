import React, { useState } from "react";
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
    ArrowDown,
    ArrowRight,
} from "lucide-react";

import "./AboutHero.css";

import aboutLogo from "../../assets/images/logo.png";

/* =========================================================
   ECOSYSTEM ITEMS  (order = clockwise, starting from top)
========================================================= */

const ECOSYSTEM_ITEMS = [
    { id: "software",    title: "Software Development",    Icon: Code2 },
    { id: "iot",         title: "IoT & Embedded Systems",  Icon: Wifi },
    { id: "product",     title: "Product Development",     Icon: Boxes },
    { id: "fabrication", title: "3D Design & Fabrication", Icon: Cpu },
    { id: "training",    title: "Workshops & Training",    Icon: GraduationCap },
    { id: "startup",     title: "Startup Support",         Icon: Rocket },
    { id: "patent",      title: "Patent Support",          Icon: ShieldCheck },
    { id: "academia",    title: "Academia",                Icon: BookOpen },
    { id: "innovation",  title: "Innovation",              Icon: Lightbulb },
];

/* =========================================================
   NETWORK GEOMETRY  (SVG viewBox 1000 x 1000)
   Radius 380 = 38%, matches the CSS node positions.
========================================================= */

const CENTER = 500;
const NETWORK_RADIUS = 380;

const networkNodes = ECOSYSTEM_ITEMS.map((item, index) => {
    const radians = ((-90 + index * 40) * Math.PI) / 180;

    return {
        ...item,
        index: index + 1,
        x2: CENTER + NETWORK_RADIUS * Math.cos(radians),
        y2: CENTER + NETWORK_RADIUS * Math.sin(radians),
        duration: 3.8,
        delay: index * 0.35,
    };
});

/* =========================================================
   NETWORK LINE
========================================================= */

function NetworkLine({ x2, y2, active }) {
    return (
        <line
            className={`about-hero-network-line${active ? " is-active" : ""}`}
            x1={CENTER}
            y1={CENTER}
            x2={x2}
            y2={y2}
        />
    );
}

/* =========================================================
   MOVING DOT
========================================================= */

function MovingDot({ x2, y2, index, duration, delay }) {
    const pathId = `about-hero-motion-path-${index}`;

    return (
        <g className="about-hero-moving-dot-group" aria-hidden="true">
            <path
                id={pathId}
                d={`M ${CENTER} ${CENTER} L ${x2} ${y2}`}
                fill="none"
                stroke="none"
            />

            <circle className="about-hero-moving-dot" r="5">
                <animateMotion
                    dur={`${duration}s`}
                    begin={`-${delay}s`}
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

function EcosystemNode({ item, active, onActivate, onDeactivate }) {
    const Icon = item.Icon;

    return (
        <div
            className={`about-hero-ecosystem-node about-hero-node-${item.id}${
                active ? " is-active" : ""
            }`}
            tabIndex={0}
            role="img"
            aria-label={item.title}
            onMouseEnter={() => onActivate(item.id)}
            onMouseLeave={onDeactivate}
            onFocus={() => onActivate(item.id)}
            onBlur={onDeactivate}
        >
            <div className="about-hero-ecosystem-icon">
                <Icon strokeWidth={1.9} aria-hidden="true" />
            </div>

            <span className="about-hero-ecosystem-label">{item.title}</span>
        </div>
    );
}

/* =========================================================
   ABOUT HERO
========================================================= */

export default function AboutHero() {
    const [activeId, setActiveId] = useState(null);

    return (
        <section className="about-hero" aria-labelledby="about-hero-title">
            <div className="about-hero-grid" aria-hidden="true" />
            <div className="about-hero-glow about-hero-glow-left" aria-hidden="true" />
            <div className="about-hero-glow about-hero-glow-right" aria-hidden="true" />

            <div className="about-hero-inner">
                {/* LEFT CONTENT */}
                <div className="about-hero-content">
                    <h1 id="about-hero-title" className="about-hero-title">
                        <span className="about-hero-title-line about-hero-title-line-top">
                            <span className="about-hero-title-white">Technology.</span>{" "}
                            <span className="about-hero-title-blue">Innovation.</span>
                        </span>
                        <span className="about-hero-title-line about-hero-title-line-bottom about-hero-title-white">
                            Possibility.
                        </span>
                    </h1>

                    <p className="about-hero-description">
                        A multidisciplinary organization bringing technology,
                        learning, innovation and collaboration into one evolving
                        ecosystem.
                    </p>

                    <div className="about-hero-actions">
                        <a href="#ecosystem" className="about-hero-primary-btn">
                            <span>Explore ProJenius</span>
                            <ArrowDown size={18} strokeWidth={2.2} aria-hidden="true" />
                        </a>

                        <a href="#services" className="about-hero-secondary-btn">
                            <span>What We Do</span>
                            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                {/* RIGHT ECOSYSTEM NETWORK */}
                <div className="about-hero-visual" aria-label="ProJenius ecosystem network">
                    <div className={`about-hero-network${activeId ? " has-active" : ""}`}>
                        <svg
                            className="about-hero-network-lines"
                            viewBox="0 0 1000 1000"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                        >
                            {networkNodes.map((node) => (
                                <NetworkLine
                                    key={`line-${node.index}`}
                                    x2={node.x2}
                                    y2={node.y2}
                                    active={activeId === node.id}
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

                        {/* CENTER LOGO */}
                        <div className="about-hero-network-core" aria-hidden="true">
                            <div className="about-hero-network-core-glow">
                                <div className="about-hero-network-core-ring">
                                    <div className="about-hero-network-core-circle">
                                        <img
                                            src={aboutLogo}
                                            alt=""
                                            className="about-hero-network-logo"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ECOSYSTEM NODES */}
                        {networkNodes.map((node) => (
                            <EcosystemNode
                                key={node.id}
                                item={node}
                                active={activeId === node.id}
                                onActivate={setActiveId}
                                onDeactivate={() => setActiveId(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="about-hero-zigzag about-hero-zigzag-blue" aria-hidden="true" />
            <div className="about-hero-zigzag about-hero-zigzag-white" aria-hidden="true" />
        </section>
    );
}