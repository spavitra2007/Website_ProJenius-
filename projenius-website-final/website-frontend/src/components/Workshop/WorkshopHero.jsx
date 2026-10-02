import { useEffect, useState } from 'react';
import './WorkshopHero.css';
import { WorkshopScrollLink, usePrefersReducedMotion } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_TECH = [
  { label: ['AI / ML'], x: 110, y: 90, d: 'M260 235H196L110 149V97', ly: -20 },
  { label: ['Software'], x: 320, y: 45, d: 'M320 210V52', ly: -20 },
  { label: ['Innovation'], x: 530, y: 90, d: 'M380 235H444L530 149V97', ly: -20 },
  { label: ['IoT'], x: 580, y: 270, d: 'M380 270H573', ly: 30 },
  { label: ['Robotics'], x: 530, y: 450, d: 'M380 305H444L530 391V443', ly: 30 },
  { label: ['3D Printing'], x: 320, y: 495, d: 'M320 330V488', ly: 30 },
  { label: ['PCB'], x: 110, y: 450, d: 'M260 305H196L110 391V443', ly: 30 },
  { label: ['Embedded', 'Systems'], x: 60, y: 270, d: 'M260 270H67', ly: 30 },
];

const WORKSHOP_STAGES = ['Learn', 'Explore', 'Build', 'Test', 'Experience'];

/* Hero diagram: one trace per technology, from the central chip to a node. */

/* decorative chip pins (the eight traces start on their own pins) */
const PINS_TOP_BOTTOM = [280, 300, 340, 360];
const PINS_LEFT_RIGHT = [222, 252, 288, 318];

export default function WorkshopHero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(-1);

  /* LEARN > EXPLORE > BUILD > TEST > EXPERIENCE highlight loop */
  useEffect(() => {
    if (reduced) {
      setActive(-1);
      return undefined;
    }
    let i = 0;
    setActive(0);
    const timer = setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % WORKSHOP_STAGES.length;
      setActive(i);
    }, 1700);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section className="pjw-hero" aria-labelledby="pjw-hero-title">
      <div className="pjw-wrap pjw-hero__grid">
        <div>
          <h1 className="pjw-hero__title" id="pjw-hero-title">
            Workshops That Go Beyond the Classroom
          </h1>
          <p className="pjw-lead pjw-hero__lead">
            Hands-on technology workshops designed to help students explore, experiment, build, and
            experience emerging technologies through practical learning.
          </p>
          <div className="pjw-btn-row">
            <WorkshopScrollLink targetId="pjw-areas" className="pjw-btn pjw-btn--primary">
              Explore Workshops
            </WorkshopScrollLink>
            <WorkshopScrollLink targetId="pjw-institutions" className="pjw-btn pjw-btn--ghost">
              Host a Workshop
            </WorkshopScrollLink>
          </div>
          <dl className="pjw-hero__audience">
            <div>
              <dt>For students</dt>
              <dd>Learn a technology, then build something with it.</dd>
            </div>
            <div>
              <dt>For institutions</dt>
              <dd>A practical technology session designed around your students.</dd>
            </div>
          </dl>
        </div>

        <div className="pjw-hero__board">
          <svg
            className="pjw-hero__svg"
            viewBox="0 0 640 540"
            role="img"
            aria-label="Diagram: a ProJenius workshop at the centre, connected to AI and machine learning, software, innovation, IoT, robotics, 3D printing, PCB, and embedded systems."
          >
            {PINS_TOP_BOTTOM.map((x) => (
              <g key={`tb${x}`}>
                <rect className="pjw-hero__pin" x={x - 3} y="201" width="6" height="9" />
                <rect className="pjw-hero__pin" x={x - 3} y="330" width="6" height="9" />
              </g>
            ))}
            {PINS_LEFT_RIGHT.map((y) => (
              <g key={`lr${y}`}>
                <rect className="pjw-hero__pin" x="251" y={y - 3} width="9" height="6" />
                <rect className="pjw-hero__pin" x="380" y={y - 3} width="9" height="6" />
              </g>
            ))}

            {WORKSHOP_TECH.map((t, i) => (
              <g key={t.label.join('')} className={`pjw-hero__tech pjw-hero__tech--${i}`}>
                <path className="pjw-hero__trace" d={t.d} pathLength="100" />
                <path className="pjw-hero__pulse" d={t.d} pathLength="100" />
                <g className="pjw-hero__node" transform={`translate(${t.x} ${t.y})`}>
                  <circle className="pjw-hero__hit" r="26" />
                  <circle className="pjw-hero__dot" r="7" />
                </g>
                <text className="pjw-hero__label" textAnchor="middle">
                  {t.label.map((line, k) => (
                    <tspan key={line} x={t.x} {...(k === 0 ? { y: t.y + t.ly } : { dy: '1.15em' })}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}

            <rect className="pjw-hero__chip" x="260" y="210" width="120" height="120" rx="10" />
            <rect className="pjw-hero__chip-edge" x="270" y="220" width="100" height="100" rx="6" />
            <text className="pjw-hero__chip-text" x="320" y="273">Workshop</text>
            <text className="pjw-hero__chip-sub" x="320" y="293">ProJenius</text>
          </svg>

          <ol className="pjw-hero__stages" aria-label="Workshop flow">
            {WORKSHOP_STAGES.map((s, i) => (
              <li key={s} className={`pjw-hero__stage${i === active ? ' pjw-hero__stage--active' : ''}`}>
                <span className="pjw-hero__stage-dot" />
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
