"use client";
import { useState, useRef, useEffect } from "react";

const suggestions = [
  "How did you handle race conditions in Auxtion?",
  "What was the hardest part of the Microsoft project?",
  "Are you open to freelance or only full-time?",
];

type Message = { role: "user" | "model"; text: string };

export default function AiChat() {
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: trimmed, history: messages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...next, { role: "model", text: data.reply }]);
    } catch {
      setError("Something went wrong. Try again.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <div className="eyebrow">Ask me anything</div>

        <div style={{
          borderRadius: "16px", overflow: "hidden",
          border: "0.5px solid var(--border2)", background: "var(--s1)",
        }}>
          {/* Top bar */}
          <div style={{
            padding: "14px 24px", borderBottom: "0.5px solid var(--border)",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--a2)", animation: "pulse-dot 1.5s ease infinite",
              display: "inline-block",
            }}/>
            <span style={{
              fontSize: "11px", fontFamily: "var(--font-space-mono)", color: "var(--a2)",
            }}>
              AI-powered · built with Gemini API
            </span>
          </div>

          {/* Body — 2 col */}
          <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
            className="chat-grid"
            >

            {/* Left — intro / chat history */}
            <div style={{
              padding: "28px 24px",
              borderRight: "0.5px solid var(--border)",
              display: "flex", flexDirection: "column",
              minHeight: "260px",
            }}>
              {!hasMessages ? (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#eaecf6", marginBottom: "10px", lineHeight: 1.3 }}>
                    Have a specific question about my work?
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>
                    Ask about my tech decisions, how I approached a specific problem, or whether
                    my experience is a fit for what you&apos;re building. I&apos;ve trained this
                    on everything I&apos;ve worked on.
                  </p>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "360px" }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "88%", padding: "9px 13px", borderRadius: "10px",
                        fontSize: "12px", lineHeight: 1.65,
                        background: m.role === "user" ? "rgba(99,102,241,0.15)" : "var(--s2)",
                        border:     m.role === "user" ? "0.5px solid rgba(99,102,241,0.3)" : "0.5px solid var(--border)",
                        color:      m.role === "user" ? "var(--a2)" : "var(--text)",
                        fontFamily: m.role === "user" ? "var(--font-space-mono)" : "var(--font-space-grotesk)",
                      }}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: "flex" }}>
                      <div style={{
                        padding: "9px 13px", borderRadius: "10px",
                        background: "var(--s2)", border: "0.5px solid var(--border)",
                        fontSize: "12px", color: "var(--dim)", fontFamily: "var(--font-space-mono)",
                      }}>thinking<span style={{ animation: "pulse-dot 1s ease infinite" }}>...</span></div>
                    </div>
                  )}
                  <div ref={bottomRef}/>
                </div>
              )}
            </div>

            {/* Right — suggestions + input */}
            <div style={{
              padding: "28px 24px",
              display: "flex", flexDirection: "column", gap: "8px",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => send(s)} style={{
                    textAlign: "left", padding: "10px 12px", borderRadius: "8px",
                    background: "var(--s2)", border: "0.5px solid var(--border)",
                    color: "var(--muted)", fontSize: "11px", cursor: "pointer",
                    fontFamily: "var(--font-space-mono)", lineHeight: 1.5, width: "100%",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--border2)";
                    e.currentTarget.style.color = "var(--a2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}>
                    <span style={{ color: "var(--dim)", marginRight: "6px" }}>→</span>{s}
                  </button>
                ))}
              </div>

              <div>
                {error && (
                  <p style={{ fontSize: "11px", color: "#f87171", fontFamily: "var(--font-space-mono)", marginBottom: "8px" }}>
                    {error}
                  </p>
                )}
                <div style={{ display: "flex", gap: "6px" }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send(input)}
                    placeholder="ask something else..."
                    disabled={loading}
                    style={{
                      flex: 1, padding: "9px 12px", borderRadius: "8px",
                      background: "var(--s2)", border: "0.5px solid var(--border)",
                      color: "var(--text)", fontSize: "11px", outline: "none",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  />
                  <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{
                    padding: "9px 18px", borderRadius: "8px", border: "none",
                    background: loading || !input.trim() ? "rgba(99,102,241,0.3)" : "var(--accent)",
                    color: "#fff", fontSize: "11px", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-space-mono)", transition: "background 0.15s",
                  }}>
                    {loading ? "..." : "send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}