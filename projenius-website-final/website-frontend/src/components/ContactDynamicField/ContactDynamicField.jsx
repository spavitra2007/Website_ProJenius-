import React from "react";
import ContactChoiceField from "../ContactChoiceField/ContactChoiceField";
import ContactFileUpload from "../ContactFileUpload/ContactFileUpload";
import ContactFieldError from "../ContactFieldError/ContactFieldError";
import ContactIcon from "../ContactIcon/ContactIcon";
import "./ContactDynamicField.css";

/* Renders any field defined in ContactConfig.jsx:
   text / email / tel / number / date / select / textarea
   and delegates radio + multi to ContactChoiceField, file to ContactFileUpload. */
export default function ContactDynamicField({ field, value, file, error, maxFileMB, onChange, onBlur, onFileSelect }) {
  if (field.type === "radio" || field.type === "multi") {
    return <ContactChoiceField field={field} value={value} error={error} onChange={onChange} />;
  }
  if (field.type === "file") {
    return <ContactFileUpload field={field} file={file} error={error} maxMB={maxFileMB} onSelect={onFileSelect} />;
  }

  const id = `pjct-f-${field.id}`;
  const hintId = field.hint ? `${id}-hint` : null;
  const errId = `${id}-err`;
  const describedBy = [hintId, error ? errId : null].filter(Boolean).join(" ") || undefined;

  const rootClass = [
    "pjct-field",
    field.span === "full" ? "pjct-field--full" : "",
    error ? "pjct-field--invalid" : "",
  ].filter(Boolean).join(" ");

  const common = {
    id,
    name: field.id,
    "data-pjct-field": field.id,
    "aria-required": field.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onBlur: () => onBlur(field.id),
  };

  let control;
  if (field.type === "select") {
    const current = field.options.includes(value) ? value : "";
    control = (
      <div className="pjct-field__select-wrap">
        <select className="pjct-field__control pjct-field__control--select" {...common} value={current} onChange={(e) => onChange(field.id, e.target.value)}>
          <option value="">Select…</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="pjct-field__chevron" aria-hidden="true">
          <ContactIcon name="chevron" size="1.1em" strokeWidth={2.4} />
        </span>
      </div>
    );
  } else if (field.type === "textarea") {
    control = (
      <textarea className="pjct-field__control pjct-field__control--textarea" {...common} rows={field.rows || 5} value={value || ""} onChange={(e) => onChange(field.id, e.target.value)} />
    );
  } else {
    control = (
      <input
        className="pjct-field__control"
        {...common}
        type={field.type}
        value={value || ""}
        inputMode={field.inputMode}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        min={field.type === "date" ? new Date().toISOString().slice(0, 10) : field.min}
        onChange={(e) => onChange(field.id, e.target.value)}
      />
    );
  }

  return (
    <div className={rootClass}>
      <label className="pjct-field__label" htmlFor={id}>
        {field.label}
        {field.required && (
          <>
            <span className="pjct-field__req" aria-hidden="true">*</span>
            <span className="pjct-field__sr"> (required)</span>
          </>
        )}
      </label>
      {control}
      {field.hint && <p className="pjct-field__hint" id={hintId}>{field.hint}</p>}
      <ContactFieldError id={errId} message={error} />
    </div>
  );
}
