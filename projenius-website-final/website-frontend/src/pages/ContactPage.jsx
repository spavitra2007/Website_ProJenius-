import React, { useCallback, useEffect, useRef, useState } from "react";
import ContactHero from "../components/ContactHero/ContactHero";
import ContactEnquirySelector from "../components/ContactEnquirySelector/ContactEnquirySelector";
import ContactSmartForm from "../components/ContactSmartForm/ContactSmartForm";
import ContactSuccess from "../components/ContactSuccess/ContactSuccess";
import ContactDirect from "../components/ContactDirect/ContactDirect";
import ContactNextSteps from "../components/ContactNextSteps/ContactNextSteps";
import { CONTACT_TYPES } from "../components/ContactConfig/ContactConfig";
import "./ContactPage.css";

/* Extra URL values that map to a type, e.g. /contact?type=courses */
const ALIASES = {
  courses: "course",
  learning: "course",
  "startup-support": "startup",
  "career-guidance": "career",
  partnership: "general",
  workshops: "workshop",
};

/* URL value -> valid type key, or null */
function resolveContactType(value) {
  if (!value) return null;
  const v = String(value).toLowerCase().trim();
  const key = ALIASES[v] || v;
  return CONTACT_TYPES[key] ? key : null;
}

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Smooth-scroll to an element id (optionally only if it isn't already comfortably in view) */
function scrollToId(id, onlyIfNeeded = false) {
  const el = typeof document !== "undefined" ? document.getElementById(id) : null;
  if (!el) return;
  if (onlyIfNeeded) {
    const top = el.getBoundingClientRect().top;
    if (top >= 0 && top < window.innerHeight * 0.55) return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

/* ==========================================================================
   /contact — the ProJenius enquiry hub

   Usage (route element):   <ContactPage />
   Reads  ?type=startup|development|workshop|course|internship|career|general
   and optional  &from=startup-support  (sourcePage for your backend).

   With react-router you can also pass the values explicitly so the page reacts
   to query changes while it is already mounted:
       const [params] = useSearchParams();
       <ContactPage typeParam={params.get("type")} fromParam={params.get("from")} />
   ========================================================================== */

function readContext(typeParam, fromParam) {
  let rawType = typeParam;
  let rawFrom = fromParam;
  if (rawType === undefined && typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search);
    rawType = q.get("type");
    rawFrom = q.get("from");
  }
  return { type: resolveContactType(rawType), from: rawFrom || "" };
}

export default function ContactPage({ typeParam, fromParam }) {
  const initial = useRef(readContext(typeParam, fromParam)).current;

  const [type, setType] = useState(initial.type);                          // selected enquiry type key (or null)
  const [arrived, setArrived] = useState(Boolean(initial.type));           // true when it came from another page
  const [sourcePage, setSourcePage] = useState(initial.type ? initial.from || CONTACT_TYPES[initial.type].meta.source : "contact");
  const [submitted, setSubmitted] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef(null);

  const scrollLater = useCallback((id, onlyIfNeeded = false, delay = 120) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => scrollToId(id, onlyIfNeeded), delay);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  /* Arriving from another ProJenius page (also re-runs if the props change) */
  useEffect(() => {
    const ctx = readContext(typeParam, fromParam);
    if (!ctx.type) return;
    setType(ctx.type);
    setArrived(true);
    setSourcePage(ctx.from || CONTACT_TYPES[ctx.type].meta.source);
    setSubmitted(false);
    scrollLater("pjct-form-card", false, 350);
  }, [typeParam, fromParam, scrollLater]);

  /* Screen-reader announcement when the enquiry type changes */
  useEffect(() => {
    if (type) setAnnouncement(`${CONTACT_TYPES[type].label} selected. The form below has been updated.`);
  }, [type]);

  const handleSelect = (key, { scroll = false, force = false } = {}) => {
    setType(key);
    setSubmitted(false);
    if (scroll) scrollLater("pjct-form-card", !force, 220);
  };

  const handleChangeType = () => {
    scrollToId("pjct-enquiry");
    setTimeout(() => {
      const checked = document.querySelector('input[name="pjct-enquiry-type"]:checked');
      if (checked) checked.focus({ preventScroll: true });
    }, 500);
  };

  return (
    <div className="pjct-page">
      <ContactHero
        onStartEnquiry={() => scrollToId("pjct-enquiry")}
        onReachDirect={() => scrollToId("pjct-direct")}
        onSelectType={(key) => handleSelect(key, { scroll: true, force: true })}
      />

      <ContactEnquirySelector selected={type} onSelect={handleSelect}>
        {submitted ? (
          <ContactSuccess onAnother={() => setSubmitted(false)} />
        ) : (
          <ContactSmartForm
            typeKey={type}
            arrived={arrived}
            sourcePage={sourcePage}
            onChangeType={handleChangeType}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </ContactEnquirySelector>

      <ContactDirect />
      <ContactNextSteps activeType={type} />

      <div className="pjct-page__live" role="status" aria-live="polite">{announcement}</div>
    </div>
  );
}
