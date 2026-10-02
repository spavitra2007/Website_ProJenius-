import { useRef, useState } from 'react';
import { FAQ_ITEMS } from './StartupSupportData.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportFaq.css';

/* StartupSupportFaq — accordion FAQ section. */
function StartupSupportFaq({ onOpenContact }) {
  const [open, setOpen] = useState(-1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section className="ssp-section ssp-section--tint" id="ssp-faq" aria-labelledby="ssp-faq-heading" ref={sectionRef}>
      <div className="ssp-wrap ssp-faq-grid">
        <div className={`ssp-faq-side ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Questions</p>
          <h2 className="ssp-title" id="ssp-faq-heading">Frequently Asked Questions</h2>
          <p>Can't find what you're looking for? Ask us directly. A rough idea is enough to start.</p>
          <button className="ssp-btn ssp-btn--ghost" type="button" onClick={() => onOpenContact(null, 'idea')}>
            Ask a question <span className="ssp-btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <div className={`ssp-faq-list ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          {FAQ_ITEMS.map(([q, a], i) => {
            const isOpen = i === open;
            return (
              <div key={q} className={`ssp-faq-item${isOpen ? ' ssp-faq-item--open' : ''}`}>
                <h3>
                  <button
                    className="ssp-faq-q"
                    type="button"
                    id={`sspFaqQ${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`sspFaqA${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{q}</span>
                    <span className="ssp-faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="ssp-faq-panel" id={`sspFaqA${i}`} role="region" aria-labelledby={`sspFaqQ${i}`}>
                  <div className="ssp-faq-panel-inner"><p>{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StartupSupportFaq;
