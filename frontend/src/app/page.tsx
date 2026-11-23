import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import Crest from "@/components/Crest";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import Newsletter from "@/components/Newsletter";
import Ratings from "@/components/Ratings";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import { DINING, EXPERIENCES, HOTEL, img } from "@/data/site";
import { getBranches, getRooms, kes } from "@/lib/api";

export default async function Home() {
  const [branches, rooms] = await Promise.all([getBranches(), getRooms()]);
  const branchList = branches ?? [];
  const roomList = rooms ?? [];
  const lowest = branchList
    .map((b) => b.price_from)
    .filter((p): p is number => p != null)
    .sort((a, b) => a - b)[0];

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image src={img("hero")} alt={`${HOTEL.name}`} fill priority sizes="100vw" />
        </div>
        <div className="container hero__content">
          <p className="hero__karibu fade-up">{HOTEL.greeting}</p>
          <p className="kicker fade-up">Welcome to {HOTEL.name}</p>
          <h1 className="fade-up fade-up--2">
            Stay easy. Unwind <em className="serif-italic">slowly.</em>
          </h1>
          <p className="lead fade-up fade-up--3">
            A calm night near the airport in Nairobi, or sunny pool days in Ikombe – breakfast, Wi-Fi and parking
            included{lowest ? `, from ${kes(lowest)} a night` : ""}.
          </p>
          <div className="hero__actions fade-up fade-up--3">
            <Link href="/branches" className="btn btn--ghost">
              Discover our branches
            </Link>
          </div>
        </div>
        <span className="scroll-cue">Scroll</span>
      </section>

      <BookingBar branches={branchList} />

      <div className="marquee-wrap">
        <Marquee />
      </div>

      {/* Branches */}
      {branchList.length > 0 && (
        <section className="section section--tight-top">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <Crest size={36} className="section-crest" />
              <p className="kicker kicker--center">Our branches</p>
              <h2>
                {branchList.length === 2 ? "Two" : branchList.length} homes, one warm <em className="serif-italic">Karibu</em>
              </h2>
            </Reveal>
            <div className={branchList.length === 2 ? "grid-2" : "grid-3"}>
              {branchList.map((b, n) => (
                <Reveal key={b.slug} delay={n * 120}>
                  <Link href={`/branches/${b.slug}`} className="branch-tile branch-tile--tall">
                    <Image src={img(b.image)} alt={b.name} fill sizes="(max-width: 960px) 100vw, 50vw" />
                    <span className="branch-tile__no">No. {String(n + 1).padStart(2, "0")}</span>
                    <div className="branch-tile__body">
                      <p className="branch-tile__city">{b.city}</p>
                      <h3>{b.name}</h3>
                      <p className="branch-tile__summary">{b.summary}</p>
                      <div className="branch-tile__foot">
                        {b.price_from != null && <span>From {kes(b.price_from)} / night</span>}
                        <span className="branch-tile__more">Explore</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ratings */}
      <section className="section section--dark section--tight">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="kicker kicker--center">What guests say</p>
            <h2>Rated by the people who stay</h2>
          </Reveal>
          <Reveal>
            <Ratings />
          </Reveal>
        </div>
      </section>

      {/* Rooms */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head split-head">
            <div>
              <p className="kicker">Rooms</p>
              <h2>Rest, beautifully</h2>
            </div>
            <p className="lead">Clean, comfortable rooms with breakfast, free Wi-Fi and free parking.</p>
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
            <p className="kicker">Food & drink</p>
            <h2>
              It all started at <em className="serif-italic">the lounge</em>
            </h2>
            <p className="lead">
              Cold drinks, good music and nyama choma off the grill. Whether you&apos;re staying the night or just
              passing by, the lounge is where Tommy&apos;s comes alive.
            </p>
            <ul className="ticks" style={{ margin: "28px 0 36px" }}>
              {DINING.map((d) => (
                <li key={d.name}>{d.name}</li>
              ))}
              <li>Group bookings</li>
            </ul>
            <Link href="/dining" className="link-arrow">
              Food & drink
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
                <article className="exp">
                  <div className="frame frame--arch">
                    <Image src={img(x.image)} alt={x.title} fill sizes="(max-width: 960px) 100vw, 33vw" />
                  </div>
                  <span className="exp__no">0{n + 1}</span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your room, your table, your weekend – we'll take care of the rest." image="resort" />

      <section className="section section--tight section--dark">
        <div className="container text-center">
          <p className="kicker kicker--center">Stay in touch</p>
          <h2 style={{ marginBottom: 18 }}>Offers & events</h2>
          <p className="lead" style={{ margin: "0 auto 36px" }}>
            Be the first to hear about special rates, pool parties and lounge nights.
          </p>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
