import React from "react";
import ContactFieldError from "../ContactFieldError/ContactFieldError";
import "./ContactChoiceField.css";

/* Chip-style choices.
   field.type "multi" -> checkboxes (value is an array)   [the spec's MultiSelectField]
   field.type "radio" -> radio buttons (value is a string) */
export default function ContactChoiceField({ field, value, error, onChange }) {
  const multiple = field.type === "multi";
  const selected = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : [];
  const id = `pjct-f-${field.id}`;
  const errId = `${id}-err`;

  const choose = (option) => {
    if (multiple) {
      onChange(field.id, selected.includes(option) ? selected.filter((x) => x !== option) : [...selected, option]);
    } else {
      onChange(field.id, option);
    }
  };

  return (
    <fieldset
      className={`pjct-choice${error ? " pjct-choice--invalid" : ""}`}
      data-pjct-field={field.id}
      aria-describedby={error ? errId : undefined}
    >
      <legend className="pjct-choice__legend">
        {field.label}
        {field.required && (
          <>
            <span className="pjct-choice__req" aria-hidden="true">*</span>
            <span className="pjct-choice__sr"> (required)</span>
          </>
        )}
      </legend>
      <div className="pjct-choice__list">
        {field.options.map((option) => (
          <label key={option} className={`pjct-choice__chip pjct-choice__chip--${multiple ? "check" : "radio"}`}>
            <input
              className="pjct-choice__input"
              type={multiple ? "checkbox" : "radio"}
              name={`pjct-${field.id}`}
              value={option}
              checked={selected.includes(option)}
              onChange={() => choose(option)}
            />
            <span className="pjct-choice__box">{option}</span>
          </label>
        ))}
      </div>
      <ContactFieldError id={errId} message={error} />
    </fieldset>
  );
}
