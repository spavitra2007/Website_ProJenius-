import { useEffect, useRef } from 'react';
import './WorkshopCTA.css';
import { WorkshopLink, workshopHref, usePrefersReducedMotion } from './WorkshopShared';

/* Closing call to action with a quiet connected-node canvas background.
   Pauses when off-screen and draws a single still frame for reduced motion. */
export default function WorkshopCTA() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext && canvas.getContext('2d');
    if (!ctx) return undefined;

    let w = 0;
    let h = 0;
    let nodes = [];
    let frame = 0;
    let running = false;

    const draw = (step) => {
      ctx.clearRect(0, 0, w, h);
      if (step) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        });
      }
      const D = 140;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < D) {
            ctx.strokeStyle = `rgba(140,165,255,${((1 - d / D) * 0.34).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = n.accent ? 'rgba(255,180,0,.9)' : 'rgba(190,205,255,.75)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(56, Math.max(16, (w * h) / 20000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.6 + Math.random() * 1.6,
        accent: i % 9 === 0,
      }));
      draw(false);
    };

    const loop = () => {
      draw(true);
      frame = requestAnimationFrame(loop);
    };

    size();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(size);
      ro.observe(canvas);
    } else {
      window.addEventListener('resize', size);
    }

    let io;
    if (!reduced && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      });
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(frame);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', size);
    };
  }, [reduced]);

  return (
    <section className="pjw-sec pjw-cta pjw-on-deep" id="pjw-plan" aria-labelledby="pjw-cta-title">
      <canvas className="pjw-cta__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="pjw-wrap pjw-cta__inner">
        <h2 className="pjw-h2 pjw-cta__h2" id="pjw-cta-title">Have a Workshop in Mind?</h2>
        <p className="pjw-lead pjw-cta__lead">
          Tell us what your students or institution want to explore. Let&rsquo;s design a practical workshop around it.
        </p>
        <div className="pjw-btn-row">
          <WorkshopLink to={workshopHref('contact', 'intent=plan-workshop')} className="pjw-btn pjw-btn--light">
            Plan a Workshop
          </WorkshopLink>
          <WorkshopLink to={workshopHref('contact')} className="pjw-btn pjw-btn--outline-light">
            Contact Us
          </WorkshopLink>
        </div>
      </div>
    </section>
  );
}
