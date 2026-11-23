import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/site";
import { kes, type RoomType } from "@/lib/api";

export default function RoomCard({ room, branch }: { room: RoomType; branch?: string }) {
  const price = room.price_per_night ?? room.price_from;
  const href = `/book?room=${room.slug}${branch ? `&branch=${branch}` : ""}`;
  return (
    <article className="card">
      <div className="frame frame--wide">
        <Image src={img(room.image)} alt={room.name} fill sizes="(max-width: 960px) 100vw, 33vw" />
      </div>
      <div className="card__body">
        <span className="card__meta">
          {room.size_sqm ? `${room.size_sqm} m² · ` : ""}Sleeps {room.max_guests}
        </span>
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <div className="specs">
          <span>{room.bed}</span>
          {room.perks.slice(0, 2).map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <div className="card__foot">
          {price != null ? (
            <div className="price">
              <small>{room.price_per_night != null ? "Per night" : "From / night"}</small>
              {kes(price)}
            </div>
          ) : (
            <span />
          )}
          <Link href={href} className="link-arrow">
            Reserve
          </Link>
        </div>
      </div>
    </article>
  );
}
