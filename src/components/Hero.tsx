"use client";
import { motion, Variants } from "framer-motion";

const f: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section style={{ width: "100%", borderBottom: "0.5px solid var(--border)", position: "relative", overflow: "hidden" }}>
      <div className="pointer-events-none" style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 60% at 20% 60%,rgba(99,102,241,0.1) 0%,transparent 65%),radial-gradient(ellipse 35% 45% at 80% 20%,rgba(34,211,238,0.06) 0%,transparent 60%)",
      }}/>
      <div className="pointer-events-none" style={{
        position: "absolute", bottom: 0, right: 0, width: "280px", height: "280px", opacity: 0.03,
        backgroundImage: "linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)",
        backgroundSize: "16px 16px",
      }}/>

      <div className="col" style={{ paddingTop: "72px", paddingBottom: "64px", position: "relative" }}>
        <motion.p variants={f} custom={0} initial="hidden" animate="show" style={{
          fontFamily: "var(--font-space-mono)", fontSize: "10px",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "var(--a2)", opacity: 0.7, marginBottom: "20px",
        }}>
          Full Stack & Mobile Developer · Angeles, Philippines
        </motion.p>

        <motion.h1 variants={f} custom={1} initial="hidden" animate="show" style={{
          fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700,
          lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "#eaecf6", marginBottom: "20px",
        }}>
          I build things<br />
          that{" "}
          <em className="not-italic" style={{
            WebkitTextStroke: "1.5px rgba(129,140,248,0.6)",
            color: "transparent",
          }}>move fast.</em>
        </motion.h1>

        <motion.p variants={f} custom={2} initial="hidden" animate="show" style={{
          fontSize: "15px", color: "var(--muted)", lineHeight: 1.72,
          maxWidth: "520px", fontWeight: 300, marginBottom: "32px",
        }}>
          Real-time auction platforms. TikTok selling automation. Emergency apps for people who need them most.
          I care about{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>how things work under pressure</strong>
          {" "}— not just how they look.
        </motion.p>

        <motion.div variants={f} custom={3} initial="hidden" animate="show"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
        >
          <a href="#work" style={{
            padding: "10px 24px", borderRadius: "100px", fontSize: "14px",
            fontWeight: 500, color: "#fff", textDecoration: "none",
            background: "linear-gradient(135deg,var(--accent),#4f46e5)",
          }}>See my work</a>
          <a href="#contact" style={{
            padding: "10px 24px", borderRadius: "100px", fontSize: "14px",
            color: "var(--text)", textDecoration: "none",
            border: "0.5px solid rgba(255,255,255,0.12)",
          }}>Get in touch</a>
        </motion.div>

        <motion.div variants={f} custom={4} initial="hidden" animate="show"
          style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
        >
          {[
            { label: "github.com/JimwellC", href: "https://github.com/JimwellC" },
            { label: "jimwellcalma.netlify.app", href: "https://jimwellcalma.netlify.app" },
            { label: "Holy Angel University, 2024", href: "#" },
          ].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {i > 0 && <span style={{ color: "var(--dim)" }}>·</span>}
              <a href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "11px", color: "var(--dim)", textDecoration: "none" }}
              >{item.label}</a>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}