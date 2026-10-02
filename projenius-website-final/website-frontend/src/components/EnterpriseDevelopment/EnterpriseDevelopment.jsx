import React, { useEffect, useRef, useState } from "react";
import "./EnterpriseDevelopment.css";

/* =========================================================
   ICONS
========================================================= */

function CodeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
    );
}

function WebIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <circle cx="7" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="10" cy="6.5" r=".5" fill="currentColor" />
        </svg>
    );
}

function MobileIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="6" y="2" width="12" height="20" rx="3" />
            <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
    );
}

function CloudIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M17.5 19H9a7 7 0 1 1 6.7-9H17a5 5 0 0 1 .5 9Z" />
        </svg>
    );
}


/* =========================================================
   FEATURE DATA
========================================================= */

const features = [
    {
        title: "Web Development",
        description: "High-performance websites and web platforms",
        icon: <WebIcon />,
    },
    {
        title: "Custom Software",
        description: "Scalable software built around your business",
        icon: <CodeIcon />,
    },
    {
        title: "Mobile Applications",
        description: "Modern mobile experiences for growing products",
        icon: <MobileIcon />,
    },
    {
        title: "Cloud & Deployment",
        description: "Reliable cloud-ready infrastructure and deployment",
        icon: <CloudIcon />,
    },
];


/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({ end, suffix = "", start }) {
    const [count, setCount] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!start) {
            setCount(0);
            return;
        }

        let startTime = null;
        const duration = 1400;

        const animate = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * end);

            setCount(value);

            if (progress < 1) {
                animationRef.current =
                    requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationRef.current =
            requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [end, start]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}


/* =========================================================
   DEVELOPMENT SECTION
========================================================= */

export default function DevelopmentSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`development-section ${
                visible ? "development-visible" : ""
            }`}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="development-header">

                <div className="development-tag">
                    <span>ENTERPRISE DEVELOPMENT SERVICES</span>
                </div>

                <h2 className="development-title">
                    Transform Ideas Into{" "}
                    <span>Powerful Digital Products</span>
                </h2>

                <div className="development-title-line">
                    <span />
                </div>

                <p className="development-description">
                    We design and develop high-performance websites,
                    custom web applications, mobile apps, and scalable
                    software architecture engineered for real business
                    growth and automation.
                </p>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="development-content">

                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="development-left">

                    <div className="development-image-wrapper">

                        {/* MAIN IMAGE */}

                        <div className="development-main-image">
                            <img
                                src="/images/development-main.png"
                                alt="Enterprise software development"
                                loading="lazy"
                            />
                        </div>


                        {/* SMALL IMAGE */}

                        <div className="development-small-image">
                            <img
                                src="/images/development-team.png"
                                alt="Development team working"
                                loading="lazy"
                            />
                        </div>


                        {/* STATS */}

                        <div className="development-stats">

                            <div className="development-stat">

                                <div className="development-stat-number">
                                    <AnimatedNumber
                                        end={50}
                                        suffix="+"
                                        start={visible}
                                    />
                                </div>

                                <div className="development-stat-label">
                                    PROJECTS
                                </div>

                            </div>


                            <div className="development-stat">

                                <div className="development-stat-number">
                                    <AnimatedNumber
                                        end={99}
                                        suffix="%"
                                        start={visible}
                                    />
                                </div>

                                <div className="development-stat-label">
                                    CLIENT SATISFACTION
                                </div>

                            </div>


                            <div className="development-stat">

                                <div className="development-stat-number">
                                    24/7
                                </div>

                                <div className="development-stat-label">
                                    TECHNICAL SUPPORT
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="development-right">

                    <div className="development-copy">

                        <span className="development-mini-label">
                            BUILT FOR REAL-WORLD IMPACT
                        </span>

                        <h3>
                            Technology That Moves
                            <span> Your Business Forward</span>
                        </h3>

                        <p>
                            From idea to production, we build reliable
                            digital solutions that are designed to perform,
                            scale, and evolve with your business.
                        </p>

                    </div>


                    {/* FEATURE CARDS */}

                    <div className="development-features">

                        {features.map((feature, index) => (
                            <div
                                className="development-feature-card"
                                key={feature.title}
                                style={{
                                    "--card-delay":
                                        `${0.15 + index * 0.08}s`,
                                }}
                            >

                                <div className="development-feature-icon">
                                    {feature.icon}
                                </div>

                                <div className="development-feature-content">

                                    <h4>
                                        {feature.title}
                                    </h4>

                                    <p>
                                        {feature.description}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}