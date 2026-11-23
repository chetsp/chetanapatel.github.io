"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { suggestions, localAnswer } from "@/data/assistant";
type Message = { role: "guide" | "user"; text: string };
export default function Assistant({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "guide",
      text: "Ask me about Chetana’s engineering experience, a project’s architecture, or the tools she uses.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("Portfolio knowledge base");
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, busy]);
  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: question }]);
    try {
      if (process.env.NEXT_PUBLIC_STATIC_PORTFOLIO === "true") {
        setMessages((m) => [
          ...m,
          { role: "guide", text: localAnswer(question) },
        ]);
        setMode("Local guide · GitHub Pages");
        return;
      }
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question }),
        },
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Unable to answer.");
      setMessages((m) => [...m, { role: "guide", text: d.answer }]);
      setMode(
        d.mode === "gemini"
          ? "Gemini · portfolio grounded"
          : d.mode === "fallback"
            ? "Local guide · provider unavailable"
            : "Local guide · no live AI connection",
      );
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "guide",
          text: "I couldn’t reach the portfolio guide. Please try again, explore the case studies, or email patelkchetana@gmail.com.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={`chat ${compact ? "compact" : ""}`}>
      <div className="chat-top">
        <span className="guide-avatar">
          <Sparkles size={17} />
        </span>
        <div>
          <strong>Chetana’s portfolio assistant</strong>
          <small>
            <i />
            {mode}
          </small>
        </div>
        <span className="chat-label">ASK / EXPLORE</span>
      </div>
      <div
        className="chat-log"
        ref={log}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <span>{m.role === "guide" ? "CP / GUIDE" : "YOU"}</span>
            <p>{m.text}</p>
          </div>
        ))}
        {busy && <div className="thinking">Finding the relevant details…</div>}
      </div>
      <div className="suggestions">
        {suggestions.map((q) => (
          <button key={q} disabled={busy} onClick={() => ask(q)}>
            {q}
            <ArrowUpRight size={12} />
          </button>
        ))}
      </div>
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label
          className="sr-only"
          htmlFor={compact ? "drawer-question" : "question"}
        >
          Ask about Chetana
        </label>
        <input
          id={compact ? "drawer-question" : "question"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          placeholder="What would you like to know?"
          disabled={busy}
        />
        <button aria-label="Send question" disabled={busy || !input.trim()}>
          <ArrowUp size={17} />
        </button>
      </form>
      <p className="chat-disclaimer">
        Ask about my engineering experience, system architecture, or GitHub
        projects.
      </p>
    </div>
  );
}
