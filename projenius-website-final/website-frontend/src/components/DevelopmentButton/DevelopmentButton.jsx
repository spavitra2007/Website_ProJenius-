import './DevelopmentButton.css';

// Smooth-scrolls to an in-page anchor (href="#some-id"). Other hrefs behave normally.
function pjdevScrollTo(event, href) {
  if (!href || href.charAt(0) !== '#' || href.length < 2) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}


// variant: 'primary' | 'ghost' | 'light'   down: arrow points down
export default function DevelopmentButton({
  href = '#',
  variant = 'primary',
  down = false,
  className = '',
  children,
}) {
  const classes = [
    'pjdevbtn',
    `pjdevbtn--${variant}`,
    down ? 'pjdevbtn--down' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} href={href} onClick={(event) => pjdevScrollTo(event, href)}>
      {children}
      <svg className="pjdevbtn__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
