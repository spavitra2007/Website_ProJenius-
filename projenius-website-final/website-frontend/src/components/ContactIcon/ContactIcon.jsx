import React from "react";
import "./ContactIcon.css";

const PATHS = {
  startup: (<><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" /></>),
  development: (<><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /><path d="M14 4l-4 16" /></>),
  workshop: (<><rect x="3" y="4" width="18" height="11" rx="2" /><path d="M7 8.5h5M7 11.5h8" /><path d="M12 15v3" /><path d="M8 21l4-3 4 3" /></>),
  course: (<><path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z" /><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" /></>),
  internship: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 13h20" /></>),
  career: (<><circle cx="12" cy="12" r="9.5" /><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z" /></>),
  general: (<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
  phone: (<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />),
  whatsapp: (<><path d="M3 21l1.6-4.7A9 9 0 1 1 8 19.5z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-.8.8a4 4 0 0 1-1.9-1.9l.8-.8-1-2z" /></>),
  pin: (<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  upload: (<><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>),
  x: (<path d="M6 6l12 12M18 6L6 18" />),
  alert: (<><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><path d="M12 16.5v.01" /></>),
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></>),
  arrowDown: (<><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></>),
  chevron: (<path d="M6 9l6 6 6-6" />),
};

export default function ContactIcon({ name, size = "1.25em", strokeWidth = 1.8 }) {
  return (
    <svg
      className="pjct-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
