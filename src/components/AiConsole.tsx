"use client";
import { useEffect, useRef, useState } from "react";
import Parallax from "./Parallax";

type Msg = { role: "user" | "ai"; text: string; animate?: boolean };

const suggestions = [
  "How did you handle race conditions in Auxtion?",
  "What was the hardest part of the Microsoft project?",
  "Are you open to freelance or only full-time?",
];

/**
 * Live query to the Gemini-backed assistant. This is the whole API surface:
 * POST /api/chat with the new message + prior turns as history. The server
 * (src/app/api/chat/route.ts) holds the system prompt about Jimwell and calls
 * gemini-2.5-flash-lite. Gemini expects roles "user" | "model", so the local
 * "ai" role is mapped on the way out.
 */
async function getReply(text: string, history: Msg[]): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      history: history.map((m) => ({ role: m.role === "ai" ? "model" : "user", text: m.text })),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
  return data.reply as string;
}

function TypedText({ text, animate, onDone }: { text: string; animate: boolean; onDone?: () => void }) {
  const [n, setN] = useState(animate ? 0 : text.length);
  useEffect(() => {
    if (!animate) { onDone?.(); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(i);
      if (i >= text.length) { clearInterval(id); onDone?.(); }
    }, 14);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="caret" />}
    </>
  );
}

export default function AiConsole() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [busy, setBusy] = useState(false);
  const animate = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history = messages; // prior turns, before this user message
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    try {
      const reply = await getReply(q, history);
      setThinking(false);
      setMessages((m) => [...m, { role: "ai", text: reply, animate: animate.current }]);
    } catch (err) {
      setThinking(false);
      const msg =
        err instanceof Error && err.message && !/^HTTP \d+$/.test(err.message)
          ? err.message
          : "Something went wrong reaching the assistant. Please try again, or email jimwellwork28@gmail.com.";
      setMessages((m) => [...m, { role: "ai", text: msg, animate: false }]);
    }
  }

  const hasChat = messages.length > 0;

  return (
    <section id="ask" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§05</span> Ask the assistant</div>

        <div className="console">
          <div className="console-bar">
            <span className="l"><span className="dot" />ask.jimwell — assistant</span>
            <span className="r">gemini · live</span>
          </div>

          <div className="console-main" ref={scrollRef}>
            {!hasChat && (
              <div className="console-lead">
                <h3>Have a specific question about his work?</h3>
                <p>
                  Ask about a technical decision, his stack, or whether his experience fits what
                  you&apos;re building. This assistant is trained on everything Jimwell has shipped.
                </p>
              </div>
            )}

            {hasChat && (
              <div className="transcript">
                {messages.map((m, i) => (
                  <div className={`msg ${m.role}`} key={i}>
                    <span className="who">{m.role === "user" ? "You" : "JC · Assistant"}</span>
                    <span className="txt">
                      {m.role === "ai" ? (
                        <TypedText
                          text={m.text}
                          animate={!!m.animate && i === messages.length - 1}
                          onDone={() => setBusy(false)}
                        />
                      ) : (
                        m.text
                      )}
                    </span>
                  </div>
                ))}
                {thinking && (
                  <div className="msg ai">
                    <span className="who">JC · Assistant</span>
                    <span className="txt" style={{ color: "var(--grey)" }}>thinking<span className="caret" /></span>
                  </div>
                )}
              </div>
            )}

            <div className="suggests">
              {suggestions.map((s) => (
                <button key={s} className="sug" type="button" onClick={() => ask(s)} disabled={busy}>
                  <span className="a">→</span>{s}
                </button>
              ))}
            </div>
          </div>

          <div className="console-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask(input)}
              placeholder="ask something else…"
              autoComplete="off"
              disabled={busy}
            />
            <button type="button" onClick={() => ask(input)} disabled={busy || !input.trim()}>
              {busy ? "…" : "Send"}
            </button>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
