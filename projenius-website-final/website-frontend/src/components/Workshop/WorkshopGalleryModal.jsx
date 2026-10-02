import { useEffect, useRef, useState } from 'react';
import './WorkshopGalleryModal.css';
import WorkshopModal from './WorkshopModal';
import WorkshopIcon from './WorkshopIcons';
import { WorkshopImage, WorkshopVideoEmbed } from './WorkshopMedia';

/* Fullscreen gallery: arrow keys, Esc, buttons and swipe. */
export default function WorkshopGalleryModal({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const startX = useRef(null);
  const count = items.length;
  const item = items[index];

  const go = (d) => setIndex((i) => (i + d + count) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [count]);

  useEffect(() => {
    const next = items[(index + 1) % count];
    if (next && next.src) {
      const img = new Image();
      img.src = next.src;
    }
  }, [index, items, count]);

  const onPointerDown = (e) => { startX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <WorkshopModal label="Workshop gallery" variant="lightbox" closeLabel="Close gallery" onClose={onClose}>
      <div className="pjw-lightbox">
        <div className="pjw-lightbox__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <button type="button" className="pjw-lightbox__nav pjw-lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous">
            <WorkshopIcon name="left" size={22} />
          </button>
          <figure className="pjw-lightbox__fig">
            {item.type === 'video' ? (
              <WorkshopVideoEmbed url={item.videoUrl} title={item.caption} />
            ) : (
              <WorkshopImage src={item.src} alt={item.alt || item.caption} label={item.caption || 'Workshop photo'} />
            )}
          </figure>
          <button type="button" className="pjw-lightbox__nav pjw-lightbox__nav--next" onClick={() => go(1)} aria-label="Next">
            <WorkshopIcon name="right" size={22} />
          </button>
        </div>
        <p className="pjw-lightbox__caption" aria-live="polite">
          {item.caption}
          <small>{index + 1} of {count}</small>
        </p>
      </div>
    </WorkshopModal>
  );
}
