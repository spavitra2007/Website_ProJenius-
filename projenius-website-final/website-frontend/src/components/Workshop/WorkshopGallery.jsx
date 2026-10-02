import { useState } from 'react';
import './WorkshopGallery.css';
import WorkshopIcon from './WorkshopIcons';
import WorkshopGalleryModal from './WorkshopGalleryModal';
import { WorkshopImage, WorkshopThumb } from './WorkshopMedia';
import { WorkshopSectionHead, WorkshopSampleNote, WorkshopEmpty, SHOW_PLACEHOLDERS } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

/* REAL GALLERY MEDIA: { type: 'photo' | 'video', src, alt, caption, videoUrl, ar: '4/5' }
   ar must be one of: 4/5, 4/3, 1/1, 3/4, 16/10, 16/9, 3/2  (leave [] until you have real media) */
const WORKSHOP_GALLERY = [];

/* Sample images from a free public photo service (picsum.photos), sized to
   match each tile's aspect ratio. Swap `src` / `thumbnail` for real workshop
   media whenever you have it; nothing else needs to change. */
const GALLERY_PLACEHOLDERS = [
  ['Student activity', '4/5', 'photo', 'https://picsum.photos/seed/pjw-gal-1/640/800'],
  ['Project demonstration', '4/3', 'photo', 'https://picsum.photos/seed/pjw-gal-2/800/600'],
  ['Electronics build', '1/1', 'photo', 'https://picsum.photos/seed/pjw-gal-3/700/700'],
  ['Robotics activity', '3/4', 'photo', 'https://picsum.photos/seed/pjw-gal-4/600/800'],
  ['Workshop video', '16/10', 'video', 'https://picsum.photos/seed/pjw-gal-5/960/600'],
  ['Event banner', '16/10', 'photo', 'https://picsum.photos/seed/pjw-gal-6/960/600'],
  ['Team interaction', '4/5', 'photo', 'https://picsum.photos/seed/pjw-gal-7/640/800'],
  ['Hands-on session', '1/1', 'photo', 'https://picsum.photos/seed/pjw-gal-8/700/700'],
  ['Prototype testing', '4/3', 'photo', 'https://picsum.photos/seed/pjw-gal-9/800/600'],
].map(([caption, ar, type, img]) => ({
  type,
  src: type === 'photo' ? img : '',
  thumbnail: type === 'video' ? img : '',
  alt: caption,
  caption,
  ar,
  videoUrl: '',
}));

/* Masonry gallery of real workshop media. Click opens the fullscreen gallery. */
export default function WorkshopGallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const real = WORKSHOP_GALLERY.length > 0;
  const items = real ? WORKSHOP_GALLERY : SHOW_PLACEHOLDERS ? GALLERY_PLACEHOLDERS : [];

  return (
    <section className="pjw-sec pjw-sec--surface" id="pjw-inside" aria-labelledby="pjw-inside-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-inside-title"
          title="Inside Our Workshops"
          text="A glimpse into the people, projects, tools, and hands-on activities behind our workshops."
        />
        {items.length === 0 ? (
          <div className="pjw-gallery__empty">
            <WorkshopEmpty title="Workshop photos are coming soon.">
              Photos and short videos from real workshops will appear here.
            </WorkshopEmpty>
          </div>
        ) : (
          <>
            <div className="pjw-gallery">
              {items.map((g, i) => {
                const ar = String(g.ar || '4/3').replace('/', '-');
                return (
                  <button
                    key={`${g.caption}-${i}`}
                    type="button"
                    className={`pjw-gallery__item pjw-gallery__item--ar-${ar}`}
                    onClick={() => setOpenIndex(i)}
                    aria-label={`${g.type === 'video' ? 'Play video' : 'View photo'}: ${g.caption || 'Workshop'}`}
                  >
                    {g.type === 'video' ? (
                      <>
                        <span className="pjw-gallery__play"><WorkshopIcon name="play" size={16} filled /></span>
                        <WorkshopThumb item={g} label={g.caption} />
                      </>
                    ) : (
                      <WorkshopImage src={g.src} alt={g.alt || g.caption} label={g.caption} />
                    )}
                    {g.caption ? <span className="pjw-gallery__caption">{g.caption}</span> : null}
                  </button>
                );
              })}
            </div>
            {!real && (
              <WorkshopSampleNote>
                Placeholder tiles. Add real photos and videos to <code>WORKSHOP_GALLERY</code> in
                WorkshopGallery.jsx and they replace these automatically.
              </WorkshopSampleNote>
            )}
          </>
        )}
      </div>
      {openIndex !== null && (
        <WorkshopGalleryModal items={items} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
