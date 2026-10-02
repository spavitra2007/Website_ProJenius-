import React from "react";
import "./InternshipTech.css";

const technologies = [
    {
        name: "HTML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
        name: "CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
        name: "React JS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
];

export default function InternshipTech() {
    return (
        <section className="internship-tech-section">

            {/* HEADER */}
            <div className="internship-tech-container">

                <div className="internship-tech-heading">

                    <span className="internship-tech-subheading">
                        TECHNOLOGIES COVERED
                    </span>

                    <h2 className="internship-tech-title">
                        Tools Used in{" "}
                        <span>Real Development</span>
                    </h2>

                    <div className="internship-tech-line"></div>

                </div>

            </div>

            {/* TECHNOLOGY CAROUSEL */}
            <div className="internship-tech-carousel-wrapper">

                <div className="internship-tech-carousel-track">

                    {/* FIRST LIST */}
                    <ul className="internship-tech-list">
                        {technologies.map((tech) => (
                            <li
                                className="internship-tech-card"
                                key={tech.name}
                            >
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="internship-tech-logo"
                                />

                                <span>{tech.name}</span>
                            </li>
                        ))}
                    </ul>

                    {/* DUPLICATE LIST FOR INFINITE LOOP */}
                    <ul
                        className="internship-tech-list"
                        aria-hidden="true"
                    >
                        {technologies.map((tech) => (
                            <li
                                className="internship-tech-card"
                                key={`duplicate-${tech.name}`}
                            >
                                <img
                                    src={tech.logo}
                                    alt=""
                                    className="internship-tech-logo"
                                />

                                <span>{tech.name}</span>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>

        </section>
    );
}