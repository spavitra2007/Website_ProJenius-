import { useRef } from 'react';
import { AFTER_STEPS } from './StartupSupportData.js';
import { pad } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportAfter.css';

/* StartupSupportAfter — "What Happens After You Reach Out?" */
function StartupSupportAfter({ onOpenContact }) {
  const flowRef = useRef(null);
  const inView = useInView(flowRef, { threshold: 0.3 });

  return (
    <section className="ssp-section ssp-section--dark ssp-gridbg ssp-gridbg--soft" id="ssp-after" aria-labelledby="ssp-after-heading">
      <div className="ssp-wrap ssp-after-grid">
        <div>
          <p className="ssp-eyebrow">Getting started</p>
          <h2 className="ssp-title" id="ssp-after-heading">What Happens After You Reach Out?</h2>
          <p className="ssp-after-msg">You don't need a complete business plan or technical specification to start a conversation.</p>
          <button className="ssp-btn ssp-btn--primary" type="button" onClick={() => onOpenContact(null, 'idea')}>
            Start a Conversation <span className="ssp-btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <div className={`ssp-after-flow${inView ? ' ssp-after-flow--in' : ''}`} ref={flowRef}>
          <div className="ssp-after-flow-line" aria-hidden="true" />
          <ol>
            {AFTER_STEPS.map(([title, text], i) => (
              <li key={title}>
                <span className={`ssp-after-flow-num ssp-after-flow-num--${i}`}>{pad(i + 1)}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportAfter;
