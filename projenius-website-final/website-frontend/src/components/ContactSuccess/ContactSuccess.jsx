import React, { useEffect, useRef } from "react";
import ContactButton from "../ContactButton/ContactButton";
import ContactIcon from "../ContactIcon/ContactIcon";
import { CONTACT_CONFIG } from "../ContactConfig/ContactConfig";
import "./ContactSuccess.css";

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Shown only after a real, successful submission. Makes no promise about response time. */
export default function ContactSuccess({ onAnother }) {
  const cardRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    const t = setTimeout(() => headingRef.current && headingRef.current.focus({ preventScroll: true }), 300);
    return () => clearTimeout(t);
  }, []);

  const steps = ["Enquiry received", "Details captured", "Next step: Team review / discussion"];

  return (
    <section className="pjct-success" ref={cardRef} aria-labelledby="pjct-success-title">
      <div className="pjct-success__tick" aria-hidden="true">
        <svg className="pjct-success__tick-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path className="pjct-success__tick-path" d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h3 className="pjct-success__title" id="pjct-success-title" tabIndex={-1} ref={headingRef}>Thanks for Reaching Out.</h3>
      <p className="pjct-success__text">We’ve received your enquiry. Our team will review the details and connect with you regarding the next step.</p>

      <ul className="pjct-success__list">
        {steps.map((s) => (
          <li className="pjct-success__item" key={s}><ContactIcon name="check" size="1.2em" strokeWidth={2.4} />{s}</li>
        ))}
      </ul>

      <div className="pjct-success__actions">
        <ContactButton href={CONTACT_CONFIG.routes.home}>Back to ProJenius</ContactButton>
        <ContactButton href={CONTACT_CONFIG.routes.explore} variant="secondary">Explore ProJenius</ContactButton>
      </div>
      <p className="pjct-success__again"><ContactButton variant="link" onClick={onAnother}>Send another enquiry</ContactButton></p>
    </section>
  );
}
