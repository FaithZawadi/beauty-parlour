import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { img } from "@/data/site";
import { getRooms, kes } from "@/lib/api";

export const metadata = { title: "Rooms & Suites" };

export default async function RoomsPage() {
  const rooms = (await getRooms()) ?? [];
  return (
    <>
      <PageHero
        kicker="Rooms & Suites"
        title="Rooms made for rest"
        image="room-suite"
        lead="Clean, comfortable rooms with free Wi-Fi and free parking at every branch."
      />
      <section className="section">
        <div className="container">
          {rooms.length === 0 && <p className="notice">Room information is temporarily unavailable.</p>}
          {rooms.map((r, n) => (
            <div key={r.slug} className={`split feature${n % 2 ? " split--reverse" : ""}`}>
              <Reveal className="framed">
                <div className="frame frame--wide">
                  <Image src={img(r.image)} alt={r.name} fill sizes="(max-width: 960px) 100vw, 50vw" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="kicker">
                  {r.size_sqm ? `${r.size_sqm} m² · ` : ""}Sleeps {r.max_guests}
                </p>
                <h2 style={{ marginBottom: 20 }}>{r.name}</h2>
                <p className="lead">{r.description}</p>
                <ul className="ticks" style={{ margin: "24px 0 30px" }}>
                  <li>{r.bed}</li>
                  {r.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {r.branches && r.branches.length > 0 && (
                  <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
                    Available at {r.branches.map((b) => b.city).join(", ")}
                  </p>
                )}
                <div style={{ display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap", marginTop: 24 }}>
                  {r.price_from != null && (
                    <p className="price mb-0">
                      <small>From / night</small>
                      {kes(r.price_from)}
                    </p>
                  )}
                  <Link href={`/book?room=${r.slug}`} className="btn">
                    Reserve
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Staying longer or booking for a group? Ask us about special rates." image="room-deluxe" />
    </>
  );
}
