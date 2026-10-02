import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { PATHS } from "./StartupSupportData.js";
import { pad } from "./StartupSupportUtils.js";
import { useInView } from "./StartupSupportHooks.js";
import "./StartupSupportPaths.css";

const AUTO_DELAY = 5000;

/* =========================================================
   STARTUP SUPPORT PATHS
========================================================= */

function StartupSupportPaths() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ideaRef = useRef(null);
  const optionRefs = useRef([]);

  const timerRef = useRef(null);
  const hoverRef = useRef(false);

  const [active, setActive] = useState(0);
  const [lineDs, setLineDs] = useState([]);
  const [svgSize, setSvgSize] = useState({
    width: 0,
    height: 0,
  });

  const [playKey, setPlayKey] = useState(0);
  const [litUpTo, setLitUpTo] = useState(-1);

  const inView = useInView(sectionRef, {
    threshold: 0.1,
  });

  /* =========================================================
     LINE CALCULATION
  ========================================================= */

  const calculateLines = useCallback(() => {
    const stage = stageRef.current;
    const idea = ideaRef.current;

    if (!stage || !idea) {
      return;
    }

    const stageRect =
      stage.getBoundingClientRect();

    const ideaRect =
      idea.getBoundingClientRect();

    setSvgSize({
      width: stageRect.width,
      height: stageRect.height,
    });

    const isMobile =
      window.innerWidth <= 767;

    /* =======================================================
       MOBILE
       
       Idea is centered above list.
       Lines stay outside the content area.
    ======================================================= */

    if (isMobile) {
      const startX =
        ideaRect.right -
        stageRect.left -
        10;

      const startY =
        ideaRect.bottom -
        stageRect.top;

      const paths =
        optionRefs.current.map(
          (option) => {
            if (!option) {
              return "";
            }

            const rect =
              option.getBoundingClientRect();

            const endX =
              rect.right -
              stageRect.left -
              8;

            const endY =
              rect.top +
              rect.height / 2 -
              stageRect.top;

            const outerX =
              stageRect.width - 14;

            return `
              M ${startX} ${startY}
              C
                ${outerX} ${startY + 10},
                ${outerX} ${endY},
                ${endX} ${endY}
            `;
          }
        );

      setLineDs(paths);

      return;
    }

    /* =======================================================
       DESKTOP / TABLET
       
       Idea is left.
       Paths fan toward the right.
    ======================================================= */

    const startX =
      ideaRect.right -
      stageRect.left;

    const startY =
      ideaRect.top +
      ideaRect.height / 2 -
      stageRect.top;

    const paths =
      optionRefs.current.map(
        (option) => {
          if (!option) {
            return "";
          }

          const rect =
            option.getBoundingClientRect();

          const endX =
            rect.left -
            stageRect.left;

          const endY =
            rect.top +
            rect.height / 2 -
            stageRect.top;

          const distance =
            endX - startX;

          const curve =
            Math.max(
              45,
              distance * 0.48
            );

          return `
            M ${startX} ${startY}
            C
              ${startX + curve} ${startY},
              ${endX - curve} ${endY},
              ${endX} ${endY}
          `;
        }
      );

    setLineDs(paths);
  }, []);

  /* =========================================================
     RESIZE / INITIAL CALCULATION
  ========================================================= */

  useEffect(() => {
    let resizeFrame = null;

    const update = () => {
      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(
        calculateLines
      );
    };

    update();

    window.addEventListener(
      "resize",
      update
    );

    const observer =
      typeof ResizeObserver !==
      "undefined"
        ? new ResizeObserver(update)
        : null;

    if (
      stageRef.current &&
      observer
    ) {
      observer.observe(
        stageRef.current
      );
    }

    if (
      document.fonts &&
      document.fonts.ready
    ) {
      document.fonts.ready.then(update);
    }

    return () => {
      if (resizeFrame) {
        cancelAnimationFrame(
          resizeFrame
        );
      }

      window.removeEventListener(
        "resize",
        update
      );

      observer?.disconnect();
    };
  }, [calculateLines]);

  /* =========================================================
     EXAMPLE JOURNEY ANIMATION
  ========================================================= */

  useEffect(() => {
    const currentPath =
      PATHS[active];

    if (!currentPath) {
      return;
    }

    setLitUpTo(-1);

    const timers = [];

    currentPath.steps.forEach(
      (_, index) => {
        timers.push(
          setTimeout(
            () => {
              setLitUpTo(index);
            },
            index * 280 + 60
          )
        );
      }
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, playKey]);

  /* =========================================================
     TIMER
  ========================================================= */

  const clearAutoTimer =
    useCallback(() => {
      if (timerRef.current) {
        clearTimeout(
          timerRef.current
        );

        timerRef.current = null;
      }
    }, []);

  const startAutoTimer =
    useCallback(() => {
      clearAutoTimer();

      if (
        hoverRef.current ||
        !PATHS.length
      ) {
        return;
      }

      timerRef.current =
        setTimeout(() => {
          if (hoverRef.current) {
            return;
          }

          setActive((current) =>
            current >=
            PATHS.length - 1
              ? 0
              : current + 1
          );

          setPlayKey(
            (key) => key + 1
          );
        }, AUTO_DELAY);
    }, [clearAutoTimer]);

  /* =========================================================
     START AUTO PLAY WHEN IN VIEW
  ========================================================= */

  useEffect(() => {
    if (!inView) {
      return;
    }

    startAutoTimer();

    return () => {
      clearAutoTimer();
    };
  }, [
    inView,
    active,
    startAutoTimer,
    clearAutoTimer,
  ]);

  /* =========================================================
     HOVER
  ========================================================= */

  const handleMouseEnter = (index) => {
    hoverRef.current = true;

    clearAutoTimer();

    setActive(index);

    setPlayKey(
      (key) => key + 1
    );
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;

    /*
      After release, wait a full 5 seconds,
      then move to the NEXT path.
    */
    startAutoTimer();
  };

  /* =========================================================
     CLICK
  ========================================================= */

  const handleClick = (index) => {
    setActive(index);

    setPlayKey(
      (key) => key + 1
    );

    /*
      If not hovering, restart the
      5-second countdown.
    */
    if (!hoverRef.current) {
      startAutoTimer();
    }
  };

  /* =========================================================
     CURRENT PATH
  ========================================================= */

  const currentPath =
    PATHS[active];

  if (!currentPath) {
    return null;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="ssp-section ssp-section--light"
      id="ssp-paths"
      aria-labelledby="ssp-paths-heading"
      ref={sectionRef}
    >
      <div className="ssp-wrap">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className={`ssp-section-head ssp-reveal${
            inView
              ? " ssp-reveal--in"
              : ""
          }`}
        >
          <p className="ssp-eyebrow">
            Technology pathways
          </p>

          <h2
            className="ssp-title"
            id="ssp-paths-heading"
          >
            Your Idea Determines the Path.
          </h2>

          <p className="ssp-lede">
            Different ideas require different
            combinations of technology, validation
            and support. Pick a direction to see
            an example route.
          </p>
        </div>

        {/* ===================================================
            PATH MAP
        =================================================== */}

        <div
          className={`ssp-paths-wrap ssp-reveal${
            inView
              ? " ssp-reveal--in"
              : ""
          }`}
        >

          <div
            className="ssp-paths-stage"
            ref={stageRef}
          >

            {/* =================================================
                YOUR IDEA
            ================================================= */}

            <div
              className="ssp-paths-idea"
              ref={ideaRef}
            >
              <strong>
                YOUR IDEA
              </strong>

              <small>
                Where every path begins
              </small>
            </div>

            {/* =================================================
                CONNECTOR LINES
            ================================================= */}

            <svg
              className="ssp-paths-lines"
              viewBox={`0 0 ${
                svgSize.width || 1
              } ${
                svgSize.height || 1
              }`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {PATHS.map(
                (path, index) => (
                  <path
                    key={path.key}
                    className={`ssp-paths-line${
                      index === active
                        ? " ssp-paths-line--on"
                        : ""
                    }`}
                    d={
                      lineDs[index] || ""
                    }
                  />
                )
              )}
            </svg>

            {/* =================================================
                PATH OPTIONS
            ================================================= */}

            <div
              className="ssp-paths-opts"
              role="group"
              aria-label="Choose a technology path"
            >
              {PATHS.map(
                (path, index) => {
                  const isActive =
                    index === active;

                  return (
                    <button
                      key={path.key}
                      type="button"
                      ref={(element) => {
                        optionRefs.current[
                          index
                        ] = element;
                      }}
                      className={`ssp-paths-opt${
                        isActive
                          ? " ssp-paths-opt--active"
                          : ""
                      }`}
                      aria-pressed={
                        isActive
                      }
                      onMouseEnter={() =>
                        handleMouseEnter(
                          index
                        )
                      }
                      onMouseLeave={
                        handleMouseLeave
                      }
                      onClick={() =>
                        handleClick(
                          index
                        )
                      }
                    >

                      <span className="ssp-paths-opt-n">
                        {pad(index + 1)}
                      </span>

                      <span className="ssp-paths-opt-content">
                        <span className="ssp-paths-opt-k">
                          {path.key}
                        </span>

                        <span className="ssp-paths-opt-s">
                          {path.sub}
                        </span>
                      </span>

                      <span
                        className="ssp-paths-opt-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>

                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* ===================================================
              EXAMPLE JOURNEY
          =================================================== */}

          <div
            className="ssp-paths-route"
            aria-live="polite"
          >
            <div className="ssp-paths-route-head">

              <div>
                <p className="ssp-mini-label">
                  Example journey
                </p>

                <h3>
                  {currentPath.key}
                </h3>
              </div>

              <p>
                {currentPath.note}
              </p>

            </div>

            <ol
              className="ssp-paths-route-list"
              aria-label={`${currentPath.key} example journey`}
              key={playKey}
            >
              {currentPath.steps.map(
                (step, index) => {
                  const isLast =
                    index ===
                    currentPath.steps.length -
                      1;

                  const isOn =
                    index <= litUpTo;

                  return (
                    <li
                      key={step}
                      className={`ssp-paths-route-item${
                        isLast
                          ? " ssp-paths-route-item--last"
                          : ""
                      }`}
                    >
                      <span
                        className={`ssp-paths-route-node${
                          isOn
                            ? " ssp-paths-route-node--on"
                            : ""
                        }`}
                      />

                      {!isLast && (
                        <span
                          className={`ssp-paths-route-connector${
                            index < litUpTo
                              ? " ssp-paths-route-connector--on"
                              : ""
                          }`}
                        />
                      )}

                      <span className="ssp-paths-route-num">
                        {pad(index + 1)}
                      </span>

                      <span
                        className={`ssp-paths-route-text${
                          isOn
                            ? " ssp-paths-route-text--on"
                            : ""
                        }`}
                      >
                        {step}
                      </span>
                    </li>
                  );
                }
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportPaths;