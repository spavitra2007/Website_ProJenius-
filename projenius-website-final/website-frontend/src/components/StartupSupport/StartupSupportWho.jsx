import { useRef, useState } from 'react';
import { WHO } from './StartupSupportData.js';
import { handleListKeys } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportWho.css';

/* StartupSupportWho — "Built for Ideas at Different Stages".
   An interactive tab list on the left drives the panel on the right. */
function StartupSupportWho({ onOpenContact }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const current = WHO[active];

  return (
    <section className="ssp-section ssp-section--light" id="ssp-who" aria-labelledby="ssp-who-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Who we support</p>
          <h2 className="ssp-title" id="ssp-who-heading">Built for Ideas at Different Stages.</h2>
          <p className="ssp-lede">Not every innovator starts from the same place. Our support adapts to where you are today.</p>
        </div>

        <div className={`ssp-who-panel-wrap ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <div className="ssp-who-tablist" role="tablist" aria-label="Innovator stage" aria-orientation="vertical">
            {WHO.map((w, i) => (
              <button
                key={w.title}
                ref={(el) => { tabRefs.current[i] = el; }}
                className={`ssp-who-tab${i === active ? ' ssp-who-tab--active' : ''}`}
                type="button"
                role="tab"
                id={`sspWhoTab${i}`}
                aria-controls="sspWhoPanel"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleListKeys(e, WHO.length, active, setActive, tabRefs)}
              >
                <span className="ssp-who-num">{w.num}</span>
                <span>
                  <span className="ssp-who-tab-title">{w.title}</span>
                  <span className="ssp-who-tab-quote">“{w.quote}”</span>
                </span>
                <span className="ssp-who-go" aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div className="ssp-who-panel ssp-who-panel-anim" id="sspWhoPanel" role="tabpanel" aria-labelledby={`sspWhoTab${active}`} tabIndex={0} key={active}>
            <div className="ssp-who-top">
              <span className="ssp-who-big-num" aria-hidden="true">{current.num}</span>
              <span className="ssp-who-spec" role="img" aria-label={`Stage ${active + 1} of 4, from idea to established startup`}>
                {WHO.map((_, j) => (
                  <span key={j} className={`ssp-who-spec-dot${j <= active ? ' ssp-who-spec-dot--on' : ''}`} />
                ))}
                <span className="ssp-who-spec-label">idea → startup</span>
              </span>
            </div>
            <h3>{current.title}</h3>
            <p className="ssp-who-desc">{current.text}</p>
            <p className="ssp-mini-label">Where we can help</p>
            <ul className="ssp-chip-list">
              {current.areas.map((a) => (<li key={a} className="ssp-chip">{a}</li>))}
            </ul>
            <button className="ssp-text-link" type="button" onClick={() => onOpenContact(current.stage, 'idea')}>
              Talk about this stage <span className="ssp-btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportWho;
