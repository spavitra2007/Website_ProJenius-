import './WorkshopCategoryGrid.css';
import WorkshopCategory from './WorkshopCategory';
import { WorkshopSectionHead, WorkshopLink, workshopHref } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_CATEGORIES = [
  { icon: 'ai', title: 'AI & Machine Learning', span: 5, topics: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Generative AI', 'Practical AI Applications'] },
  { icon: 'iot', title: 'IoT & Embedded Systems', span: 4, topics: ['IoT fundamentals', 'ESP32', 'Sensors', 'Connected devices', 'Smart systems'] },
  { icon: 'robotics', title: 'Robotics & Automation', span: 3, topics: ['Robotics fundamentals', 'Sensors and actuators', 'Robot building', 'Automation', 'Robot control'] },
  { icon: 'software', title: 'Software & Development', span: 3, topics: ['Web development', 'Application development', 'Python', 'AI-powered applications', 'Software projects'] },
  { icon: 'pcb', title: 'Electronics & PCB', span: 4, topics: ['Electronics fundamentals', 'Circuit building', 'PCB design', 'Embedded systems', 'Hardware integration'] },
  { icon: 'proto', title: 'Product & Rapid Prototyping', span: 5, topics: ['3D printing', 'Product design', 'Rapid prototyping', 'MVP concepts', 'Hardware integration'] },
  { icon: 'startup', title: 'Innovation & Startup', span: 6, topics: ['Problem identification', 'Ideation', 'Design thinking', 'MVP thinking', 'Innovation'] },
  { icon: 'emerging', title: 'Emerging Technologies', span: 6, custom: true, description: 'Customized workshops built around the technologies your students or institution want to explore right now.' },
];

/* glyph: day | camp | dept | club */

export default function WorkshopCategoryGrid() {
  return (
    <section className="pjw-sec" id="pjw-areas" aria-labelledby="pjw-areas-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-areas-title"
          title="Explore Our Workshop Areas"
          text="Workshops can be designed around different technologies, student levels, departments, and institutional requirements."
        />
        <div className="pjw-catgrid">
          {WORKSHOP_CATEGORIES.map((c) => (
            <WorkshopCategory key={c.title} category={c} />
          ))}
        </div>
        <div className="pjw-catgrid__cta">
          <p className="pjw-catgrid__cta-text">
            <b>These are areas, not fixed syllabi.</b>
            Tell us what your students want to explore and we will shape the workshop around it.
          </p>
          <WorkshopLink to={workshopHref('contact', 'intent=custom-workshop')} className="pjw-btn pjw-btn--light">
            Request a Customized Workshop
          </WorkshopLink>
        </div>
      </div>
    </section>
  );
}
