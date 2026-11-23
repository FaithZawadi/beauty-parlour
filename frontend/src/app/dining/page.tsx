import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { DINING, img } from "@/data/site";

export const metadata = { title: "Dining & Lounge" };

export default function DiningPage() {
  return (
    <>
      <PageHero
        kicker="Dining & Lounge"
        title="Eat well, stay a while"
        image="dining"
        lead="From breakfast with your stay to nyama choma and drinks in the lounge."
      />
      <section className="section">
        <div className="container">
          {DINING.map((d, n) => (
            <div key={d.name} className={`split feature${n % 2 ? " split--reverse" : ""}`}>
              <Reveal className="framed">
                <div className="frame frame--wide">
                  <Image src={img(d.image)} alt={d.name} fill sizes="(max-width: 960px) 100vw, 50vw" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="kicker">{d.type}</p>
                <h2 style={{ marginBottom: 16 }}>{d.name}</h2>
                <span className="hours">{d.hours}</span>
                <p className="lead">{d.text}</p>
                <Link href="/contact" className="link-arrow mt-40">
                  Ask about group bookings
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Celebrating? Ask about lounge hire and group packages." image="lounge" />
    </>
  );
}
