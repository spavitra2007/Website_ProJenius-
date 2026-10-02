import { useRef, useState } from 'react';
import { FINDER } from './StartupSupportData.js';
import { handleListKeys, pad } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportFinder.css';

/* StartupSupportFinder — "Where Are You Right Now?" mini tool. */
function StartupSupportFinder({ onOpenContact }) {
  const [active, setActive] = useState(0);
  const optRefs = useRef([]);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const f = FINDER[active];

  return (
    <section className="ssp-section ssp-section--tint" id="ssp-where" aria-labelledby="ssp-finder-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Find your starting point</p>
          <h2 className="ssp-title" id="ssp-finder-heading">Where Are You Right Now?</h2>
          <p className="ssp-lede">You don't need to have everything figured out. Start with where you are.</p>
        </div>

        <div className={`ssp-finder-grid ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <div className="ssp-finder-opts" role="radiogroup" aria-label="Where are you right now?">
            {FINDER.map((item, i) => (
              <button
                key={item.label}
                ref={(el) => { optRefs.current[i] = el; }}
                className={`ssp-finder-opt${i === active ? ' ssp-finder-opt--active' : ''}`}
                type="button"
                role="radio"
                aria-checked={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleListKeys(e, FINDER.length, active, setActive, optRefs)}
              >
                <span className="ssp-finder-opt-n">{pad(i + 1)}</span>
                <span className="ssp-finder-opt-k">{item.label}</span>
                <span className="ssp-finder-opt-dot" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="ssp-finder-console" aria-live="polite" key={active}>
            <div className="ssp-finder-console-bar"><span className="ssp-finder-console-dot" />projenius / stage-{pad(active + 1)}</div>
            <div className="ssp-finder-meter" aria-hidden="true">
              {FINDER.map((_, j) => (<span key={j} className={`ssp-finder-meter-seg${j <= active ? ' ssp-finder-meter-seg--on' : ''}`} />))}
            </div>
            <p className="ssp-finder-console-label">You may need</p>
            <ul className="ssp-finder-needs">
              {f.needs.map((n, j) => (<li key={n}><span>{pad(j + 1)}</span>{n}</li>))}
            </ul>
            <p className="ssp-finder-next">{f.next}</p>
            <div>
              <button className="ssp-btn ssp-btn--primary" type="button" onClick={() => onOpenContact(active, 'idea')}>
                Talk to ProJenius <span className="ssp-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportFinder;
