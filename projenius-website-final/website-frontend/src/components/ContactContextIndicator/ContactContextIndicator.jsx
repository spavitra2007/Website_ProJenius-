import React from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import ContactButton from "../ContactButton/ContactButton";
import "./ContactContextIndicator.css";

/* "You're contacting us about … [Change enquiry type]"
   When the visitor arrived from another ProJenius page it reads "Your enquiry" + a source badge. */
export default function ContactContextIndicator({ type, arrived, sourceLabel, onChange }) {
  return (
    <div className="pjct-ctx">
      <span className="pjct-ctx__icon"><ContactIcon name={type.icon} size="1.3em" /></span>
      <div className="pjct-ctx__text">
        <div className="pjct-ctx__label">{arrived ? "Your enquiry" : "You’re contacting us about"}</div>
        <div className="pjct-ctx__value">
          {type.label}
          {arrived && sourceLabel && <span className="pjct-ctx__badge">Selected from {sourceLabel}</span>}
        </div>
      </div>
      <ContactButton variant="link" onClick={onChange}>Change enquiry type</ContactButton>
    </div>
  );
}
