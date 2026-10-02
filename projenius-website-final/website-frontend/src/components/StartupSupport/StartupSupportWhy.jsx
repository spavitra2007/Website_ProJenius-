import { useRef } from 'react';
import { WHY_POINTS } from './StartupSupportData.js';
import { pad } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportWhy.css';

/* StartupSupportWhy — "Why Work With ProJenius?" */
function StartupSupportWhy() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section className="ssp-section ssp-section--light" id="ssp-why" aria-labelledby="ssp-why-heading" ref={sectionRef}>
      <div className="ssp-wrap ssp-why-grid">
        <div className={`ssp-why-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Why ProJenius</p>
          <h2 className="ssp-title" id="ssp-why-heading">Why Work With ProJenius?</h2>
        </div>
        <div>
          {WHY_POINTS.map(([title, text], i) => (
            <div className={`ssp-why-row ssp-reveal${inView ? ' ssp-reveal--in' : ''}`} key={title}>
              <span className="ssp-why-num" aria-hidden="true">{pad(i + 1)}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StartupSupportWhy;
