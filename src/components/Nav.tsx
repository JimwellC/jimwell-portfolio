"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <span className="hide-mobile" style={{ fontSize: "10px", color: "var(--dim)" }}>{date}</span>
      <span className="hide-mobile" style={{ color: "var(--border)", fontSize: "12px" }}>·</span>
      <div className="hide-mobile" style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontSize: "10px", color: "var(--green)", fontFamily: "var(--font-space-mono)",
      }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--green)", animation: "pulse-dot 2s ease infinite", display: "inline-block" }}/>
        open to work
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Work",    href: "#work",    num: "01" },
  { label: "About",   href: "#about",   num: "02" },
  { label: "Contact", href: "#contact", num: "03" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          width: "100%", position: "sticky", top: 0, zIndex: 60,
          borderBottom: "0.5px solid var(--border)",
          background: scrolled ? "rgba(8,9,16,0.96)" : "rgba(8,9,16,0.75)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 60px" }}>
          <LiveClock />

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} style={{
                fontSize: "12px", color: "var(--muted)",
                textDecoration: "none", fontFamily: "var(--font-space-mono)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--a2)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >{l.label.toLowerCase()}</a>
            ))}
            <a href="mailto:jimwellwork28@gmail.com" style={{
              fontSize: "11px", padding: "6px 16px", borderRadius: "20px",
              border: "0.5px solid rgba(255,255,255,0.12)",
              color: "var(--text)", textDecoration: "none",
              fontFamily: "var(--font-space-mono)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--a2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--text)"; }}
            >hire me</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none", background: "var(--s1)",
              border: "0.5px solid var(--border)",
              borderRadius: "10px", padding: "8px 12px",
              color: "var(--text)", cursor: "pointer",
              fontFamily: "var(--font-space-mono)", fontSize: "13px",
              transition: "border-color 0.2s",
            }}
            className="show-mobile"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{
                position: "fixed", inset: 0, zIndex: 55,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Menu panel — slides in from right */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(320px, 85vw)",
                zIndex: 70,
                background: "rgba(13,15,26,0.98)",
                backdropFilter: "blur(20px)",
                borderLeft: "0.5px solid var(--border)",
                display: "flex", flexDirection: "column",
                padding: "0",
                overflow: "hidden",
              }}
            >
              {/* Menu header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "0.5px solid var(--border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: "linear-gradient(135deg, var(--accent), var(--cyan))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, color: "#fff",
                    fontFamily: "var(--font-space-mono)",
                  }}>JC</div>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#e0e2f4" }}>Jimwell Calma</span>
                </div>
                <button
                  onClick={closeMenu}
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: "var(--s2)", border: "0.5px solid var(--border)",
                    color: "var(--muted)", cursor: "pointer", fontSize: "14px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >✕</button>
              </div>

              {/* Nav links */}
              <div style={{ flex: 1, padding: "32px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 0",
                      borderBottom: "0.5px solid var(--border)",
                      textDecoration: "none",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      const label = el.querySelector<HTMLElement>(".link-label");
                      el.style.paddingLeft = "8px";
                      if (label) label.style.color = "var(--a2)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      const label = el.querySelector<HTMLElement>(".link-label");
                      el.style.paddingLeft = "0";
                      if (label) label.style.color = "#eaecf6";
                    }}
                  >
                    <span className="link-label" style={{
                      fontSize: "28px", fontWeight: 700,
                      color: "#eaecf6", letterSpacing: "-0.02em",
                      transition: "color 0.15s",
                    }}>
                      {link.label}
                    </span>
                    <span style={{
                      fontSize: "10px", color: "var(--dim)",
                      fontFamily: "var(--font-space-mono)",
                    }}>
                      {link.num}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                style={{
                  padding: "24px",
                  borderTop: "0.5px solid var(--border)",
                  display: "flex", flexDirection: "column", gap: "10px",
                }}
              >
                <a
                  href="mailto:jimwellwork28@gmail.com"
                  onClick={closeMenu}
                  style={{
                    padding: "13px 20px", borderRadius: "12px",
                    fontSize: "13px", fontWeight: 500, color: "#fff",
                    textDecoration: "none", textAlign: "center",
                    background: "linear-gradient(135deg, var(--accent), #4f46e5)",
                  }}
                >
                  hire me ↗
                </a>
                <a
                  href="/Jimwell_Calma_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{
                    padding: "12px 20px", borderRadius: "12px",
                    fontSize: "13px", color: "var(--muted)",
                    textDecoration: "none", textAlign: "center",
                    border: "0.5px solid var(--border)",
                    fontFamily: "var(--font-space-mono)",
                    background: "var(--s2)",
                  }}
                >
                  ↓ download CV
                </a>

                {/* Social links */}
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  {[
                    { label: "GitHub", href: "https://github.com/JimwellC" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/jimwell-calma-9420b12b1" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      onClick={closeMenu}
                      style={{
                        flex: 1, padding: "8px", borderRadius: "8px",
                        fontSize: "11px", color: "var(--dim)",
                        textDecoration: "none", textAlign: "center",
                        border: "0.5px solid var(--border)",
                        fontFamily: "var(--font-space-mono)",
                        background: "var(--s1)",
                      }}
                    >{s.label}</a>
                  ))}
                </div>

                {/* Availability */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  justifyContent: "center", marginTop: "4px",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--green)", display: "inline-block",
                    animation: "pulse-dot 2s ease infinite",
                  }}/>
                  <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
                    exploring opportunities · remote
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .show-mobile { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}