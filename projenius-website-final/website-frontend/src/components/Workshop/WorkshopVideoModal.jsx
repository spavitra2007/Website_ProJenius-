import './WorkshopVideoModal.css';
import WorkshopModal from './WorkshopModal';
import { WorkshopVideoEmbed } from './WorkshopMedia';

export default function WorkshopVideoModal({ title, videoUrl, caption, onClose }) {
  return (
    <WorkshopModal label={title || 'Workshop video'} variant="video" closeLabel="Close video" onClose={onClose}>
      <div className="pjw-videomodal">
        <WorkshopVideoEmbed url={videoUrl} title={title} />
        {caption ? <p className="pjw-videomodal__caption">{caption}</p> : null}
      </div>
    </WorkshopModal>
  );
}
