import { useEffect, useRef, useState } from 'react';
import './WorkshopInstitutionShowcase.css';
import WorkshopIcon from './WorkshopIcons';
import WorkshopExperienceCard from './WorkshopExperienceCard';
import WorkshopExperienceModal from './WorkshopExperienceModal';
import WorkshopVideoModal from './WorkshopVideoModal';
import { WorkshopSectionHead, WorkshopSampleNote, WorkshopEmpty, SHOW_PLACEHOLDERS, usePrefersReducedMotion } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

/* REAL WORKSHOPS: add one object per real workshop. Leave [] until you have them.
   {
     institutionName, workshopTitle, category, date, location, description,
     coverImage,                         // image URL
     galleryImages: ['url' | { src, alt, caption }],
     videoUrl,                           // YouTube link (or .mp4)
     testimonial, testimonialPerson, testimonialRole
   }                                                                          */
const WORKSHOP_EXPERIENCES = [];

/* Sample cover and gallery photos from a free public photo service
   (picsum.photos). Swap `coverImage` / `galleryImages` for real event
   photos whenever you have them; nothing else needs to change. */
const EXPERIENCE_PLACEHOLDERS = [1, 2, 3].map((n) => ({
  institutionName: `Institution name (sample ${n})`,
  workshopTitle: 'Workshop title',
  category: 'Technology / category',
  date: 'Year',
  location: 'City, State',
  description: 'A short description of what students did in this workshop will appear here.',
  coverImage: `https://picsum.photos/seed/pjw-xp-cover-${n}/1200/800`,
  galleryImages: [1, 2, 3].map((g) => ({
    src: `https://picsum.photos/seed/pjw-xp-${n}-${g}/700/560`,
    alt: `Sample photo ${g} from workshop ${n}`,
    caption: `Sample photo ${g}`,
  })),
  videoUrl: '',
  testimonial: '',
  testimonialPerson: '',
  testimonialRole: '',
}));

/* Editorial horizontal showcase of real workshops, one institution per slide.
   Only real data from WorkshopInstitutionShowcase.jsx is shown (or clearly marked samples). */
export default function WorkshopInstitutionShowcase() {
  const real = WORKSHOP_EXPERIENCES.length > 0;
  const items = real ? WORKSHOP_EXPERIENCES : SHOW_PLACEHOLDERS ? EXPERIENCE_PLACEHOLDERS : [];
  const sample = !real;

  const reduced = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState(null);
  const [video, setVideo] = useState(null);

  /* keep the active tab in sync with the scroll position */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const sync = () => {
      let best = 0;
      let dist = Infinity;
      Array.from(track.children).forEach((slide, i) => {
        const d = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (d < dist) { dist = d; best = i; }
      });
      setCurrent(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    sync();
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const goTo = (i) => {
    const track = trackRef.current;
    const slide = track && track.children[Math.min(items.length - 1, Math.max(0, i))];
    if (!slide || !track.scrollTo) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className="pjw-sec" id="pjw-experiences" aria-labelledby="pjw-experiences-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-experiences-title"
          title="Our Workshop Experiences"
          text="ProJenius has conducted practical technology and innovation workshops in academic institutions, creating opportunities for students to learn, experiment, and build."
        />

        {items.length === 0 ? (
          <div className="pjw-showcase__empty">
            <WorkshopEmpty title="Workshop experiences are coming soon.">
              Real workshops will appear here as they are added.
            </WorkshopEmpty>
          </div>
        ) : (
          <>
            <div className="pjw-showcase__head">
              <div className="pjw-showcase__rail" role="group" aria-label="Choose an institution">
                {items.map((x, i) => (
                  <button
                    key={x.institutionName}
                    type="button"
                    className="pjw-showcase__tab"
                    aria-current={i === current ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    {x.institutionName}
                    <small>{x.date || ''}</small>
                  </button>
                ))}
              </div>
              <div className="pjw-showcase__ctrl">
                <button type="button" className="pjw-showcase__round" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous workshop">
                  <WorkshopIcon name="left" size={20} />
                </button>
                <button type="button" className="pjw-showcase__round" onClick={() => goTo(current + 1)} disabled={current === items.length - 1} aria-label="Next workshop">
                  <WorkshopIcon name="right" size={20} />
                </button>
              </div>
            </div>

            <div className="pjw-showcase__track" ref={trackRef} tabIndex={0} role="region" aria-label="Workshop experiences, scrollable">
              {items.map((x, i) => (
                <WorkshopExperienceCard
                  key={x.institutionName}
                  item={x}
                  sample={sample}
                  onOpen={() => setDetail(i)}
                  onWatch={() => setVideo(x)}
                />
              ))}
            </div>

            {sample && (
              <WorkshopSampleNote>
                These cards use placeholder text and image areas. Add real workshops to{' '}
                <code>WORKSHOP_EXPERIENCES</code> in WorkshopInstitutionShowcase.jsx and this notice disappears.
              </WorkshopSampleNote>
            )}
          </>
        )}
      </div>

      {detail !== null && (
        <WorkshopExperienceModal item={items[detail]} sample={sample} onClose={() => setDetail(null)} />
      )}
      {video && (
        <WorkshopVideoModal
          title={video.workshopTitle}
          videoUrl={video.videoUrl}
          caption={`${video.institutionName}: ${video.workshopTitle}`}
          onClose={() => setVideo(null)}
        />
      )}
    </section>
  );
}
