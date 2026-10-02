import { useEffect, useRef, useState } from 'react';
import './DevelopmentJourneyFlow.css';

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


// items: [{ title, sub? }]
// variant: 'strip' | 'band' | 'track' | 'cta'
export default function DevelopmentJourneyFlow({ items, variant = 'strip', label }) {
  const [ref, inView] = usePjdevInView(0.3);
  const classes = [
    'pjdevflow',
    `pjdevflow--${variant}`,
    inView ? 'pjdevflow--in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ol ref={ref} className={classes} aria-label={label}>
      {items.map((item) => (
        <li key={item.title} className="pjdevflow__node">
          <span className="pjdevflow__dot" />
          <span className="pjdevflow__title">{item.title}</span>
          {item.sub ? <span className="pjdevflow__sub">{item.sub}</span> : null}
        </li>
      ))}
    </ol>
  );
}
