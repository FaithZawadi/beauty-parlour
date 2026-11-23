import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { img } from "@/data/site";
import { getBranches, kes } from "@/lib/api";

export const metadata = { title: "Our Branches" };

export default async function BranchesPage() {
  const branches = (await getBranches()) ?? [];
  return (
    <>
      <PageHero
        kicker="Our Branches"
        title="Find your Tommy's"
        image="exterior"
        lead="Near the airport in Nairobi, or out in the Machakos countryside – choose the Tommy's that suits your trip."
      />
      <section className="section">
        <div className="container">
          {branches.length === 0 && <p className="notice">Branch information is temporarily unavailable.</p>}
          {branches.map((b, n) => (
            <div key={b.slug} className={`split feature${n % 2 ? " split--reverse" : ""}`}>
              <Reveal className="framed">
                <div className="frame frame--wide">
                  <Image src={img(b.image)} alt={b.name} fill sizes="(max-width: 960px) 100vw, 50vw" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="kicker">{b.city}</p>
                <h2 style={{ marginBottom: 20 }}>{b.name}</h2>
                <p className="lead">{b.summary}</p>
                <ul className="ticks" style={{ margin: "24px 0 30px" }}>
                  {b.features.slice(0, 4).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {b.price_from != null && (
                  <p className="price" style={{ marginBottom: 28 }}>
                    <small>Rooms from</small>
                    {kes(b.price_from)}
                  </p>
                )}
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
                  <Link href={`/branches/${b.slug}`} className="link-arrow">
                    Explore
                  </Link>
                  <Link href={`/book?branch=${b.slug}`} className="btn">
                    Book this branch
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which branch? Call us – we'll help you choose." />
    </>
  );
}
