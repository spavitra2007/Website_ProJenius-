import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Code2,
  Cloud,
  Database,
  Users,
  KanbanSquare,
  BadgeCheck,
  FileCheck2,
  Mail,
  BriefcaseBusiness,
  UserRoundCheck,
  FileUser,
} from "lucide-react";

import "./InternshipBenefits.css";

/* =========================================================
   WHAT INTERNS WILL LEARN
========================================================= */

const learningItems = [
  {
    icon: Building2,
    title: "Industry-Level",
    subtitle: "Projects",
    color: "blue",
  },
  {
    icon: Code2,
    title: "Git & GitHub",
    subtitle: "",
    color: "purple",
  },
  {
    icon: Cloud,
    title: "API",
    subtitle: "Integration",
    color: "green",
  },
  {
    icon: Database,
    title: "Database",
    subtitle: "Management",
    color: "orange",
  },
  {
    icon: Users,
    title: "Team",
    subtitle: "Collaboration",
    color: "pink",
  },
  {
    icon: KanbanSquare,
    title: "Agile",
    subtitle: "Methodology",
    color: "peach",
  },
];

/* =========================================================
   BENEFITS
========================================================= */

const benefitItems = [
  {
    icon: BadgeCheck,
    title: "Internship",
    subtitle: "Certificate",
    color: "green",
  },
  {
    icon: FileCheck2,
    title: "Project",
    subtitle: "Completion Certificate",
    color: "blue",
  },
  {
    icon: Mail,
    title: "Letter of",
    subtitle: "Recommendation",
    color: "orange",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement",
    subtitle: "Assistance",
    color: "purple",
  },
  {
    icon: UserRoundCheck,
    title: "Mentorship",
    subtitle: "from Experts",
    color: "pink",
  },
  {
    icon: FileUser,
    title: "Resume",
    subtitle: "Building Support",
    color: "peach",
  },
  {
    icon: FileUser,
    title: "LinkedIn",
    subtitle: "Optimization",
    color: "light-blue",
  },
];

/* =========================================================
   BENEFIT ITEM
========================================================= */

const InternshipBenefitItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="internship-benefit-item">
      <div className={`internship-benefit-icon ${item.color}`}>
        <Icon size={21} strokeWidth={2} />
      </div>

      <div className="internship-benefit-text">
        <span>{item.title}</span>

        {item.subtitle && (
          <span>{item.subtitle}</span>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const InternshipBenefits = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`internship-benefits-section ${
        isVisible ? "internship-benefits-visible" : ""
      }`}
    >
      <div className="internship-benefits-container">

        {/* =================================================
            LEFT CARD
        ================================================= */}

        <div className="internship-benefits-card internship-learning-card">

          <div className="internship-benefits-top-line" />

          <div className="internship-benefits-label">
            WHAT INTERNS WILL LEARN
          </div>

          <h2>
            Work Like a <span>Modern Tech Team</span>
          </h2>

          <div className="internship-benefits-grid">
            {learningItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="internship-benefit-animation"
                style={{
                  "--item-delay": `${index * 0.08}s`,
                }}
              >
                <InternshipBenefitItem item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            RIGHT CARD
        ================================================= */}

        <div className="internship-benefits-card internship-career-card">

          <div className="internship-benefits-top-line" />

          <div className="internship-benefits-label">
            BENEFITS
          </div>

          <h2>
            Career Support <span>Beyond Training</span>
          </h2>

          <div className="internship-benefits-grid">
            {benefitItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="internship-benefit-animation"
                style={{
                  "--item-delay": `${index * 0.08}s`,
                }}
              >
                <InternshipBenefitItem item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InternshipBenefits;