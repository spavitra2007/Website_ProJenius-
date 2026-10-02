import { useCallback, useEffect, useRef, useState } from "react";
import "./DevelopmentApproach.css";
import DevelopmentEyebrow from "../DevelopmentEyebrow/DevelopmentEyebrow";

const AUTO_HOVER_DELAY = 5000;

function usePjdevInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      {
        threshold,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const BLOCKS = [
  {
    num: "01",
    title: "Business goal",
    question: "What are you trying to achieve?",
    points: [
      "The outcome that defines success",
      "The priorities that matter most",
      "How the solution supports the business",
    ],
  },
  {
    num: "02",
    title: "User need",
    question: "Who will use the solution and what should their experience be?",
    points: [
      "Who the users really are",
      "What they need to get done",
      "Where the experience should feel effortless",
    ],
  },
  {
    num: "03",
    title: "Business constraints",
    question: "Budget, timeline, resources and existing systems.",
    points: [
      "Budget and delivery timeline",
      "Team and resources available",
      "Systems you already rely on",
    ],
  },
  {
    num: "04",
    title: "Future growth",
    question: "How should the solution evolve as the business grows?",
    points: [
      "New features and more users over time",
      "Integrations you may need later",
      "A foundation that can scale",
    ],
  },
];

const FLOW = [
  { title: "Requirement", sub: "What you bring us" },
  { title: "Understanding", sub: "Goals, users, constraints" },
  { title: "Strategy", sub: "The approach that fits" },
  { title: "Right solution", sub: "Shaped around your need" },
];

const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 901px)").matches;

export default function DevelopmentApproach() {
  const [active, setActive] = useState(0);
  const [ref, inView] = usePjdevInView();
  const autoHoverRef = useRef(null);
  const userHoverRef = useRef(false);

  const activateNext = useCallback(() => {
    setActive((current) => (current + 1) % BLOCKS.length);
  }, []);

  useEffect(() => {
    if (!inView) return undefined;

    autoHoverRef.current = window.setInterval(() => {
      if (!userHoverRef.current) activateNext();
    }, AUTO_HOVER_DELAY);

    return () => {
      if (autoHoverRef.current !== null) {
        window.clearInterval(autoHoverRef.current);
        autoHoverRef.current = null;
      }
    };
  }, [inView, activateNext]);

  const handleCardEnter = (index, event) => {
    if (!isDesktop() || event.pointerType !== "mouse") return;
    userHoverRef.current = true;
    setActive(index);
  };

  const handleCardLeave = () => {
    userHoverRef.current = false;
  };

  const handleFlowHover = (index) => {
    if (isDesktop()) setActive(index);
  };

  return (
    <section
      id="pjdev-approach"
      ref={ref}
      className={`pjdev-approach pjdev-theme-dark${
        inView ? " pjdev-approach--in" : ""
      }`}
      aria-labelledby="pjdev-approach-title"
    >
      <div className="pjdev-approach__wrap">
        <div className="pjdev-approach__rv">
          <DevelopmentEyebrow>Our approach</DevelopmentEyebrow>
        </div>

        <h2
          id="pjdev-approach-title"
          className="pjdev-approach__title pjdev-approach__rv pjdev-approach__rv--d1"
        >
          We Don't Start With Technology.
        </h2>

        <p className="pjdev-approach__claim pjdev-approach__rv pjdev-approach__rv--d2">
          We Start With the Problem.
        </p>

        <p className="pjdev-approach__lead pjdev-approach__rv pjdev-approach__rv--d3">
          Before choosing a platform, architecture or development approach, we
          understand what you are trying to achieve, who you are building for
          and what constraints matter.
        </p>

        <div
          className="pjdev-approach__blocks pjdev-approach__rv pjdev-approach__rv--d3"
          onPointerLeave={handleCardLeave}
        >
          {BLOCKS.map((block, index) => {
            const isActive = active === index;

            return (
              <article
                key={block.num}
                className={`pjdev-approach__block${
                  isActive ? " pjdev-approach__block--active" : ""
                }`}
                onPointerEnter={(event) => handleCardEnter(index, event)}
              >
                <button
                  type="button"
                  className="pjdev-approach__block-head"
                  aria-expanded={isActive}
                  aria-controls={`pjdev-approach-panel-${index}`}
                  onClick={() => setActive(index)}
                >
                  <span className="pjdev-approach__block-num">{block.num}</span>
                  <span className="pjdev-approach__block-title">
                    {block.title}
                  </span>
                  <span className="pjdev-approach__block-q">
                    {block.question}
                  </span>
                </button>

                <div
                  id={`pjdev-approach-panel-${index}`}
                  className="pjdev-approach__panel"
                >
                  <ul className="pjdev-approach__points">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pjdev-approach__band">
          <p className="pjdev-approach__band-caption">
            Every project moves along the same path, from what you asked for to
            what you actually need.
          </p>

          <div
            className="pjdev-approach__flow"
            aria-label="From requirement to the right solution"
          >
            <div className="pjdev-approach__flow-line" aria-hidden="true">
              <span
                className="pjdev-approach__flow-progress"
                style={{
                  width: `${(active / (FLOW.length - 1)) * 100}%`,
                }}
              />
            </div>

            {FLOW.map((item, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  className={`pjdev-approach__flow-step${
                    isActive ? " pjdev-approach__flow-step--active" : ""
                  }`}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => handleFlowHover(index)}
                >
                  <span className="pjdev-approach__flow-node">
                    <span />
                  </span>
                  <span className="pjdev-approach__flow-title">
                    {item.title}
                  </span>
                  <span className="pjdev-approach__flow-sub">{item.sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
