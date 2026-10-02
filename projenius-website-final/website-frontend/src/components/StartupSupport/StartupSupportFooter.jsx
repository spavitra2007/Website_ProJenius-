import './StartupSupportFooter.css';

const FOOTER_LINKS = [
  ['#ssp-journey', 'Journey'], ['#ssp-paths', 'Pathways'], ['#ssp-capabilities', 'Capabilities'],
  ['#ssp-areas', 'Support areas'], ['#ssp-projects', 'Projects'], ['#ssp-faq', 'FAQ']
];

/* StartupSupportFooter — simple stand-in for the shared ProJenius footer.
   Swap for the existing site footer component when integrating this page. */
function StartupSupportFooter() {
  return (
    <footer className="ssp-footer ssp-section--dark">
      <div className="ssp-footer-inner">
        <div>
          <a className="ssp-footer-brand" href="#ssp-top" aria-label="ProJenius, back to top">
            <svg className="ssp-footer-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
              <defs>
                <linearGradient id="sspFooterMark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5C9BFF" /><stop offset="1" stopColor="#2ED3F0" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="30" height="30" rx="8" fill="#0A1226" stroke="url(#sspFooterMark)" strokeWidth="1.5" />
              <path d="M11 24V9h6.2a4.6 4.6 0 0 1 0 9.2H11" fill="none" stroke="url(#sspFooterMark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="24" r="2" fill="#2ED3F0" /><circle cx="21.8" cy="13.6" r="1.8" fill="#A99EFF" />
            </svg>
            <span>Pro<span className="ssp-footer-brand-accent">Jenius</span></span>
          </a>
          <p className="ssp-footer-tagline">Technology, innovation and startup support for people at every stage of an idea.</p>
        </div>

        <nav className="ssp-footer-nav" aria-label="Page sections">
          {FOOTER_LINKS.map(([href, label]) => (<a key={href} href={href}>{label}</a>))}
        </nav>

        <div className="ssp-footer-copy">© 2026 ProJenius Innovation Technology Private Limited. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default StartupSupportFooter;
