import React, { useEffect, useRef, useState } from "react";
import {
    Users,
    Code2,
    MessageCircle,
    Star,
    Trophy,
    Building2,
    Smile,
} from "lucide-react";
import "./SuccessStories.css";

/* =========================================================
   HIGHLIGHTS
========================================================= */

const storyHighlights = [
    {
        id: 1,
        title: "Intern Testimonials",
        icon: MessageCircle,
        variant: "blue",
    },
    {
        id: 2,
        title: "Student Reviews",
        icon: Star,
        variant: "orange",
    },
    {
        id: 3,
        title: "Placement Achievements",
        icon: Trophy,
        variant: "purple",
    },
];

/* =========================================================
   STATISTICS
========================================================= */

const successStats = [
    {
        id: 1,
        value: 500,
        suffix: "+",
        label: "Interns Trained",
        icon: Users,
        variant: "blue",
    },
    {
        id: 2,
        value: 100,
        suffix: "+",
        label: "Projects Completed",
        icon: Code2,
        variant: "purple",
    },
    {
        id: 3,
        value: 50,
        suffix: "+",
        label: "Hiring Partners",
        icon: Building2,
        variant: "orange",
    },
    {
        id: 4,
        value: 90,
        suffix: "%",
        label: "Student Satisfaction",
        icon: Smile,
        variant: "pink",
    },
];

/* =========================================================
   COMPONENT
========================================================= */

const SuccessStories = () => {
    const sectionRef = useRef(null);
    const animationFrameRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    const [counts, setCounts] = useState(
        successStats.map(() => 0)
    );

    /* =====================================================
       5 SECOND COUNTER
    ===================================================== */

    const startCounters = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const startTime = performance.now();
        const duration = 5000;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            /* Smooth professional easing */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            setCounts(
                successStats.map((stat) =>
                    Math.floor(
                        stat.value * easedProgress
                    )
                )
            );

            if (progress < 1) {
                animationFrameRef.current =
                    requestAnimationFrame(animate);
            } else {
                /* Always finish at exact values */
                setCounts(
                    successStats.map(
                        (stat) => stat.value
                    )
                );
            }
        };

        /* Restart from zero every time */
        setCounts(successStats.map(() => 0));

        animationFrameRef.current =
            requestAnimationFrame(animate);
    };

    /* =====================================================
       SECTION OBSERVER
    ===================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    startCounters();
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (animationFrameRef.current) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`success-stories-section ${
                isVisible
                    ? "success-stories-visible"
                    : ""
            }`}
            aria-labelledby="success-stories-title"
        >
            <div className="success-stories-container">

                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="success-stories-left">

                    <div className="success-stories-heading">

                        <span className="success-stories-label">
                            SUCCESS STORIES
                        </span>

                        <h2 id="success-stories-title">
                            <span className="heading-black">
                                Growth You 
                            </span>

                            <span className="heading-blue">
                               Can Measure
                            </span>
                        </h2>

                    </div>

                    {/* =================================================
                        HIGHLIGHT CARDS
                    ================================================= */}

                    <div className="success-stories-highlights">

                        {storyHighlights.map(
                            (item, index) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        key={item.id}
                                        className={`success-highlight-card success-highlight-${item.variant}`}
                                        style={{
                                            "--success-delay": `${
                                                0.15 +
                                                index * 0.12
                                            }s`,
                                        }}
                                    >
                                        <div className="success-highlight-icon">
                                            <Icon
                                                size={20}
                                                strokeWidth={2.2}
                                            />
                                        </div>

                                        <div className="success-highlight-content">
                                            {item.title}
                                        </div>
                                    </article>
                                );
                            }
                        )}

                    </div>
                </div>

                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="success-stories-stats">

                    {successStats.map(
                        (item, index) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.id}
                                    className={`success-stat-card success-stat-${item.variant}`}
                                    style={{
                                        "--success-delay": `${
                                            0.25 +
                                            index * 0.12
                                        }s`,
                                    }}
                                >
                                    <div className="success-stat-icon">
                                        <Icon
                                            size={21}
                                            strokeWidth={2.2}
                                        />
                                    </div>

                                    <div className="success-stat-content">

                                        <strong>
                                            {counts[index]}
                                            {item.suffix}
                                        </strong>

                                        <span>
                                            {item.label}
                                        </span>

                                    </div>

                                </article>
                            );
                        }
                    )}

                </div>

            </div>
        </section>
    );
};

export default SuccessStories;