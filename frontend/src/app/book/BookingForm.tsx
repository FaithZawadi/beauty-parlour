"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { img } from "@/data/site";
import { kes, post, type Branch } from "@/lib/api";
import { addDays, nightsBetween, toISODate } from "@/lib/dates";

type Initial = { branch: string; room: string; check_in: string; check_out: string; guests: string };

type Confirmation = { reference: string; total_amount: number; nights: number; branch: string; room: string };

export default function BookingForm({ branches, initial }: { branches: Branch[]; initial: Initial }) {
  const today = toISODate(new Date());
  const firstBranch =
    branches.find((b) => b.slug === initial.branch) ??
    branches.find((b) => b.room_types?.some((r) => r.slug === initial.room)) ??
    branches[0];

  const [branchSlug, setBranchSlug] = useState(firstBranch.slug);
  const branch = branches.find((b) => b.slug === branchSlug) ?? firstBranch;
  const rooms = branch.room_types ?? [];

  const [roomSlug, setRoomSlug] = useState(
    rooms.find((r) => r.slug === initial.room)?.slug ?? rooms[0]?.slug ?? ""
  );
  const room = rooms.find((r) => r.slug === roomSlug);

  const [checkIn, setCheckIn] = useState(initial.check_in >= today ? initial.check_in : today);
  const [checkOut, setCheckOut] = useState(
    initial.check_out > checkIn ? initial.check_out : toISODate(addDays(new Date(checkIn), 2))
  );
  const [adults, setAdults] = useState(Number(initial.guests) || 2);
  const [children, setChildren] = useState(0);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", requests: "" });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Confirmation | null>(null);

  const nights = nightsBetween(checkIn, checkOut);
  const total = useMemo(() => (room?.price_per_night ?? 0) * nights, [room, nights]);

  function chooseBranch(slug: string) {
    setBranchSlug(slug);
    const next = branches.find((b) => b.slug === slug)?.room_types ?? [];
    if (!next.some((r) => r.slug === roomSlug)) setRoomSlug(next[0]?.slug ?? "");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await post("/bookings", {
      branch: branchSlug,
      room_type: roomSlug,
      check_in: checkIn,
      check_out: checkOut,
      adults,
      children,
      guest_name: guest.name,
      guest_email: guest.email,
      guest_phone: guest.phone,
      special_requests: guest.requests,
    });
    setBusy(false);
    setErrors(res.errors);
    if (res.ok) {
      setDone(res.data as Confirmation);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMessage(res.message ?? "Please check the highlighted fields.");
    }
  }

  const err = (k: string) => errors[k]?.[0] && <span className="error">{errors[k][0]}</span>;

  if (done) {
    return (
      <div className="summary" style={{ position: "static", maxWidth: 720 }}>
        <p className="kicker">Request received</p>
        <h3>Thank you, {guest.name.split(" ")[0] || "guest"}.</h3>
        <p style={{ marginTop: 0, fontSize: "1rem" }}>
          Your reservation request has been received. We will email {guest.email} to confirm shortly.
        </p>
        <dl style={{ marginTop: 26 }}>
          <div>
            <dt>Reference</dt>
            <dd className="total" style={{ fontSize: "1.6rem" }}>
              {done.reference}
            </dd>
          </div>
          <div>
            <dt>Branch</dt>
            <dd>{done.branch}</dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{done.room}</dd>
          </div>
          <div>
            <dt>Dates</dt>
            <dd>
              {checkIn} → {checkOut} ({done.nights} {done.nights === 1 ? "night" : "nights"})
            </dd>
          </div>
          <div>
            <dt>Estimated total</dt>
            <dd>{kes(done.total_amount)}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="booking-layout">
      <div>
        {message && <div className="notice notice--error">{message}</div>}

        <div className="form-step">
          <div className="form-step__title">
            <span>01</span>
            <h3>Branch & dates</h3>
          </div>
          <div className="form-grid">
            <div className="field full">
              <label htmlFor="f-branch">Branch</label>
              <select id="f-branch" value={branchSlug} onChange={(e) => chooseBranch(e.target.value)}>
                {branches.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
              {err("branch")}
            </div>
            <div className="field">
              <label htmlFor="f-in">Check in</label>
              <input
                id="f-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) setCheckOut(toISODate(addDays(new Date(e.target.value), 1)));
                }}
              />
              {err("check_in")}
            </div>
            <div className="field">
              <label htmlFor="f-out">Check out</label>
              <input
                id="f-out"
                type="date"
                min={toISODate(addDays(new Date(checkIn), 1))}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              {err("check_out")}
            </div>
            <div className="field">
              <label htmlFor="f-adults">Adults</label>
              <select id="f-adults" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {err("adults")}
            </div>
            <div className="field">
              <label htmlFor="f-children">Children</label>
              <select id="f-children" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-step">
          <div className="form-step__title">
            <span>02</span>
            <h3>Your room</h3>
          </div>
          <div className="room-options" role="radiogroup">
            {rooms.map((r) => (
              <label key={r.slug} className="room-option">
                <input
                  type="radio"
                  name="room"
                  value={r.slug}
                  checked={roomSlug === r.slug}
                  onChange={() => setRoomSlug(r.slug)}
                />
                <div className="frame">
                  <Image src={img(r.image)} alt="" fill sizes="120px" />
                </div>
                <div>
                  <h4>{r.name}</h4>
                  <span className="card__meta">
                    {r.bed} · Up to {r.max_guests} guests
                  </span>
                </div>
                <div className="price">
                  <small>Per night</small>
                  {kes(r.price_per_night)}
                </div>
              </label>
            ))}
          </div>
          {err("room_type")}
        </div>

        <div className="form-step">
          <div className="form-step__title">
            <span>03</span>
            <h3>Guest details</h3>
          </div>
          <div className="form-grid">
            <div className="field full">
              <label htmlFor="f-name">Full name</label>
              <input
                id="f-name"
                autoComplete="name"
                value={guest.name}
                onChange={(e) => setGuest({ ...guest, name: e.target.value })}
              />
              {err("guest_name")}
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input
                id="f-email"
                type="email"
                autoComplete="email"
                value={guest.email}
                onChange={(e) => setGuest({ ...guest, email: e.target.value })}
              />
              {err("guest_email")}
            </div>
            <div className="field">
              <label htmlFor="f-phone">Phone</label>
              <input
                id="f-phone"
                type="tel"
                autoComplete="tel"
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
              />
              {err("guest_phone")}
            </div>
            <div className="field full">
              <label htmlFor="f-req">Special requests (optional)</label>
              <textarea
                id="f-req"
                value={guest.requests}
                onChange={(e) => setGuest({ ...guest, requests: e.target.value })}
                placeholder="Airport pick-up, dietary needs, celebrations…"
              />
            </div>
          </div>
        </div>
      </div>

      <aside className="summary">
        <h3>Your stay</h3>
        <dl>
          <div>
            <dt>Branch</dt>
            <dd>{branch.city}</dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{room?.name ?? "—"}</dd>
          </div>
          <div>
            <dt>Nights</dt>
            <dd>{nights}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>
              {adults} adult{adults > 1 ? "s" : ""}
              {children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}
            </dd>
          </div>
          <div style={{ borderBottom: 0, alignItems: "baseline" }}>
            <dt>Total</dt>
            <dd className="total">{kes(total)}</dd>
          </div>
        </dl>
        <button className="btn" type="submit" disabled={busy || !room} style={{ width: "100%", marginTop: 24 }}>
          {busy ? "Sending…" : "Request Reservation"}
        </button>
        <p>Bed & breakfast. No payment is taken now – we'll confirm availability by email.</p>
      </aside>
    </form>
  );
}
