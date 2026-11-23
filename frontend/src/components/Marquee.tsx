import { AMENITIES } from "@/data/site";

/* Endless gold ticker of what's included. */
export default function Marquee() {
  const items = [...AMENITIES, ...AMENITIES];
  return (
    <div className="marquee" aria-label={AMENITIES.join(", ")}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((a, i) => (
          <span key={i}>
            {a}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
