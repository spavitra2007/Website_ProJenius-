import React, { useMemo, useState } from "react";
import "./ProofOfWork.css";

/* =========================================================
   FILTERS
========================================================= */

const filters = [
  "All",
  "AI / ML",
  "IoT",
  "Robotics",
  "Hardware",
  "SaaS",
  "Automation",
  "Prototype",
  "Academic Innovation",
];

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: 1,
    categories: ["Robotics", "Hardware"],
    projectName: "Project name to be added",
    problem: "To be added",
    technology: "To be added",
    workedOn: "To be added",
    outcome: "To be added",
    graph: "graph-one",
  },
  {
    id: 2,
    categories: ["Hardware", "Prototype"],
    projectName: "Project name to be added",
    problem: "To be added",
    technology: "To be added",
    workedOn: "To be added",
    outcome: "To be added",
    graph: "graph-two",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const ProofOfWork = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section className="proofOfWork">

      {/* =================================================
          BACKGROUND GRID
      ================================================= */}

      <div
        className="proofOfWork__grid"
        aria-hidden="true"
      />

      <div className="proofOfWork__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="proofOfWork__header">

          <div className="proofOfWork__eyebrow">
            <span className="proofOfWork__eyebrow-line" />
            <span>PROOF OF WORK</span>
          </div>

          <h2 className="proofOfWork__heading">
            From Ideas to
            <br />
            Working Solutions.
          </h2>

          <p className="proofOfWork__intro">
            Prototypes, products and experiments built with
            ProJenius, shown with the problem, the technology and
            what came out of it.
          </p>

        </header>

        {/* =================================================
            PLACEHOLDER NOTICE
        ================================================= */}

        <div className="proofOfWork__notice">

          <span className="proofOfWork__notice-label">
            PLACEHOLDER
          </span>

          <p>
            These tiles are layout placeholders. Replace each with
            a verified ProJenius project and real images. No client
            names, statistics or outcomes have been invented.
          </p>

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div
          className="proofOfWork__filters"
          role="tablist"
          aria-label="Project categories"
        >
          {filters.map((filter) => {
            const isActive =
              activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`proofOfWork__filter ${
                  isActive
                    ? "proofOfWork__filter--active"
                    : ""
                }`}
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <div className="proofOfWork__projects">

          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                className="proofOfWork__card"
              >

                {/* =========================================
                    IMAGE / GRAPH
                ========================================= */}

                <div className="proofOfWork__visual">

                  <div
                    className={`proofOfWork__graph ${project.graph}`}
                    aria-hidden="true"
                  >
                    <span className="proofOfWork__graph-line" />

                    <span className="proofOfWork__graph-line proofOfWork__graph-line--second" />

                    <span className="proofOfWork__graph-dot proofOfWork__graph-dot--one" />
                    <span className="proofOfWork__graph-dot proofOfWork__graph-dot--two" />
                    <span className="proofOfWork__graph-dot proofOfWork__graph-dot--three" />
                    <span className="proofOfWork__graph-dot proofOfWork__graph-dot--four" />
                    <span className="proofOfWork__graph-dot proofOfWork__graph-dot--five" />
                  </div>

                  <span className="proofOfWork__image-placeholder">
                    IMAGE PLACEHOLDER
                  </span>

                </div>

                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="proofOfWork__card-content">

                  <div className="proofOfWork__tags">
                    {project.categories.map((category) => (
                      <span
                        key={category}
                        className="proofOfWork__tag"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="proofOfWork__project-title">
                    {project.projectName}
                  </h3>

                  <div className="proofOfWork__details">

                    <div className="proofOfWork__detail">
                      <span>PROBLEM / OBJECTIVE</span>
                      <strong>
                        {project.problem}
                      </strong>
                    </div>

                    <div className="proofOfWork__detail">
                      <span>TECHNOLOGY INVOLVED</span>
                      <strong>
                        {project.technology}
                      </strong>
                    </div>

                    <div className="proofOfWork__detail">
                      <span>WHAT PROJENIUS WORKED ON</span>
                      <strong>
                        {project.workedOn}
                      </strong>
                    </div>

                    <div className="proofOfWork__detail">
                      <span>CURRENT OUTCOME</span>
                      <strong>
                        {project.outcome}
                      </strong>
                    </div>

                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="proofOfWork__empty">
              No projects available for this category yet.
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProofOfWork;