import './WorkshopMedia.css';
import WorkshopIcon from './WorkshopIcons';

export function getYouTubeId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}

/* Clearly marked stand-in for a missing photo or video */
export function WorkshopPlaceholder({ label }) {
  return (
    <span className="pjw-media__ph" role="img" aria-label={`Placeholder: ${label}`}>
      <span>
        <WorkshopIcon name="image" size={40} />
        <strong>{label}</strong>
        <small>Replace with real workshop media</small>
      </span>
    </span>
  );
}

/* Fills its (position: relative) parent. Falls back to a placeholder. */
export function WorkshopImage({ src, alt, label }) {
  if (!src) return <WorkshopPlaceholder label={label || 'Add a real workshop photo'} />;
  return <img className="pjw-media__img" src={src} alt={alt || ''} loading="lazy" />;
}

/* Video thumbnail: custom thumbnail, YouTube thumbnail, or placeholder */
export function WorkshopThumb({ item, label }) {
  if (item.thumbnail) return <img className="pjw-media__img" src={item.thumbnail} alt="" loading="lazy" />;
  const id = getYouTubeId(item.videoUrl);
  if (id) return <img className="pjw-media__img" src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />;
  return <WorkshopPlaceholder label={label || 'Video thumbnail'} />;
}

/* YouTube (privacy-enhanced) or direct .mp4/.webm */
export function WorkshopVideoEmbed({ url, title }) {
  const id = getYouTubeId(url);
  if (id) {
    return (
      <div className="pjw-media__video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title || 'Workshop video'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  if (/\.(mp4|webm)(\?|$)/i.test(url || '')) {
    return (
      <div className="pjw-media__video">
        <video src={url} controls autoPlay playsInline />
      </div>
    );
  }
  if (url) {
    return (
      <p className="pjw-media__fallback">
        This video can&rsquo;t be embedded here.{' '}
        <a className="pjw-link" href={url} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.
      </p>
    );
  }
  return (
    <div className="pjw-media__video">
      <WorkshopPlaceholder label="Add a videoUrl to play this video" />
    </div>
  );
}
