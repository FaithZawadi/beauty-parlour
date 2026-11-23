import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import CtaBand from "@/components/CtaBand";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import RoomCard from "@/components/RoomCard";
import { DINING, EXPERIENCES, HOTEL, img } from "@/data/site";
import { getBranches, getRooms, kes } from "@/lib/api";

export default async function Home() {
  const [branches, rooms] = await Promise.all([getBranches(), getRooms()]);
  const branchList = branches ?? [];
  const roomList = rooms ?? [];

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image src={img("hero")} alt={`${HOTEL.name} pool at dusk`} fill priority sizes="100vw" />
        </div>
        <div className="container hero__content">
          <p className="kicker fade-up">Welcome to {HOTEL.name}</p>
          <h1 className="fade-up fade-up--2">
            Where every stay <em className="serif-italic">feels</em> like an occasion
          </h1>
          <p className="lead fade-up fade-up--3">
            Elegant rooms, unhurried dining and a lounge that sets the mood, at
            {branchList.length > 1 ? ` ${branchList.length} distinctive branches` : " our branches"} across Kenya.
          </p>
          <div className="hero__actions fade-up fade-up--3">
            <Link href="/branches" className="btn btn--ghost">
              Discover Our Branches
            </Link>
          </div>
        </div>
        <span className="scroll-cue">Scroll</span>
      </section>

      <BookingBar branches={branchList} />

      {/* Intro */}
      <section className="section">
        <div className="container split">
          <Reveal className="framed">
            <div className="frame frame--tall">
              <Image src={img("lobby")} alt="Hotel lobby" fill sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="kicker">Our story</p>
            <h2>
              Quiet luxury, <em className="serif-italic">warm</em> Kenyan hospitality
            </h2>
            <p className="lead">
              {HOTEL.name} began as a place to gather – good music, great drinks, better company. Today it is a
              collection of boutique hotels where that same spirit meets beautifully appointed rooms and thoughtful,
              personal service.
            </p>
            <p>
              Whether you are here for a business trip, a weekend escape or a celebration, every detail is designed
              around you: crisp linens, generous breakfasts and a team that remembers how you like your coffee.
            </p>
            <Link href="/about" className="link-arrow mt-40">
              About us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Branches */}
      {branchList.length > 0 && (
        <section className="section section--dark">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="kicker kicker--center">Our Branches</p>
              <h2>One signature, several homes</h2>
              <p className="lead">Each branch has its own character, and the same promise of comfort and care.</p>
            </Reveal>
            <div className="grid-3">
              {branchList.map((b, n) => (
                <Reveal key={b.slug} delay={n * 120}>
                  <Link href={`/branches/${b.slug}`} className="branch-tile">
                    <Image src={img(b.image)} alt={b.name} fill sizes="(max-width: 960px) 100vw, 33vw" />
                    <div className="branch-tile__body">
                      <p className="branch-tile__city">{b.city}</p>
                      <h3>{b.name}</h3>
                      {b.price_from != null && (
                        <p style={{ color: "var(--cream)", marginBottom: 16 }}>Rooms from {kes(b.price_from)}</p>
                      )}
                      <span className="branch-tile__more">Explore branch</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rooms */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="kicker">Rooms & Suites</p>
            <h2>Rest, beautifully</h2>
            <p className="lead">From cosy superior rooms to our signature suite, each space is a calm retreat.</p>
          </Reveal>
          {roomList.length > 0 ? (
            <div className="grid-3">
              {roomList.slice(0, 3).map((r, n) => (
                <Reveal key={r.slug} delay={n * 120}>
                  <RoomCard room={r} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="notice">Room information is loading from our reservations system. Please check back shortly.</p>
          )}
          <div className="text-center mt-40">
            <Link href="/rooms" className="btn btn--ghost" style={{ color: "var(--gold-dark)" }}>
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Lounge highlight */}
      <section className="section section--cream">
        <div className="container split split--reverse">
          <Reveal className="framed">
            <div className="frame frame--tall">
              <Image src={img(DINING[0].image)} alt="The Lounge" fill sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="kicker">Dining & Lounge</p>
            <h2>
              Evenings at <em className="serif-italic">the Lounge</em>
            </h2>
            <p className="lead">
              Crafted cocktails, a considered wine list and live music at the weekend. Our lounge is where the day slows
              down and the night begins.
            </p>
            <ul className="ticks" style={{ margin: "28px 0 36px" }}>
              {DINING.map((d) => (
                <li key={d.name}>{d.name}</li>
              ))}
              <li>Private dining</li>
            </ul>
            <Link href="/dining" className="link-arrow">
              Dining & Lounge
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Experiences */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="kicker kicker--center">Experiences</p>
            <h2>More than a place to sleep</h2>
          </Reveal>
          <div className="grid-3">
            {EXPERIENCES.map((x, n) => (
              <Reveal key={x.title} delay={n * 120}>
                <article className="card">
                  <div className="frame frame--square">
                    <Image src={img(x.image)} alt={x.title} fill sizes="(max-width: 960px) 100vw, 33vw" />
                  </div>
                  <div className="card__body">
                    <h3>{x.title}</h3>
                    <p>{x.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + reviews */}
      <section className="section section--dark">
        <div className="container">
          <div className="stats" style={{ marginBottom: "clamp(70px, 10vw, 120px)" }}>
            <div className="stat">
              <strong>{branchList.length || "—"}</strong>
              <span>Branches</span>
            </div>
            <div className="stat">
              <strong>{roomList.length || "—"}</strong>
              <span>Room types</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Concierge</span>
            </div>
            <div className="stat">
              <strong>365</strong>
              <span>Nights of music</span>
            </div>
          </div>
          <p className="kicker kicker--center" style={{ display: "flex" }}>
            Guest stories
          </p>
          <Reviews />
        </div>
      </section>

      <CtaBand title="Your table, your suite, your evening – we'll take care of the rest." image="resort" />

      {/* Newsletter */}
      <section className="section section--tight section--dark">
        <div className="container text-center">
          <p className="kicker kicker--center">Stay in touch</p>
          <h2 style={{ marginBottom: 18 }}>Offers & lounge evenings</h2>
          <p className="lead" style={{ margin: "0 auto 36px" }}>
            Be the first to hear about seasonal rates, events and new branches.
          </p>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
