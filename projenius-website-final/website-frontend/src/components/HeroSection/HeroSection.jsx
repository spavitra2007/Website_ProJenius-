import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";

import banner from "../../assets/images/projenius-banner.webp";
import bannerOne from "../../assets/images/projenius-banner-1.webp";

/* =========================================================
   HERO DATA
   ========================================================= */

const HERO_SLIDES = [
    {
        id: 0,
        image: banner,
        title: "Businesses & Organizations",
    },
    {
        id: 1,
        image: bannerOne,
        title: "Startups & Institutions",
    },
    {
        id: 2,
        image: banner,
        title: "Innovators & Entrepreneurs",
    },
];

/* =========================================================
   CONFIG
   ========================================================= */

const SLIDE_DURATION = 5000;
const TYPING_SPEED = 95;

/* =========================================================
   PARTICLES
   ========================================================= */

const PARTICLES = [
    {
        size: 10,
        top: "25%",
        left: "12%",
        duration: "5.2s",
        delay: "0s",
    },
    {
        size: 6,
        top: "70%",
        left: "8%",
        duration: "6.8s",
        delay: "1s",
    },
    {
        size: 14,
        top: "30%",
        left: "88%",
        duration: "7.1s",
        delay: "0.4s",
    },
    {
        size: 8,
        top: "72%",
        left: "82%",
        duration: "5.6s",
        delay: "2s",
    },
    {
        size: 5,
        top: "55%",
        left: "55%",
        duration: "4.9s",
        delay: "0.8s",
    },
    {
        size: 12,
        top: "20%",
        left: "70%",
        duration: "6.3s",
        delay: "1.5s",
    },
];

/* =========================================================
   DOT INDICATORS
   ========================================================= */

