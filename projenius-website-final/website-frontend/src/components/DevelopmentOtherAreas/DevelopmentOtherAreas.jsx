import "./DevelopmentOtherAreas.css";

/* =========================================================
   ROUTES
========================================================= */

const STARTUP_SUPPORT_HREF = "/startup";
const LEARNING_CAREER_HREF = "/services/career-guidance";

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentOtherAreas() {
  return (
    <aside
      className="pjdev-areas pjdev-theme-dark"
      aria-label="Other ProJenius areas"
    >
      <div className="pjdev-areas__wrap">

        <a
          className="pjdev-areas__card"
          href={STARTUP_SUPPORT_HREF}
        >
          <b className="pjdev-areas__name">
            Startup Support
          </b>

          <span className="pjdev-areas__text">
            Idea, problem validation, R&amp;D, prototyping,
            MVP, registration and patent support.
          </span>

          <em className="pjdev-areas__more">
            Looking for this? Visit Startup Support
          </em>
        </a>

        <a
          className="pjdev-areas__card"
          href={LEARNING_CAREER_HREF}
        >
          <b className="pjdev-areas__name">
            Learning &amp; Career
          </b>

          <span className="pjdev-areas__text">
            Learn, practice, build projects, intern and
            become career ready.
          </span>

          <em className="pjdev-areas__more">
            Looking for this? Visit Learning &amp; Career
          </em>
        </a>

      </div>
    </aside>
  );
}