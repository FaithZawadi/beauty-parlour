/* Tommy's Lounge monogram: a gold "T" inside an arch. */
export default function Crest({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`crest ${className}`}
      width={size}
      height={size * 1.2}
      viewBox="0 0 50 60"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 58V24C3 11.85 12.85 2 25 2s22 9.85 22 22v34" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 58V25C8 15.6 15.6 8 25 8s17 7.6 17 17v33" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path d="M15 22h20M25 22v26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <path d="M20 48h10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="25" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}
