import './WorkshopJourney.css';
import WorkshopIcon from './WorkshopIcons';
import { WorkshopSectionHead, useScrollFill } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_JOURNEY = [
  { title: 'Understand', text: 'Learn the core concept and understand why it matters.', icon: 'understand' },
  { title: 'Explore', text: 'Interact with tools, technologies, components, and real examples.', icon: 'explore' },
  { title: 'Build', text: 'Apply the concept through a practical activity or mini-project.', icon: 'build' },
  { title: 'Test', text: 'Experiment, troubleshoot, and improve the solution.', icon: 'test' },
  { title: 'Experience', text: 'Present, demonstrate, and understand how the technology applies in the real world.', icon: 'experience' },
];

/* span = desktop column width out of 12 (allowed: 3, 4, 5, 6) */

/* Student experience: Understand > Explore > Build > Test > Experience.
   Horizontal on desktop, vertical on mobile. The connecting line fills on scroll. */
export default function WorkshopJourney() {
  const [rootRef, fills] = useScrollFill(WORKSHOP_JOURNEY.length, {
    nodeSelector: '.pjw-journey__node',
    line: 0.78,
  });

  return (
    <section className="pjw-sec pjw-sec--surface" id="pjw-journey" aria-labelledby="pjw-journey-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-journey-title"
          title="Not Just a Workshop. A Hands-On Experience."
          text="At ProJenius, workshops are designed to move students beyond passive learning into practical exploration, experimentation, and building."
        />
        <ol className="pjw-journey" ref={rootRef} aria-label="The five stages of a workshop">
          {WORKSHOP_JOURNEY.map((step, i) => {
            const f = fills[i] || { on: false, level: 0 };
            const cls = `pjw-journey__step pjw-journey__step--fill-${f.level}${f.on ? ' pjw-journey__step--on' : ''}`;
            return (
              <li key={step.title} className={cls}>
                <div className="pjw-journey__node">
                  <WorkshopIcon name={step.icon} size={24} />
                </div>
                {i < WORKSHOP_JOURNEY.length - 1 && (
                  <span className="pjw-journey__seg" aria-hidden="true">
                    <span className="pjw-journey__seg-fill" />
                  </span>
                )}
                <div className="pjw-journey__body">
                  <span className="pjw-journey__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="pjw-journey__title">{step.title}</h3>
                  <p className="pjw-journey__text">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
