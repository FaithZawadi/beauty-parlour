import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/site";
import Crest from "./Crest";

type Props = { kicker: string; title: string; image: string; lead?: string };

export default function PageHero({ kicker, title, image, lead }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <Image src={img(image)} alt="" fill priority sizes="100vw" />
      </div>
      <div className="container page-hero__content">
        <nav className="crumbs fade-up" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{kicker}</span>
        </nav>
        <h1 className="fade-up fade-up--2">{title}</h1>
        {lead && <p className="lead fade-up fade-up--3">{lead}</p>}
      </div>
      <Crest size={34} className="page-hero__crest" />
    </section>
  );
}
