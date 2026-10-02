import './InstitutionCTA.css';
import { WorkshopReveal, WorkshopLink, workshopHref } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_COLLAB = [
  'Customized topics', 'Department-specific workshops', 'Hands-on activities', 'Technical bootcamps',
  'Innovation programs', 'Project-based sessions', 'Student development programs', 'Technology-focused events',
];

const WORKSHOP_AUDIENCES = ['Colleges', 'Departments', 'Faculty', 'Innovation clubs', 'Technical clubs', 'Institutions'];

/* Answers are editable. Confirm each against the actual ProJenius offering. */

/* For colleges, departments, faculty, and technical / innovation clubs */
export default function InstitutionCTA() {
  return (
    <section className="pjw-sec pjw-sec--surface" id="pjw-institutions" aria-labelledby="pjw-institutions-title">
      <div className="pjw-wrap pjw-inst__grid">
        <WorkshopReveal>
          <h2 className="pjw-h2" id="pjw-institutions-title">Bring a ProJenius Workshop to Your Campus</h2>
          <p className="pjw-lead">
            Whether you are planning a department-level session, technical club activity, bootcamp, or
            institution-wide program, we can structure the workshop around your requirements.
          </p>
          <div className="pjw-btn-row pjw-inst__actions">
            <WorkshopLink to={workshopHref('contact', 'intent=plan-workshop')} className="pjw-btn pjw-btn--primary">
              Plan a Workshop With Us
            </WorkshopLink>
            <WorkshopLink to={workshopHref('contact')} className="pjw-btn pjw-btn--ghost">
              Contact ProJenius
            </WorkshopLink>
          </div>
        </WorkshopReveal>

        <div>
          <ul className="pjw-inst__collab" aria-label="What we can plan together">
            {WORKSHOP_COLLAB.map((c) => (
              <li key={c} className="pjw-inst__collab-item">{c}</li>
            ))}
          </ul>
          <p className="pjw-inst__aud-label">Made for</p>
          <ul className="pjw-inst__aud">
            {WORKSHOP_AUDIENCES.map((a) => (
              <li key={a} className="pjw-inst__aud-item">{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
