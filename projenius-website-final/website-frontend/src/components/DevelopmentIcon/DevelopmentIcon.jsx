import './DevelopmentIcon.css';

const PATHS = {
  web: (<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 14h5" /></>),
  mobile: (<><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>),
  design: (<><path d="M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16l-1 4z" /><path d="M14 7l3 3" /></>),
  ai: (<><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 12h4" /></>),
  auto: (<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="12" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8.5 6h4a3 3 0 013 3v.5M8.5 18h4a3 3 0 003-3v-.5" /></>),
  saas: (<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12.5l9 5 9-5M3 17l9 5 9-5" /></>),
  content: (<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>),
  bug: (<><rect x="8" y="8" width="8" height="11" rx="4" /><path d="M9 8a3 3 0 016 0M4 12h4M16 12h4M5 6l3 3M19 6l-3 3M5 19l3-3M19 19l-3-3M12 11v8" /></>),
  perf: (<><path d="M4 17a8 8 0 1116 0" /><path d="M12 17l4-5M4 21h16" /></>),
  feature: (<><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="M12 8v8M8 12h8" /></>),
  uiux: (<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M10 4v16M3 10h7" /></>),
  support: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" /></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>),
  review: (<><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M8 3v4M16 3v4M3.5 10h17M9 15l2 2 4-4" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>),
  route: (<><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" /></>),
  sliders: (<><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>),
  growth: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  loop: (<><path d="M20 12a8 8 0 11-2.6-5.9" /><path d="M20 4v5h-5" /></>),
};

export default function DevelopmentIcon({ name, className = '' }) {
  return (
    <svg
      className={`pjdevico ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
