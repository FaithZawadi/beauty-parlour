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
        title="Pour, savour, linger"
        image="dining"
        lead="From the first coffee of the morning to the last cocktail of the night."
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
                  Reserve a table
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Celebrating? Ask about private dining and lounge hire." image="lounge" />
    </>
  );
}
