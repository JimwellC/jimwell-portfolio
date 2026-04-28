"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";

// ── Portal lightbox ──
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  if (typeof window === "undefined") return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.94)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{ position: "relative", borderRadius: "16px", overflow: "hidden", maxWidth: "90vw", maxHeight: "88vh", cursor: "default" }}
      >
        <Image src={src} alt={alt} width={900} height={700} style={{ objectFit: "contain", maxHeight: "88vh", width: "auto", display: "block" }} />
        <button onClick={onClose} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.85)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </motion.div>
      <div style={{ position: "absolute", bottom: "24px", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-space-mono)" }}>click outside to close</div>
    </motion.div>,
    document.body
  );
}

const screenshots = [
  { src: "/projects/reachable/1.png", alt: "ReachAble home screen" },
  { src: "/projects/reachable/2.png", alt: "ReachAble emergency trigger" },
];

const techStack = [
  { label: "Flutter", desc: "Cross-platform mobile framework" },
  { label: "Dart", desc: "Primary language" },
  { label: "Firebase", desc: "Realtime alerts & location sync" },
  { label: "GPS APIs", desc: "Real-time location capture" },
  { label: "SMS Gateway", desc: "Offline fallback transmission" },
  { label: "Voice Commands", desc: "Hands-free emergency trigger" },
];

