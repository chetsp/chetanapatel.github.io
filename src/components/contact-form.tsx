"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/portfolio";

type Status = "idle" | "sending" | "success" | "error";
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const text = String(data.get("message") || "").trim();
    if (!name || !email || !text) {
      setStatus("error");
      setMessage("Please enter your name, email address, and message.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(20000),
          body: JSON.stringify({
            name,
            email,
            message: text,
            _subject: `Portfolio enquiry from ${name}`,
            _replyto: email,
            _template: "table",
            _honey: String(data.get("_honey") || ""),
          }),
        },
      );
      if (!response.ok) throw new Error("Submission rejected");
      const result = await response.json();
      if (result.success !== true && result.success !== "true")
        throw new Error("Submission not accepted");
      setStatus("success");
      setMessage(
        "Thanks! Your message has been submitted. I’ll reply by email.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `Your message could not be submitted. Please try again or email ${profile.email} directly.`,
      );
    }
  }
  return (
    <form
      className="contact-form panel"
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <span className="tiny-label">SEND A MESSAGE</span>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            placeholder="Alex Taylor"
            autoComplete="name"
            required
            maxLength={100}
            disabled={status === "sending"}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            required
            maxLength={254}
            disabled={status === "sending"}
          />
        </label>
      </div>
      <label>
        Your message
        <textarea
          name="message"
          placeholder="Tell me about the role, project, or question…"
          required
          maxLength={3000}
          rows={4}
          disabled={status === "sending"}
        />
      </label>
      <label className="contact-honeypot" aria-hidden="true">
        Leave this field empty
        <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        className="button primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <Send size={14} />
      </button>
      <small>
        Your details are shared with FormSubmit to deliver your message.
      </small>
      <p
        className={`form-status ${status === "error" ? "form-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
