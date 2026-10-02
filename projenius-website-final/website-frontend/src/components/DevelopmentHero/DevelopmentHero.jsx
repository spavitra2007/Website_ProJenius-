import './DevelopmentHero.css';
import DevelopmentEyebrow from '../DevelopmentEyebrow/DevelopmentEyebrow';
import DevelopmentButton from '../DevelopmentButton/DevelopmentButton';
import DevelopmentJourneyFlow from '../DevelopmentJourneyFlow/DevelopmentJourneyFlow';

const CONTACT_HREF = '#pjdev-contact'; // change to your real contact route, e.g. '/contact'
const PROCESS_HREF = '#pjdev-process';


const MAIN_PATH =
  'M270 60C270 105 250 105 250 150C250 195 290 195 290 240C290 285 250 285 250 330C250 375 290 375 290 420C290 465 250 465 250 510C250 555 280 555 280 600';
const LOOP_PATH = 'M280 600C335 645 585 650 585 400C585 150 585 60 420 60L306 60';

const NODES = [
  { x: 270, y: 60, label: 'Your requirement', first: true },
  { x: 250, y: 150, label: 'Understand' },
  { x: 290, y: 240, label: 'Design' },
  { x: 250, y: 330, label: 'Build' },
  { x: 290, y: 420, label: 'Integrate' },
  { x: 250, y: 510, label: 'Launch' },
  { x: 280, y: 600, label: 'Improve' },
];

// satellites: chip centre (x, y), chip width, and the journey node it ties into
const SATS = [
  { label: 'Data', x: 400, y: 140, w: 58, to: [250, 150] },
  { label: 'UI/UX', x: 445, y: 235, w: 68, to: [290, 240] },
  { label: 'Web', x: 385, y: 300, w: 52, to: [250, 330] },
  { label: 'Mobile', x: 490, y: 345, w: 72, to: [250, 330] },
  { label: 'SaaS', x: 395, y: 385, w: 60, to: [250, 330] },
  { label: 'AI', x: 415, y: 455, w: 46, to: [290, 420] },
  { label: 'Automation', x: 505, y: 410, w: 104, to: [290, 420] },
];

const STRIP = [
  'Requirement', 'Strategy', 'Design', 'Build', 'Integrate',
  'Test', 'Launch', 'Support', 'Improve', 'Grow',
].map((title) => ({ title }));

export default function DevelopmentHero() {
  return (
    <section id="pjdev-overview" className="pjdev-hero" aria-labelledby="pjdev-hero-title">
      <div className="pjdev-hero__wrap">
        <div className="pjdev-hero__grid">
          <div className="pjdev-hero__copy">
            <DevelopmentEyebrow>Digital Development</DevelopmentEyebrow>
            <h1 id="pjdev-hero-title" className="pjdev-hero__title">
              From Requirements to Digital Products.{' '}
              <span className="pjdev-hero__title-accent">Built Around Your Business.</span>
            </h1>
            <p className="pjdev-hero__lead">
              We design, develop and support digital solutions across websites, web applications, mobile
              applications, SaaS platforms, AI-powered solutions, automation and digital experiences — based
              on what your business actually needs.
            </p>
            <div className="pjdev-hero__actions">
              <DevelopmentButton href={CONTACT_HREF}>Start a Project</DevelopmentButton>
              <DevelopmentButton href={PROCESS_HREF} variant="ghost" down>Explore How We Work</DevelopmentButton>
            </div>
          </div>

          <div className="pjdev-hero__visual">
            <svg
              className="pjdev-hero__svg"
              viewBox="0 0 620 680"
              role="img"
              aria-labelledby="pjdev-hero-svg-title pjdev-hero-svg-desc"
            >
              <title id="pjdev-hero-svg-title">Digital product ecosystem</title>
              <desc id="pjdev-hero-svg-desc">
                A single journey line runs from your requirement through understand, design, build, integrate,
                launch and improve, then loops back. Web, mobile, SaaS, UI/UX, AI, automation and data connect
                into the journey.
              </desc>
              <defs>
                <linearGradient
  id="pjdev-hero-grad"
  x1="0"
  y1="0"
  x2="1"
  y2="0"
>
  <stop
    offset="0%"
    stopColor="#1D5CFF"
  />

  <stop
    offset="50%"
    stopColor="#268CFF"
  />

  <stop
    offset="100%"
    stopColor="#12C9E0"
  />
</linearGradient>
              </defs>

              {SATS.map((s, i) => (
                <path
                  key={`tie-${s.label}`}
                  className={`pjdev-hero__tie pjdev-hero__tie--${i + 1}`}
                  d={`M${s.x} ${s.y}L${s.to[0]} ${s.to[1]}`}
                />
              ))}

              <path className="pjdev-hero__loop" pathLength="1" d={LOOP_PATH} stroke="url(#pjdev-hero-grad)" />
              <polygon className="pjdev-hero__loop-arrow" points="298,60 311,53 311,67" />
              <path
                id="pjdev-hero-path"
                className="pjdev-hero__path"
                pathLength="1"
                d={MAIN_PATH}
                stroke="url(#pjdev-hero-grad)"
              />

              {NODES.map((n, i) => (
                <g key={n.label} className={`pjdev-hero__node pjdev-hero__node--${i + 1}`}>
                  {n.first ? (
                    <>
                      <circle className="pjdev-hero__pulse" cx={n.x} cy={n.y} r="14" />
                      <circle className="pjdev-hero__pulse pjdev-hero__pulse--b" cx={n.x} cy={n.y} r="14" />
                    </>
                  ) : null}
                  <circle className="pjdev-hero__ring" cx={n.x} cy={n.y} r={n.first ? 16 : 11} stroke="url(#pjdev-hero-grad)" />
                  <circle cx={n.x} cy={n.y} r={n.first ? 8 : 4.5} fill="url(#pjdev-hero-grad)" />
                  <text
                    className={`pjdev-hero__label${n.first ? ' pjdev-hero__label--first' : ''}`}
                    x={n.x - (n.first ? 28 : 24)}
                    y={n.y}
                    textAnchor="end"
                    dominantBaseline="central"
                  >
                    {n.label}
                  </text>
                </g>
              ))}

              <circle className="pjdev-hero__packet" r="4.5" opacity="0">
                <set attributeName="opacity" to="1" begin="3.8s" />
                <animateMotion dur="7s" begin="3.8s" repeatCount="indefinite">
                  <mpath href="#pjdev-hero-path" />
                </animateMotion>
              </circle>

              {SATS.map((s, i) => (
                <g key={`sat-${s.label}`} className={`pjdev-hero__sat pjdev-hero__sat--${i + 1}`}>
                  <g transform={`translate(${s.x} ${s.y})`}>
                    <rect className="pjdev-hero__chip" x={-s.w / 2} y="-14" width={s.w} height="28" rx="14" />
                    <text className="pjdev-hero__chip-text" x="0" y="0" textAnchor="middle" dominantBaseline="central">
                      {s.label}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="pjdev-hero__strip">
          <p className="pjdev-hero__strip-caption">One requirement. One digital journey.</p>
          <div className="pjdev-hero__strip-scroll">
            <DevelopmentJourneyFlow items={STRIP} variant="strip" label="The ProJenius development journey" />
          </div>
        </div>
      </div>
    </section>
  );
}
