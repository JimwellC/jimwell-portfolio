"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateStr = now.toLocaleDateString("en-PH", {
        timeZone: "Asia/Manila",
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setTime(timeStr);
      setDate(dateStr);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      fontFamily: "var(--font-space-mono)",
    }}>
      {/* Clock */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "5px 12px", borderRadius: "8px",
        background: "var(--s1)",
        border: "0.5px solid var(--border)",
      }}>
        {/* Blinking colon indicator */}
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "var(--accent)", display: "inline-block",
          animation: "pulse-dot 1s ease infinite",
        }}/>
        <span style={{ fontSize: "11px", color: "var(--text)", letterSpacing: "0.04em" }}>
          {time}
        </span>
        <span style={{
          fontSize: "9px", color: "var(--dim)",
          padding: "1px 5px", borderRadius: "4px",
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid var(--border)",
        }}>PH</span>
      </div>

      {/* Date — hidden on smaller screens */}
      <span style={{
        fontSize: "10px", color: "var(--dim)",
        fontFamily: "var(--font-space-mono)",
        letterSpacing: "0.02em",
      }}
        className="hidden-mobile"
      >
        {date}
      </span>

      {/* Separator */}
      <span style={{ color: "var(--border)", fontSize: "12px" }}>·</span>

      {/* Availability */}
      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontSize: "10px", color: "var(--green)",
        fontFamily: "var(--font-space-mono)",
      }}>
        <span style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "var(--green)",
          animation: "pulse-dot 2s ease infinite",
          display: "inline-block",
        }}/>
        open to work
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

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
        <div
          className="col"
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "10px 60px",
          }}
        >
          {/* Left — live clock + availability */}
          <LiveClock />

          {/* Right — links */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {["work", "about", "contact"].map(l => (
              <a
                key={l}
                href={`#${l}`}
                style={{
                  fontSize: "12px", color: "var(--muted)",
                  textDecoration: "none",
                  fontFamily: "var(--font-space-mono)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--a2)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >
                {l}
              </a>
            ))}

            <a
            
              href="mailto:your@email.com"
              style={{
                fontSize: "11px", padding: "6px 16px", borderRadius: "20px",
                border: "0.5px solid rgba(255,255,255,0.12)",
                color: "var(--text)", textDecoration: "none",
                fontFamily: "var(--font-space-mono)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(129,140,248,0.5)";
                e.currentTarget.style.color = "var(--a2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "var(--text)";
              }}
            >
              hire me
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}