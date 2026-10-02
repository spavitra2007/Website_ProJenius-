const PATHS = {
  understand: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
  explore: (<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>),
  build: <path d="M14.7 6.3a4 4 0 0 0-5 5L3.5 17.5a1.8 1.8 0 0 0 2.5 2.5l6.2-6.2a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z" />,
  test: (<><path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4A1.5 1.5 0 0 0 19 19l-5-10V3" /><path d="M7.5 15h9" /></>),
  experience: (<><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M12 16v4M8 20h8M8 12l2.5-3 2 2 3-3.5" /></>),
  ai: (<><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="6" r="1.8" /><circle cx="19" cy="6" r="1.8" /><circle cx="5" cy="18" r="1.8" /><circle cx="19" cy="18" r="1.8" /><path d="M6.5 7l4 3.5M17.5 7l-4 3.5M6.5 17l4-3.5M17.5 17l-4-3.5" /></>),
  iot: (<><path d="M4 9.5a11 11 0 0 1 16 0M7 13a6.5 6.5 0 0 1 10 0" /><rect x="9.5" y="16" width="5" height="5" rx="1" /></>),
  robotics: (<><rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 5V8M9.5 13h.01M14.5 13h.01M9 21v-3M15 21v-3" /><circle cx="12" cy="3.8" r="1" /></>),
  software: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
  pcb: (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v5h4l2 2v4h5M4 14h6l2 2v4" /><circle cx="9" cy="9" r=".8" /></>),
  proto: <path d="M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  startup: (<><path d="M12 3c3 2 5 5.5 5 9l-2.5 3h-5L7 12c0-3.5 2-7 5-9zM9.5 15 7 20l4-2M14.5 15l2.5 5-4-2" /><circle cx="12" cy="10" r="1.6" /></>),
  emerging: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  play: <path d="M8 5.5v13l11-6.5z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  left: <path d="m15 5-7 7 7 7" />,
  right: <path d="m9 5 7 7-7 7" />,
  image: (<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-8 8" /></>),
};

export default function WorkshopIcon({ name, size = 24, filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
