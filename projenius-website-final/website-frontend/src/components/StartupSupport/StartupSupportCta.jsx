import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from './StartupSupportHooks.js';
import './StartupSupportCta.css';

/* StartupSupportCta — final call to action with a drifting node network
   drawn on canvas behind the copy. Pauses off-screen and honours reduced motion. */
function StartupSupportCta({ onOpenContact }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0, once: false });
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current, section = sectionRef.current;
    if (!canvas || !section) return undefined;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, points = [], mouse = null, raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(60, Math.max(18, (width * height) / 20000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1.2, accent: Math.random() < 0.2
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = 150;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(120,170,255,${(1 - d / linkDist) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < 190) {
            ctx.strokeStyle = `rgba(63,216,240,${(1 - d / 190) * 0.6})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      points.forEach((p) => {
        ctx.fillStyle = p.accent ? 'rgba(63,216,240,.95)' : 'rgba(127,176,255,.75)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
    };

    const step = () => {
      if (inView && !reduced) {
        points.forEach((p) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
        });
        draw();
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouse = null; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    resize();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [inView, reduced]);

  return (
    <section className="ssp-section ssp-section--dark ssp-cta-section" id="ssp-contact" aria-labelledby="ssp-cta-heading" ref={sectionRef}>
      <canvas className="ssp-cta-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="ssp-wrap ssp-cta-content">
        <h2 className="ssp-cta-heading" id="ssp-cta-heading">
          <span>Have an Idea?</span>
          <span className="ssp-gradient-text">Let's Figure Out What Comes Next.</span>
        </h2>
        <p className="ssp-lede ssp-cta-lede">You don't need to have everything figured out. Start with your idea, problem or concept and let's explore the right next step.</p>
        <div className="ssp-cta-row">
          <button className="ssp-btn ssp-btn--primary" type="button" onClick={() => onOpenContact(null, 'idea')}>
            Discuss Your Idea <span className="ssp-btn-arrow" aria-hidden="true">→</span>
          </button>
          <button className="ssp-btn ssp-btn--ghost" type="button" onClick={() => onOpenContact(null, 'contact')}>
            Contact ProJenius
          </button>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportCta;
