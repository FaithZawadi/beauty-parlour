"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Branch } from "@/lib/api";
import { addDays, toISODate } from "@/lib/dates";

export default function BookingBar({ branches }: { branches: Branch[] }) {
  const router = useRouter();
  const today = toISODate(new Date());
  const [branch, setBranch] = useState(branches[0]?.slug ?? "");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(toISODate(addDays(new Date(), 2)));
  const [guests, setGuests] = useState("2");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ branch, check_in: checkIn, check_out: checkOut, guests });
    router.push(`/book?${q.toString()}`);
  }

  return (
    <div className="booking-bar container">
      <form onSubmit={submit} aria-label="Check availability">
        <div className="field">
          <label htmlFor="bb-branch">Branch</label>
          <select id="bb-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
            {branches.length === 0 && <option value="">Any branch</option>}
          </select>
        </div>
        <div className="field">
          <label htmlFor="bb-in">Check in</label>
          <input
            id="bb-in"
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (e.target.value >= checkOut) setCheckOut(toISODate(addDays(new Date(e.target.value), 1)));
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="bb-out">Check out</label>
          <input
            id="bb-out"
            type="date"
            min={toISODate(addDays(new Date(checkIn), 1))}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="bb-guests">Guests</label>
          <select id="bb-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          Check Availability
        </button>
      </form>
    </div>
  );
}
