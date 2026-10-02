import { useEffect, useRef, useState } from "react";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentButton from "../DevelopmentButton/DevelopmentButton";

import DevelopmentMockScreen, {
  MockBefore,
  MockAfter,
} from "../DevelopmentMockScreen/DevelopmentMockScreen";

import "./DevelopmentPathways.css";

/* =========================================================
   CONFIG
========================================================= */

const CONTACT_HREF = "/contact";

/* =========================================================
   SCROLL REVEAL
========================================================= */

function usePjdevInView(threshold = 0.15) {
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
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
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

/* =========================================================
   REDUCED MOTION
========================================================= */

function usePjdevReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return false;
    }

    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = () => {
      setReduced(media.matches);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  return reduced;
}

/* =========================================================
   CONTENT
========================================================= */

const NEW_TAGS = [
  "New digital products",
  "New websites",
  "New applications",
  "SaaS ideas",
  "Business platforms",
  "AI-powered products",
  "Automation systems",
];

const IMPROVE_TAGS = [
  "Existing websites",
  "Existing applications",
  "UI/UX problems",
  "Performance issues",
  "Feature improvements",
  "Digital transformation",
  "Product modernization",
];

const STEPS = [
  "Existing interface",
  "Audit",
  "Improvement",
  "Optimized interface",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentPathways() {
  const reduced = usePjdevReducedMotion();

  const [newRef, newInView] =
    usePjdevInView(0.25);

  const [improveRef, improveInView] =
    usePjdevInView(0.25);

  const [mergeRef, mergeInView] =
    usePjdevInView(0.2);

  const [newRun, setNewRun] = useState(0);
  const [improveRun, setImproveRun] =
    useState(0);

  const [litSteps, setLitSteps] =
    useState(0);

  const lastNewRun = useRef(0);
  const lastImproveRun = useRef(0);
  const timersRef = useRef([]);

  /* =======================================================
     PLAY BUILD ANIMATION
  ======================================================= */

  const playNew = () => {
    lastNewRun.current = Date.now();

    setNewRun((value) => value + 1);
  };

  /* =======================================================
     PLAY IMPROVE ANIMATION
  ======================================================= */

  const playImprove = () => {
    lastImproveRun.current = Date.now();

    setImproveRun(
      (value) => value + 1
    );
  };

  /* =======================================================
     INITIAL PLAY
  ======================================================= */

  useEffect(() => {
    if (newInView) {
      playNew();
    }
  }, [newInView]);

  useEffect(() => {
    if (improveInView) {
      playImprove();
    }
  }, [improveInView]);

  /* =======================================================
     IMPROVEMENT STEP ANIMATION
  ======================================================= */

  useEffect(() => {
    timersRef.current.forEach(
      (timer) => clearTimeout(timer)
    );

    timersRef.current = [];

    if (!improveRun) return undefined;

    if (reduced) {
      setLitSteps(STEPS.length);
      return undefined;
    }

    setLitSteps(0);

    STEPS.forEach((_, index) => {
      const timer = window.setTimeout(
        () => {
          setLitSteps(index + 1);
        },
        350 + index * 700
      );

      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(
        (timer) => clearTimeout(timer)
      );

      timersRef.current = [];
    };
  }, [improveRun, reduced]);

  /* =======================================================
     HOVER REPLAY
  ======================================================= */

  const handleHoverReplay = (
    event,
    lastRun,
    play
  ) => {
    if (
      event.pointerType !== "mouse"
    ) {
      return;
    }

    if (
      Date.now() - lastRun.current >
      4500
    ) {
      play();
    }
  };

  return (
    <section
      id="pjdev-pathways"
      className="pjdev-pathways"
      aria-labelledby="pjdev-pathways-title"
    >
      <div className="pjdev-pathways__wrap">

        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <DevelopmentSectionHead
          id="pjdev-pathways-title"
          title="Wherever You Are, We Can Start."
          text="A blank page or a product that's already live: either way, the journey begins with your requirement."
        />

        {/* =================================================
            PATHWAY CARDS
        ================================================= */}

        <div className="pjdev-pathways__grid">

          {/* ===============================================
              NEW PRODUCT
          =============================================== */}

          <article
            ref={newRef}
            className={`pjdev-pathways__card pjdev-pathways__card--new${
              newInView
                ? " pjdev-pathways__card--in"
                : ""
            }`}
            onPointerEnter={(event) =>
              handleHoverReplay(
                event,
                lastNewRun,
                playNew
              )
            }
          >
            {/* VISUAL */}

            <div
              className="pjdev-pathways__visual"
              aria-hidden="true"
            >
              <DevelopmentMockScreen
                key={`new-${newRun}`}
                className={`pjdev-pathways__mock pjdev-pathways__build${
                  newRun || reduced
                    ? " pjdev-pathways__build--play"
                    : ""
                }`}
              >
                <div className="pjdev-pathways__blank">
                  <span>
                    <i>+</i>
                    Blank canvas
                  </span>
                </div>

                <MockAfter />
              </DevelopmentMockScreen>
            </div>

            {/* LABEL */}

            <div className="pjdev-pathways__card-copy">
              <p className="pjdev-pathways__kicker">
                Starting from scratch
              </p>

              <h3 className="pjdev-pathways__card-title">
                Build Something New
              </h3>
            </div>

            {/* TAGS */}

            <ul
              className="pjdev-pathways__tags"
              aria-label="Best for"
            >
              {NEW_TAGS.map(
                (tag) => (
                  <li key={tag}>
                    {tag}
                  </li>
                )
              )}
            </ul>

            {/* CTA */}

            <div className="pjdev-pathways__cta-wrap">
              <DevelopmentButton
                href={CONTACT_HREF}
              >
                Build Something New
              </DevelopmentButton>
            </div>
          </article>

          {/* ===============================================
              IMPROVE EXISTING
          =============================================== */}

          <article
            ref={improveRef}
            className={`pjdev-pathways__card pjdev-pathways__card--improve${
              improveInView
                ? " pjdev-pathways__card--in"
                : ""
            }`}
            onPointerEnter={(event) =>
              handleHoverReplay(
                event,
                lastImproveRun,
                playImprove
              )
            }
          >
            <div>

              {/* VISUAL */}

              <div
                className="pjdev-pathways__visual"
                aria-hidden="true"
              >
                <DevelopmentMockScreen
                  key={`improve-${improveRun}`}
                  className={`pjdev-pathways__mock pjdev-pathways__scan${
                    improveRun || reduced
                      ? " pjdev-pathways__scan--play"
                      : ""
                  }`}
                >
                  <MockBefore />
                  <MockAfter />

                  <div className="pjdev-pathways__scanline" />
                </DevelopmentMockScreen>
              </div>

              {/* STEP CHIPS */}

              <ol
                className="pjdev-pathways__steps"
                aria-label="How an improvement works"
              >
                {STEPS.map(
                  (step, index) => {
                    const isLit =
                      index < litSteps;

                    const isLast =
                      index ===
                      STEPS.length - 1;

                    return (
                      <li
                        key={step}
                        className={`pjdev-pathways__step${
                          isLit
                            ? " pjdev-pathways__step--lit"
                            : ""
                        }${
                          isLit && isLast
                            ? " pjdev-pathways__step--complete"
                            : ""
                        }`}
                      >
                        {step}
                      </li>
                    );
                  }
                )}
              </ol>
            </div>

            {/* LABEL */}

            <div className="pjdev-pathways__card-copy">
              <p className="pjdev-pathways__kicker">
                Already live
              </p>

              <h3 className="pjdev-pathways__card-title">
                Improve Something Existing
              </h3>
            </div>

            {/* TAGS */}

            <ul
              className="pjdev-pathways__tags"
              aria-label="Best for"
            >
              {IMPROVE_TAGS.map(
                (tag) => (
                  <li key={tag}>
                    {tag}
                  </li>
                )
              )}
            </ul>

            {/* CTA */}

            <div className="pjdev-pathways__cta-wrap">
              <DevelopmentButton
                href={CONTACT_HREF}
                variant="light"
              >
                Improve My Product
              </DevelopmentButton>
            </div>
          </article>
        </div>

        {/* =================================================
            MERGE
        ================================================= */}

        <div
          ref={mergeRef}
          className={`pjdev-pathways__merge${
            mergeInView
              ? " pjdev-pathways__merge--in"
              : ""
          }`}
          aria-label="Both pathways lead into the ProJenius development journey"
        >
          <div className="pjdev-pathways__merge-labels">
            <span className="pjdev-pathways__merge-left">
              New build
            </span>

            <span className="pjdev-pathways__merge-or">
              or
            </span>

            <span className="pjdev-pathways__merge-right">
              Existing product
            </span>
          </div>

          <svg
            className="pjdev-pathways__merge-svg"
            viewBox="0 0 100 42"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="pjdevPathwaysGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#1D5CFF"
                />

                <stop
                  offset="100%"
                  stopColor="#12C9E0"
                />
              </linearGradient>
            </defs>

            <path
              d="M28 0 C28 22 45 19 53 42"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M78 0 C78 22 61 19 53 42"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="pjdev-pathways__merge-pill">
            <span />
            <span>
              ProJenius Development Journey
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}