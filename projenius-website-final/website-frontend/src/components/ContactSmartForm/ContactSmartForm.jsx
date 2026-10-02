import React, { useEffect, useMemo, useRef, useState } from "react";
import ContactContextIndicator from "../ContactContextIndicator/ContactContextIndicator";
import ContactFormProgress from "../ContactFormProgress/ContactFormProgress";
import ContactDynamicField from "../ContactDynamicField/ContactDynamicField";
import ContactButton from "../ContactButton/ContactButton";
import ContactError from "../ContactError/ContactError";
import ContactIcon from "../ContactIcon/ContactIcon";
import { formatFileSize } from "../ContactFileUpload/ContactFileUpload";
import { CONTACT_CONFIG, CONTACT_TYPES } from "../ContactConfig/ContactConfig";
import "./ContactSmartForm.css";

/* ==========================================================================
   Helpers for this form: validation, payload building and submission.
   Kept in this file on purpose (no separate .js files).
   ========================================================================== */

/* Field ids that sit at the top level of the payload; everything else goes into enquirySpecificFields */
const CORE_FIELDS = ["name", "email", "phone", "organisation", "city", "message"];

const isEmpty = (v) => (Array.isArray(v) ? v.length === 0 : !String(v ?? "").trim());
const flattenFields = (type) => type.sections.flatMap((section) => section.fields);
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function newSubmissionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* Label for the "Selected from …" badge */
function getSourceLabel(sourcePage) {
  const match = Object.values(CONTACT_TYPES).find((t) => t.meta.source === sourcePage);
  return match ? match.meta.sourceLabel : null;
}

/* ----- validation ----- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(value) {
  const c = String(value).replace(/[\s\-().]/g, "");
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(c) || /^\+\d{7,15}$/.test(c);
}

function getFileProblem(field, file, maxMB) {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!field.ext.includes(ext)) return `That file type isn’t accepted. Please upload a ${field.fmt} file.`;
  if (file.size > maxMB * 1024 * 1024) return `That file is ${formatFileSize(file.size)}. The maximum size is ${maxMB} MB.`;
  return "";
}

/* Returns an error message, or "" when the field is fine */
function validateField(field, value, file, maxMB = CONTACT_CONFIG.maxFileMB) {
  if (field.type === "file") return file ? getFileProblem(field, file, maxMB) : "";

  if (isEmpty(value)) {
    if (!field.required) return "";
    if (field.type === "select") return "Choose an option.";
    if (field.id === "name") return "Enter your full name.";
    if (field.id === "email") return "Enter your email address.";
    if (field.id === "phone") return "Enter your phone or WhatsApp number.";
    if (field.id === "message") return "Tell us a little about your enquiry.";
    return `${field.label} is required.`;
  }

  const s = String(value).trim();
  if (field.type === "email" && !EMAIL_RE.test(s)) return "Enter a valid email address, like name@example.com.";
  if (field.type === "tel" && !isValidPhone(s)) return "Enter a valid phone number. Add the country code if it’s outside India.";
  if (field.minLength && s.length < field.minLength)
    return field.id === "message" ? "Add a little more detail (at least 10 characters)." : `Enter at least ${field.minLength} characters.`;
  if (field.type === "number" && (Number.isNaN(Number(s)) || Number(s) < (field.min ?? 0))) return "Enter a valid number.";
  return "";
}

/* ----- payload ----- */
function cleanValue(field, value) {
  if (field.type === "multi") return (Array.isArray(value) ? value : []).filter((x) => field.options.includes(x));
  if (field.type === "select" || field.type === "radio") return field.options.includes(value) ? value : "";
  return String(value ?? "").trim();
}

function buildPayload({ typeKey, sourcePage, fields, values, files, submissionId }) {
  const payload = {
    enquiryType: typeKey,
    sourcePage,
    name: "",
    email: "",
    phone: "",
    organisation: "",
    city: "",
    message: "",
    enquirySpecificFields: {},
    attachment: null,
    timestamp: "",
    submissionId, // stays the same across retries so your backend can de-duplicate
  };
  let file = null;

  fields.forEach((field) => {
    if (field.type === "file") {
      if (files[field.id]) {
        file = files[field.id];
        payload.attachment = { field: field.id, name: file.name, size: file.size, type: file.type || null };
      }
      return;
    }
    const v = cleanValue(field, values[field.id]);
    if (CORE_FIELDS.includes(field.id)) payload[field.id] = v;
    else if (!isEmpty(v)) payload.enquirySpecificFields[field.id] = v;
  });

  payload.timestamp = new Date().toISOString();
  return { payload, file };
}

/* ----- submission ----- */
class SubmitError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

async function submitEnquiry({ payload, file }) {
  if (!CONTACT_CONFIG.endpoint) {
    throw new SubmitError("NOT_CONFIGURED", "The enquiry service isn’t connected yet. Set CONTACT_CONFIG.endpoint in ContactConfig.jsx.");
  }
  const body = new FormData();
  body.append("payload", JSON.stringify(payload));
  if (file) body.append("attachment", file, file.name);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONTACT_CONFIG.timeoutMs);
  try {
    const res = await fetch(CONTACT_CONFIG.endpoint, {
      method: "POST",
      body,
      signal: controller.signal,
    });

    const contentType = res.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : { message: await res.text().catch(() => "") };

    if (!res.ok) {
      throw new SubmitError(
        `HTTP_${res.status}`,
        result.message || `The server responded with an error (${res.status}).`
      );
    }

    if (!result.success) {
      throw new SubmitError(
        "SUBMIT_FAILED",
        result.message || "The enquiry could not be submitted."
      );
    }

    return result;
  } catch (e) {
    if (e instanceof SubmitError) throw e;
    throw new SubmitError("NETWORK", e.name === "AbortError" ? "The request timed out." : "We couldn’t reach the server. Check your connection.");
  } finally {
    clearTimeout(timer);
  }
}

