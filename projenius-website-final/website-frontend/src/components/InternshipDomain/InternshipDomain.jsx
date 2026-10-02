import React, { useEffect, useRef, useState } from "react";
import "./InternshipDomain.css";

/* =========================================================
   INTERNSHIP DOMAIN DATA
========================================================= */

const internshipDomains = [
    {
        id: "full-stack",
        title: "Full Stack Development",
        category: "Development",
        icon: "🧑🏻‍💻",
        description:
            "Build complete web applications with frontend, backend, APIs, and database workflows.",
    },
    {
        id: "frontend",
        title: "Frontend Development",
        category: "Development",
        icon: "🖥️",
        description:
            "Create responsive, interactive, and modern user interfaces using current frontend technologies.",
    },
    {
        id: "backend",
        title: "Backend Development",
        category: "Development",
        icon: "🗄️",
        description:
            "Learn server-side development, APIs, databases, authentication, and scalable backend systems.",
    },
    {
        id: "react",
        title: "React JS",
        category: "Development",
        icon: "⚛️",
        description:
            "Build reusable and dynamic web interfaces using React components, hooks, state, and modern patterns.",
    },
    {
        id: "python",
        title: "Python Development",
        category: "Development",
        icon: "🐍",
        description:
            "Develop practical applications using Python programming, automation, APIs, and backend development.",
    },
    {
        id: "java",
        title: "Java Development",
        category: "Development",
        icon: "☕",
        description:
            "Build robust applications with Java, object-oriented programming, Spring Boot, APIs, and databases.",
    },
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        category: "AI & Data",
        icon: "🤖",
        description:
            "Explore model building, data preparation, prediction workflows, and practical AI use cases.",
    },
    {
        id: "data-science",
        title: "Data Science",
        category: "AI & Data",
        icon: "🔎",
        description:
            "Work with data analysis, visualization, statistical methods, and machine learning workflows.",
    },
    {
        id: "iot",
        title: "IoT Development",
        category: "Hardware",
        icon: "🌐",
        description:
            "Build connected solutions using sensors, devices, communication protocols, and cloud platforms.",
    },
    {
        id: "blockchain",
        title: "Blockchain Development",
        category: "Emerging Tech",
        icon: "🔐",
        description:
            "Understand decentralized applications, blockchain architecture, smart contracts, and Web3 concepts.",
    },
    {
        id: "ui-ux",
        title: "UI/UX Design",
        category: "Design",
        icon: "🖥️",
        description:
            "Design intuitive digital experiences through wireframes, prototypes, visual systems, and usability principles.",
    },
    {
        id: "mobile",
        title: "Mobile App Development",
        category: "Development",
        icon: "📱",
        description:
            "Create modern mobile applications with responsive interfaces, APIs, authentication, and deployment workflows.",
    },
];


/* =========================================================
   FILTERS
========================================================= */

const filters = [
    "All",
    "Development",
    "AI & Data",
    "Hardware",
    "Design",
    "Emerging Tech",
];


/* =========================================================
   COMPONENT
========================================================= */

const InternshipDomain = () => {
    const sectionRef = useRef(null);

    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedDomain, setSelectedDomain] = useState(
        internshipDomains[0]
    );
    const [isVisible, setIsVisible] = useState(false);

    /* =====================================================
       SECTION REVEAL
    ===================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);


    /* =====================================================
       FILTER DOMAINS
    ===================================================== */

    const filteredDomains =
        activeFilter === "All"
            ? internshipDomains
            : internshipDomains.filter(
                  (domain) => domain.category === activeFilter
              );


    /* =====================================================
       FILTER HANDLER
    ===================================================== */

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);

        const matchingDomains =
            filter === "All"
                ? internshipDomains
                : internshipDomains.filter(
                      (domain) => domain.category === filter
                  );

        if (
            matchingDomains.length > 0 &&
            !matchingDomains.some(
                (domain) => domain.id === selectedDomain.id
            )
        ) {
            setSelectedDomain(matchingDomains[0]);
        }
    };


    /* =====================================================
       SELECT DOMAIN
    ===================================================== */

    const handleSelectDomain = (domain) => {
        setSelectedDomain(domain);
    };


    return (
        <section
            ref={sectionRef}
            className={`internship-domain-section ${
                isVisible ? "internship-domain-visible" : ""
            }`}
            aria-labelledby="internship-domain-title"
        >
            <div className="internship-domain-container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="internship-domain-header">

                    <span className="internship-domain-label">
                        INTERNSHIP DOMAINS
                    </span>

                    <h2 id="internship-domain-title">
                        Choose Your Technology Track
                    </h2>

                    <p>
                        Explore practical technology tracks designed to
                        build real-world skills and industry experience.
                    </p>

                </header>


                {/* =================================================
                    FILTERS
                ================================================= */}

                <div
                    className="internship-domain-filters"
                    role="tablist"
                    aria-label="Internship domain categories"
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={`internship-domain-filter ${
                                activeFilter === filter
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleFilterChange(filter)
                            }
                            role="tab"
                            aria-selected={
                                activeFilter === filter
                            }
                        >
                            {filter}
                        </button>
                    ))}
                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="internship-domain-layout">

                    {/* =================================================
                        DOMAIN GRID
                    ================================================= */}

                    <div className="internship-domain-grid">

                        {filteredDomains.map((domain, index) => (
                            <article
                                key={domain.id}
                                className={`internship-domain-card ${
                                    selectedDomain.id === domain.id
                                        ? "selected"
                                        : ""
                                }`}
                                style={{
                                    "--domain-delay": `${
                                        index * 0.05
                                    }s`,
                                }}
                            >

                                <div className="internship-domain-icon">
                                    <span aria-hidden="true">
                                        {domain.icon}
                                    </span>
                                </div>

                                <h3>{domain.title}</h3>

                                <button
                                    type="button"
                                    className="internship-domain-view"
                                    onClick={() =>
                                        handleSelectDomain(domain)
                                    }
                                >
                                    View Track
                                    <span aria-hidden="true">
                                        →
                                    </span>
                                </button>

                            </article>
                        ))}

                    </div>


                    {/* =================================================
                        SELECTED TRACK
                    ================================================= */}

                    <aside className="internship-domain-sidebar">

                        <div className="internship-domain-selected">

                            <span className="internship-domain-selected-label">
                                SELECTED TRACK
                            </span>

                            <div className="internship-domain-selected-icon">
                                {selectedDomain.icon}
                            </div>

                            <h3>
                                {selectedDomain.title}
                            </h3>

                            <p>
                                {selectedDomain.description}
                            </p>

                            <button
                                type="button"
                                className="internship-domain-apply"
                            >
                                Apply for this track
                                <span aria-hidden="true">
                                    →
                                </span>
                            </button>

                        </div>

                    </aside>

                </div>

            </div>
        </section>
    );
};

export default InternshipDomain;