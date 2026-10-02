import React from "react";
import "./DevelopmentServices.css";

const services = [
    {
        icon: "▣",
        title: "Website Development",
        description:
            "Responsive business websites with fast loading pages, clear navigation, SEO-friendly structure, and polished visual design.",
    },
    {
        icon: "</>",
        title: "Web App Development",
        description:
            "Custom web applications with dashboards, user flows, forms, APIs, admin panels, and scalable frontend architecture.",
    },
    {
        icon: "▯",
        title: "Mobile App Development",
        description:
            "Mobile-first app experiences for Android and cross-platform use cases with clean screens and practical feature flows.",
    },
    {
        icon: "🛒",
        title: "E-Commerce Solutions",
        description:
            "Online stores with product catalogs, enquiry flows, payment-ready structure, order management, and conversion-focused pages.",
    },
    {
        icon: "◉",
        title: "UI / UX for Products",
        description:
            "Wireframes, prototypes, design systems, and interface improvements that make products easier to understand and use.",
    },
    {
        icon: "⚒",
        title: "Product Maintenance",
        description:
            "Ongoing updates, bug fixes, performance improvements, feature additions, and technical support after launch.",
    },
];

export default function DevelopmentServices() {
    return (
        <section className="development-services">
            <div className="development-services-container">

                {/* Heading */}
                <div className="development-services-heading">
                    <h2>
                        &lt; What do you want to build? /&gt;
                    </h2>

                    <span className="development-services-line" />

                    <p>
                        We create websites, web applications, mobile apps,
                        e-commerce platforms and custom software solutions
                        that help businesses automate workflows, improve
                        customer experiences and scale faster.
                    </p>
                </div>

                {/* Cards */}
                <div className="development-services-grid">
                    {services.map((service, index) => (
                        <article
                            className="development-service-card"
                            key={service.title}
                            style={{ "--card-index": index }}
                        >
                            <div className="development-service-icon">
                                {service.icon}
                            </div>

                            <h3>{service.title}</h3>

                            <p>{service.description}</p>

                            <button type="button">
                                To get More Info
                            </button>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}