import React, { useEffect, useRef, useState } from "react";
import "./AboutSection.css";
import aboutOne from "../../assets/images/about-main-image.png";
import aboutSecond from "../../assets/images/about-main-image.png";
/* =========================================================
   ICONS
   No external icon library required
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
        </svg>
    );
}

function IoTIcon() {
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
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M9 2v3M15 2v3M9 19v3M15 19v3" />
            <path d="M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
    );
}

function TrainingIcon() {
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
            <path d="M2 10l10-5 10 5-10 5-10-5z" />
            <path d="M6 12.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-3.5" />
            <path d="M22 10v6" />
        </svg>
    );
}

function ImpactIcon() {
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
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 4v5M20 12h-5M12 20v-5M4 12h5" />
        </svg>
    );
}


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
   FEATURE DATA
   ========================================================= */

const features = [
    {
        title: "Software Development",
        description: "Web, apps & software",
        icon: <CodeIcon />,
    },
    {
        title: "Smart IoT Solutions",
        description: "IoT & embedded systems",
        icon: <IoTIcon />,
    },
    {
        title: "Product Development",
        description: "Prototypes & 3D design",
        icon: <ImpactIcon />,
    },
    {
        title: "Training & Mentorship",
        description: "Courses, intern & workshop",
        icon: <TrainingIcon />,
    },
];


/* =========================================================
   ABOUT SECTION
   ========================================================= */

export default function AboutSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

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
            className={`about-section ${visible ? "about-visible" : ""
                }`}
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="about-header">
                <div className="about-tag">
                    <span>WHO WE ARE</span>
                </div>

                <h2 className="about-title">
                    <span className="about-title-static">
                        Building Technology Solutions
                    </span>

                    <span className="about-title-window">
                        <span className="about-title-track">
                            <span>Software &amp; AI Solutions</span>
                            <span>IoT &amp; Embedded Systems</span>
                            <span>Product Development</span>
                            <span>Technology Training</span>

                            {/* Duplicate first item for seamless looping */}
                            <span>Software &amp; AI Solutions</span>
                        </span>
                    </span>
                </h2>

                <div className="about-title-line">
                    <span />
                </div>

                <p className="about-description">
                    We build practical technology solutions across software, hardware, IoT, and product development for businesses, institutions, startups, and organizations.
                </p>
            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="about-content">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="about-left">
                    <div className="about-image-wrapper">

                        {/* MAIN IMAGE */}

                        <div className="about-main-image">
                            <img
                                src={aboutOne}
                                alt="Team working on innovation"
                                loading="lazy"
                            />
                        </div>


                        {/* SECOND IMAGE */}

                        <div className="about-small-image">
                            <img
                                src={aboutSecond}
                                alt="Software development training session"
                                loading="lazy"
                            />
                        </div>


                        {/* STATS */}

                        <div className="about-stats">
                            <div className="about-stat">
                                <div className="about-stat-number">
                                    <AnimatedNumber
                                        end={1000}
                                        suffix="+"
                                        start={visible}
                                    />
                                </div>

                                <div className="about-stat-label">
                                    SATISFIED CLIENTS
                                </div>
                            </div>

                            <div className="about-stat">
                                <div className="about-stat-number">
                                    <AnimatedNumber
                                        end={30}
                                        suffix="+"
                                        start={visible}
                                    />
                                </div>

                                <div className="about-stat-label">
                                    PROJECTS DELIVERED
                                </div>
                            </div>

                            <div className="about-stat">
                                <div className="about-stat-number">
                                    <AnimatedNumber
                                        end={2}
                                        suffix="+"
                                        start={visible}
                                    />
                                </div>

                                <div className="about-stat-label">
                                    YEARS OF EXCELLENCE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* =================================================
                    RIGHT
                ================================================= */}

                <div className="about-right">

                    {/* VIDEO */}

                    <div className="about-video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/1adzVmNh078"
                            title="Projenius Introduction"
                            loading="lazy"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>


                    {/* FEATURE CARDS */}

                    <div className="about-features">
                        {features.map((feature, index) => (
                            <div
                                className="about-feature-card"
                                key={feature.title}
                                style={{
                                    "--card-delay": `${0.15 + index * 0.08}s`,
                                }}
                            >
                                <div className="about-feature-icon">
                                    {feature.icon}
                                </div>

                                <div className="about-feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}