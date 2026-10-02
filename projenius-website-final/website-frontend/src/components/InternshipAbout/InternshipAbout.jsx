import React, { useEffect, useRef, useState } from "react";
import {
    CalendarDays,
    Monitor,
    GraduationCap,
    UsersRound,
    ArrowRight,
    Download,
} from "lucide-react";
import "./InternshipAbout.css";

/* =========================================================
   INTERNSHIP INFORMATION
========================================================= */

const internshipDetails = [
    {
        id: "duration",
        title: "Duration",
        value: "1 Month, 3 Months, 6 Months",
        icon: CalendarDays,
    },
    {
        id: "mode",
        title: "Mode",
        value: "Online, Offline, Hybrid",
        icon: Monitor,
    },
    {
        id: "type",
        title: "Type",
        value: "Guided Internship Program",
        icon: GraduationCap,
    },
    {
        id: "eligibility",
        title: "Eligibility",
        value: "Students, freshers, and career switchers",
        icon: UsersRound,
    },
];

/* =========================================================
   COMPONENT
========================================================= */

const InternshipAbout = () => {
    const sectionRef = useRef(null);
    const [animationKey, setAnimationKey] = useState(0);

    /* =======================================================
       REPLAY CARD ANIMATION WHEN SECTION ENTERS VIEW
    ======================================================= */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimationKey((previous) => previous + 1);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="internship-about-section"
            aria-labelledby="internship-about-title"
        >
            <div className="internship-about-container">

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="internship-about-content">

                    <span className="internship-about-label">
                        ABOUT THE INTERNSHIP
                    </span>

                    <h2
                        id="internship-about-title"
                        className="internship-about-title"
                    >
                        Practical
                        <br />
                        Training
                        <br />
                        <span>Built Around</span>
                        <br />
                        <span>Real Work</span>
                    </h2>

                    <p className="internship-about-description">
                        Gain hands-on experience through structured
                        training, mentor support, live projects, and
                        career preparation designed for students and
                        freshers entering the tech industry.
                    </p>

                    {/* =================================================
                        CTA BUTTONS
                    ================================================= */}

                    <div className="internship-about-actions">

                        <a
                            href="#contact"
                            className="internship-primary-button"
                        >
                            <span>Start Your Journey</span>

                            <ArrowRight
                                size={18}
                                strokeWidth={2.3}
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href="/files/internship-syllabus.pdf"
                            className="internship-secondary-button"
                            download
                        >
                            <span>Download Syllabus</span>

                            <Download
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </a>

                    </div>
                </div>

                {/* =================================================
                    INFORMATION CARDS
                ================================================= */}

                <div
                    key={animationKey}
                    className="internship-about-cards"
                >
                    {internshipDetails.map(
                        ({ id, title, value, icon: Icon }, index) => (
                            <article
                                key={id}
                                className="internship-about-card"
                                style={{
                                    "--internship-card-delay":
                                        `${index * 0.12}s`,
                                }}
                            >

                                <div className="internship-about-icon">
                                    <Icon
                                        size={25}
                                        strokeWidth={2.1}
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="internship-about-card-content">
                                    <h3>{title}</h3>
                                    <p>{value}</p>
                                </div>

                            </article>
                        )
                    )}
                </div>

            </div>
        </section>
    );
};

export default InternshipAbout;