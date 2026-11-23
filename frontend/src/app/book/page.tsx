import { getBranches } from "@/lib/api";
import BookingForm from "./BookingForm";

export const metadata = { title: "Book Your Stay" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function BookPage({ searchParams }: Props) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : (sp[k] as string | undefined)) ?? "";
  const branches = (await getBranches()) ?? [];

  return (
    <section className="section" style={{ paddingTop: 170 }}>
      <div className="container">
        <div className="section-head">
          <p className="kicker">Reservations</p>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginBottom: 18 }}>Book your stay</h1>
          <p className="lead">Choose your branch, dates and room. Our team confirms every reservation personally.</p>
        </div>
        {branches.length === 0 ? (
          <div className="notice notice--error">
            Online booking is temporarily unavailable. Please call or email our reservations team.
          </div>
        ) : (
          <BookingForm
            branches={branches}
            initial={{
              branch: one("branch"),
              room: one("room"),
              check_in: one("check_in"),
              check_out: one("check_out"),
              guests: one("guests"),
            }}
          />
        )}
      </div>
    </section>
  );
}
