import React, { useEffect, useRef } from "react";
import { CONTACT_TYPES } from "../ContactConfig/ContactConfig";
import "./ContactNextSteps.css";

/* [type key, short label] for the "next step for each enquiry" chips */
const NEXT_STEP_LIST = [
  ["development", "Development"],
  ["startup", "Startup"],
  ["workshop", "Workshop"],
  ["internship", "Internship"],
  ["career", "Career"],
  ["course", "Courses"],
  ["general", "General"],
];

/* Adds `visibleClass` to the section once it scrolls into view (no re-renders) */
function useReveal(visibleClass) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add(visibleClass);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visibleClass]);
  return ref;
}

const STEPS = [
  { n: "01", title: "You tell us", text: "Share your requirement, idea, question or goal." },
  { n: "02", title: "We understand", text: "We review the enquiry and understand what you actually need." },
  { n: "03", title: "We discuss", text: "We connect with you to clarify the requirement and possible approach." },
  { n: "04", title: "We plan the next step", text: "Depending on the enquiry, we identify the appropriate next step." },
];

/* "What Happens Next?" — the row matching the chosen enquiry type is highlighted. */
export default function ContactNextSteps({ activeType }) {
  const ref = useReveal("pjct-next--visible");
  return (
    <section className="pjct-next" id="pjct-next" ref={ref} aria-labelledby="pjct-next-title">
      <div className="pjct-next__inner">
        <header className="pjct-next__head">
          <h2 className="pjct-next__title" id="pjct-next-title">What Happens Next?</h2>
          <p className="pjct-next__support">From your first message to the next step — here’s how it works.</p>
        </header>

        <ol className="pjct-next__steps">
          {STEPS.map((s) => (
            <li className="pjct-next__step" key={s.n}>
              <span className="pjct-next__num" aria-hidden="true">{s.n}</span>
              <h3 className="pjct-next__step-title">{s.title}</h3>
              <p className="pjct-next__step-text">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="pjct-next__examples">
          <h3 className="pjct-next__examples-title">What the next step looks like for each enquiry</h3>
          <ul className="pjct-next__chips">
            {NEXT_STEP_LIST.map(([key, label]) => (
              <li className={`pjct-next__chip${activeType === key ? " pjct-next__chip--active" : ""}`} key={key}>
                <b className="pjct-next__chip-label">{label}</b> → {CONTACT_TYPES[key].nextStep}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
