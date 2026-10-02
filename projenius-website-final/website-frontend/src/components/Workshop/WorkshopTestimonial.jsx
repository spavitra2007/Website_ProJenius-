import { useState } from 'react';
import './WorkshopTestimonial.css';
import WorkshopVideoCard from './WorkshopVideoCard';
import WorkshopVideoModal from './WorkshopVideoModal';
import { WorkshopSectionHead, WorkshopSampleNote, WorkshopEmpty, SHOW_PLACEHOLDERS } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

/* REAL TESTIMONIALS: use only real feedback and names you have permission to show.
   { type: 'student' | 'faculty', tech: 'ai' | 'iot' | 'robotics' | 'other',
     videoUrl, thumbnail, quote, name, role, institution, workshop }
   (leave [] until you have real feedback) */
const WORKSHOP_TESTIMONIALS = [];

/* Sample thumbnails from a free public photo service (picsum.photos).
   Swap `thumbnail` / `videoUrl` for a real participant photo and video
   whenever you have them; nothing else needs to change. */
const TESTIMONIAL_PLACEHOLDERS = [
  { type: 'student', tech: 'ai', quote: 'A short piece of real student feedback will appear here.', name: 'Participant name', role: 'Student', institution: 'Institution name', workshop: 'Workshop title', img: 1 },
  { type: 'faculty', tech: 'iot', quote: 'Faculty or institution feedback will appear here.', name: 'Faculty name', role: 'Faculty', institution: 'Institution name', workshop: 'Workshop title', img: 2 },
  { type: 'student', tech: 'robotics', quote: 'Another student experience will appear here.', name: 'Participant name', role: 'Student', institution: 'Institution name', workshop: 'Workshop title', img: 3 },
  { type: 'student', tech: 'other', quote: 'Another student experience will appear here.', name: 'Participant name', role: 'Student', institution: 'Institution name', workshop: 'Workshop title', img: 4 },
].map((t) => ({
  ...t,
  videoUrl: '',
  thumbnail: `https://picsum.photos/seed/pjw-tm-${t.img}/640/360`,
  isPlaceholder: true,
}));

const TESTIMONIAL_FILTERS = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'student', label: 'Students', test: (t) => t.type === 'student' },
  { id: 'faculty', label: 'Faculty', test: (t) => t.type === 'faculty' },
  { id: 'ai', label: 'AI / ML', test: (t) => t.tech === 'ai' },
  { id: 'iot', label: 'IoT', test: (t) => t.tech === 'iot' },
  { id: 'robotics', label: 'Robotics', test: (t) => t.tech === 'robotics' },
  { id: 'other', label: 'Other', test: (t) => t.tech === 'other' },
];

/* Student + faculty experiences with filters, a featured video and smaller cards.
   Real feedback only. Placeholders appear until real data is added. */
export default function WorkshopTestimonial() {
  const real = WORKSHOP_TESTIMONIALS.length > 0;
  const all = real ? WORKSHOP_TESTIMONIALS : SHOW_PLACEHOLDERS ? TESTIMONIAL_PLACEHOLDERS : [];
  const [active, setActive] = useState('all');
  const [playing, setPlaying] = useState(null);

  const filter = TESTIMONIAL_FILTERS.find((f) => f.id === active) || TESTIMONIAL_FILTERS[0];
  const list = all.filter(filter.test);

  return (
    <section className="pjw-sec" id="pjw-voices" aria-labelledby="pjw-voices-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-voices-title"
          title="What Participants Experienced"
          text="Feedback from students and faculty who took part in ProJenius workshops, in their own words."
        />

        {all.length === 0 ? (
          <div className="pjw-voices__empty">
            <WorkshopEmpty title="Participant feedback is coming soon.">
              Real student and faculty experiences will appear here once they are collected.
            </WorkshopEmpty>
          </div>
        ) : (
          <>
            <div className="pjw-voices__filters" role="group" aria-label="Filter participant feedback">
              {TESTIMONIAL_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="pjw-voices__chip"
                  aria-pressed={f.id === active}
                  onClick={() => setActive(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div aria-live="polite">
              {list.length === 0 ? (
                <WorkshopEmpty title="Nothing here yet.">
                  No {filter.label.toLowerCase()} feedback has been added. Try another filter.
                </WorkshopEmpty>
              ) : (
                <div className={`pjw-voices__layout${list.length === 1 ? ' pjw-voices__layout--single' : ''}`}>
                  <WorkshopVideoCard item={list[0]} variant="featured" onPlay={() => setPlaying(list[0])} />
                  {list.length > 1 && (
                    <div className="pjw-voices__side">
                      {list.slice(1).map((t, i) => (
                        <WorkshopVideoCard key={`${t.name}-${i}`} item={t} variant="mini" onPlay={() => setPlaying(t)} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {!real && (
              <WorkshopSampleNote>
                Placeholder cards. Add real testimonials to <code>WORKSHOP_TESTIMONIALS</code> in
                WorkshopTestimonial.jsx. Use only real feedback and names you have permission to show.
              </WorkshopSampleNote>
            )}
          </>
        )}
      </div>

      {playing && (
        <WorkshopVideoModal
          title={`Feedback from ${playing.name || 'a participant'}`}
          videoUrl={playing.videoUrl}
          caption={playing.workshop ? `${playing.institution || ''} ${playing.workshop}`.trim() : ''}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
}
