import { RATINGS } from "@/data/site";

export default function Ratings() {
  return (
    <div className="ratings">
      {RATINGS.map((r) => (
        <div className="rating" key={r.source + r.branch}>
          <div className="rating__score">
            {r.score}
            <small>/{r.out}</small>
          </div>
          <div className="rating__stars" aria-hidden="true">
            {"★★★★★".slice(0, Math.round((Number(r.score) / Number(r.out)) * 5))}
          </div>
          <p className="rating__source">{r.source}</p>
          <p className="rating__detail">
            {r.branch}
            <br />
            {r.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
