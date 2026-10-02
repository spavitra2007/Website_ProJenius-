import { useEffect, useMemo, useRef, useState } from 'react';
import {
  WorkshopSectionHead,
  WorkshopLink,
  workshopHref,
  useInView,
} from './WorkshopShared';

import './WorkshopNextStep.css';

/* =====================================================================
   CONTENT
===================================================================== */

const WORKSHOP_PATH = [
  {
    title: 'Workshop',
    sub: 'You are here',
    route: 'workshop',
  },
  {
    title: 'Explore',
    sub: 'Try new technologies',
  },
  {
    title: 'Learn',
    sub: 'Courses',
    route: 'courses',
  },
  {
    title: 'Build a project',
    sub: 'Development',
    route: 'development',
  },
  {
    title: 'Internship',
    sub: 'Internship programs',
    route: 'internship',
  },
];

const WORKSHOP_PATH_FORK = [
  {
    title: 'Career',
    sub: 'Career guidance',
    route: 'careerGuidance',
    pos: 'top',
  },
  {
    title: 'Startup',
    sub: 'Startup support',
    route: 'startupSupport',
    pos: 'bottom',
  },
];

/*
  Complete sequence:

  0 Workshop
  1 Explore
  2 Learn
  3 Build a project
  4 Internship
  5 Career
  6 Startup
*/

const AUTO_STEP_MS = 5000;

/* =====================================================================
   STOP
===================================================================== */

function Stop({
  item,
  className,
  active,
  onMouseEnter,
  onMouseLeave,
  index,
}) {
  const inner = (
    <>
      <span
        className="pjw-next__node"
        aria-hidden="true"
      />

      <span className="pjw-next__label">
        <strong>{item.title}</strong>
        <small>{item.sub}</small>
      </span>
    </>
  );

  const commonProps = {
    className,
    onMouseEnter: () => onMouseEnter(index),
    onMouseLeave,
    'aria-current': active ? 'step' : undefined,
  };

  if (item.route) {
    return (
      <WorkshopLink
        to={workshopHref(item.route)}
        {...commonProps}
      >
        {inner}
      </WorkshopLink>
    );
  }

  return (
    <div {...commonProps}>
      {inner}
    </div>
  );
}

/* =====================================================================
   WORKSHOP NEXT STEP
===================================================================== */

export default function WorkshopNextStep() {
  const [ref, seen] = useInView({
    threshold: 0.35,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const timerRef = useRef(null);

  /*
    Flatten the sequence so the auto-play logic
    has exactly one continuous order.
  */
  const sequence = useMemo(
    () => [
      ...WORKSHOP_PATH,
      ...WORKSHOP_PATH_FORK,
    ],
    []
  );

  /* ===============================================================
     AUTO PLAY
  =============================================================== */

  useEffect(() => {
    if (!seen || sequence.length === 0) {
      return undefined;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((current) => {
        return current >= sequence.length - 1
          ? 0
          : current + 1;
      });
    }, AUTO_STEP_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [seen, sequence.length]);

  /* ===============================================================
     POINTER INTERACTION
     
     Hovering pauses on that exact step.
     Leaving allows the normal 5-second sequence to continue.
  =============================================================== */

  const handleMouseEnter = (index) => {
    setActiveIndex(index);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!seen || sequence.length === 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((current) => {
        return current >= sequence.length - 1
          ? 0
          : current + 1;
      });
    }, AUTO_STEP_MS);
  };

  return (
    <section
      className="pjw-sec"
      id="pjw-next"
      aria-labelledby="pjw-next-title"
    >
      <div className="pjw-wrap">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <WorkshopSectionHead
          titleId="pjw-next-title"
          title="One Workshop Can Be the Beginning."
          text="A workshop can be the first step toward deeper learning, project development, internships, career exploration, or innovation."
        />

        {/* =========================================================
            PATHWAY
        ========================================================= */}

        <ol
          ref={ref}
          className={`pjw-next${
            seen
              ? ' pjw-next--on'
              : ''
          }`}
        >

          {/* =======================================================
              MAIN PATH
          ======================================================= */}

          {WORKSHOP_PATH.map(
            (item, index) => (
              <li
                key={item.title}
                className={`
                  pjw-next__station
                  pjw-next__d-${index}
                  ${
                    activeIndex === index
                      ? 'pjw-next__station--active'
                      : ''
                  }
                  ${
                    item === WORKSHOP_PATH[0]
                      ? 'pjw-next__station--first'
                      : ''
                  }
                  ${
                    index ===
                    WORKSHOP_PATH.length - 1
                      ? 'pjw-next__station--last'
                      : ''
                  }
                `}
              >
                <Stop
                  item={item}
                  index={index}
                  active={
                    activeIndex === index
                  }
                  className="pjw-next__stop"
                  onMouseEnter={
                    handleMouseEnter
                  }
                  onMouseLeave={
                    handleMouseLeave
                  }
                />
              </li>
            )
          )}

          {/* =======================================================
              CAREER + STARTUP FORK
          ======================================================= */}

          <li
            className={`
              pjw-next__fork
              pjw-next__d-5
              ${
                activeIndex >= 5
                  ? 'pjw-next__fork--active'
                  : ''
              }
            `}
          >
            {WORKSHOP_PATH_FORK.map(
              (item, branchIndex) => {
                const index =
                  WORKSHOP_PATH.length +
                  branchIndex;

                return (
                  <Stop
                    key={item.title}
                    item={item}
                    index={index}
                    active={
                      activeIndex === index
                    }
                    className={`
                      pjw-next__stop
                      pjw-next__branch
                      pjw-next__branch--${item.pos}
                      pjw-next__d-${index}
                    `}
                    onMouseEnter={
                      handleMouseEnter
                    }
                    onMouseLeave={
                      handleMouseLeave
                    }
                  />
                );
              }
            )}
          </li>
        </ol>

        {/* =========================================================
            NOTE
        ========================================================= */}

        <p className="pjw-next__note">
          Every learner has a different next step.
          ProJenius provides multiple pathways to continue
          learning, building, and growing.
        </p>
      </div>
    </section>
  );
}