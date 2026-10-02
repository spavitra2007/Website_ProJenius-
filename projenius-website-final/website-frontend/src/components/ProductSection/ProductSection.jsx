import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ProductSection.css";

import gnut from "../../assets/images/GNut.webp";
import iotkit from "../../assets/images/IoT Kit.webp";
import edutech from "../../assets/images/EduTech.webp";

const AI_PRODUCT_URL = "https://gnut2pnut.projenius.in";

const products = [
    {
        animationText: "Smarter Agriculture",
        title: "Groundnut-to-Peanut Processing, Sorting & Grading Machine",
        titleLines: (
            <>
                Groundnut-to-Peanut Processing,
                <br />
                Sorting & Grading Machine
            </>
        ),
        image: gnut,
        description:
            "A complete groundnut-to-peanut processing solution that breaks the groundnut shell, separates and collects dust for by-product use, sorts peanuts by quality, grades them by size, measures weight, predicts oil potential, and supports export-quality testing.",
        icon: "AI",
        action: "redirect",
        features: [
            "Shell Breaking",
            "Dust Separation",
            "AI Sorting",
            "Size Grading",
            "Oil Prediction",
            "Export Testing",
        ],
    },

    {
        animationText: "Connected Solutions",
        title: "ProJenius IoT Learning Kit",
        titleLines: <>ProJenius IoT Learning Kit</>,
        image: iotkit,
        description:
            "Hands-on IoT kits that help students and learners understand sensors, electronics, microcontrollers, connectivity, and automation by building real working projects from hardware to software.",
        icon: "IoT",
        action: "coming-soon",
        features: [
            "Sensors",
            "ESP32 & Arduino",
            "IoT",
            "Automation",
            "Embedded Systems",
            "Hands-On Projects",
        ],
    },

    {
        animationText: "3D Printing & Services",
        title: "ProJenius 3D Printing & Prototyping Services",
        titleLines: (
            <>
                ProJenius 3D Printing & Prototyping
                <br />
                Services
            </>
        ),
        image: edutech,
        description:
            "Professional 3D printing and rapid prototyping services for product concepts, functional parts, custom components, models, and development-ready prototypes with practical design-to-print support.",
        icon: "Edu",
        action: "coming-soon",
        features: [
            "Rapid Prototyping",
            "Custom 3D Parts",
            "Product Models",
            "Functional Prototypes",
            "PLA & ABS Printing",
            "Design-to-Print Support",
        ],
    },
];

function ProductIcon({ type, size = 18 }) {
    const paths = {
        AI: (
            <>
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <circle cx="9" cy="10" r="1" />
                <circle cx="15" cy="10" r="1" />
                <path d="M8 15h8M9 1v3M15 1v3M9 20v3M15 20v3" />
            </>
        ),

        IoT: (
            <>
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
            </>
        ),

        Edu: (
            <path d="M4 5h16v12H4zM8 21h8M12 17v4M8 9h8M8 12h5" />
        ),
    };

    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {paths[type]}
        </svg>
    );
}

