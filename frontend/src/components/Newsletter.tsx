"use client";

import { useState } from "react";
import { post } from "@/lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await post("/newsletter", { email });
    setBusy(false);
    if (res.ok) {
      setState({ ok: true, msg: "Thank you — you're on the list." });
      setEmail("");
    } else {
      setState({ ok: false, msg: res.errors.email?.[0] ?? res.message ?? "Something went wrong." });
    }
  }

  return (
    <div className="newsletter">
      <form onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={busy}>
          {busy ? "Sending…" : "Subscribe"}
        </button>
      </form>
      {state && (
        <p className="newsletter__msg" style={{ color: state.ok ? "var(--gold-light)" : "#e8a493" }}>
          {state.msg}
        </p>
      )}
    </div>
  );
}
