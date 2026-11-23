import Link from "next/link";
import { HOTEL, NAV } from "@/data/site";
import { getBranches } from "@/lib/api";
import Crest from "./Crest";

export default async function Footer() {
  const branches = (await getBranches()) ?? [];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link href="/" className="logo">
              <Crest size={30} />
              <span className="logo__text">
                <span className="logo__name">{HOTEL.name}</span>
                <span className="logo__tag">{HOTEL.tagline}</span>
              </span>
            </Link>
            <p>
              Comfortable rooms, good food and a lounge worth staying up for – near the airport in Nairobi and in
              Ikombe, Machakos.
            </p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Our Branches</h5>
            <ul>
              {branches.map((b) => (
                <li key={b.slug}>
                  <Link href={`/branches/${b.slug}`}>{b.name}</Link>
                </li>
              ))}
              {branches.length === 0 && <li>Coming soon</li>}
            </ul>
          </div>
          <div>
            <h5>Reservations</h5>
            <ul>
              <li>
                <a href={`tel:${HOTEL.phone.replace(/\s/g, "")}`}>{HOTEL.phone}</a>
              </li>
              <li>
                <a href={`mailto:${HOTEL.email}`}>{HOTEL.email}</a>
              </li>
              <li>
                <a href={`https://wa.me/${HOTEL.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
              </li>
              <li style={{ display: "flex", gap: 18, marginTop: 8 }}>
                {HOTEL.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {HOTEL.name}. All rights reserved.
          </span>
          <span>Developed by Zawadi</span>
        </div>
      </div>
    </footer>
  );
}
