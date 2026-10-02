import './DevelopmentEyebrow.css';

export default function DevelopmentEyebrow({ children, className = '' }) {
  return <span className={`pjdeveyebrow ${className}`.trim()}>{children}</span>;
}
