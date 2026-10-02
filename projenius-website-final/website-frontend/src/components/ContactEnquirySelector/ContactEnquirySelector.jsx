import { useRef, useState } from "react";

import ContactEnquiryCard
  from "../ContactEnquiryCard/ContactEnquiryCard";

import ContactButton
  from "../ContactButton/ContactButton";

import ContactIcon
  from "../ContactIcon/ContactIcon";
import { CONTACT_TYPES } from "../ContactConfig/ContactConfig";
import "./ContactEnquirySelector.css";

/* Display order of the tiles */
const ORDER = ["startup", "development", "workshop", "course", "internship", "career", "general"];

/* "What Can We Help You With?" + tiles + "Not sure?" card.
   `children` is the form zone (rendered only after a type is chosen). */
export default function ContactEnquirySelector({ selected, onSelect, children }) {
  const lastPointer = useRef(0);

  // Scroll down to the form only when the choice was made with a pointer/touch
  // (not when a keyboard user arrows through the radios).
  const handleSelect = (key) => onSelect(key, { scroll: Date.now() - lastPointer.current < 700 });

  return (
    <section className="pjct-selector" id="pjct-enquiry" aria-labelledby="pjct-selector-title">
      <div className="pjct-selector__inner">
        <header className="pjct-selector__head">
          <h2 className="pjct-selector__title" id="pjct-selector-title">What Can We Help You With?</h2>
          <p className="pjct-selector__support">Choose what you would like to discuss with ProJenius.</p>
        </header>

        <div className="pjct-selector__grid">
          <div
            className="pjct-selector__group"
            role="radiogroup"
            aria-labelledby="pjct-selector-title"
            onPointerDown={() => { lastPointer.current = Date.now(); }}
          >
            {ORDER.map((key) => (
              <ContactEnquiryCard key={key} type={CONTACT_TYPES[key]} checked={selected === key} onSelect={handleSelect} />
            ))}
          </div>

          <div className="pjct-selector__help">
            <div>
              <h3 className="pjct-selector__help-title">Not sure which option fits?</h3>
              <p className="pjct-selector__help-text">
                That’s okay. Choose General Enquiry and tell us what you’re looking for. We’ll help direct you to the right ProJenius team or pathway.
              </p>
            </div>
            <ContactButton variant="secondary" onClick={() => onSelect("general", { scroll: true, force: true })}>General Enquiry</ContactButton>
          </div>
        </div>

        <div className="pjct-selector__zone">
          {selected ? (
            children
          ) : (
            <div className="pjct-selector__empty">
              <ContactIcon name="arrowDown" size="1.4em" />
              <p className="pjct-selector__empty-text">Pick an option above and the right questions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
