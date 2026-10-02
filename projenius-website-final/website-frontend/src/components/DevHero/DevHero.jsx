import React, { useEffect, useRef, useState } from "react";
import "./DevHero.css";

const CONTACT_HREF = "#pjdev-contact";
const PROCESS_HREF = "#pjdev-process";

const MAIN_PATH =
    "M270 60C270 105 250 105 250 150C250 195 290 195 290 240C290 285 250 285 250 330C250 375 290 375 290 420C290 465 250 465 250 510C250 555 280 555 280 600";

const LOOP_PATH =
    "M280 600C335 645 585 650 585 400C585 150 585 60 420 60L306 60";

const NODES = [
    { x: 270, y: 60, label: "Your requirement", first: true },
    { x: 250, y: 150, label: "Understand" },
    { x: 290, y: 240, label: "Design" },
    { x: 250, y: 330, label: "Build" },
    { x: 290, y: 420, label: "Integrate" },
    { x: 250, y: 510, label: "Launch" },
    { x: 280, y: 600, label: "Improve" },
];

const SATS = [
    { label: "Data", x: 400, y: 140, w: 58, to: [250, 150] },
    { label: "UI/UX", x: 445, y: 235, w: 68, to: [290, 240] },
    { label: "Web", x: 385, y: 300, w: 52, to: [250, 330] },
    { label: "Mobile", x: 490, y: 345, w: 72, to: [250, 330] },
    { label: "SaaS", x: 395, y: 385, w: 60, to: [250, 330] },
    { label: "AI", x: 415, y: 455, w: 46, to: [290, 420] },
    { label: "Automation", x: 505, y: 410, w: 104, to: [290, 420] },
];

