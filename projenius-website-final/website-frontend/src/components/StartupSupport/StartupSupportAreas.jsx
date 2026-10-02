import { useRef, useState } from 'react';
import { AREAS } from './StartupSupportData.js';
import { handleListKeys, pad } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportAreas.css';

/* StartupSupportAreas — "Support Across the Startup Journey."
   Category selector on the left, accordion of that category's items on the right. */
function StartupSupportAreas() {
  const [cat, setCat] = useState(0);
  const [openItem, setOpenItem] = useState(0);
  const catRefs = useRef([]);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });

  const pickCat = (i) => { setCat(i); setOpenItem(0); };

  return (
    <section className="ssp-section ssp-section--light" id="ssp-areas" aria-labelledby="ssp-areas-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">What we support</p>
          <h2 className="ssp-title" id="ssp-areas-heading">Support Across the Startup Journey.</h2>
          <p className="ssp-lede">Choose an area on the left to see the support behind it.</p>
        </div>

        <div className={`ssp-areas-grid ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <div className="ssp-areas-cats" role="tablist" aria-orientation="vertical" aria-label="Support areas">
            {AREAS.map((c, i) => (
              <button
                key={c.title}
                ref={(el) => { catRefs.current[i] = el; }}
                className={`ssp-areas-cat${i === cat ? ' ssp-areas-cat--active' : ''}`}
                type="button"
                role="tab"
                id={`sspAreasTab${i}`}
                aria-controls="sspAreasItems"
                aria-selected={i === cat}
                tabIndex={i === cat ? 0 : -1}
                onClick={() => pickCat(i)}
                onKeyDown={(e) => handleListKeys(e, AREAS.length, cat, pickCat, catRefs)}
              >
                <span className="ssp-areas-cat-n">{pad(i + 1)}</span>
                <span className="ssp-areas-cat-title">{c.title}</span>
                <span className="ssp-areas-cat-count">{c.items.length} areas</span>
                <span className="ssp-areas-cat-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div className="ssp-areas-items" id="sspAreasItems" role="tabpanel" aria-labelledby={`sspAreasTab${cat}`} key={cat}>
            {AREAS[cat].items.map(([title, desc], i) => {
              const open = i === openItem;
              return (
                <div key={title} className={`ssp-areas-acc-item${open ? ' ssp-areas-acc-item--open' : ''}`}>
                  <h3>
                    <button
                      className="ssp-areas-acc-q"
                      type="button"
                      id={`sspAreasQ${cat}-${i}`}
                      aria-expanded={open}
                      aria-controls={`sspAreasA${cat}-${i}`}
                      onClick={() => setOpenItem(open ? -1 : i)}
                    >
                      <span>{title}</span>
                      <span className="ssp-areas-acc-icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="ssp-areas-acc-panel" id={`sspAreasA${cat}-${i}`} role="region" aria-labelledby={`sspAreasQ${cat}-${i}`}>
                    <div className="ssp-areas-acc-panel-inner"><p>{desc}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportAreas;
