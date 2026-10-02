import { useRef, useState } from 'react';
import { PROJECTS, PROJECT_CATEGORIES } from './StartupSupportData.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportProjects.css';

/* StartupSupportProjects — "From Ideas to Working Solutions."
   PLACEHOLDER content: replace with verified ProJenius projects and real photos
   before this goes live. No client names, numbers or outcomes are invented. */
function StartupSupportProjects() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const filters = ['All', ...PROJECT_CATEGORIES];
  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <section className="ssp-section ssp-section--tint" id="ssp-projects" aria-labelledby="ssp-projects-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Proof of work</p>
          <h2 className="ssp-title" id="ssp-projects-heading">From Ideas to Working Solutions.</h2>
          <p className="ssp-lede">Prototypes, products and experiments built with ProJenius, shown with the problem, the technology and what came out of it.</p>
        </div>

        <p className="ssp-projects-note">
          <span className="ssp-projects-note-tag">PLACEHOLDER</span>
          <span>These tiles are layout placeholders with generic stock photos. Replace each with a verified ProJenius project, real images and real details. No client names, statistics or outcomes have been invented.</span>
        </p>

        <div className="ssp-projects-filter" role="group" aria-label="Filter projects by category">
          {filters.map((c) => (
            <button
              key={c}
              type="button"
              className={`ssp-projects-filter-btn${c === filter ? ' ssp-projects-filter-btn--active' : ''}`}
              aria-pressed={c === filter}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ssp-projects-grid">
          {visible.map((p, i) => (
            <article className="ssp-project-card" key={`${filter}-${i}`}>
              <div className="ssp-project-img">
                <img src={p.image} alt="" loading="lazy" />
                <span className="ssp-project-img-tag">IMAGE PLACEHOLDER</span>
              </div>
              <div className="ssp-project-body">
                <div className="ssp-project-tags">
                  {p.categories.map((c) => (<span key={c}>{c}</span>))}
                </div>
                <h3>{p.name || 'Project name to be added'}</h3>
                <dl className="ssp-project-dl">
                  <div><dt>Problem / objective</dt><dd>{p.objective || 'To be added'}</dd></div>
                  <div><dt>Technology involved</dt><dd>{p.technology || 'To be added'}</dd></div>
                  <div><dt>What ProJenius worked on</dt><dd>{p.worked || 'To be added'}</dd></div>
                  <div><dt>Current outcome</dt><dd>{p.outcome || 'To be added'}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StartupSupportProjects;
