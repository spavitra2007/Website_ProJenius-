import { useState } from 'react';
import './WorkshopExperienceModal.css';
import WorkshopModal from './WorkshopModal';
import WorkshopGalleryModal from './WorkshopGalleryModal';
import WorkshopVideoModal from './WorkshopVideoModal';
import { WorkshopImage } from './WorkshopMedia';
import { WorkshopLink, workshopHref } from './WorkshopShared';

/* Detailed view of one workshop: cover, description, gallery, video. */
export default function WorkshopExperienceModal({ item, sample, onClose }) {
  const [lightbox, setLightbox] = useState(null);
  const [video, setVideo] = useState(false);

  const gallery = (item.galleryImages || []).map((g) =>
    typeof g === 'string' ? { type: 'photo', src: g, alt: '', caption: '' } : { type: 'photo', ...g }
  );

  return (
    <>
      <WorkshopModal
        label={`${item.institutionName}: ${item.workshopTitle}`}
        closeLabel="Close details"
        onClose={onClose}
      >
        <div className="pjw-modal__panel">
          <div className="pjw-xpmodal__media">
            {sample ? <span className="pjw-badge-sample">Placeholder</span> : null}
            <WorkshopImage
              src={item.coverImage}
              alt={`${item.workshopTitle} at ${item.institutionName}`}
              label="Add a real event photo"
            />
          </div>
          <div className="pjw-xpmodal__body">
            <div className="pjw-xpmodal__meta">
              <span className="pjw-tag">{item.category}</span>
              {item.date ? <span>{item.date}</span> : null}
              {item.location ? <span>{item.location}</span> : null}
            </div>
            <h3 className="pjw-xpmodal__inst">{item.institutionName}</h3>
            <p className="pjw-xpmodal__title">{item.workshopTitle}</p>
            <p className="pjw-xpmodal__desc">{item.description}</p>

            {item.testimonial ? (
              <p className="pjw-xpmodal__quote">
                &ldquo;{item.testimonial}&rdquo;
                <br />
                <small>{[item.testimonialPerson, item.testimonialRole].filter(Boolean).join(', ')}</small>
              </p>
            ) : null}

            {gallery.length > 0 && (
              <div className="pjw-xpmodal__thumbs">
                {gallery.map((g, i) => (
                  <button
                    key={`${g.src}-${i}`}
                    type="button"
                    className="pjw-xpmodal__thumb"
                    onClick={() => setLightbox(i)}
                    aria-label={`Open photo ${i + 1}`}
                  >
                    <WorkshopImage src={g.src} alt={g.alt} label="Photo" />
                  </button>
                ))}
              </div>
            )}

            <div className="pjw-btn-row">
              {item.videoUrl ? (
                <button type="button" className="pjw-btn pjw-btn--ghost" onClick={() => setVideo(true)}>
                  Watch video
                </button>
              ) : null}
              <WorkshopLink to={workshopHref('contact', 'intent=plan-workshop')} className="pjw-btn pjw-btn--primary">
                Plan a similar workshop
              </WorkshopLink>
            </div>
          </div>
        </div>
      </WorkshopModal>

      {lightbox !== null && (
        <WorkshopGalleryModal items={gallery} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
      {video && (
        <WorkshopVideoModal
          title={item.workshopTitle}
          videoUrl={item.videoUrl}
          caption={`${item.institutionName}: ${item.workshopTitle}`}
          onClose={() => setVideo(false)}
        />
      )}
    </>
  );
}
