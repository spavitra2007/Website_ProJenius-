import './DevelopmentMockScreen.css';

// Frame that scales everything inside it with its own width (container units).
export default function DevelopmentMockScreen({ children, className = '', wide = false }) {
  return (
    <div className={`pjdevmock ${className}`.trim()}>
      <div className={`pjdevmock__screen${wide ? ' pjdevmock__screen--wide' : ''}`}>{children}</div>
    </div>
  );
}

// Cluttered "existing" interface layer
export function MockBefore({ className = '' }) {
  return (
    <div className={`pjdevmock__layer pjdevmock__before ${className}`.trim()}>
      <div className="pjdevmock__nav">
        <span className="pjdevmock__logo" />
        <div className="pjdevmock__links"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <div className="pjdevmock__bhero">
        <div className="pjdevmock__bcopy">
          <div className="pjdevmock__h" />
          <div className="pjdevmock__p" /><div className="pjdevmock__p" />
          <div className="pjdevmock__p" /><div className="pjdevmock__p" />
          <div className="pjdevmock__bbtns"><i /><i /><i /></div>
        </div>
        <div className="pjdevmock__bimg" />
      </div>
      <div className="pjdevmock__btiles"><i /><i /><i /><i /></div>
      <span className="pjdevmock__badge">!</span>
      <span className="pjdevmock__badge pjdevmock__badge--b">?</span>
    </div>
  );
}

// Clean, improved interface layer
export function MockAfter({ className = '' }) {
  return (
    <div className={`pjdevmock__layer pjdevmock__after ${className}`.trim()}>
      <div className="pjdevmock__nav">
        <span className="pjdevmock__logo" />
        <div className="pjdevmock__links"><i /><i /><i /><b /></div>
      </div>
      <div className="pjdevmock__hero">
        <div>
          <div className="pjdevmock__h" />
          <div className="pjdevmock__h pjdevmock__h--s" />
          <div className="pjdevmock__p" />
          <div className="pjdevmock__p pjdevmock__p--s" />
          <div className="pjdevmock__cta" />
        </div>
        <div className="pjdevmock__card" />
      </div>
      <div className="pjdevmock__tiles">
        <div className="pjdevmock__tile" />
        <div className="pjdevmock__tile" />
        <div className="pjdevmock__tile" />
      </div>
    </div>
  );
}
