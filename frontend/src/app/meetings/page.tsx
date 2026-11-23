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
        title="Occasions, perfectly hosted"
        image="events"
        lead="Board meetings, conferences, weddings and milestone birthdays – planned with care."
      />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <p className="kicker">Our venues</p>
            <h2 style={{ marginBottom: 30 }}>Spaces for every gathering</h2>
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
            <p className="lead">Tell us about your occasion and our events team will be in touch within one working day.</p>
          </div>
          <ContactForm defaultSubject="Event enquiry" />
        </div>
      </section>
      <CtaBand title="Bringing a team? Our day-conference packages include meals and AV." image="lobby" />
    </>
  );
}
