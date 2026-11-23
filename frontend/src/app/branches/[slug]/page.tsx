import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import { getBranch } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const branch = await getBranch(slug);
  return { title: branch?.name ?? "Branch" };
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = await getBranch(slug);
  if (!branch) notFound();

  return (
    <>
      <PageHero kicker={branch.city} title={branch.name} image={branch.image} lead={branch.summary} />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <p className="kicker">The branch</p>
            <h2 style={{ marginBottom: 24 }}>Welcome to {branch.city}</h2>
            {branch.description.split("\n").filter(Boolean).map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <div className="summary" style={{ position: "static" }}>
              <h3>At a glance</h3>
              <ul className="ticks" style={{ gridTemplateColumns: "1fr", marginBottom: 28 }}>
                {branch.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>{branch.address}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`}>{branch.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${branch.email}`}>{branch.email}</a>
                  </dd>
                </div>
              </dl>
              <Link href={`/book?branch=${branch.slug}`} className="btn" style={{ width: "100%", marginTop: 30 }}>
                Book {branch.city}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal className="section-head">
            <p className="kicker">Rooms at {branch.city}</p>
            <h2>Choose your room</h2>
          </Reveal>
          <div className="grid-3">
            {(branch.room_types ?? []).map((r, n) => (
              <Reveal key={r.slug} delay={n * 100}>
                <RoomCard room={r} branch={branch.slug} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