function DotIndicators({ active, onDotClick }) {
    return (
        <div className="hero-dot-indicators">
            {HERO_SLIDES.map((slide, index) => (
                <button
                    key={slide.id}
                    type="button"
                    className={`hero-slide-dot ${
                        index === active ? "active" : ""
                    }`}
                    aria-label={`Show ${slide.title}`}
                    onClick={() => onDotClick(index)}
                />
            ))}
        </div>
    );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [typedText, setTypedText] = useState("");

    const heroRef = useRef(null);
    const typingTimerRef = useRef(null);
    const typingRunRef = useRef(0);

    const activeHero = HERO_SLIDES[activeSlide];

    /* =====================================================
       CLEAR TYPING
       ===================================================== */

    const clearTyping = () => {
        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
            typingTimerRef.current = null;
        }

        typingRunRef.current += 1;
    };

    /* =====================================================
       TYPE CURRENT SLIDE TITLE
       ===================================================== */

    const startTyping = (text) => {
        clearTyping();

        const currentRun = typingRunRef.current;

        setTypedText("");

        let characterIndex = 0;

        const typeNextCharacter = () => {
            if (currentRun !== typingRunRef.current) {
                return;
            }

            if (characterIndex >= text.length) {
                typingTimerRef.current = null;
                return;
            }

            characterIndex += 1;

            setTypedText(text.slice(0, characterIndex));

            typingTimerRef.current = setTimeout(
                typeNextCharacter,
                TYPING_SPEED
            );
        };

        typeNextCharacter();
    };

    /* =====================================================
       START TYPING WHEN SLIDE CHANGES
       ===================================================== */

    useEffect(() => {
        startTyping(activeHero.title);

        return () => {
            clearTyping();
        };
    }, [activeSlide]);

    /* =====================================================
       AUTO SLIDE
       
       Every 5 seconds:
       1. Current image stays active for 5 sec
       2. Next image becomes top image
       3. Background changes
       4. Text starts typing again
       ===================================================== */

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((current) => {
                return (current + 1) % HERO_SLIDES.length;
            });
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, []);

    /* =====================================================
       PRELOAD IMAGES
       ===================================================== */

    useEffect(() => {
        HERO_SLIDES.forEach((slide) => {
            const image = new Image();
            image.src = slide.image;
        });
    }, []);

    /* =====================================================
       HERO VISIBILITY
       ===================================================== */

    useEffect(() => {
        const heroElement = heroRef.current;

        if (!heroElement) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    clearTyping();
                } else {
                    startTyping(activeHero.title);
                }
            },
            {
                threshold: 0.45,
            }
        );

        observer.observe(heroElement);

        return () => {
            observer.disconnect();
            clearTyping();
        };
    }, [activeHero.title]);

    /* =====================================================
       MANUAL SLIDE CHANGE
       ===================================================== */

    const handleSlideChange = (index) => {
        if (index === activeSlide) {
            startTyping(HERO_SLIDES[index].title);
            return;
        }

        setActiveSlide(index);
    };

    /* =====================================================
       CIRCULAR IMAGE POSITIONS
       
       Position 0 = active/top image
       Position 1 = next image
       Position 2 = third image
       ===================================================== */

    const getSlide = (position) => {
        return HERO_SLIDES[
            (activeSlide + position) % HERO_SLIDES.length
        ];
    };

    const topImage = getSlide(0);
    const secondImage = getSlide(1);
    const thirdImage = getSlide(2);

    /* =====================================================
       JSX
       ===================================================== */

    return (
        <section
            ref={heroRef}
            className="hero-wrapper"
        >
            {/* =================================================
                BACKGROUND
                ALWAYS MATCHES TOP / ACTIVE IMAGE
            ================================================= */}

            <div
                key={`background-${activeSlide}`}
                className="hero-background"
                style={{
                    backgroundImage: `url(${activeHero.image})`,
                }}
            />

            {/* =================================================
                OVERLAY
            ================================================= */}

            <div className="hero-overlay" />

            {/* =================================================
                PARTICLES
            ================================================= */}

            <div className="hero-particles">
                {PARTICLES.map((particle, index) => (
                    <span
                        key={index}
                        className="hero-particle"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            top: particle.top,
                            left: particle.left,
                            animationDuration:
                                particle.duration,
                            animationDelay:
                                particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="hero-inner">
                <div className="hero-content">

                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <div className="hero-text">

                        {/* TOP STATIC HEADING */}

                        <h3 className="subheading">
                            We Design, Develop &amp; Deliver
                            Impactful Technology
                        </h3>

                        {/* MAIN DYNAMIC HEADING */}

                        <h1 className="heading">

                            <span className="hero-heading-line">
                                Technology Solutions for
                            </span>

                            <span
                                key={activeSlide}
                                className="hero-heading-line hero-dynamic-line"
                            >
                                <span className="smart-solutions">
                                    {typedText}
                                    <span
                                        className="typing-cursor"
                                        aria-hidden="true"
                                    />
                                </span>
                            </span>

                        </h1>

                        {/* DESCRIPTION */}

                        <p className="description">
                            ProJenius is a technology solutions and
                            innovation company offering web development,
                            mobile app development, software solutions,
                            AI/ML development, IoT solutions, product
                            engineering, and 3D design. We help businesses,
                            startups, institutions, and organizations turn
                            ideas into practical, scalable technology
                            solutions.
                        </p>

                        {/* MOBILE DOTS */}

                        <div className="hero-mobile-dots">
                            <DotIndicators
                                active={activeSlide}
                                onDotClick={handleSlideChange}
                            />
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div className="hero-visual">

                        <div className="thumb-wrapper">

                            {/* =================================================
                                TOP / ACTIVE IMAGE
                            ================================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-main"
                                onClick={() =>
                                    handleSlideChange(
                                        (activeSlide + 1) %
                                            HERO_SLIDES.length
                                    )
                                }
                                aria-label={`Current slide: ${topImage.title}`}
                            >
                                <img
                                    key={`top-${topImage.id}`}
                                    src={topImage.image}
                                    alt={topImage.title}
                                    draggable="false"
                                />
                            </button>

                            {/* =================================================
                                SECOND IMAGE
                            ================================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-second"
                                onClick={() =>
                                    handleSlideChange(
                                        (activeSlide + 1) %
                                            HERO_SLIDES.length
                                    )
                                }
                                aria-label={`Show ${secondImage.title}`}
                            >
                                <img
                                    key={`second-${secondImage.id}`}
                                    src={secondImage.image}
                                    alt={secondImage.title}
                                    draggable="false"
                                />
                            </button>

                            {/* =================================================
                                THIRD IMAGE
                            ================================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-third"
                                onClick={() =>
                                    handleSlideChange(
                                        (activeSlide + 2) %
                                            HERO_SLIDES.length
                                    )
                                }
                                aria-label={`Show ${thirdImage.title}`}
                            >
                                <img
                                    key={`third-${thirdImage.id}`}
                                    src={thirdImage.image}
                                    alt={thirdImage.title}
                                    draggable="false"
                                />
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {/* =================================================
                BOTTOM ZIG-ZAG
            ================================================= */}

            <div className="hero-zigzag">
                <div className="hero-zigzag-cyan" />
                <div className="hero-zigzag-white" />
            </div>
        </section>
    );
}