import './WorkshopVideoCard.css';
import WorkshopIcon from './WorkshopIcons';
import { WorkshopThumb } from './WorkshopMedia';

const typeLabel = (t) => (t.type === 'faculty' ? 'Faculty / institution experience' : 'Student experience');

/* variant "featured": large video + full quote. variant "mini": compact list card. */
export default function WorkshopVideoCard({ item, variant = 'mini', onPlay }) {
  const who = item.name || 'participant';

  if (variant === 'mini') {
    return (
      <button type="button" className="pjw-videocard pjw-videocard--mini" onClick={onPlay} aria-label={`Play video from ${who}`}>
        <span className="pjw-videocard__mini-thumb">
          <WorkshopThumb item={item} label="Video" />
          <span className="pjw-videocard__play pjw-videocard__play--small"><WorkshopIcon name="play" size={16} filled /></span>
        </span>
        <span>
          <span className="pjw-videocard__type">{typeLabel(item)}</span>
          <span className="pjw-videocard__snippet">&ldquo;{item.quote}&rdquo;</span>
          <span className="pjw-videocard__name">
            {item.name}{item.institution ? `, ${item.institution}` : ''}
          </span>
        </span>
      </button>
    );
  }

  const hasVideo = Boolean(item.videoUrl) || item.isPlaceholder;
  return (
    <article className="pjw-videocard pjw-videocard--featured">
      {item.isPlaceholder ? <span className="pjw-badge-sample">Placeholder</span> : null}
      {hasVideo ? (
        <button type="button" className="pjw-videocard__thumb" onClick={onPlay} aria-label={`Play video from ${who}`}>
          <WorkshopThumb item={item} label="Video thumbnail" />
          <span className="pjw-videocard__play"><WorkshopIcon name="play" size={26} filled /></span>
        </button>
      ) : null}
      <div className="pjw-videocard__body">
        <p className="pjw-videocard__type">{typeLabel(item)}</p>
        <blockquote className="pjw-videocard__quote">&ldquo;{item.quote}&rdquo;</blockquote>
        <p className="pjw-videocard__who">
          <strong>{item.name}</strong>
          <span>
            {[item.role, item.institution].filter(Boolean).join(', ')}
            {item.workshop ? `. ${item.workshop}` : ''}
          </span>
        </p>
      </div>
    </article>
  );
}
