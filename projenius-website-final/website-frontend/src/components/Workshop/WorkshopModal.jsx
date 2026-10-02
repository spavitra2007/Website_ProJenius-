import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './WorkshopModal.css';
import WorkshopIcon from './WorkshopIcons';

/* Shared dialog shell: focus trap, Esc to close, click-outside to close,
   background scroll lock, focus returns to the trigger on close.
   Supports stacked dialogs (only the top one reacts to Esc/Tab). */
let openStack = [];
const FOCUSABLE = 'a[href],button:not([disabled]),iframe,video[controls],[tabindex]:not([tabindex="-1"])';

export default function WorkshopModal({ label, variant = '', closeLabel = 'Close', onClose, children }) {
  const nodeRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const id = {};
    openStack.push(id);
    document.body.classList.add('pjw-modal-scroll-lock');
    const previous = document.activeElement;
    const node = nodeRef.current;
    const closeBtn = node && node.querySelector('.pjw-modal__close');
    if (closeBtn) closeBtn.focus();

    const onKey = (e) => {
      if (openStack[openStack.length - 1] !== id) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key === 'Tab' && node) {
        const items = Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      openStack = openStack.filter((s) => s !== id);
      if (!openStack.length) document.body.classList.remove('pjw-modal-scroll-lock');
      if (previous && previous.focus) previous.focus();
    };
  }, []);

  return createPortal(
    <div
      ref={nodeRef}
      className={`pjw-modal${variant ? ` pjw-modal--${variant}` : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="pjw-modal__close" onClick={onClose} aria-label={closeLabel}>
        <WorkshopIcon name="close" size={20} />
      </button>
      {children}
    </div>,
    document.body
  );
}
