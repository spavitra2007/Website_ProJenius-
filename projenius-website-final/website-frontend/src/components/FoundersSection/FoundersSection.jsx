import React, { useEffect, useRef, useState } from 'react';
import './FoundersSection.css';

const founders = [
  {
    name: 'Karthick Ganesh M',
    role: 'Founder & CEO',
    image: '/images/founder1.png',
    bio: 'Leads the vision and strategy of the incubator, helping student entrepreneurs turn ideas into launch-ready startups.',
    socials: { facebook: '#', x: '#', linkedin: '#', instagram: '#' },
  },
  {
    name: 'Harshini',
    role: 'Co-Founder & CTO',
    image: '/images/founder2.png',
    bio: 'Oversees technology and product development, guiding student teams to build scalable, real-world solutions and products.',
    socials: { facebook: '#', x: '#', linkedin: '#', instagram: '#' },
  },
];

const leaders = [
  {
    name: 'Dr. M. Karthika',
    role: 'Strategic Advisor & Mentor',
    image: '/images/principal.png',
    bio: 'Provides strategic guidance and mentorship to student startups, supporting business planning, innovation, and sustainable growth.',
    socials: { facebook: '#', x: '#', linkedin: '#', instagram: '#' },
  },
];

/* Small inline icons so no extra library is needed */
const icons = {
  facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
  ),
  x: (
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.2 4.7H5.4l11.3 14.5z" />
  ),
  linkedin: (
    <path d="M4.5 9h3.7v11.5H4.5V9zm1.9-5.5a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2zM10.5 9h3.5v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.2h-3.7v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-3.7V9z" />
  ),
  instagram: (
    <path d="M8 3h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5zm0 2a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V8a3 3 0 00-3-3H8zm4 3.2a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6zm0 2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm4.2-3.5a.9.9 0 110 1.8.9.9 0 010-1.8z" />
  ),
};

function SocialLinks({ socials, name }) {
  if (!socials) return null;
  return (
    <div className="person-socials">
      {Object.entries(socials).map(([key, href]) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on ${key}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons[key]}
          </svg>
        </a>
      ))}
    </div>
  );
}

/* Scroll reveal: plays every time the card enters the screen */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function PersonCard({ name, role, bio, image, socials, index = 0 }) {
  const [ref, inView] = useInView();
  return (
    <article
      ref={ref}
      className={`person-card${inView ? ' is-visible' : ''}`}
      style={{ '--d': `${index * 0.15}s` }}
    >
      <div className="person-photo">
        <img src={image} alt={`${name}, ${role}`} loading="lazy" />
        <SocialLinks socials={socials} name={name} />
      </div>
      <div className="person-text">
        <h3 className="person-name">{name}</h3>
        <p className="person-role">{role}</p>
        <p className="person-bio">{bio}</p>
      </div>
    </article>
  );
}

function FoundersSection() {
  return (
    <>
      <section className="founders-section">
        <div className="section-inner">
          <div className="section-tag">Leadership Team</div>
          <h2 className="section-title">
            Meet Our <span className="title-highlight">Founders</span>
          </h2>
          <span className="title-underline" aria-hidden="true" />
          <p className="section-description">
            Leading our mission to nurture student innovators and turn ideas into real-world ventures.
          </p>
          <div className="founders-cards-container">
            {founders.map((p, i) => (
              <PersonCard key={p.name} index={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="founders-section leadership-section">
        <div className="section-inner">
          <h2 className="section-title">
            Meet Our <span className="title-highlight">Strategic Advisor</span>
          </h2>
          <span className="title-underline" aria-hidden="true" />
          <div className="leader-cards-container">
            {leaders.map((p) => (
              <PersonCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FoundersSection;