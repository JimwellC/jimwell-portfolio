"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const f: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Hero() {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: "24px" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", borderRadius: "20px", overflow: "hidden", border: "0.5px solid var(--border2)", boxShadow: "0 0 80px rgba(99,102,241,0.25)", cursor: "default" }}
            >
              <Image src="/images/jimwell.jpg" alt="Jimwell Calma" width={400} height={500} style={{ objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 20px 20px", background: "linear-gradient(transparent, rgba(8,9,16,0.9))" }}>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>Jimwell Calma</div>
                <div style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>Full Stack & Mobile Developer</div>
              </div>
              <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </motion.div>
            <div style={{ position: "absolute", bottom: "32px", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-space-mono)" }}>click outside to close</div>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={{ width: "100%", borderBottom: "0.5px solid var(--border)", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div className="pointer-events-none" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 20% 60%, rgba(99,102,241,0.1) 0%, transparent 65%), radial-gradient(ellipse 35% 45% at 80% 20%, rgba(34,211,238,0.06) 0%, transparent 60%)" }}/>

        <div className="col" style={{ paddingTop: "56px", paddingBottom: "56px", position: "relative" }}>

          {/* Top row — photo + name side by side */}
          <motion.div variants={f} custom={0} initial="hidden" animate="show"
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}
          >
            {/* Photo — small, clickable */}
            <div
              onClick={() => setLightbox(true)}
              style={{
                width: "48px", height: "48px", borderRadius: "14px",
                overflow: "hidden", position: "relative", flexShrink: 0,
                border: "0.5px solid var(--border2)",
                boxShadow: "0 0 0 3px rgba(99,102,241,0.1)",
                cursor: "zoom-in", transition: "box-shadow 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.3)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"}
            >
              <Image src="/images/jimwell.jpg" alt="Jimwell Calma" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
              {/* Online dot */}
              <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "9px", height: "9px", borderRadius: "50%", background: "var(--green)", border: "2px solid var(--bg)", animation: "pulse-dot 2s ease infinite" }}/>
            </div>

            {/* Name + title */}
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>Jimwell Calma</div>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--a2)", opacity: 0.7 }}>
                Full Stack & Mobile Developer · Angeles, PH
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={f} custom={1} initial="hidden" animate="show"
            style={{ fontSize: "clamp(36px, 8vw, 80px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em", color: "#eaecf6", marginBottom: "20px" }}
          >
            I build things<br />
            that{" "}
            <em className="not-italic" style={{ WebkitTextStroke: "1.5px rgba(129,140,248,0.55)", color: "transparent" }}>
              move fast.
            </em>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={f} custom={2} initial="hidden" animate="show"
            style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.72, maxWidth: "480px", fontWeight: 300, marginBottom: "32px" }}
          >
            Real-time auction platforms. TikTok live selling automation. Emergency apps
            for people who need them most — built while I was still in school.
            I care about{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              how things work under pressure
            </strong>
            {" "}— not just how they look.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={f} custom={3} initial="hidden" animate="show"
            style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}
          >
            <a href="#work" style={{
              padding: "11px 24px", borderRadius: "100px", fontSize: "14px",
              fontWeight: 500, color: "#fff", textDecoration: "none",
              background: "linear-gradient(135deg, var(--accent), #4f46e5)",
              whiteSpace: "nowrap",
            }}>See my work</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              padding: "11px 22px", borderRadius: "100px", fontSize: "14px",
              color: "var(--text)", textDecoration: "none",
              border: "0.5px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", gap: "5px",
              whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: "12px" }}>↓</span> CV
            </a>
            <a href="#contact" style={{
              padding: "11px 22px", borderRadius: "100px", fontSize: "14px",
              color: "var(--text)", textDecoration: "none",
              border: "0.5px solid rgba(255,255,255,0.12)",
              whiteSpace: "nowrap",
            }}>Contact</a>
          </motion.div>
        </div>
      </section>

      {/* Mobile-specific overrides */}
      <style>{`
        @media (max-width: 640px) {
          .hero-btns a {
            flex: 1;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}