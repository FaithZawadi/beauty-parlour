"use client";

import { useEffect, useState } from "react";
import { REVIEWS } from "@/data/site";

export default function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const r = REVIEWS[i];
  return (
    <div className="quote">
      <div className="quote__mark" aria-hidden>
        “
      </div>
      <blockquote key={i} className="fade-up">
        {r.quote}
      </blockquote>
      <cite>
        {r.name} — {r.from}
      </cite>
      <div className="review-dots">
        {REVIEWS.map((_, n) => (
          <button key={n} type="button" aria-label={`Review ${n + 1}`} aria-pressed={n === i} onClick={() => setI(n)} />
        ))}
      </div>
    </div>
  );
}
