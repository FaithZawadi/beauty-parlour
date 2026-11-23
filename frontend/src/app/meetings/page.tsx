import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { VENUES, img } from "@/data/site";
import ContactForm from "../contact/ContactForm";

export const metadata = { title: "Meetings & Events" };

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        kicker="Meetings & Events"
        title="Celebrate at Tommy's"
        image="events"
        lead="Birthdays, pool parties, family days and group stays – tell us your plans."
      />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <p className="kicker">Our venues</p>
            <h2 style={{ marginBottom: 30 }}>Ways to get together</h2>
            {VENUES.map((v) => (
              <div key={v.name} className="venue">
                <h4>{v.name}</h4>
                <span className="card__meta">{v.capacity}</span>
                <p style={{ color: "var(--muted)" }}>{v.text}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={120} className="framed">
            <div className="frame frame--tall">
              <Image src={img("events")} alt="Event set-up" fill sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-head section-head--center">
            <p className="kicker kicker--center">Enquiries</p>
            <h2>Plan your event</h2>
            <p className="lead">Tell us about your occasion and we'll get back to you with options.</p>
          </div>
          <ContactForm defaultSubject="Event enquiry" />
        </div>
      </section>
      <CtaBand title="Bringing a group? Ask us about group rates." image="lobby" />
    </>
  );
}
