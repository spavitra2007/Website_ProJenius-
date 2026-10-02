import './WorkshopProcess.css';
import { useScrollFill } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_PROCESS = [
  { title: 'Understand', text: 'Understand the institution\u2019s objective, audience, department, and expected outcome.', roles: ['Institution', 'ProJenius'] },
  { title: 'Customize', text: 'Select the appropriate technology, difficulty level, activities, and duration.', roles: ['ProJenius'] },
  { title: 'Learn', text: 'Introduce the concepts through an engaging combination of explanation and demonstration.', roles: ['ProJenius', 'Students'] },
  { title: 'Build', text: 'Students participate in hands-on activities, experiments, or project work.', roles: ['Students'] },
  { title: 'Showcase', text: 'Students demonstrate, test, or present what they have created.', roles: ['Students'] },
  { title: 'Continue', text: 'Where relevant, students can continue into deeper learning, projects, internships, or other ProJenius opportunities.', roles: ['Students', 'ProJenius'] },
];

/* Institution + ProJenius workflow: requirement -> workshop.
   Dark vertical timeline; the tags show who is involved in each step. */
export default function WorkshopProcess() {
  const [rootRef, fills] = useScrollFill(WORKSHOP_PROCESS.length, {
    nodeSelector: '.pjw-process__node',
    line: 0.65,
  });

  return (
    <section className="pjw-sec pjw-process pjw-on-deep" id="pjw-process" aria-labelledby="pjw-process-title">
      <div className="pjw-wrap pjw-process__grid">
        <div className="pjw-process__intro">
          <h2 className="pjw-h2 pjw-process__h2" id="pjw-process-title">
            How We Turn a Requirement Into a Workshop
          </h2>
          <p className="pjw-lead pjw-process__lead">
            From your first conversation to what students build and take forward, this is how a
            ProJenius workshop takes shape.
          </p>
          <p className="pjw-process__legend">
            The tags on each step show who is involved: the institution, ProJenius, or the students.
          </p>
        </div>

        <ol className="pjw-process__list" ref={rootRef} aria-label="Six steps from requirement to workshop">
          {WORKSHOP_PROCESS.map((p, i) => {
            const f = fills[i] || { on: false, level: 0 };
            const cls = `pjw-process__step pjw-process__step--fill-${f.level}${f.on ? ' pjw-process__step--on' : ''}`;
            return (
              <li key={p.title} className={cls}>
                <div className="pjw-process__node">{String(i + 1).padStart(2, '0')}</div>
                {i < WORKSHOP_PROCESS.length - 1 && (
                  <span className="pjw-process__seg" aria-hidden="true">
                    <span className="pjw-process__seg-fill" />
                  </span>
                )}
                <div className="pjw-process__body">
                  <h3 className="pjw-process__title">{p.title}</h3>
                  <p className="pjw-process__text">{p.text}</p>
                  <div className="pjw-process__roles">
                    {p.roles.map((r) => (
                      <span key={r} className="pjw-process__role">{r}</span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
