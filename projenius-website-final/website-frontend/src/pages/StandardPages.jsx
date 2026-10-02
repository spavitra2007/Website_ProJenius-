import { Link } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import { PageHero } from "../components/ContentUI";

import "./DynamicPages.css";


/* =========================================================
   PAGE CONTENT
========================================================= */

const d = {
    services: [
        "Software Development",
        "Web & App Solutions",
        "Technical Training",
        "Digital Product Support",
    ],

    workshop: [
        "Hands-on technical workshops",
        "Industry-focused learning",
        "Mentor guidance",
        "Practical project work",
    ],

    internship: [
        "Real project exposure",
        "Mentor guidance",
        "Portfolio-ready work",
        "Career preparation",
    ],

    startup: [
        "Product engineering support",
        "Technical consulting",
        "MVP development",
        "Growth-ready foundations",
    ],

    "career-guidance": [
        "Resume and profile guidance",
        "Interview preparation",
        "Career roadmaps",
        "Industry direction",
    ],

    "join-our-team": [
        "Collaborative culture",
        "Real technology projects",
        "Learning opportunities",
        "Long-term growth",
    ],
};


/* =========================================================
   STANDARD PAGE
========================================================= */

export default function StandardPage({ type }) {

    const title =
        type === "career-guidance"
            ? "Career Guidance"
            : type === "join-our-team"
                ? "Join Our Team"
                : type === "startup"
                    ? "Startup Support"
                    : type[0].toUpperCase() + type.slice(1);


    const items =
        d[type] || [
            "Practical solutions",
            "Experienced team",
            "Clear process",
            "Reliable delivery",
        ];


    return (
        <>

            {/* =================================================
                PAGE HERO
            ================================================= */}

            <PageHero
                eyebrow="ProJenius"
                title={title}
                description="Professional technology solutions and learning experiences designed around practical outcomes."
            />


            {/* =================================================
                STANDARD CONTENT
            ================================================= */}

            <section className="standard-section">

                <div className="container standard-grid">

                    <div>

                        <span className="eyebrow">
                            Built with purpose
                        </span>

                        <h2>
                            Simple, practical and outcome-focused.
                        </h2>

                        <p>
                            Explore what ProJenius can help you
                            build, learn or improve.
                        </p>

                        <Link
                            className="primary-btn"
                            to="/contact"
                        >
                            Talk to ProJenius

                            <ArrowRight />
                        </Link>

                    </div>


                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <div className="feature-list">

                        {items.map((item) => (
                            <div key={item}>

                                <CheckCircle2 />

                                <span>
                                    {item}
                                </span>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

        </>
    );
}