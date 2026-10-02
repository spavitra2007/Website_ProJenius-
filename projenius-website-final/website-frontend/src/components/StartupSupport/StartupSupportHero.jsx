import { useEffect, useMemo, useRef } from 'react';
import { HERO_NODES } from './StartupSupportData.js';
import { buildPath, pointAt } from './StartupSupportUtils.js';
import { useReducedMotion } from './StartupSupportHooks.js';
import './StartupSupportHero.css';

/* StartupSupportHero — the "idea to startup-ready" animated pathway.
   The route, the glowing nodes and the travelling dot are all driven
   imperatively via refs/rAF for smooth 60fps animation. */
function StartupSupportHero({ onOpenContact, onJumpToStage }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const decorRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);
  const nodeRefs = useRef([]);

  const path = useMemo(() => buildPath(HERO_NODES.map((n) => [n.x, n.y]), 6), []);

  useEffect(() => {
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (wrapRef.current) io.observe(wrapRef.current);

    const setNodesUpTo = (frac) => {
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('ssp-hero-node--on', frac >= path.marks[i] - 0.002);
      });
    };

    if (reduced) {
      progressRef.current?.setAttribute('stroke-dashoffset', '0');
      setNodesUpTo(1);
      if (dotRef.current) dotRef.current.setAttribute('opacity', '1');
    } else {
      const duration = 3800;
      const start = performance.now() + 350;
      const introFrame = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - t, 3);
        progressRef.current?.setAttribute('stroke-dashoffset', String(1 - eased));
        setNodesUpTo(eased);
        if (t < 1) { raf = requestAnimationFrame(introFrame); }
        else { dotRef.current?.setAttribute('opacity', '1'); raf = requestAnimationFrame(idleFrame); }
      };
      const idleFrame = (now) => {
        if (visible && dotRef.current) {
          const p = pointAt(path, (now / 9000) % 1);
          dotRef.current.setAttribute('cx', p.x.toFixed(1));
          dotRef.current.setAttribute('cy', p.y.toFixed(1));
        }
        raf = requestAnimationFrame(idleFrame);
      };
      raf = requestAnimationFrame(introFrame);
    }
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduced, path]);

  /* Subtle pointer parallax on the decorative rings/ticks, smoothed with a small lerp. */
  useEffect(() => {
    if (reduced) return undefined;
    const el = wrapRef.current;
    if (!el) return undefined;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target = { x: ((e.clientX - r.left) / r.width) - 0.5, y: ((e.clientY - r.top) / r.height) - 0.5 };
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      if (decorRef.current) decorRef.current.setAttribute('transform', `translate(${(current.x * 12).toFixed(2)} ${(current.y * 12).toFixed(2)})`);
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, [reduced]);

  const goToNode = (node) => { onJumpToStage(node.stage); };

  const ticks = [];
  for (let y = 30; y <= 670; y += 20) {
    ticks.push(<line key={y} className="ssp-hero-tick" x1={4} x2={y % 100 === 30 ? 20 : 12} y1={y} y2={y} />);
  }

  return (
    <header className="ssp-hero ssp-section--dark ssp-gridbg ssp-hero-glow" id="ssp-top" ref={wrapRef}>
      <div className="ssp-hero-grid">
        <div>
          <p className="ssp-eyebrow">Startup Support</p>
          <h1 className="ssp-hero-heading">
            <span>From Idea to</span>
            <span className="ssp-gradient-text">Startup-Ready.</span>
          </h1>
          <p className="ssp-hero-lede">
            Have an idea, problem, prototype or early-stage venture? ProJenius helps innovators understand the
            problem, validate the opportunity, build the right technology and take the next practical step.
          </p>
          <div className="ssp-cta-row">
            <button className="ssp-btn ssp-btn--primary" type="button" onClick={() => onOpenContact(null, 'idea')}>
              Discuss Your Idea <span className="ssp-btn-arrow" aria-hidden="true">→</span>
            </button>
            <a className="ssp-btn ssp-btn--ghost ssp-btn--down" href="#ssp-journey">
              Explore Our Approach <span className="ssp-btn-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="ssp-hero-note"><span className="ssp-hero-note-dot" aria-hidden="true" />Hover the route below. Every stage is something we can help with.</p>
        </div>

        <div className="ssp-hero-viz">
          <svg viewBox="0 0 560 690" role="group" aria-label="Pathway from idea to startup: idea, validate, build, protect, establish, grow">
            <defs>
              <linearGradient id="sspHeroGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="690">
                <stop offset="0" stopColor="#5C9BFF" /><stop offset=".55" stopColor="#2ED3F0" /><stop offset="1" stopColor="#A99EFF" />
              </linearGradient>
              <radialGradient id="sspHeroHalo">
                <stop offset="0" stopColor="#3FA0FF" stopOpacity=".5" /><stop offset="1" stopColor="#3FA0FF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g ref={decorRef} aria-hidden="true">
              {ticks}
              <circle className="ssp-hero-ring ssp-hero-ring--dashed" cx={190} cy={70} r={74} />
              <circle className="ssp-hero-ring" cx={190} cy={70} r={110} />
              <path className="ssp-hero-echo" d={path.d} transform="translate(-34 0)" />
              <path className="ssp-hero-echo" d={path.d} transform="translate(34 0)" />
              <text className="ssp-hero-caption" transform="translate(548 345) rotate(90)" textAnchor="middle">IDEA → STARTUP-READY</text>
            </g>

            <path className="ssp-hero-base-path" d={path.d} />
            <path ref={progressRef} className="ssp-hero-progress-path" d={path.d} pathLength="1" stroke="url(#sspHeroGrad)" strokeDasharray="1 2" strokeDashoffset="1" />

            {HERO_NODES.map((n, i) => {
              const left = n.x < 280;
              const tx = left ? -34 : 34;
              return (
                <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
                  <g
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className="ssp-hero-node"
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.label}: ${n.sub}. Open in journey`}
                    onClick={() => goToNode(n)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToNode(n); } }}
                  >
                    <circle className="ssp-hero-node-halo" r={48} fill="url(#sspHeroHalo)" />
                    <circle className={`ssp-hero-node-pulse ssp-hero-node-pulse--d${i % 3}`} r={20} />
                    <circle className="ssp-hero-node-ring" r={20} />
                    <circle className="ssp-hero-node-core" r={6.5} />
                    <text className="ssp-hero-node-label" x={tx} y={-2} textAnchor={left ? 'end' : 'start'}>{n.label}</text>
                    <text className="ssp-hero-node-sub" x={tx} y={19} textAnchor={left ? 'end' : 'start'}>{n.sub}</text>
                  </g>
                </g>
              );
            })}
            <circle ref={dotRef} className="ssp-hero-lead-dot" r={4.5} opacity={0} />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default StartupSupportHero;
