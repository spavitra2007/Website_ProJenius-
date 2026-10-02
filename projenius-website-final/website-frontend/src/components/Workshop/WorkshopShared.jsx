import { useEffect, useRef, useState } from 'react';
import './WorkshopShared.css';

/* =====================================================================
   SHARED SETTINGS (used by several components)
   ===================================================================== */

/* Set false to hide sample layouts and show clean empty states instead. */
export const SHOW_PLACEHOLDERS = true;

/* Match these to your real routes. */
export const WORKSHOP_ROUTES = {
  home: '/',
  workshop: '/workshop',
  courses: '/courses',
  development: '/development',
  internship: '/internship',
  careerGuidance: '/career-guidance',
  startupSupport: '/startup-support',
  contact: '/contact',
};
export const workshopHref = (key, query) =>
  (WORKSHOP_ROUTES[key] || '/') + (query ? `?${query}` : '');

/* =====================================================================
   SHARED HOOKS
   ===================================================================== */
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* true when the visitor asked their device for less motion */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(REDUCED_QUERY).matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(REDUCED_QUERY);
    const onChange = () => setReduced(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

/* [ref, seen] - becomes true once the element enters the viewport */
export function useInView({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold, rootMargin]);
  return [ref, seen];
}

/* Scroll-driven path fill used by the journey and the process timelines.
   Returns [rootRef, fills]; fills[i] = { on: boolean, level: 0..20 }.
   Works for both horizontal (desktop) and vertical (mobile) layouts. */
export function useScrollFill(count, { nodeSelector, line = 0.7 }) {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [fills, setFills] = useState(() =>
    Array.from({ length: count }, () => ({ on: false, level: 0 }))
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (reduced) {
      setFills(Array.from({ length: count }, () => ({ on: true, level: 20 })));
      return undefined;
    }
    let raf = 0;
    const compute = () => {
      raf = 0;
      const nodes = Array.from(root.querySelectorAll(nodeSelector));
      if (nodes.length < count) return;
      const y = window.innerHeight * line;
      const cs = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let pos;
      if (Math.abs(cs[count - 1] - cs[0]) < 20) {
        const r = root.getBoundingClientRect();
        pos = y - r.top < 0 ? -1 : clamp((y - r.top - 30) / (window.innerHeight * 0.3), 0, 1) * (count - 1);
      } else if (y < cs[0]) {
        pos = -1;
      } else {
        pos = count - 1;
        for (let i = 0; i < count - 1; i += 1) {
          if (y < cs[i + 1]) {
            pos = i + (y - cs[i]) / (cs[i + 1] - cs[i]);
            break;
          }
        }
      }
      const next = Array.from({ length: count }, (_, i) => ({
        on: pos >= i,
        level: Math.round(clamp(pos - i, 0, 1) * 20),
      }));
      setFills((prev) =>
        prev.length === next.length && prev.every((p, i) => p.on === next[i].on && p.level === next[i].level)
          ? prev
          : next
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [count, nodeSelector, line, reduced]);

  return [rootRef, fills];
}

/* =====================================================================
   SHARED COMPONENTS
   ===================================================================== */
/* Fades a block in when it scrolls into view */
export function WorkshopReveal({ className = '', children }) {
  const [ref, seen] = useInView({ threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
  return (
    <div ref={ref} className={`pjw-reveal${seen ? ' pjw-reveal--in' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

/* One place for internal links.
   Uses a normal <a>. If your app uses react-router, replace the <a> with
   <Link to={to} ...> here and every internal link on the page will follow. */
export function WorkshopLink({ to, className, children, ...rest }) {
  return (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  );
}

/* Smooth-scrolls to a section on the same page */
export function WorkshopScrollLink({ targetId, className, children }) {
  const reduced = usePrefersReducedMotion();
  const onClick = (e) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <a href={`#${targetId}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function WorkshopSectionHead({ titleId, title, text }) {
  return (
    <WorkshopReveal className="pjw-head">
      <h2 className="pjw-h2" id={titleId}>{title}</h2>
      {text ? <p className="pjw-lead">{text}</p> : null}
    </WorkshopReveal>
  );
}

/* Small amber notice shown only while sample data is displayed */
export function WorkshopSampleNote({ children }) {
  return (
    <p className="pjw-note">
      <span aria-hidden="true">&#9888;</span>
      <span><b>Sample layout.</b> {children}</span>
    </p>
  );
}

export function WorkshopEmpty({ title, children }) {
  return (
    <div className="pjw-empty">
      <strong>{title}</strong>
      {children}
    </div>
  );
}
