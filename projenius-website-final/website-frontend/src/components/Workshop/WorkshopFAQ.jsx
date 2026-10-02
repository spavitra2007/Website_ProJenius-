import { useState } from 'react';
import './WorkshopFAQ.css';
import { WorkshopReveal, WorkshopLink, workshopHref } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_FAQ = [
  { q: 'Can workshops be customized for our department?', a: 'Yes. Workshops can be designed around your department, your students\u2019 level, and the technology you want to explore. Share your goals and we will shape the topics and activities around them.' },
  { q: 'What is the typical workshop duration?', a: 'It depends on the format. A one-day workshop focuses on a specific technology or topic, while a bootcamp runs across multiple sessions. We agree the duration with you while planning.' },
  { q: 'Can workshops be conducted for large student groups?', a: 'Group size is planned together with your institution, since hands-on activities depend on the topic, space, and materials. Tell us how many students you expect and we will suggest a format that works.' },
  { q: 'Can ProJenius provide hands-on components or equipment?', a: 'Workshops are built around hands-on activities. While planning, we confirm which components, tools, and equipment each activity needs and how they will be arranged.' },
  { q: 'Can we request a specific technology or topic?', a: 'Yes. The workshop areas on this page are starting points, not fixed syllabi. If you have a specific technology in mind, including an emerging one, tell us and we will design around it.' },
  { q: 'Can workshops be conducted at our college?', a: 'Yes. ProJenius conducts workshops in academic institutions. Share your location and preferred dates when you contact us.' },
  { q: 'Can the workshop be customized based on student skill level?', a: 'Yes. The difficulty level, activities, and pace are chosen to suit your students\u2019 background, whether they are meeting the technology for the first time or already have some experience.' },
  { q: 'How can our institution request a workshop?', a: 'Use the Plan a Workshop button or contact ProJenius with your objective, audience, department, and expected outcome. We will follow up to shape the workshop with you.' },
];

/* Accessible accordion. Closed answers are visibility:hidden, so they
   cannot be tabbed into or read by screen readers. */
export default function WorkshopFAQ() {
  const [open, setOpen] = useState({ 0: true });
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }));

  return (
    <section className="pjw-sec" id="pjw-faq" aria-labelledby="pjw-faq-title">
      <div className="pjw-wrap pjw-faq__grid">
        <WorkshopReveal>
          <h2 className="pjw-h2" id="pjw-faq-title">Questions Institutions Ask</h2>
          <p className="pjw-lead">
            Can&rsquo;t find your answer?{' '}
            <WorkshopLink to={workshopHref('contact')} className="pjw-link">Contact ProJenius</WorkshopLink>{' '}
            and we will help.
          </p>
        </WorkshopReveal>

        <div className="pjw-faq__list">
          {WORKSHOP_FAQ.map((f, i) => {
            const isOpen = Boolean(open[i]);
            return (
              <div key={f.q} className={`pjw-faq__item${isOpen ? ' pjw-faq__item--open' : ''}`}>
                <h3 className="pjw-faq__heading">
                  <button
                    type="button"
                    className="pjw-faq__q"
                    id={`pjw-faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`pjw-faq-a-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{f.q}</span>
                    <span className="pjw-faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="pjw-faq__answer" id={`pjw-faq-a-${i}`} role="region" aria-labelledby={`pjw-faq-q-${i}`}>
                  <div className="pjw-faq__answer-inner">
                    <p className="pjw-faq__text">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
