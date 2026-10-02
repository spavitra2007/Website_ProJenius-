import { useEffect, useState } from 'react';
import './StartupSupportNav.css';

const NAV_LINKS = [
  { href: '#ssp-journey', label: 'Journey' },
  { href: '#ssp-capabilities', label: 'Capabilities' },
  { href: '#ssp-projects', label: 'Projects' },
  { href: '#ssp-faq', label: 'FAQ' }
];

/* StartupSupportNav — stand-in for the shared ProJenius navbar.
   Swap for the existing site navigation component when integrating this page. */
function StartupSupportNav({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`ssp-nav${scrolled ? ' ssp-nav--scrolled' : ''}`} aria-label="Primary">
      <div className="ssp-nav-inner">
        <a className="ssp-nav-brand" href="#ssp-top" aria-label="ProJenius — Startup Support, back to top">
          <svg className="ssp-nav-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="sspBrandMark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#5C9BFF" /><stop offset="1" stopColor="#2ED3F0" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="30" height="30" rx="8" fill="#0A1226" stroke="url(#sspBrandMark)" strokeWidth="1.5" />
            <path d="M11 24V9h6.2a4.6 4.6 0 0 1 0 9.2H11" fill="none" stroke="url(#sspBrandMark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="24" r="2" fill="#2ED3F0" /><circle cx="21.8" cy="13.6" r="1.8" fill="#A99EFF" />
          </svg>
          <span>Pro<span className="ssp-nav-brand-accent">Jenius</span></span>
        </a>

        <span className="ssp-nav-crumb"><span>Services</span><span className="ssp-nav-crumb-sep">/</span><strong>Startup Support</strong></span>

        <ul className={`ssp-nav-links${menuOpen ? ' ssp-nav-links--open' : ''}`} id="sspNavLinks">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a></li>
          ))}
        </ul>

        <button className="ssp-btn ssp-btn--primary ssp-btn--sm ssp-nav-cta" type="button" onClick={() => onOpenContact(null, 'idea')}>
          <span className="ssp-nav-cta-label-full">Discuss Your Idea</span>
          <span aria-hidden="true" className="ssp-btn-arrow">→</span>
        </button>

        <button
          className={`ssp-nav-toggle${menuOpen ? ' ssp-nav-toggle--open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="sspNavLinks"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
    </nav>
  );
}

export default StartupSupportNav;