const ProductSection = () => {
    const sectionRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [fading, setFading] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    const activeProduct = products[activeIndex];

    /* =====================================================
       SECTION VISIBILITY
    ===================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    /* =====================================================
       PRODUCT CHANGE - CLICK ONLY
    ===================================================== */

    const changeProduct = useCallback(
        (index) => {
            if (index === activeIndex || fading) return;

            setFading(true);

            window.setTimeout(() => {
                setActiveIndex(index);
                setFading(false);
            }, 250);
        },
        [activeIndex, fading]
    );

    /* =====================================================
       ESCAPE KEY FOR POPUP
    ===================================================== */

    useEffect(() => {
        if (!showComingSoon) return undefined;

        const onKey = (e) => {
            if (e.key === "Escape") {
                setShowComingSoon(false);
            }
        };

        document.addEventListener("keydown", onKey);

        return () => {
            document.removeEventListener("keydown", onKey);
        };
    }, [showComingSoon]);

    /* =====================================================
       EXPLORE MORE
    ===================================================== */

    const handleExplore = () => {
        if (activeProduct.action === "redirect") {
            window.open(
                AI_PRODUCT_URL,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        setShowComingSoon(true);
    };

    return (
        <>
            <section
                ref={sectionRef}
                className={`pj-section ${
                    visible ? "pj-visible" : ""
                }`}
            >
                <div className="pj-container">

                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="pj-heading">

                        <span className="pj-badge">
                            Our Products
                        </span>

                        <h2 className="pj-title">
                            Technology Products Built for{" "}

                            <span
                                key={activeProduct.animationText}
                                className={`pj-title-accent ${
                                    fading ? "pj-out" : ""
                                }`}
                            >
                                {activeProduct.animationText}
                            </span>
                        </h2>

                        <div
                            className="pj-line"
                            aria-hidden="true"
                        />

                        <p className="pj-desc">
                            Explore our technology products designed
                            to solve real-world problems, connect people,
                            and create smarter ways to learn and work.
                        </p>

                    </div>


                    {/* =================================================
                        PRODUCT TABS
                    ================================================= */}

                    <div
                        className="pj-tabs"
                        role="tablist"
                        aria-label="Products"
                    >
                        {products.map((product, index) => {

                            const isActive =
                                activeIndex === index;

                            return (
                                <button
                                    key={product.title}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`pj-tab ${
                                        isActive
                                            ? "pj-tab-active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        changeProduct(index)
                                    }
                                >
                                    <span className="pj-tab-icon">
                                        <ProductIcon
                                            type={product.icon}
                                        />
                                    </span>

                                    <span>
                                        {product.animationText}
                                    </span>
                                </button>
                            );
                        })}
                    </div>


                    {/* =================================================
                        PRODUCT CARD
                    ================================================= */}

                    <div
                        id={`product-panel-${activeIndex}`}
                        role="tabpanel"
                        className={`pj-card ${
                            fading ? "pj-out" : ""
                        }`}
                    >

                        {/* IMAGE */}

                        <div className="pj-image">

                            <img
                                src={activeProduct.image}
                                alt={activeProduct.title}
                                loading={
                                    activeIndex === 0
                                        ? "eager"
                                        : "lazy"
                                }
                            />

                            <div
                                className="pj-shine"
                                aria-hidden="true"
                            />

                        </div>


                        {/* TEXT */}

                        <div className="pj-text">

                            {/* ONLY THIS HEADER IS CENTERED */}
                            <h3 className="pj-content-title">
                                {activeProduct.titleLines}
                            </h3>


                            {/* DESCRIPTION - LEFT ALIGNED */}
                            <p className="pj-content-desc">
                                {activeProduct.description}
                            </p>


                            {/* FEATURES - LEFT ALIGNED */}

                            <div className="pj-features">

                                <h4>
                                    Key Features
                                </h4>

                                <ul className="pj-feature-list">

                                    {activeProduct.features.map(
                                        (feature) => (
                                            <li
                                                className="pj-feature"
                                                key={feature}
                                            >
                                                {feature}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>


                            {/* EXPLORE BUTTON */}

                            <button
                                type="button"
                                className="pj-btn"
                                onClick={handleExplore}
                                aria-label={`Explore ${activeProduct.title}`}
                            >
                                Explore More
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        DOTS
                    ================================================= */}

                    <div
                        className="pj-dots"
                        aria-hidden="true"
                    >
                        {products.map((product, index) => (
                            <span
                                key={product.title}
                                className={`pj-dot ${
                                    index === activeIndex
                                        ? "pj-dot-active"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>

                </div>
            </section>


            {/* =====================================================
                COMING SOON POPUP
            ===================================================== */}

            {showComingSoon && (
                <div
                    className="pj-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="pj-coming-soon-title"
                    onClick={() =>
                        setShowComingSoon(false)
                    }
                >
                    <div
                        className="pj-popup"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="pj-popup-close"
                            onClick={() =>
                                setShowComingSoon(false)
                            }
                            aria-label="Close popup"
                        >
                            ×
                        </button>


                        <div className="pj-popup-icon">
                            <ProductIcon
                                type={activeProduct.icon}
                                size={28}
                            />
                        </div>


                        <h3
                            id="pj-coming-soon-title"
                            className="pj-popup-title"
                        >
                            Coming Soon
                        </h3>


                        <p className="pj-popup-text">
                            We will launch the website soon.
                        </p>


                        <button
                            type="button"
                            className="pj-popup-btn"
                            onClick={() =>
                                setShowComingSoon(false)
                            }
                        >
                            Okay
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSection;