import { useEffect, useRef, useState } from "react";
import "./DevelopmentWhy.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

/* =========================================================
   WHY PROJENIUS
========================================================= */

const REASONS = [
  {
    n: "01",
    icon: "target",
    title: "Requirement driven",
    text: "Solutions are shaped around the actual business requirement.",
  },
  {
    n: "02",
    icon: "route",
    title: "End-to-end",
    text: "From understanding and design to development, integration, launch and support.",
  },
  {
    n: "03",
    icon: "sliders",
    title: "Flexible approach",
    text: "The implementation approach adapts to the project's needs.",
  },
  {
    n: "04",
    icon: "growth",
    title: "Product mindset",
    text: "We think beyond delivery, focusing on usability, functionality, scalability and long-term value.",
  },
];

/* =========================================================
   DECORATIVE GRAPHICS
========================================================= */

function Deco({ n }) {
  if (n === "01") {
    return (
      <svg
        className="pjdev-why__deco pjdev-why__deco--target"
        viewBox="0 0 150 150"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="75" cy="75" r="70" />
        <circle cx="75" cy="75" r="48" />
        <circle cx="75" cy="75" r="26" />
        <path d="M75 0V150" />
        <path d="M0 75H150" />
      </svg>
    );
  }

  if (n === "02") {
    return (
      <svg
        className="pjdev-why__deco pjdev-why__deco--route"
        viewBox="0 0 150 150"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 140C10 90 60 100 70 60S130 40 140 10" />
        <circle cx="10" cy="140" r="5" />
        <circle cx="70" cy="60" r="5" />
        <circle cx="140" cy="10" r="5" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentWhy() {
  const [inView, setInView] = useState(false);
  const gridRef = useRef(null);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const element = gridRef.current;

    if (!element) {
      return undefined;
    }

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      setInView(true);
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.15,
          rootMargin:
            "0px 0px -5% 0px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="pjdev-why"
      className="pjdev-why"
      aria-labelledby="pjdev-why-title"
    >
      <div className="pjdev-why__wrap">

        {/* =================================================
            HEADER
        ================================================= */}

        <DevelopmentSectionHead
          id="pjdev-why-title"
          title="Why Build With ProJenius?"
        />

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          ref={gridRef}
          className={`pjdev-why__grid${
            inView
              ? " pjdev-why__grid--in"
              : ""
          }`}
        >
          {REASONS.map(
            (reason, index) => (
              <article
                key={reason.n}
                className={[
                  "pjdev-why__card",
                  `pjdev-why__card--${index + 1}`,
                  index % 2 === 1
                    ? "pjdev-why__card--offset"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Decorative graphic */}
                <Deco n={reason.n} />

                {/* Icon */}
                <div className="pjdev-why__icon-wrap">
                  <DevelopmentIcon
                    name={reason.icon}
                    className="pjdev-why__icon"
                  />
                </div>

                {/* Content */}
                <div className="pjdev-why__content">
                  <span className="pjdev-why__num">
                    {reason.n}
                  </span>

                  <h3 className="pjdev-why__title">
                    {reason.title}
                  </h3>

                  <p className="pjdev-why__text">
                    {reason.text}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}