export default function DevHero() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="pjdev-overview"
            className={`devhero${isVisible ? " devhero--visible" : ""}`}
            ref={sectionRef}
            aria-labelledby="devhero-title"
        >
            <div className="devhero__background" aria-hidden="true" />

            <div className="devhero__grid" aria-hidden="true" />

            <div className="devhero__inner">
                <div className="devhero__content">
                    <div className="devhero__copy">
                        <div className="devhero__eyebrow">
                            <span className="devhero__eyebrow-dot" />
                            <span>DIGITAL DEVELOPMENT</span>
                        </div>

                        <h1 id="devhero-title" className="devhero__title">
                            <span className="devhero__title-line">
                                From Requirements
                            </span>

                            <span className="devhero__title-line">
                                to Digital Products.
                            </span>

                            <span className="devhero__title-line devhero__title-line--cyan">
                                Built Around Your
                            </span>

                            <span className="devhero__title-line devhero__title-line--cyan">
                                Business.
                            </span>
                        </h1>

                        <p className="devhero__description">
                            We design and build websites, web apps, mobile apps,
                            SaaS platforms, AI solutions, and automation tools
                            based on your business needs.
                        </p>

                        <div className="devhero__actions">
                            <a
                                href={CONTACT_HREF}
                                className="devhero__button"
                            >
                                <span>Start a Project</span>
                                <span aria-hidden="true">→</span>
                            </a>

                            <a
                                href={PROCESS_HREF}
                                className="devhero__button devhero__button--secondary devhero__secondary-btn"
                            >
                                <span>Explore How We Work</span>
                                <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                    </div>

                    <div className="devhero__journey" aria-hidden="true">
                        <svg
                            className="devhero__svg"
                            viewBox="0 0 620 680"
                            role="img"
                            aria-labelledby="devhero-svg-title devhero-svg-desc"
                        >
                            <title id="devhero-svg-title">
                                Digital development journey
                            </title>

                            <desc id="devhero-svg-desc">
                                Digital development journey from requirement to
                                understanding, design, build, integration,
                                launch and improvement.
                            </desc>

                            <defs>
                                <linearGradient
                                    id="devhero-gradient"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                >
                                    <stop offset="0%" stopColor="#1769FF" />
                                    <stop offset="50%" stopColor="#278DFF" />
                                    <stop offset="100%" stopColor="#25D2E8" />
                                </linearGradient>
                            </defs>

                            {SATS.map((item, index) => (
                                <path
                                    key={`tie-${item.label}`}
                                    className="devhero__tie"
                                    d={`M${item.x} ${item.y}L${item.to[0]} ${item.to[1]}`}
                                    style={{
                                        "--dev-tie-delay": `${0.9 + index * 0.28}s`,
                                    }}
                                />
                            ))}

                            <path
                                className="devhero__loop"
                                d={LOOP_PATH}
                                pathLength="1"
                                stroke="url(#devhero-gradient)"
                            />

                            <polygon
                                className="devhero__loop-arrow"
                                points="298,60 311,53 311,67"
                            />

                            <path
                                id="devhero-main-path"
                                className="devhero__path"
                                d={MAIN_PATH}
                                pathLength="1"
                                stroke="url(#devhero-gradient)"
                            />

                            {NODES.map((node, index) => (
                                <g
                                    key={node.label}
                                    className={`devhero__node devhero__node--${index + 1}`}
                                    style={{
                                        "--dev-node-delay": `${0.75 + index * 0.42}s`,
                                    }}
                                >
                                    {node.first && (
                                        <>
                                            <circle
                                                className="devhero__pulse"
                                                cx={node.x}
                                                cy={node.y}
                                                r="18"
                                            />
                                            <circle
                                                className="devhero__pulse devhero__pulse--second"
                                                cx={node.x}
                                                cy={node.y}
                                                r="18"
                                            />
                                        </>
                                    )}

                                    <circle
                                        className="devhero__ring"
                                        cx={node.x}
                                        cy={node.y}
                                        r={node.first ? 18 : 13}
                                        stroke="url(#devhero-gradient)"
                                    />

                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={node.first ? 8 : 5.5}
                                        fill="url(#devhero-gradient)"
                                    />

                                    <text
                                        className={`devhero__label ${
                                            node.first
                                                ? "devhero__label--first"
                                                : ""
                                        }`}
                                        x={node.x - (node.first ? 28 : 24)}
                                        y={node.y}
                                        textAnchor="end"
                                        dominantBaseline="central"
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            ))}

                            {isVisible && (
                                <circle
                                    key="devhero-packet-visible"
                                    className="devhero__packet"
                                    r="5.5"
                                    opacity="0"
                                >
                                    <set
                                        attributeName="opacity"
                                        to="1"
                                        begin="2.7s"
                                    />

                                    <animateMotion
                                        dur="7s"
                                        begin="2.7s"
                                        repeatCount="indefinite"
                                    >
                                        <mpath href="#devhero-main-path" />
                                    </animateMotion>
                                </circle>
                            )}

                            {SATS.map((item, index) => (
                                <g
                                    key={`sat-${item.label}`}
                                    className="devhero__sat"
                                    style={{
                                        "--dev-sat-delay": `${1.35 + index * 0.42}s`,
                                    }}
                                >
                                    <g transform={`translate(${item.x} ${item.y})`}>
                                        <g
                                            className="devhero__sat-float"
                                            style={{
                                                "--dev-float-delay": `${2.25 + index * 0.28}s`,
                                                "--dev-float-duration": `${3.4 + (index % 3) * 0.35}s`,
                                            }}
                                        >
                                            <rect
                                                className="devhero__chip"
                                                x={-(item.w + 10) / 2}
                                                y="-16"
                                                width={item.w + 10}
                                                height="32"
                                                rx="16"
                                            />

                                            <text
                                                className="devhero__chip-text"
                                                x="0"
                                                y="0"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                            >
                                                {item.label}
                                            </text>
                                        </g>
                                    </g>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            <div className="devhero__bottom-zigzag" aria-hidden="true">
                <div className="devhero__bottom-zigzag-cyan" />
                <div className="devhero__bottom-zigzag-white" />
            </div>
        </section>
    );
}
