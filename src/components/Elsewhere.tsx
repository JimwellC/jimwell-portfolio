"use client";
import { motion } from "framer-motion";

const socials = [
  {
    icon: "GH",
    name: "GitHub",
    handle: "@JimwellC",
    href: "https://github.com/JimwellC",
    accent: "rgba(255,255,255,0.08)",
    accentHover: "rgba(255,255,255,0.13)",
    borderHover: "rgba(255,255,255,0.15)",
  },
  {
    icon: "LI",
    name: "LinkedIn",
    handle: "jimwell-calma",
    href: "https://linkedin.com/in/jimwell-calma-9420b12b1",
    accent: "rgba(10,102,194,0.1)",
    accentHover: "rgba(10,102,194,0.2)",
    borderHover: "rgba(10,102,194,0.4)",
  },
  {
    icon: "✉",
    name: "Email",
    handle: "jimwellwork28@gmail.com",
    href: "mailto:jimwellwork28@gmail.com",
    accent: "rgba(99,102,241,0.08)",
    accentHover: "rgba(99,102,241,0.16)",
    borderHover: "rgba(99,102,241,0.35)",
  },
];

export default function Elsewhere() {
  return (
    <section
      id="contact"
      style={{
        width: "100%",
        padding: "72px 0 64px",
        borderBottom: "0.5px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="col" style={{ position: "relative" }}>

        {/* Layout — left text, right action */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
          marginBottom: "48px",
        }}
          className="contact-grid"
        >
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="eyebrow" style={{ marginBottom: "20px" }}>Contact</div>
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 600,
              color: "#eaecf6",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              marginBottom: "14px",
            }}>
              Open to the right
              <br />
              <span style={{ color: "var(--a2)" }}>opportunity.</span>
            </h2>
            <p style={{
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "340px",
            }}>
              I&apos;m looking for full-time or freelance work where the problems are real
              and the team cares about the craft. If that sounds like your team,
              let&apos;s talk.
            </p>
          </motion.div>

          {/* Right — CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "var(--s1)",
              border: "0.5px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>
                Best way to reach me
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
                Email is best. I usually respond within a day.
              </div>
            </div>

            <a
              href="mailto:jimwellwork28@gmail.com"
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                background: "linear-gradient(135deg, var(--accent), #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
            >
              jimwellwork28@gmail.com ↗
            </a>

            <div style={{ height: "0.5px", background: "var(--border)" }}/>

            <div style={{ display: "flex", gap: "8px" }}>
              <a
              
                href="https://linkedin.com/in/jimwell-calma-9420b12b1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, padding: "9px 12px", borderRadius: "8px",
                  fontSize: "12px", color: "var(--text)",
                  textDecoration: "none",
                  border: "0.5px solid var(--border)",
                  background: "var(--s2)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "6px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border2)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"}
              >
                LinkedIn ↗
              </a>
              <a
              
                href="https://github.com/JimwellC"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, padding: "9px 12px", borderRadius: "8px",
                  fontSize: "12px", color: "var(--text)",
                  textDecoration: "none",
                  border: "0.5px solid var(--border)",
                  background: "var(--s2)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "6px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border2)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"}
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom — availability status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "rgba(74,222,128,0.04)",
            border: "0.5px solid rgba(74,222,128,0.15)",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "var(--green)",
                animation: "pulse-dot 2s ease infinite",
                display: "inline-block", flexShrink: 0,
              }}/>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--green)", whiteSpace: "nowrap" }}>
                Available for work
              </span>
            </div>
            <div style={{ width: "0.5px", height: "12px", background: "rgba(74,222,128,0.2)", flexShrink: 0 }}/>
            <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap" }}>
              Full-time · Freelance · Remote · On-Site
            </span>
          </div>

          {/* Right */}
          <span style={{
            fontSize: "11px", color: "var(--dim)",
            fontFamily: "var(--font-space-mono)",
            whiteSpace: "nowrap",
          }}>
            Angeles, PH · UTC+8
          </span>
        </motion.div>

      </div>
    </section>
  );
}