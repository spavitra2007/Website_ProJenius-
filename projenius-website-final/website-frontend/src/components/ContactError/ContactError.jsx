import React from "react";
import ContactButton from "../ContactButton/ContactButton";
import "./ContactError.css";

/* Shown under the submit button when sending fails. The form data is kept. */
export default function ContactError({ error, onRetry }) {
  const detail =
    error && error.code === "NOT_CONFIGURED"
      ? "The enquiry service isn’t connected yet (CONTACT_CONFIG.endpoint in ContactConfig.jsx is empty). Your details are still here."
      : error && error.message
      ? `${error.message} Your details are still here.`
      : "Your details are still here.";

  return (
    <div className="pjct-error" role="alert">
      <h4 className="pjct-error__title">We Couldn’t Submit Your Enquiry.</h4>
      <p className="pjct-error__text">Please check your details and try again.</p>
      <p className="pjct-error__detail">{detail}</p>
      <ContactButton onClick={onRetry}>Try Again</ContactButton>
    </div>
  );
}
