import React from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import "./ContactEnquiryCard.css";

/* One large selectable tile. The whole card is a <label> around a real radio input,
   so mouse, touch and keyboard (arrow keys) all work and screen readers announce the state. */
export default function ContactEnquiryCard({ type, checked, onSelect }) {
  return (
    <label className="pjct-card">
      <input
        className="pjct-card__input"
        type="radio"
        name="pjct-enquiry-type"
        value={type.key}
        checked={checked}
        onChange={() => onSelect(type.key)}
      />
      <span className="pjct-card__box">
        <span className="pjct-card__icon"><ContactIcon name={type.icon} size="1.4em" /></span>
        <span className="pjct-card__text">
          <span className="pjct-card__title">{type.label}</span>
          <span className="pjct-card__desc">{type.desc}</span>
        </span>
        <span className="pjct-card__check" aria-hidden="true"><ContactIcon name="check" size="1em" strokeWidth={3} /></span>
      </span>
    </label>
  );
}
