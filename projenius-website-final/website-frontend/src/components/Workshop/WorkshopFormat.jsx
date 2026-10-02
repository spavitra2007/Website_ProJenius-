import './WorkshopFormat.css';
import { WorkshopSectionHead, WorkshopLink, workshopHref } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_FORMATS = [
  { glyph: 'day', title: 'One-Day Workshop', text: 'An intensive practical learning experience focused on a specific technology or topic.' },
  { glyph: 'camp', title: 'Hands-On Bootcamp', text: 'A multi-session experience combining learning, practical activities, and project building.' },
  { glyph: 'dept', title: 'Department Workshop', text: 'A customized workshop aligned with a specific academic department or student group.' },
  { glyph: 'club', title: 'Institution / Club Workshop', text: 'Technology and innovation sessions designed for technical clubs, innovation clubs, student communities, or institution-wide programs.' },
];

/* Each glyph shows the scale of the format: one block, several sessions,
   one department group, or a whole connected institution. */
function FormatGlyph({ type }) {
  const props = { className: 'pjw-format__glyph', viewBox: '0 0 180 64', 'aria-hidden': 'true', focusable: 'false' };

  if (type === 'day') {
    return (
      <svg {...props}>
        <rect className="pjw-format__fill" x="6" y="12" width="168" height="40" rx="6" />
        <path className="pjw-format__line" d="M22 28h64M22 38h38" />
      </svg>
    );
  }
  if (type === 'camp') {
    const bars = [[6, 36, 16], [50, 28, 24], [94, 20, 32], [138, 10, 42]];
    return (
      <svg {...props}>
        {bars.map(([x, y, h]) => (
          <rect key={x} className="pjw-format__fill" x={x} y={y + 2} width="34" height={h} rx="5" />
        ))}
      </svg>
    );
  }
  if (type === 'dept') {
    const xs = [20, 60, 100, 140];
    const ys = [20, 44];
    return (
      <svg {...props}>
        <rect className="pjw-format__frame" x="4" y="6" width="76" height="52" rx="8" />
        {xs.map((x, ci) =>
          ys.map((y) => (
            <circle
              key={`${x}-${y}`}
              className={`pjw-format__node ${ci < 2 ? 'pjw-format__node--on' : 'pjw-format__node--off'}`}
              cx={x}
              cy={y}
              r="7"
            />
          ))
        )}
      </svg>
    );
  }
  const pts = [[16, 44], [52, 16], [92, 44], [132, 16], [166, 44]];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 3], [0, 2], [2, 4]];
  return (
    <svg {...props}>
      {links.map(([a, b]) => (
        <path key={`${a}${b}`} className="pjw-format__line" d={`M${pts[a][0]} ${pts[a][1]}L${pts[b][0]} ${pts[b][1]}`} />
      ))}
      {pts.map((p) => (
        <circle key={p.join('-')} className="pjw-format__node pjw-format__node--on" cx={p[0]} cy={p[1]} r="7" />
      ))}
    </svg>
  );
}

export default function WorkshopFormat() {
  return (
    <section className="pjw-sec pjw-sec--surface" id="pjw-formats" aria-labelledby="pjw-formats-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-formats-title"
          title="Designed Around Your Institution"
          text="Every institution has different objectives, student groups, schedules, and learning requirements. Workshops can be structured accordingly."
        />
        <div className="pjw-format">
          {WORKSHOP_FORMATS.map((f) => (
            <article key={f.title} className="pjw-format__item">
              <FormatGlyph type={f.glyph} />
              <h3 className="pjw-format__title">{f.title}</h3>
              <p className="pjw-format__text">{f.text}</p>
              <WorkshopLink
                to={workshopHref('contact', `format=${encodeURIComponent(f.title)}`)}
                className="pjw-format__link"
              >
                Ask about this format
                <span className="pjw-sr-only">: {f.title}</span>
              </WorkshopLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
