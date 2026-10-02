import { useEffect, useRef, useState } from 'react';
import { FINDER } from './StartupSupportData.js';
import './StartupSupportContactDialog.css';

const EMPTY_ERRORS = { name: false, email: false };

/* StartupSupportContactDialog — the "Discuss Your Idea" / "Contact ProJenius" form.
   Front-end preview only: nothing is sent. Wire the onSubmit logic to
   ProJenius's real contact endpoint or existing chat widget. */
function StartupSupportContactDialog({ open, stage, mode, onClose }) {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open) {
      setSent(false);
      setErrors(EMPTY_ERRORS);
      if (typeof dlg.showModal === 'function') dlg.showModal();
      const t = setTimeout(() => nameRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
    if (dlg.open) dlg.close();
    return undefined;
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const okName = name.length > 0;
    const okEmail = /^\S+@\S+\.\S+$/.test(email);
    setErrors({ name: !okName, email: !okEmail });
    if (!okName) { form.elements.namedItem('name').focus(); return; }
    if (!okEmail) { form.elements.namedItem('email').focus(); return; }
    setFirstName(name.split(' ')[0]);
    setSent(true);
  };

  return (
    <dialog className="ssp-dialog" ref={dialogRef} aria-labelledby="sspDialogTitle" onClose={onClose} onCancel={onClose}>
      <div className="ssp-dialog-inner">
        <button className="ssp-dialog-close" type="button" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        {!sent ? (
          <>
            <h2 id="sspDialogTitle">{mode === 'contact' ? 'Contact ProJenius' : 'Discuss Your Idea'}</h2>
            <p className="ssp-dialog-intro">Tell us where you are. A few lines are enough. We'll take it from there.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={`ssp-dialog-field${errors.name ? ' ssp-dialog-field--invalid' : ''}`}>
                <label htmlFor="sspFName">Your name</label>
                <input id="sspFName" name="name" autoComplete="name" ref={nameRef} required />
              </div>
              <div className={`ssp-dialog-field${errors.email ? ' ssp-dialog-field--invalid' : ''}`}>
                <label htmlFor="sspFMail">Email</label>
                <input id="sspFMail" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="ssp-dialog-field">
                <label htmlFor="sspFStage">Where are you right now?</label>
                <select id="sspFStage" name="stage" defaultValue={stage !== null && stage !== undefined ? String(stage) : 'x'}>
                  {FINDER.map((s, i) => (<option key={s.label} value={i}>{s.label}</option>))}
                  <option value="x">Not sure yet</option>
                </select>
              </div>
              <div className="ssp-dialog-field">
                <label htmlFor="sspFIdea">Your idea or problem</label>
                <textarea id="sspFIdea" name="idea" placeholder="What are you trying to solve?" />
              </div>
              <button className="ssp-btn ssp-btn--primary" type="submit">
                Send message <span className="ssp-btn-arrow" aria-hidden="true">→</span>
              </button>
            </form>
          </>
        ) : (
          <div className="ssp-dialog-ok" role="status">
            <h2>Message ready</h2>
            <p>Thanks{firstName ? `, ${firstName}` : ''}. This is where your conversation with ProJenius begins.</p>
            <button className="ssp-btn ssp-btn--ghost" type="button" onClick={onClose}>Close</button>
            <small className="ssp-dialog-ok-note">Preview build: nothing was sent. Connect this form to ProJenius's contact endpoint or existing chat widget.</small>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default StartupSupportContactDialog;
