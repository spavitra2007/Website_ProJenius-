import React, { useEffect, useRef, useState } from "react";
import {
  Backpack,
  GraduationCap,
  RefreshCw,
  BriefcaseBusiness,
} from "lucide-react";

import "./TargetAudience.css";

/* =========================================================
   TARGET AUDIENCE DATA
========================================================= */

const audienceItems = [
  {
    icon: Backpack,
    title: "College Students",
    description:
      "Get ahead of campus placements with industry-ready skills and an impressive portfolio.",
    color: "blue",
  },
  {
    icon: GraduationCap,
    title: "Recent Graduates",
    description:
      "Bridge the gap between academic theory and what companies actually hire for.",
    color: "green",
  },
  {
    icon: RefreshCw,
    title: "Career Switchers",
    description:
      "Transition into tech roles smoothly with a focused, fast-tracked learning roadmap.",
    color: "orange",
  },
  {
    icon: BriefcaseBusiness,
    title: "Working Professionals",
    description:
      "Upskill to secure promotions or switch to higher-paying companies and roles.",
    color: "purple",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const TargetAudience = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =======================================================
     REVEAL WHEN SECTION ENTERS VIEW
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`target-audience-section ${
        isVisible ? "target-audience-visible" : ""
      }`}
    >
      <div className="target-audience-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="target-audience-heading">

          <span className="target-audience-label">
            TARGET AUDIENCE
          </span>

          <h2>
            Who is This{" "}
            <span>Mentorship</span>{" "}
            For?
          </h2>

        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div className="target-audience-grid">

          {audienceItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`
                  target-audience-card
                  target-audience-${item.color}
                `}
                style={{
                  "--card-delay": `${index * 0.25}s`,
                }}
              >

                {/* ICON */}

                <div className="target-audience-icon">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>

                {/* TITLE */}

                <h3>{item.title}</h3>

                {/* DESCRIPTION */}

                <p>{item.description}</p>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default TargetAudience;