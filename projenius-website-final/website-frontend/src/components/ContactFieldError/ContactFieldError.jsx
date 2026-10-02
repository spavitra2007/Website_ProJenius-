import React from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import "./ContactFieldError.css";

/* Inline validation message shown directly under a field */
export default function ContactFieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="pjct-ferr" id={id}>
      <ContactIcon name="alert" size="1.1em" />
      <span>{message}</span>
    </p>
  );
}
