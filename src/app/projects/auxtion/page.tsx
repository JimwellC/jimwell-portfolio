"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  auctionImageSections,
  techStack,
  challenges,
  bidFlow,
  builtFeatures,
  inProgressFeatures,
} from "@/data/auxtion";

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
        <Image
          src={src}
          alt={alt}
          width={900}
          height={700}
          sizes="(max-width: 768px) 90vw, 900px"  // ADD THIS
          style={{ objectFit: "contain", maxHeight: "88vh", width: "auto", display: "block" }}
        />
        <button onClick={onClose} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.85)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </motion.div>
      <div style={{ position: "absolute", bottom: "24px", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-space-mono)" }}>click outside to close</div>
    </motion.div>,
    document.body
  );
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AuctionCaseStudy() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const openLightbox = useCallback((src: string, alt: string) => { setLightboxSrc(src); setLightboxAlt(alt); }, []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />}
      </AnimatePresence>

      {/* ── NAV ── */}
      <div style={{ borderBottom: "0.5px solid var(--border)", background: "rgba(8,9,16,0.92)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg,var(--accent),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-space-mono)" }}>JC</div>
            </Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <Link href="/projects" style={{ fontSize: "12px", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>projects</Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <span style={{ fontSize: "12px", color: "var(--text)", fontFamily: "var(--font-space-mono)" }}>auxtion</span>
          </div>
          <Link href="/projects"
            style={{ fontSize: "11px", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-space-mono)", padding: "5px 12px", borderRadius: "8px", border: "0.5px solid var(--border)", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--a2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >← all projects</Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ borderBottom: "0.5px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="pointer-events-none" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(99,102,241,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 30%, rgba(34,211,238,0.05) 0%, transparent 60%)" }}/>
        <div className="col" style={{ paddingTop: "64px", paddingBottom: "56px", position: "relative" }}>
          <motion.div variants={fade} initial="hidden" animate="show" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", background: "rgba(74,222,128,0.08)", border: "0.5px solid rgba(74,222,128,0.2)", color: "var(--green)" }}>● in development</span>
            <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>Personal Project · Solo</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: "#eaecf6", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "16px" }}
          >
            Auxtion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "560px", fontWeight: 300, marginBottom: "32px" }}
          >
            A live auction marketplace for the Philippine market — think Whatnot, built mobile-first
            for Filipino buyers and sellers with real-time bidding, proxy auctions, and GCash-native payments.
          </motion.p>

          <motion.div variants={fade} initial="hidden" animate="show" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer"
              style={{ padding: "10px 22px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, var(--accent), #4f46e5)" }}>
              View on GitHub ↗
            </a>
            <span style={{ padding: "10px 22px", borderRadius: "100px", fontSize: "13px", color: "var(--dim)", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }}/>
              iOS · Android · React Native
            </span>
          </motion.div>
        </div>
      </section>

      <div className="col" style={{ paddingTop: "0", paddingBottom: "80px" }}>

        {/* ── IMAGE SECTIONS ── */}
        {auctionImageSections.filter(s => s.images.length > 0).map(section => (
          <section key={section.id} style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="eyebrow">{section.title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
                {section.images.map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => openLightbox(s.src, s.alt)}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"}
                    style={{ position: "relative", borderRadius: "16px", overflow: "hidden", background: "var(--s1)", border: "0.5px solid var(--border)", cursor: "zoom-in", transition: "border-color 0.2s" }}
                  >
                    <div style={{ position: "relative", height: "320px" }}>
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"  // ADD THIS
                        style={{ objectFit: "cover", transition: "transform 0.3s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.5) 0%, transparent 60%)", pointerEvents: "none" }}/>
                      <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 8px", borderRadius: "8px" }}>tap to expand ↗</div>
                    </div>
                    {s.caption && (
                      <div style={{ padding: "10px 14px", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{s.caption}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        ))}

        {/* ── WHAT IT IS ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">The Project</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="about-grid">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 600, color: "#eaecf6", lineHeight: 1.3, marginBottom: "16px", letterSpacing: "-0.01em" }}>
                Whatnot exists.{" "}
                <span style={{ color: "var(--a2)" }}>It just doesn&apos;t work for Filipinos.</span>
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>
                Live auction commerce is already happening in the Philippines — mostly over Facebook Live and TikTok Shop, manually managed by sellers tracking bids in comments. Auxtion makes it structured, real-time, and fair.
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>
                Built mobile-first for iOS and Android with React Native and Expo. The backend runs NestJS on Railway with PostgreSQL for persistence and Redis for real-time fan-out.
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>
                Solo project — I designed the schema, built the Socket.IO gateway, wrote the proxy bid engine, and built the entire React Native UI myself.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                { label: "Platform", value: "iOS + Android (React Native / Expo)" },
                { label: "Backend", value: "NestJS on Railway" },
                { label: "Database", value: "PostgreSQL + Prisma ORM" },
                { label: "Real-time", value: "Socket.IO + Redis pub/sub" },
                { label: "Market", value: "Philippine auction commerce" },
                { label: "Team", value: "Solo — full stack" },
                { label: "Status", value: "In active development" },
              ].map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderRadius: "10px", background: "var(--s1)", border: "0.5px solid var(--border)" }}
                >
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>{item.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BID FLOW ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Bid Flow</div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}
          >
            From swipe to sold — every bid goes through a server-authoritative pipeline designed to be fast, atomic, and cheat-proof.
          </motion.p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {bidFlow.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: i < bidFlow.length - 1 ? "0.5px solid var(--border)" : "none", alignItems: "flex-start" }}
              >
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{step.num}</span>
                  <span style={{ fontSize: "20px" }}>{step.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", marginBottom: "5px" }}>{step.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TECHNICAL CHALLENGES ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Technical Challenges</div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}
          >
            The hardest parts weren&apos;t the features — they were the edge cases that only show up when two users do the same thing at the same time.
          </motion.p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {challenges.map((c, i) => (
              <motion.div key={c.num}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                style={{ borderRadius: "14px", background: "var(--s1)", border: "0.5px solid var(--border)", overflow: "hidden" }}
              >
                <div style={{ padding: "20px 24px", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{c.num}</span>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#eaecf6" }}>{c.title}</h3>
                  </div>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontFamily: "var(--font-space-mono)", color: c.tagColor, background: `${c.tagColor}18`, border: `0.5px solid ${c.tagColor}40`, flexShrink: 0 }}>
                    {c.tag}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="about-grid">
                  <div style={{ padding: "20px 24px", borderRight: "0.5px solid var(--border)" }}>
                    <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Problem</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{c.problem}</p>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Solution</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{c.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Tech Stack</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {techStack.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                style={{ padding: "16px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)" }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>{t.label}</div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BUILD STATUS ── */}
        <section style={{ padding: "56px 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="eyebrow">Build Status</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="about-grid">
            {/* Built */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ borderRadius: "14px", background: "var(--s1)", border: "0.5px solid var(--border)", overflow: "hidden" }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }}/>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--green)", fontFamily: "var(--font-space-mono)" }}>Built & Working</span>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {builtFeatures.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ fontSize: "10px", color: "var(--green)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* In progress */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ borderRadius: "14px", background: "var(--s1)", border: "0.5px solid var(--border)", overflow: "hidden" }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--a2)", display: "inline-block", animation: "pulse-dot 2s ease infinite" }}/>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>In Progress</span>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {inProgressFeatures.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ fontSize: "10px", color: "var(--a2)", marginTop: "2px", flexShrink: 0 }}>◐</span>
                    <span style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BOTTOM NAV ── */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "6px" }}>Next project</div>
              <Link href="/projects/reachable" style={{ fontSize: "16px", fontWeight: 600, color: "var(--a2)", textDecoration: "none" }}>
                ReachAble — Emergency App for PWDs →
              </Link>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link href="/projects" style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "var(--muted)", textDecoration: "none", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)" }}>
                ← all projects
              </Link>
              <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, var(--accent), #4f46e5)", fontFamily: "var(--font-space-mono)" }}>
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}