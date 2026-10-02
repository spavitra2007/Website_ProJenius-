import { useEffect, useMemo, useRef, useState } from 'react';
import { STAGES } from './StartupSupportData.js';
import { buildPath, pointAt, clamp, pad } from './StartupSupportUtils.js';
import { useInView, useMediaQuery, useReducedMotion } from './StartupSupportHooks.js';
import './StartupSupportJourney.css';

const NAV_H = 68;
const N = STAGES.length;

/* StartupSupportJourney — "Every Idea Has a Different Path."
   Desktop: a sticky panel with a curved SVG route that scrubs as the
   page scrolls. Mobile: a plain vertical pathway, scroll-activated. */
function StartupSupportJourney({ jumpTarget }) {
  const isDesktop = useMediaQuery('(min-width:960px) and (min-height:620px)');
  const reduced = useReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { threshold: 0.1 });

  const path = useMemo(() => buildPath(STAGES.map((_, i) => [i % 2 === 0 ? 170 : 370, 50 + i * 100]), 6), []);

  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const progressRef = useRef(null);
  const leadRef = useRef(null);
  const nodeRefs = useRef([]);
  const [stage, setStage] = useState(0);

  const mobItemRefs = useRef([]);
  const mobWrapRef = useRef(null);
  const mobBaseLineRef = useRef(null);
  const mobFillLineRef = useRef(null);
  const [mobStage, setMobStage] = useState(0);

  const scrollToStage = (i) => {
    const target = clamp(i, 0, N - 1);
    if (isDesktop && trackRef.current && stickyRef.current) {
      const top = trackRef.current.getBoundingClientRect().top + window.scrollY;
      const total = trackRef.current.offsetHeight - stickyRef.current.offsetHeight;
      window.scrollTo({ top: top - NAV_H + ((target + 0.12) / N) * total, behavior: reduced ? 'auto' : 'smooth' });
    } else {
      const el = mobItemRefs.current[target];
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }
  };

  /* Jump requests coming from the Hero / Finder sections. */
  useEffect(() => {
    if (jumpTarget && typeof jumpTarget.index === 'number') scrollToStage(jumpTarget.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpTarget]);

  /* Desktop: scroll-scrub the pathway. */
  useEffect(() => {
    if (!isDesktop) return undefined;
    let ticking = false;
    const frame = () => {
      ticking = false;
      const track = trackRef.current, sticky = stickyRef.current;
      if (!track || !sticky) return;
      const total = track.offsetHeight - sticky.offsetHeight;
      if (total <= 0) return;
      const r = track.getBoundingClientRect();
      const s = clamp((NAV_H - r.top) / total, 0, 1);
      const x = s * N;
      const i = Math.min(N - 1, Math.floor(x));
      const local = i === N - 1 ? 1 : x - i;
      setStage(i);
      const a = path.marks[i], b = path.marks[Math.min(N - 1, i + 1)];
      const f = i === N - 1 ? 1 : a + (b - a) * local;
      progressRef.current?.setAttribute('stroke-dashoffset', (1 - f).toFixed(4));
      const p = pointAt(path, f);
      leadRef.current?.setAttribute('cx', p.x.toFixed(1));
      leadRef.current?.setAttribute('cy', p.y.toFixed(1));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [isDesktop, path]);

  /* Mobile: highlight the active stage as it crosses the activation line, and grow the connecting fill. */
  useEffect(() => {
    if (isDesktop) return undefined;
    let ticking = false;
    const frame = () => {
      ticking = false;
      const items = mobItemRefs.current;
      const wrap = mobWrapRef.current;
      if (!items.length || !items[0] || !wrap) return;
      const line = window.innerHeight * 0.55;
      let active = 0;
      items.forEach((el, i) => { if (el && el.getBoundingClientRect().top < line) active = i; });
      setMobStage(active);
      const wrapTop = wrap.getBoundingClientRect().top;
      const first = items[0].querySelector('.ssp-journey-mob-node').getBoundingClientRect();
      const last = items[N - 1].querySelector('.ssp-journey-mob-node').getBoundingClientRect();
      const cx = first.left - wrapTop < 0 ? 22 : (first.left + first.width / 2) - wrap.getBoundingClientRect().left;
      const y0 = first.top + first.height / 2 - wrapTop, y1 = last.top + last.height / 2 - wrapTop;
      const yNow = clamp(line - wrapTop, y0, y1);
      if (mobBaseLineRef.current) {
        mobBaseLineRef.current.setAttribute('x1', cx); mobBaseLineRef.current.setAttribute('x2', cx);
        mobBaseLineRef.current.setAttribute('y1', y0); mobBaseLineRef.current.setAttribute('y2', y1);
      }
      if (mobFillLineRef.current) {
        mobFillLineRef.current.setAttribute('x1', cx); mobFillLineRef.current.setAttribute('x2', cx);
        mobFillLineRef.current.setAttribute('y1', y0); mobFillLineRef.current.setAttribute('y2', yNow);
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [isDesktop]);

  const s = STAGES[stage];
  const pts = STAGES.map((_, i) => [i % 2 === 0 ? 170 : 370, 50 + i * 100]);

  return (
    <section className="ssp-section ssp-section--dark ssp-journey ssp-gridbg ssp-gridbg--soft" id="ssp-journey" aria-labelledby="ssp-journey-heading">
      <div className="ssp-wrap ssp-journey-head" ref={headRef}>
        <div className={`ssp-section-head ssp-reveal${headInView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">The startup journey</p>
          <h2 className="ssp-title" id="ssp-journey-heading">Every Idea Has a Different Path.</h2>
          <p className="ssp-lede">There is no single formula for building a startup. The right path depends on the problem, technology, stage and goals.</p>
        </div>
      </div>

      {/* Desktop: scroll-scrubbed pathway */}
      <div className="ssp-journey-desktop">
        <div className="ssp-journey-track" ref={trackRef}>
          <div className="ssp-journey-sticky" ref={stickyRef}>
            <div className="ssp-wrap ssp-journey-grid">
              <div>
                <div className="ssp-journey-count">
                  <span>STAGE {s.num} / {pad(N)}</span>
                  <span className="ssp-journey-count-segments" aria-hidden="true">
                    {STAGES.map((st, j) => (<span key={st.key} className={`ssp-journey-count-seg${j <= stage ? ' ssp-journey-count-seg--on' : ''}`} />))}
                  </span>
                </div>
                <div className="ssp-journey-body" aria-live="polite" key={stage}>
                  <div className="ssp-journey-stage-head">
                    <span className="ssp-journey-stage-num" aria-hidden="true">{s.num}</span>
                    <h3 className="ssp-journey-stage-key">{s.key}</h3>
                  </div>
                  <p className="ssp-journey-stage-title">{s.title}</p>
                  <ul className="ssp-journey-list">
                    {s.items.map((it) => (<li key={it}>{it}</li>))}
                  </ul>
                </div>
                <div className="ssp-journey-controls">
                  <button className="ssp-journey-ctrl-btn" type="button" aria-label="Previous stage" disabled={stage === 0} onClick={() => scrollToStage(stage - 1)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button className="ssp-journey-ctrl-btn" type="button" aria-label="Next stage" disabled={stage === N - 1} onClick={() => scrollToStage(stage + 1)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>

              <div className="ssp-journey-map">
                <svg viewBox="0 0 540 700" role="group" aria-label="Seven-stage startup journey pathway">
                  <defs>
                    <linearGradient id="sspJourneyGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="700">
                      <stop offset="0" stopColor="#5C9BFF" /><stop offset=".55" stopColor="#2ED3F0" /><stop offset="1" stopColor="#A99EFF" />
                    </linearGradient>
                    <radialGradient id="sspJourneyHalo">
                      <stop offset="0" stopColor="#3FA0FF" stopOpacity=".5" /><stop offset="1" stopColor="#3FA0FF" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path className="ssp-journey-base-path" d={path.d} />
                  <path ref={progressRef} className="ssp-journey-progress-path" d={path.d} pathLength="1" stroke="url(#sspJourneyGrad)" strokeDasharray="1 2" strokeDashoffset="1" />
                  {STAGES.map((st, i) => {
                    const [x, y] = pts[i];
                    const left = x < 270;
                    const tx = left ? -38 : 38;
                    const cls = `ssp-journey-node${i < stage ? ' ssp-journey-node--done' : ''}${i === stage ? ' ssp-journey-node--active' : ''}`;
                    return (
                      <g key={st.key} transform={`translate(${x} ${y})`}>
                        <g
                          ref={(el) => { nodeRefs.current[i] = el; }}
                          className={cls}
                          tabIndex={0}
                          role="button"
                          aria-label={`Stage ${st.num}: ${st.key}`}
                          onClick={() => scrollToStage(i)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToStage(i); } }}
                        >
                          <circle className="ssp-journey-node-halo" r={54} fill="url(#sspJourneyHalo)" />
                          <circle className="ssp-journey-node-ring" r={22} />
                          <text className="ssp-journey-node-idx" y={0}>{st.num}</text>
                          <text className="ssp-journey-node-label" x={tx} y={1} textAnchor={left ? 'end' : 'start'} dominantBaseline="central">{st.key}</text>
                        </g>
                      </g>
                    );
                  })}
                  <circle ref={leadRef} className="ssp-journey-lead-dot" r={5} cx={pts[0][0]} cy={pts[0][1]} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical pathway */}
      <div className="ssp-wrap ssp-journey-mobile">
        <div className="ssp-journey-mob" ref={mobWrapRef}>
          <svg className="ssp-journey-mob-svg" aria-hidden="true">
            <line ref={mobBaseLineRef} className="ssp-journey-mob-track-line" />
            <line ref={mobFillLineRef} className="ssp-journey-mob-fill-line" />
          </svg>
          <ol>
            {STAGES.map((st, i) => (
              <li
                key={st.key}
                ref={(el) => { mobItemRefs.current[i] = el; }}
                className={`ssp-journey-mob-item${i < mobStage ? ' ssp-journey-mob-item--done' : ''}${i === mobStage ? ' ssp-journey-mob-item--active' : ''}`}
              >
                <button className="ssp-journey-mob-node" type="button" aria-label={`Go to stage ${st.num}: ${st.key}`} onClick={() => scrollToStage(i)}>{st.num}</button>
                <div>
                  <h3 className="ssp-journey-mob-key">{st.key}</h3>
                  <p className="ssp-journey-mob-title">{st.title}</p>
                  <div className="ssp-journey-mob-expand"><div>
                    <ul>{st.items.map((it) => (<li key={it}>{it}</li>))}</ul>
                  </div></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportJourney;
