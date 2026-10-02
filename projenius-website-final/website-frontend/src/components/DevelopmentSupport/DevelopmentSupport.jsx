import { useEffect, useRef, useState } from "react";
import "./DevelopmentSupport.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

/* =========================================================
   POST-LAUNCH JOURNEY
========================================================= */

const TRACK = [
  "Build",
  "Launch",
  "Monitor",
  "Maintain",
  "Improve",
  "Grow",
];

/* =========================================================
   SUPPORT AREAS
========================================================= */

const ITEMS = [
  {
    icon: "content",
    title: "Content updates",
    text: "Keep pages, copy and media current.",
  },
  {
    icon: "bug",
    title: "Bug fixes",
    text: "Resolve issues quickly and safely.",
  },
  {
    icon: "perf",
    title: "Performance improvements",
    text: "Stay fast as usage grows.",
  },
  {
    icon: "feature",
    title: "Feature enhancements",
    text: "Add what your users need next.",
  },
  {
    icon: "uiux",
    title: "UI / UX improvements",
    text: "Refine flows based on real use.",
  },
  {
    icon: "support",
    title: "Technical support",
    text: "Help when you need it.",
  },
  {
    icon: "shield",
    title: "Security / component updates",
    text: "Keep protections and components current.",
  },
  {
    icon: "review",
    title: "Periodic digital reviews",
    text: "Regular check-ins on how the product is doing.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentSupport() {
  const [inView, setInView] = useState(false);
  const [activeTrack, setActiveTrack] = useState(5);

  const sectionRef = useRef(null);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return undefined;
    }

    if (
      typeof IntersectionObserver ===
      "undefined"
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
          threshold: 0.12,
          rootMargin: "0px 0px -5% 0px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     TRACK AUTO ANIMATION
  ======================================================= */

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduced) {
      setActiveTrack(
        TRACK.length - 1
      );
      return undefined;
    }

    const timer =
      window.setInterval(() => {
        setActiveTrack(
          (current) =>
            (current + 1) % TRACK.length
        );
      }, 1400);

    return () =>
      window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="pjdev-support"
      className={`pjdev-support${
        inView
          ? " pjdev-support--in"
          : ""
      }`}
      aria-labelledby="pjdev-support-title"
    >
      <div className="pjdev-support__wrap">

        {/* =================================================
            HEADER
        ================================================= */}

        <DevelopmentSectionHead
          id="pjdev-support-title"
          title="Launching Is Not the End."
          text="We can continue supporting your digital product beyond the initial launch, helping you maintain, improve and adapt it as your needs change."
        />

        {/* =================================================
            JOURNEY CARD
        ================================================= */}

        <div
          className="
            pjdev-support__journey
          "
          aria-label="Post-launch journey"
        >

          <div className="pjdev-support__journey-line">
            <span
              className="pjdev-support__journey-progress"
              style={{
                width: `${
                  activeTrack === 0
                    ? 0
                    : (
                        activeTrack /
                        (TRACK.length - 1)
                      ) * 100
                }%`,
              }}
            />
          </div>

          <div className="pjdev-support__track">

            {TRACK.map(
              (title, index) => (
                <button
                  key={title}
                  type="button"
                  className={`pjdev-support__track-item${
                    index === activeTrack
                      ? " pjdev-support__track-item--active"
                      : ""
                  }${
                    index < activeTrack
                      ? " pjdev-support__track-item--done"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrack(index)
                  }
                  onMouseEnter={() =>
                    setActiveTrack(index)
                  }
                  aria-pressed={
                    index === activeTrack
                  }
                >
                  <span className="pjdev-support__track-dot" />

                  <span className="pjdev-support__track-title">
                    {title}
                  </span>
                </button>
              )
            )}

          </div>
        </div>

        {/* =================================================
            SUPPORT GRID
        ================================================= */}

        <div className="pjdev-support__grid">
          {ITEMS.map(
            (item, index) => (
              <article
                key={item.title}
                className="pjdev-support__item"
                style={{
                  "--pjdev-support-delay": `${
                    index * 0.07
                  }s`,
                }}
              >
                <DevelopmentIcon
                  name={item.icon}
                  className="pjdev-support__icon"
                />

                <h3 className="pjdev-support__item-title">
                  {item.title}
                </h3>

                <p className="pjdev-support__item-text">
                  {item.text}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}