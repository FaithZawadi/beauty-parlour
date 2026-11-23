import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { HOTEL, img } from "@/data/site";

export const metadata = { title: "About" };

const VALUES = [
  { title: "Warmth", text: "Genuine Kenyan hospitality – we greet you by name and remember the details." },
  { title: "Comfort", text: "Clean rooms, good beds and breakfast to start your day right." },
  { title: "Value", text: "Fair prices with Wi-Fi, parking and breakfast included." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About us" title={`The ${HOTEL.name} story`} image="lobby" lead="Simple, warm Kenyan hospitality – done properly." />
      <section className="section">
        <div className="container split">
          <Reveal className="framed">
            <div className="frame frame--tall">
              <Image src={img("lounge")} alt="The lounge" fill sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="kicker">Since the beginning</p>
            <h2 style={{ marginBottom: 24 }}>
              Born in a lounge, <em className="serif-italic">raised</em> on hospitality
            </h2>
            <p className="lead">
              What started as a lounge with a loyal following now welcomes overnight guests in Nairobi and Ikombe.
            </p>
            <p>
              {/* TODO: replace with the real history of Tommy's Lounge. */}
              Each branch pairs clean, comfortable rooms with the relaxed, sociable atmosphere the lounge is known
              for – breakfast in the morning, the pool by day and good company in the evening.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="kicker kicker--center">What we believe</p>
            <h2>Our promise to every guest</h2>
          </div>
          <div className="grid-3">
            {VALUES.map((v, n) => (
              <Reveal key={v.title} delay={n * 120} className="text-center">
                <div className="divider" style={{ marginBottom: 30 }} />
                <h3 style={{ marginBottom: 14, color: "var(--gold-light)" }}>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Come and see for yourself." />
    </>
  );
}