export default function ContactSmartForm({ typeKey, arrived, sourcePage, onChangeType, onSuccess }) {
  const type = CONTACT_TYPES[typeKey];
  const fields = useMemo(() => flattenFields(type), [type]);
  const fieldMap = useMemo(() => Object.fromEntries(fields.map((f) => [f.id, f])), [fields]);

  // values are kept by field id, so shared answers (name, email, phone…) survive when the type changes
  const [values, setValues] = useState({});
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [summary, setSummary] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [tipsOpen] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 960px)").matches);

  const submittingRef = useRef(false); // blocks double submits even before state updates
  const mountedRef = useRef(true);
  const submissionId = useRef(newSubmissionId());
  const formRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true; // set again on mount so React StrictMode's dev double-mount is safe
    return () => { mountedRef.current = false; };
  }, []);
  useEffect(() => {
    setErrors({});
    setTouched({});
    setSummary("");
    setSubmitError(null);
  }, [typeKey]);

  const requiredFields = fields.filter((f) => f.required);
  const doneCount = requiredFields.filter((f) => !isEmpty(values[f.id])).length;

  /* ----- field handlers ----- */
  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    const field = fieldMap[id];
    const instant = field.type === "select" || field.type === "radio" || field.type === "multi";
    if (instant || touched[id] || errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: validateField(field, value, files[id]) }));
    }
  };
  const handleBlur = (id) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: validateField(fieldMap[id], values[id], files[id]) }));
  };
  const handleFileSelect = (id, file) => {
    const problem = file ? validateField(fieldMap[id], null, file) : "";
    setErrors((prev) => ({ ...prev, [id]: problem }));
    setFiles((prev) => {
      const next = { ...prev };
      if (file && !problem) next[id] = file;
      else delete next[id];
      return next;
    });
  };

  const focusField = (id) => {
    const el = formRef.current && formRef.current.querySelector(`[data-pjct-field="${id}"]`);
    if (!el) return;
    const target = el.matches("input, select, textarea") ? el : el.querySelector("input, select, textarea");
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    target.focus({ preventScroll: true });
  };

  /* ----- submit ----- */
  const handleSubmit = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    if (submittingRef.current) return;

    setSubmitError(null);
    setSummary("");

    const nextErrors = {};
    fields.forEach((f) => {
      const message = validateField(f, values[f.id], files[f.id]);
      if (message) nextErrors[f.id] = message;
    });
    setErrors(nextErrors);

    const keys = Object.keys(nextErrors);
    if (keys.length) {
      setSummary(keys.length === 1 ? "Please fix the highlighted field to continue." : `Please fix the ${keys.length} highlighted fields to continue.`);
      focusField(keys[0]);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const built = buildPayload({ typeKey, sourcePage, fields, values, files, submissionId: submissionId.current });
      await submitEnquiry(built);
      onSuccess(); // parent swaps this form for the success screen (form state is cleared by unmounting)
    } catch (err) {
      if (mountedRef.current) setSubmitError(err);
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) setSubmitting(false);
    }
  };

  return (
    <div className="pjct-form">
      {/* Left: helpful context */}
      <aside className="pjct-form__panel" key={`panel-${typeKey}`} aria-label="About this enquiry type">
        <span className="pjct-form__panel-icon"><ContactIcon name={type.icon} size="1.6em" /></span>
        <h3 className="pjct-form__panel-title">{type.label}</h3>
        <p className="pjct-form__panel-text">{type.panelText}</p>
        <details className="pjct-form__tips" open={tipsOpen}>
          <summary className="pjct-form__tips-summary">What helps us most</summary>
          <ul className="pjct-form__tips-list">
            {type.tips.map((tip) => (
              <li className="pjct-form__tips-item" key={tip}>
                <ContactIcon name="check" size="1.1em" strokeWidth={2.4} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </details>
        <p className="pjct-form__assure">You don’t need to have everything figured out — share what you know.</p>
      </aside>

      {/* Right: the form */}
      <section className="pjct-form__card" id="pjct-form-card" aria-labelledby="pjct-form-heading">
        <div className="pjct-form__content" key={typeKey}>
          <ContactContextIndicator type={type} arrived={arrived} sourceLabel={getSourceLabel(sourcePage)} onChange={onChangeType} />

          <h3 className="pjct-form__title" id="pjct-form-heading">{type.heading}</h3>
          <p className="pjct-form__support">{type.support}</p>
          {type.note && <p className="pjct-form__note">{type.note}</p>}

          <ContactFormProgress done={doneCount} total={requiredFields.length} />

          <form className="pjct-form__body" ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={submitting}>
            {type.sections.map((section) => (
              <div className="pjct-form__section" key={section.title}>
                <h4 className="pjct-form__section-title">{section.title}</h4>
                <div className="pjct-form__grid">
                  {section.fields.map((field) => (
                    <ContactDynamicField
                      key={field.id}
                      field={field}
                      value={values[field.id]}
                      file={files[field.id]}
                      error={errors[field.id]}
                      maxFileMB={CONTACT_CONFIG.maxFileMB}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFileSelect={handleFileSelect}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="pjct-form__submit-row">
              <div className="pjct-form__privacy">
                <span>Your information will be used only to respond to your enquiry.</span>
                {type.privacyExtra && <span>{type.privacyExtra}</span>}
              </div>
              <ContactButton type="submit" size="lg" fluidMobile loading={submitting}>
                {submitting ? "Sending…" : "Send enquiry"}
              </ContactButton>
              {summary && <div className="pjct-form__summary" role="alert">{summary}</div>}
              {submitError && <ContactError error={submitError} onRetry={handleSubmit} />}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
