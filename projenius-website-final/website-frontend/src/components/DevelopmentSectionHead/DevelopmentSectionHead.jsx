import { useEffect, useRef, useState } from 'react';
import './DevelopmentSectionHead.css';

// Scroll-reveal helper: kept inside this file on purpose (no separate JS files).
function usePjdevInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -4% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}


export default function DevelopmentSectionHead({ id, title, text, center = false }) {
  const [ref, inView] = usePjdevInView(0.2);
  const classes = [
    'pjdevhead',
    center ? 'pjdevhead--center' : '',
    inView ? 'pjdevhead--in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      <h2 id={id} className="pjdevhead__title">{title}</h2>
      {text ? <p className="pjdevhead__text">{text}</p> : null}
    </div>
  );
}
