import React from "react";
import "./ContactFormProgress.css";

/* Small "2 of 5 required" progress bar (uses a native <progress>, so no inline styles) */
export default function ContactFormProgress({ done, total }) {
  if (!total) return null;
  return (
    <div className="pjct-progress" aria-hidden="true">
      <strong className="pjct-progress__text">{done} of {total} required</strong>
      <progress className="pjct-progress__bar" value={done} max={total} />
      <span className="pjct-progress__legend"><span className="pjct-progress__star">*</span> Required</span>
    </div>
  );
}
