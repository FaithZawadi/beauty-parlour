"use client";

import { useState } from "react";
import { post } from "@/lib/api";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [form, setForm] = useState({ ...EMPTY, subject: defaultSubject });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    const res = await post("/contact", form);
    setBusy(false);
    setErrors(res.errors);
    if (res.ok) {
      setStatus({ ok: true, msg: "Thank you. Your message has been received and our team will reply shortly." });
      setForm({ ...EMPTY, subject: defaultSubject });
    } else {
      setStatus({ ok: false, msg: res.message ?? "Please check the form and try again." });
    }
  }

  const err = (k: string) => errors[k]?.[0] && <span className="error">{errors[k][0]}</span>;

  return (
    <form onSubmit={submit} noValidate>
      {status && <div className={`notice ${status.ok ? "notice--success" : "notice--error"}`}>{status.msg}</div>}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input id="c-name" required value={form.name} onChange={set("name")} autoComplete="name" />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone</label>
          <input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" value={form.subject} onChange={set("subject")} />
          {err("subject")}
        </div>
        <div className="field full">
          <label htmlFor="c-message">Message</label>
          <textarea id="c-message" required value={form.message} onChange={set("message")} />
          {err("message")}
        </div>
        <div className="full">
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}
