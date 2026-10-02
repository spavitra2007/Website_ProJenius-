import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Cpu,
  GraduationCap,
  Rocket,
  Target,
  Lightbulb,
} from "lucide-react";
import "./OurJourney.css";

const JOURNEY_DATA = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "ProJenius was founded with a vision to bridge the gap between academic ideas and real-world technology solutions.",
    icon: Sparkles,
  },
  {
    year: "2020",
    title: "First Products & Prototypes",
    description:
      "Built and delivered initial IoT and embedded product prototypes, establishing our hands-on engineering approach.",
    icon: Cpu,
  },
  {
    year: "2021",
    title: "Workshops & Training Programs",
    description:
      "Launched workshops and internship programs to mentor students and aspiring engineers in technology and innovation.",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "Startup Support & Patent Assistance",
    description:
      "Expanded into startup support, helping founders with product development, prototyping, and patent-related guidance.",
    icon: Target,
  },
  {
    year: "2023",
    title: "Ecosystem Expansion",
    description:
      "Built a broader innovation ecosystem connecting academia, startups, and industry across technology and product domains.",
    icon: Lightbulb,
  },
  {
    year: "2024",
    title: "Building the Future",
    description:
      "Continuing to scale our impact — building products, mentoring innovators, and expanding our technology ecosystem.",
    icon: Rocket,
  },
];

function JourneyCard({ item, index, active, onHover, onLeave, cardRef }) {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      className={[
        "journey-card-wrap",
        isLeft ? "journey-card-left" : "journey-card-right",
        active ? "journey-card-active" : "",
      ].join(" ")}
      data-index={index}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <div className="journey-card">
        <div className="journey-card-top">
          <span className="journey-year">{item.year}</span>
        </div>

        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <span className="journey-hover-line" aria-hidden="true" />
      </div>

      <div className="journey-card-connector" aria-hidden="true" />

      <div className="journey-node" aria-hidden="true">
        <Icon size={18} strokeWidth={1.9} />
      </div>
    </article>
  );
}

export default function OurJourney() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;

      /*
       * The blue line follows the user's actual page scroll.
       * It does NOT run by itself. If scrolling stops, this value stops.
       */
      const travelDistance = Math.max(
        sectionHeight - viewportHeight * 0.32,
        1
      );

      const currentTravel =
        window.scrollY + viewportHeight * 0.58 - sectionTop;

      const progress = Math.min(
        1,
        Math.max(0, currentTravel / travelDistance)
      );

      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.48) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.48)
          );

        if (visible.length) {
          const index = Number(visible[0].target.dataset.index);
          setActiveIndex(index);
        }
      },
      {
        threshold: 0.42,
        rootMargin: "-12% 0px -38% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="our-journey-section"
      aria-labelledby="our-journey-title"
    >
      <div className="our-journey-container">
        <header className="our-journey-header">
          <span className="journey-eyebrow">OUR STORY</span>

          <h2 id="our-journey-title">
            Our <span>Journey</span>
          </h2>

          <p>
            From a bold idea to a growing innovation ecosystem — every milestone
            has shaped who
            <br className="journey-desktop-break" />
            we are.
          </p>
        </header>

        <div className="journey-timeline">
          <div className="journey-axis" aria-hidden="true" />

          <div
            className="journey-axis-progress"
            aria-hidden="true"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          <div className="journey-items">
            {JOURNEY_DATA.map((item, index) => (
              <JourneyCard
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
                active={activeIndex === index}
                onHover={setActiveIndex}
                onLeave={() => setActiveIndex(-1)}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}