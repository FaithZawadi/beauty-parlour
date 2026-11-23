import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/site";

export default function CtaBand({ title, image = "pool" }: { title: string; image?: string }) {
  return (
    <section className="cta-band">
      <Image src={img(image)} alt="" fill sizes="100vw" />
      <div className="container cta-band__inner">
        <p className="kicker kicker--center">Karibu sana</p>
        <h2>{title}</h2>
        <Link href="/book" className="btn">
          Book Your Stay
        </Link>
      </div>
    </section>
  );
}
