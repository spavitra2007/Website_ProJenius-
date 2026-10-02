import React, { useState } from "react";
import "./SupportJourney.css";

/* =========================================================
   SUPPORT DATA
========================================================= */

const supportData = [
  {
    id: "01",
    title: "Research & Validation",
    areas: "3 areas",
    items: [
      {
        title: "Research & Problem Understanding",
        description:
          "Support with problem research, idea evaluation and feasibility assessment.",
      },
      {
        title: "Validation Support",
        description:
          "Validate the problem, solution direction and technical feasibility.",
      },
      {
        title: "Technical Roadmap",
        description:
          "Define the technical direction and practical next steps.",
      },
    ],
  },

  {
    id: "02",
    title: "Software & Intelligence",
    areas: "3 areas",
    items: [
      {
        title: "Software Development",
        description:
          "Build web, mobile and software products around clear requirements.",
      },
      {
        title: "AI / ML Support",
        description:
          "Develop intelligent features, models and data-driven solutions.",
      },
      {
        title: "SaaS & Platform Development",
        description:
          "Create scalable platforms, applications and SaaS products.",
      },
    ],
  },

  {
    id: "03",
    title: "Hardware & Electronics",
    areas: "3 areas",
    items: [
      {
        title: "Electronics Development",
        description:
          "Circuit design, component selection and hardware integration.",
      },
      {
        title: "Embedded Systems",
        description:
          "Firmware and embedded development for connected products.",
      },
      {
        title: "IoT & PCB",
        description:
          "Support across connected devices, PCB design and system integration.",
      },
    ],
  },

  {
    id: "04",
    title: "Prototype & MVP",
    areas: "3 areas",
    items: [
      {
        title: "Prototype Development",
        description:
          "Turn a concept into a working prototype that can be tested and improved.",
      },
      {
        title: "MVP Development",
        description:
          "Plan and build a focused minimum viable product.",
      },
      {
        title: "Product Roadmap",
        description:
          "Define features, milestones and the next stage of development.",
      },
    ],
  },

  {
    id: "05",
    title: "IP, Registration & Readiness",
    areas: "4 areas",
    items: [
      {
        title: "Patent & IP Support",
        description:
          "Support with IP documentation, technical documentation, prior-art research and filing coordination.",
      },
      {
        title: "Startup Registration Support",
        description:
          "Guidance for startup registration, company registration and related documentation.",
      },
      {
        title: "Pitch Deck & Startup Documentation",
        description:
          "Support for pitch decks, startup documentation and presentation readiness.",
      },
      {
        title: "Startup Mentoring",
        description:
          "Practical guidance across technology, product and startup execution.",
      },
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const SupportJourney = () => {
  /* Start on 05 to match the supplied reference */
  const [activeIndex, setActiveIndex] = useState(4);
  const [openIndex, setOpenIndex] = useState(0);

  const activeSupport = supportData[activeIndex];

  /* =======================================================
     CHANGE SUPPORT AREA
  ======================================================= */

  const changeSupport = (index) => {
    setActiveIndex(index);
    setOpenIndex(0);
  };

  /* =======================================================
     ACCORDION
  ======================================================= */

  const toggleAccordion = (index) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleSupportKeyDown = (event, index) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      changeSupport(index);
    }
  };

  return (
    <section className="supportJourney">
      <div className="supportJourney__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="supportJourney__header">

          <div className="supportJourney__eyebrow">
            <span className="supportJourney__eyebrow-line" />
            <span>WHAT WE SUPPORT</span>
          </div>

          <h2 className="supportJourney__heading">
            Support Across the
            <br />
            Startup Journey.
          </h2>

          <p className="supportJourney__intro">
            Choose an area on the left to see the support behind it.
          </p>

        </header>

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="supportJourney__layout">

          {/* =================================================
              LEFT NAVIGATION
          ================================================= */}

          <div className="supportJourney__navigation">

            {supportData.map((support, index) => {
              const isActive =
                activeIndex === index;

              return (
                <button
                  key={support.id}
                  type="button"
                  className={`supportJourney__nav-item ${
                    isActive
                      ? "supportJourney__nav-item--active"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    changeSupport(index)
                  }
                  onFocus={() =>
                    changeSupport(index)
                  }
                  onClick={() =>
                    changeSupport(index)
                  }
                  onKeyDown={(event) =>
                    handleSupportKeyDown(
                      event,
                      index
                    )
                  }
                  aria-pressed={isActive}
                >
                  {/* ACTIVE EDGE */}

                  <span
                    className="supportJourney__nav-accent"
                    aria-hidden="true"
                  />

                  {/* NUMBER */}

                  <span className="supportJourney__nav-number">
                    {support.id}
                  </span>

                  {/* TITLE */}

                  <span className="supportJourney__nav-title">
                    {support.title}
                  </span>

                  {/* META */}

                  <span className="supportJourney__nav-meta">
                    <span>{support.areas}</span>

                    <span className="supportJourney__nav-arrow">
                      →
                    </span>
                  </span>
                </button>
              );
            })}

          </div>

          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <div
            key={activeSupport.id}
            className="supportJourney__details"
          >
            {activeSupport.items.map(
              (item, index) => {
                const isOpen =
                  openIndex === index;

                return (
                  <div
                    key={`${activeSupport.id}-${item.title}`}
                    className={`supportJourney__accordion ${
                      isOpen
                        ? "supportJourney__accordion--open"
                        : ""
                    }`}
                  >

                    {/* ACCORDION HEADER */}

                    <button
                      type="button"
                      className="supportJourney__accordion-trigger"
                      onClick={() =>
                        toggleAccordion(index)
                      }
                      aria-expanded={isOpen}
                    >
                      <span className="supportJourney__accordion-title">
                        {item.title}
                      </span>

                      <span
                        className="supportJourney__accordion-icon"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* ACCORDION BODY */}

                    <div
                      className={`supportJourney__accordion-body ${
                        isOpen
                          ? "supportJourney__accordion-body--open"
                          : ""
                      }`}
                    >
                      <p>
                        {item.description}
                      </p>
                    </div>

                  </div>
                );
              }
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportJourney;