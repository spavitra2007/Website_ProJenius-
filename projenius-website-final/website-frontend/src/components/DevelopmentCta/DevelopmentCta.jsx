import { useEffect, useRef, useState } from "react";
import "./DevelopmentCta.css";

import DevelopmentButton from "../DevelopmentButton/DevelopmentButton";
import DevelopmentJourneyFlow from "../DevelopmentJourneyFlow/DevelopmentJourneyFlow";

const CONTACT_HREF = "#pjdev-contact";

const FLOW = [
  "Idea",
  "Requirement",
  "Design",
  "Development",
  "Launch",
  "Growth",
].map((title) => ({ title }));

export default function DevelopmentCta() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return undefined;
    }

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="pjdev-contact"
      ref={sectionRef}
      className={`pjdev-cta${
        inView ? " pjdev-cta--in" : ""
      }`}
      aria-labelledby="pjdev-cta-title"
    >
      <div className="pjdev-cta__wrap">

        {/* =================================================
            HEADING
        ================================================= */}

        <h2
          id="pjdev-cta-title"
          className="pjdev-cta__title pjdev-cta__rv"
        >
          Have a Requirement? Let's Build the Right Solution.
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p className="pjdev-cta__lead pjdev-cta__rv pjdev-cta__rv--d1">
          Tell us what you're trying to solve. We'll help you
          understand the requirement and define the right
          digital path.
        </p>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="pjdev-cta__actions pjdev-cta__rv pjdev-cta__rv--d2">
          <DevelopmentButton href={CONTACT_HREF}>
            Start a Project
          </DevelopmentButton>

          <DevelopmentButton
            href={CONTACT_HREF}
            variant="ghost"
          >
            Talk to ProJenius
          </DevelopmentButton>
        </div>

        {/* =================================================
            JOURNEY
        ================================================= */}

        <div className="pjdev-cta__flow">
          <DevelopmentJourneyFlow
            items={FLOW}
            variant="cta"
            label="From idea to growth"
          />
        </div>

        {/* =================================================
            FINAL MESSAGE
        ================================================= */}

        <p className="pjdev-cta__final pjdev-cta__rv pjdev-cta__rv--d2">
          <span>
            From Requirement to Digital Product.
          </span>

          <span className="pjdev-cta__final-accent">
            From Launch to Continuous Improvement.
          </span>
        </p>
      </div>
    </section>
  );
}