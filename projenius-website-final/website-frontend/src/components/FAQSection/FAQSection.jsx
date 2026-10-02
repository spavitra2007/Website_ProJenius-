import React, { useEffect, useRef, useState } from "react";
import "./FAQSection.css";

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question: "Can I approach ProJenius with only an idea?",
    answer:
      "Yes. You can approach us at the idea stage. We can help clarify the problem, assess feasibility and define a practical next step.",
  },
  {
    question:
      "Do I need a complete technical specification?",
    answer:
      "No. A rough idea is enough to begin. Requirements and technical direction can be refined during the initial discussions.",
  },
  {
    question:
      "Can ProJenius help with prototype development?",
    answer:
      "Yes. We support prototype development across software, electronics, embedded systems, IoT and related product requirements.",
  },
  {
    question:
      "Can you help with both software and hardware?",
    answer:
      "Yes. Software and hardware capabilities can be combined when the project requires both sides.",
  },
  {
    question:
      "Do you support AI/ML and SaaS ideas?",
    answer:
      "Yes. We support AI/ML, software, SaaS and related technology development depending on the project requirements.",
  },
  {
    question:
      "Can you help with PCB and 3D prototype development?",
    answer:
      "Yes. PCB development and 3D design/prototyping can be part of the product development process.",
  },
  {
    question: "Do you provide patent support?",
    answer:
      "We can support patent-related technical documentation, prior-art research support and filing coordination.",
  },
  {
    question:
      "Do you provide startup registration support?",
    answer:
      "Yes. We provide guidance related to startup and company registration requirements and documentation.",
  },
  {
    question: "Can students approach ProJenius?",
    answer:
      "Yes. Students and emerging innovators can approach ProJenius with projects, concepts and early-stage ideas.",
  },
  {
    question: "How do we start?",
    answer:
      "Start with a conversation. Share your idea, problem or current stage and we can identify the appropriate next step.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const FAQSection = () => {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     FAQ TOGGLE
  ======================================================= */

  const toggleFAQ = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`faqSection ${
        isVisible ? "faqSection--visible" : ""
      }`}
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="faqSection__grid"
        aria-hidden="true"
      />

      <div className="faqSection__container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="faqSection__left">

          <div className="faqSection__eyebrow">
            <span className="faqSection__eyebrow-line" />
            <span>QUESTIONS</span>
          </div>

          <h2 className="faqSection__heading">
            Frequently
            <br />
            Asked
            <br />
            Questions
          </h2>

          <p className="faqSection__intro">
            Can’t find what you’re looking for? Ask us directly.
            <br />
            A rough idea is enough to start.
          </p>

          <a
            href="/contact"
            className="faqSection__cta"
          >
            <span>Ask a question</span>
            <span aria-hidden="true">→</span>
          </a>

        </div>

        {/* =================================================
            RIGHT FAQ
        ================================================= */}

        <div className="faqSection__right">

          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={`faqSection__item ${
                  isOpen
                    ? "faqSection__item--open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  className="faqSection__trigger"
                  onClick={() =>
                    toggleFAQ(index)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      event,
                      index
                    )
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faqSection__question">
                    {item.question}
                  </span>

                  <span
                    className="faqSection__icon"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`faqSection__answer ${
                    isOpen
                      ? "faqSection__answer--open"
                      : ""
                  }`}
                >
                  <div className="faqSection__answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default FAQSection;