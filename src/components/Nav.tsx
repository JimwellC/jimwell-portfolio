"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      }));
      setDate(now.toLocaleDateString("en-PH", {
        timeZone: "Asia/Manila",
        weekday: "short", month: "short", day: "numeric",
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-space-mono)" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "5px 12px", borderRadius: "8px",
        background: "var(--s1)", border: "0.5px solid var(--border)",
      }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "var(--accent)", display: "inline-block",
          animation: "pulse-dot 1s ease infinite",
        }}/>
        <span style={{ fontSize: "11px", color: "var(--text)", letterSpacing: "0.04em" }}>
          {time}
        </span>
        <span style={{
          fontSize: "9px", color: "var(--dim)", padding: "1px 5px",
          borderRadius: "4px", background: "rgba(255,255,255,0.04)",
          border: "0.5px solid var(--border)",
        }}>PH</span>
      </div>

      {/* Hide date on mobile */}
      <span className="hide-mobile" style={{
        fontSize: "10px", color: "var(--dim)",
        fontFamily: "var(--font-space-mono)",
      }}>{date}</span>

      <span className="hide-mobile" style={{ color: "var(--border)", fontSize: "12px" }}>·</span>

      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontSize: "10px", color: "var(--green)",
        fontFamily: "var(--font-space-mono)",
      }}>
        <span style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "var(--green)", animation: "pulse-dot 2s ease infinite",
          display: "inline-block",
        }}/>
        <span className="hide-mobile">open to work</span>
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          width: "100%",
          borderBottom: "0.5px solid var(--border)",
          background: scrolled ? "rgba(8,9,16,0.96)" : "rgba(8,9,16,0.75)",
          backdropFilter: "blur(14px)",
          position: "sticky", top: 0, zIndex: 50,
        }}
      >
        <div className="col" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "10px 60px",
        }}>
          {/* Left — clock */}
          <LiveClock />

          {/* Right — desktop links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {["work","about","contact"].map(l => (
              <a key={l} href={`#${l}`} style={{
                fontSize: "12px", color: "var(--muted)",
                textDecoration: "none", fontFamily: "var(--font-space-mono)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--a2)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >{l}</a>
            ))}
            <a href="mailto:your@email.com" style={{
              fontSize: "11px", padding: "6px 16px", borderRadius: "20px",
              border: "0.5px solid rgba(255,255,255,0.12)",
              color: "var(--text)", textDecoration: "none",
              fontFamily: "var(--font-space-mono)",
            }}>hire me</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none",
              background: "none", border: "0.5px solid var(--border)",
              borderRadius: "8px", padding: "6px 10px",
              color: "var(--text)", cursor: "pointer", fontSize: "14px",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div style={{
            borderTop: "0.5px solid var(--border)",
            background: "rgba(8,9,16,0.98)",
            padding: "16px 20px",
            display: "flex", flexDirection: "column", gap: "16px",
          }}>
            {["work","about","contact"].map(l => (
              <a key={l} href={`#${l}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "14px", color: "var(--muted)",
                  textDecoration: "none", fontFamily: "var(--font-space-mono)",
                }}
              >{l}</a>
            ))}
            <a href="mailto:your@email.com" style={{
              fontSize: "13px", color: "var(--a2)",
              textDecoration: "none", fontFamily: "var(--font-space-mono)",
            }}>hire me →</a>
          </div>
        )}
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .show-mobile { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}