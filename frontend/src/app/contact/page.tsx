import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { HOTEL } from "@/data/site";
import { getBranches } from "@/lib/api";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const branches = (await getBranches()) ?? [];
  return (
    <>
      <PageHero kicker="Contact" title="We'd love to hear from you" image="exterior" />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <p className="kicker">Get in touch</p>
            <h2 style={{ marginBottom: 36 }}>Reservations & enquiries</h2>
            <div className="contact-list">
              <div>
                <h4>Central reservations</h4>
                <p>
                  <a href={`tel:${HOTEL.phone.replace(/\s/g, "")}`}>{HOTEL.phone}</a>
                  <br />
                  <a href={`mailto:${HOTEL.email}`}>{HOTEL.email}</a>
                </p>
              </div>
              {branches.map((b) => (
                <div key={b.slug}>
                  <h4>{b.name}</h4>
                  <p>
                    {b.address}
                    <br />
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`}>{b.phone}</a>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
