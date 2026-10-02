import React, { useEffect, useRef, useState } from "react";

import projectImage1 from "../../assets/images/Helminth Real Poster.jpeg";
import projectImage2 from "../../assets/images/Helminth_poster_website_card.png";

import "./ProjectSection.css";

/* =========================================================
   DATA
========================================================= */

const animatedSolutions = [
  "Software Development",
  "IoT & Automation",
  "AI & Machine Learning",
  "Hardware & Embedded Systems",
  "Product Development",
  "Startup Support",
];

const projects = [
  {
    title: "AI-Based Water Quality Monitoring System",
    subtitle: "IoT & AI",
    description:
      "IoT and AI-based system for monitoring water quality parameters, detecting changes, and supporting real-time environmental monitoring.",
    rating: 5,
    image: projectImage1,
  },
  {
    title: "Smart Waste Management System",
    subtitle: "IoT & Automation",
    description:
      "IoT-enabled waste segregation and monitoring system designed to improve waste classification, collection, and resource management.",
    rating: 5,
    image: projectImage2,
  },
  {
    title: "Autonomous Follower Robot",
    subtitle: "Hardware & Embedded Systems",
    description:
      "Embedded robotics solution designed for autonomous following, obstacle detection, and smart material transportation.",
    rating: 5,
    image: "/images/project-image-5.webp",
  },
  {
    title: "AI-Based Road Hazard Detection System",
    subtitle: "Road Safety & IoT",
    description:
      "Smart road safety system that detects hazards and accidents, provides location-based alerts, and supports faster emergency response.",
    rating: 5,
    image: "/images/project-image-3.webp",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ProjectSection() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [solutionIndex, setSolutionIndex] = useState(0);

  /* Heading text rotation */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSolutionIndex((current) => (current + 1) % animatedSolutions.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Auto slider */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const handlePrevious = () =>
    setActiveIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );

  const handleNext = () =>
    setActiveIndex((current) => (current + 1) % projects.length);

  const handleDotClick = (index) => setActiveIndex(index);

  const getCardClass = (index) => {
    const total = projects.length;

    if (index === activeIndex) return "project-card active";
    if (index === (activeIndex - 1 + total) % total) return "project-card prev";
    if (index === (activeIndex + 1) % total) return "project-card next";

    return "project-card hidden";
  };

  return (
    <section
      ref={sectionRef}
      className={`project-section ${isVisible ? "project-visible" : ""}`}
    >
      <div className="project-container">
        {/* HEADER */}
        <div className="project-header">
          <span className="project-badge">OUR PROJECTS</span>

          <h2 className="project-title">
            <span className="project-title-static">
              Our Technology Solutions in
            </span>

            <span className="project-rotator">
              {animatedSolutions.map((text, index) => (
                <span
                  key={text}
                  className={`project-rotator-item ${
                    index === solutionIndex ? "active" : ""
                  }`}
                  aria-hidden={index !== solutionIndex}
                >
                  {text}
                </span>
              ))}
            </span>
          </h2>

          <div className="project-title-line" aria-hidden="true">
            <span />
          </div>

          <p className="project-description">
            Explore our technology projects across software, IoT, AI, hardware,
            and embedded systems, developed to address real-world business and
            industry needs.
          </p>
        </div>

        {/* SLIDER */}
        <div className="project-slider-wrapper">
          <button
            type="button"
            className="project-arrow project-arrow-left"
            onClick={handlePrevious}
            aria-label="Previous project"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="project-stage" aria-live="polite">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={getCardClass(index)}
                aria-hidden={index !== activeIndex}
              >
                <div className="project-card-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={index === activeIndex ? "eager" : "lazy"}
                    draggable="false"
                  />

                  <div className="project-image-gradient" aria-hidden="true" />

                  <span className="project-category">{project.subtitle}</span>
                </div>

                <div className="project-card-content">
                  <h3 className="project-card-title">{project.title}</h3>

                  <p className="project-card-description">
                    {project.description}
                  </p>

                  <div className="project-card-bottom">
                    <div
                      className="project-rating"
                      aria-label={`Rating ${project.rating} out of 5`}
                    >
                      <div className="project-stars" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <span
                            key={starIndex}
                            className={starIndex < project.rating ? "filled" : ""}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <span>{project.rating}.0</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="project-arrow project-arrow-right"
            onClick={handleNext}
            aria-label="Next project"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* DOTS */}
        <div
          className="project-dots"
          role="tablist"
          aria-label="Project navigation"
        >
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              role="tab"
              className={`project-dot ${index === activeIndex ? "active" : ""}`}
              aria-label={`Go to ${project.title}`}
              aria-selected={index === activeIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}