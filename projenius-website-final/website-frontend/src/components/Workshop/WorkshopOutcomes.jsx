import './WorkshopOutcomes.css';
import WorkshopIcon from './WorkshopIcons';
import { WorkshopReveal, useInView } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_OUTCOMES = [
  'Understand the technology',
  'Work with real tools and components',
  'Apply concepts practically',
  'Build a basic working prototype or activity',
  'Experiment and troubleshoot',
  'Present or demonstrate their work',
  'Understand real-world applications',
  'Identify their next learning direction',
];

/* Each outcome ticks itself off as it scrolls into view. */
function OutcomeItem({ text }) {
  const [ref, seen] = useInView({ threshold: 0.6, rootMargin: '0px 0px -12% 0px' });
  return (
    <li ref={ref} className={`pjw-outcomes__item${seen ? ' pjw-outcomes__item--on' : ''}`}>
      <span className="pjw-outcomes__tick"><WorkshopIcon name="check" size={18} /></span>
      <span>{text}</span>
    </li>
  );
}

export default function WorkshopOutcomes() {
  return (
    <section className="pjw-sec pjw-sec--surface" id="pjw-outcomes" aria-labelledby="pjw-outcomes-title">
      <div className="pjw-wrap pjw-outcomes__grid">
        <WorkshopReveal className="pjw-outcomes__intro">
          <h2 className="pjw-h2" id="pjw-outcomes-title">More Than Knowledge. Practical Experience.</h2>
          <p className="pjw-lead">
            Each workshop is designed to leave students with something they can apply, build on, or explore further.
          </p>
        </WorkshopReveal>
        <ul className="pjw-outcomes__list">
          {WORKSHOP_OUTCOMES.map((o) => (
            <OutcomeItem key={o} text={o} />
          ))}
        </ul>
      </div>
    </section>
  );
}