const team = [
  { role: "Lead Developer", name: "Jimwell Calma (you)", desc: "System architecture, development workflow, key integrations", highlight: true },
  { role: "Co-Lead Developer", name: "Teammate", desc: "Frontend & backend implementation, core features" },
  { role: "UI/UX + Frontend", name: "Teammate", desc: "Interface design, accessibility UX, frontend consistency" },
  { role: "Documentation Lead", name: "Teammate", desc: "Technical writing, research, academic deliverables" },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ReachableCaseStudy() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const openLightbox = useCallback((src: string, alt: string) => { setLightboxSrc(src); setLightboxAlt(alt); }, []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />}
      </AnimatePresence>

      {/* ── NAV ── */}
      <div style={{ borderBottom: "0.5px solid var(--border)", background: "rgba(8,9,16,0.92)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg,var(--accent),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-space-mono)" }}>JC</div>
            </Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <Link href="/projects" style={{ fontSize: "12px", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>projects</Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <span style={{ fontSize: "12px", color: "var(--text)", fontFamily: "var(--font-space-mono)" }}>reachable</span>
          </div>
          <Link href="/projects" style={{ fontSize: "11px", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-space-mono)", padding: "5px 12px", borderRadius: "8px", border: "0.5px solid var(--border)", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--a2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >← all projects</Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ borderBottom: "0.5px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="pointer-events-none" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(244,114,182,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 30%, rgba(99,102,241,0.05) 0%, transparent 60%)" }}/>
        <div className="col" style={{ paddingTop: "64px", paddingBottom: "56px", position: "relative" }}>
          <motion.div variants={fade} custom={0} initial="hidden" animate="show" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", background: "rgba(244,114,182,0.08)", border: "0.5px solid rgba(244,114,182,0.2)", color: "var(--pink)" }}>◈ thesis</span>
            <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>Holy Angel University · 2026</span>
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: "#eaecf6", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "16px" }}
            >
            ReachAble
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "560px", fontWeight: 300, marginBottom: "32px" }}
            >
            An emergency communication app for visually and hearing-impaired users —
            built so that in the moments that matter most, the app gets completely out of the way.
          </motion.p>

          <motion.div variants={fade} custom={3} initial="hidden" animate="show" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, var(--accent), #4f46e5)" }}>
              View on GitHub ↗
            </a>
            <span style={{ padding: "10px 22px", borderRadius: "100px", fontSize: "13px", color: "var(--dim)", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }}/>
              Not yet on App Store
            </span>
          </motion.div>
        </div>
      </section>

      <div className="col" style={{ paddingTop: "0", paddingBottom: "80px" }}>

        {/* ── SCREENSHOTS ── */}
        {screenshots.some(s => s.src) && (
          <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="eyebrow">UI Showcase</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
                {screenshots.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => openLightbox(s.src, s.alt)}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"}
                    style={{
                        position: "relative", height: "320px", borderRadius: "16px",
                        overflow: "hidden", background: "var(--s1)",
                        border: "0.5px solid var(--border)", cursor: "zoom-in",
                        transition: "border-color 0.2s",
                    }}
                    >
                    <Image src={s.src} alt={s.alt} fill style={{ objectFit: "cover", transition: "transform 0.3s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
                      onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.5) 0%, transparent 60%)", pointerEvents: "none" }}/>
                    <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 8px", borderRadius: "8px" }}>tap to expand ↗</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── PROBLEM ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">The Problem</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="about-grid">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 600, color: "#eaecf6", lineHeight: 1.3, marginBottom: "16px", letterSpacing: "-0.01em" }}>
                Emergency apps assume you can use them under pressure.
                <span style={{ color: "var(--pink)" }}> Most people can&apos;t.</span>
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>
                Most emergency applications assume that users can unlock their phone, navigate interfaces, and tap precise buttons during a crisis. That assumption breaks immediately for persons with visual or hearing impairments — especially under stress.
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>
                During our research phase, we found that in emergency scenarios, even a few seconds of difficulty in interaction can significantly affect outcomes. The existing solutions weren&apos;t built for the people who need them most.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                { label: "Existing apps require precise touch input", impact: "Fails for motor-impaired users" },
                { label: "Assumes stable internet connectivity", impact: "Unreliable in real emergencies" },
                { label: "Complex navigation under stress", impact: "Critical seconds lost" },
                { label: "No voice or gesture alternatives", impact: "Excludes visual/hearing-impaired" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--s1)", border: "0.5px solid var(--border)" }}>
                  <div style={{ fontSize: "12px", color: "var(--text)", marginBottom: "4px" }}>✗ {item.label}</div>
                  <div style={{ fontSize: "11px", color: "var(--pink)", fontFamily: "var(--font-space-mono)" }}>→ {item.impact}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SOLUTION / FLOW ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">How It Works</div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}
          >
            When a user triggers an emergency, the app initiates a fully automatic multi-step response — no navigation required.
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { num: "01", title: "Emergency Trigger", desc: "A specific voice command or gesture activates the app instantly — no unlocking, no navigation.", icon: "🎙" },
              { num: "02", title: "Location Capture", desc: "The system retrieves the user's current GPS coordinates in real time.", icon: "📍" },
              { num: "03", title: "Alert Generation", desc: "A pre-configured emergency message is prepared with the user's identity and location.", icon: "⚡" },
              { num: "04", title: "Primary Transmission (Online)", desc: "If connected, Firebase sends live alerts and continuously updates the user's location to emergency contacts.", icon: "🔗" },
              { num: "05", title: "SMS Fallback (Offline)", desc: "If connectivity fails, the system automatically switches to SMS — ensuring delivery even without internet.", icon: "📱" },
              { num: "06", title: "Hands-Free Completion", desc: "After triggering, the process runs automatically. The user doesn't need to do anything else.", icon: "✓" },
            ].map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: i < 5 ? "0.5px solid var(--border)" : "none", alignItems: "flex-start" }}
              >
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{step.num}</span>
                  <span style={{ fontSize: "20px" }}>{step.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", marginBottom: "5px" }}>{step.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
                {step.num === "05" && (
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: "rgba(244,114,182,0.08)", border: "0.5px solid rgba(244,114,182,0.2)", color: "var(--pink)", fontFamily: "var(--font-space-mono)", flexShrink: 0, alignSelf: "center" }}>
                    key feature
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── HARD CHALLENGE ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Hardest Technical Challenge</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="about-grid">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 600, color: "#eaecf6", lineHeight: 1.3, marginBottom: "16px" }}>
                Building a system that works when the internet doesn&apos;t.
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>
                Emergency applications cannot depend solely on internet connectivity. We needed the system to function across three distinct states — online, degraded connectivity, and fully offline — with seamless, automatic transitions between them.
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>
                The challenge wasn&apos;t just technical implementation. It was ensuring the fallback process is fast, automatic, and invisible to the user — so that in a high-stress situation, no decisions or additional actions are required.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ padding: "24px", borderRadius: "14px", background: "var(--s1)", border: "0.5px solid var(--border)" }}
            >
              <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Network State Machine</div>
              {[
                { state: "Online", action: "Firebase realtime sync → live location updates", color: "var(--green)", dot: "rgba(74,222,128,0.5)" },
                { state: "Degraded", action: "Detect weak signal → pre-buffer message → attempt retry", color: "var(--yellow)", dot: "rgba(251,191,36,0.5)" },
                { state: "Offline", action: "Auto-switch to SMS → deliver last known location", color: "var(--pink)", dot: "rgba(244,114,182,0.5)" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 0", borderBottom: i < 2 ? "0.5px solid var(--border)" : "none" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: "4px" }}/>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: item.color, marginBottom: "3px", fontFamily: "var(--font-space-mono)" }}>{item.state}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.55 }}>{item.action}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Tech Stack</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {techStack.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                style={{ padding: "16px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)" }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>{t.label}</div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">The Team</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
            {team.map((m, i) => (
              <motion.div key={m.role}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{
                  padding: "18px", borderRadius: "12px",
                  background: m.highlight ? "rgba(99,102,241,0.06)" : "var(--s1)",
                  border: `0.5px solid ${m.highlight ? "var(--border2)" : "var(--border)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "8px", fontFamily: "var(--font-space-mono)", background: m.highlight ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)", color: m.highlight ? "var(--a2)" : "var(--dim)", border: `0.5px solid ${m.highlight ? "rgba(99,102,241,0.25)" : "var(--border)"}` }}>
                    {m.role}
                  </div>
                  {m.highlight && <span style={{ fontSize: "9px", color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>← me</span>}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTING ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Testing & Evaluation</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="about-grid">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>
                The application underwent academic evaluation and structured testing — including functionality testing, usability assessment, and scenario-based simulations designed to mirror real emergency conditions.
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>
                While large-scale real-world deployment was not conducted, controlled evaluations validated the system&apos;s reliability and confirmed that the SMS fallback mechanism activates correctly across all three network states.
              </p>
            </motion.div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { scenario: "Stable internet", result: "Firebase real-time sync → contacts notified instantly", pass: true },
                { scenario: "Intermittent signal", result: "Message buffered → delivered when signal recovered", pass: true },
                { scenario: "No internet (offline)", result: "SMS fallback triggered automatically", pass: true },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--s1)", border: "0.5px solid var(--border)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <span style={{ fontSize: "11px", color: "var(--green)", fontFamily: "var(--font-space-mono)" }}>✓ PASS</span>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#eaecf6" }}>{item.scenario}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>{item.result}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM NAV ── */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "6px" }}>Next project</div>
              <Link href="/projects/auxtion" style={{ fontSize: "16px", fontWeight: 600, color: "var(--a2)", textDecoration: "none" }}>
                Auxtion — Live Auction Marketplace →
              </Link>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link href="/projects" style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "var(--muted)", textDecoration: "none", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)" }}>
                ← all projects
              </Link>
              <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, var(--accent), #4f46e5)", fontFamily: "var(--font-space-mono)" }}>
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}