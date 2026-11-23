import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: 200, minHeight: "70vh" }}>
      <div className="container text-center">
        <p className="kicker kicker--center">404</p>
        <h1 style={{ marginBottom: 24 }}>This page has checked out</h1>
        <Link href="/" className="btn">
          Return home
        </Link>
      </div>
    </section>
  );
}
