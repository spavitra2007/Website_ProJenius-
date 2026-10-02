import './WorkshopExperienceCard.css';
import { WorkshopImage } from './WorkshopMedia';

/* One institution slide: large event image beside the workshop details. */
export default function WorkshopExperienceCard({ item, sample, onOpen, onWatch }) {
  return (
    <article className="pjw-xpcard" aria-label={item.institutionName}>
      <div className="pjw-xpcard__media">
        {sample ? <span className="pjw-badge-sample">Placeholder</span> : null}
        <WorkshopImage
          src={item.coverImage}
          alt={`${item.workshopTitle} at ${item.institutionName}`}
          label="Add a real event photo"
        />
      </div>
      <div className="pjw-xpcard__info">
        <div className="pjw-xpcard__meta">
          <span className="pjw-tag">{item.category}</span>
          {item.date ? <span>{item.date}</span> : null}
          {item.location ? <span>{item.location}</span> : null}
        </div>
        <h3 className="pjw-xpcard__inst">{item.institutionName}</h3>
        <p className="pjw-xpcard__title">{item.workshopTitle}</p>
        <p className="pjw-xpcard__desc">{item.description}</p>
        {item.testimonial ? <p className="pjw-xpcard__quote">&ldquo;{item.testimonial}&rdquo;</p> : null}
        <div className="pjw-xpcard__actions">
          <button type="button" className="pjw-btn pjw-btn--primary" onClick={onOpen}>
            View workshop details
          </button>
          {item.videoUrl ? (
            <button type="button" className="pjw-btn pjw-btn--ghost" onClick={onWatch}>
              Watch video
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
