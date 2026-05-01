"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { experiences, type Certificate } from "@/data/experience";

// ── Icon renderer ──
function CertIcon({ type }: { type: Certificate["icon"] }) {
  if (type === "microsoft") {
    return (
      <div style={{ width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "2px", padding: "4px", background: "rgba(255,255,255,0.05)" }}>
        <div style={{ background: "#f25022", borderRadius: "1px" }}/>
        <div style={{ background: "#7fba00", borderRadius: "1px" }}/>
        <div style={{ background: "#00a4ef", borderRadius: "1px" }}/>
        <div style={{ background: "#ffb900", borderRadius: "1px" }}/>
      </div>
    );
  }
  if (type === "hooli") {
    return (
      <div style={{ width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#eaecf6", fontFamily: "var(--font-space-mono)" }}>H</span>
      </div>
    );
  }
  return (
    <div style={{ width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0, background: "rgba(99,102,241,0.1)", border: "0.5px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: "12px", color: "var(--a2)" }}>◎</span>
    </div>
  );
}

// ── Lightbox ──
function CertLightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
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
        style={{ position: "relative", borderRadius: "16px", overflow: "hidden", maxWidth: "800px", width: "100%", border: "0.5px solid var(--border2)", boxShadow: "0 0 80px rgba(99,102,241,0.2)", cursor: "default" }}
      >
        <Image
          key={cert.src}
          src={cert.src}
          alt={cert.alt}
          width={800}
          height={600}
          sizes="(max-width: 768px) 90vw, 800px"  // ADD THIS
          style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
        />
        <div style={{ padding: "16px 20px", background: "var(--s1)", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{cert.title}</div>
            <div style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>{cert.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer" }}>close</button>
        </div>
      </motion.div>
      <div style={{ position: "absolute", bottom: "24px", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-space-mono)" }}>click outside to close</div>
    </motion.div>,
    document.body
  );
}

export default function Experience() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Experience
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: expIndex * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr auto",
                gap: "24px", padding: "28px",
                borderRadius: "16px",
                background: "var(--s1)",
                border: "0.5px solid var(--border)",
                alignItems: "start",
              }}
              className="exp-grid"
            >
              {/* Timeline dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, var(--accent), var(--cyan))" }}/>
                <div style={{ width: "1px", flex: 1, marginTop: "8px", minHeight: "40px", background: "linear-gradient(var(--border2), transparent)" }}/>
              </div>

              {/* Body */}
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>{exp.role}</h3>
                <p style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", marginBottom: "14px" }}>
                  {exp.company} — {exp.location}
                </p>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.72, marginBottom: "16px" }}>
                  {exp.description.split(exp.highlight).map((part, i, arr) => (
                    i < arr.length - 1 ? (
                      <span key={i}>{part}<strong style={{ color: "var(--text)", fontWeight: 500 }}>{exp.highlight}</strong></span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  ))}
                </p>

                {/* Certificates */}
                {exp.certificates.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {exp.certificates.map((cert, i) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.25 + i * 0.1 }}
                        onClick={() => setActiveCert(cert)}
                        style={{
                          padding: "12px 16px", borderRadius: "10px",
                          background: "rgba(99,102,241,0.06)",
                          border: "0.5px solid rgba(99,102,241,0.2)",
                          display: "flex", alignItems: "center", gap: "12px",
                          cursor: "zoom-in",
                          transition: "background 0.2s, border-color 0.2s",
                        }}
                        whileHover={{ background: "rgba(99,102,241,0.12)" } as never}
                      >
                        <CertIcon type={cert.icon} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{cert.title}</div>
                          <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{cert.subtitle}</div>
                        </div>
                        <span style={{ fontSize: "10px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", flexShrink: 0 }}>view ↗</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right tags */}
              <div className="exp-tags" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                <span style={{ fontSize: "10px", padding: "3px 10px", borderRadius: "6px", background: "var(--s2)", border: "0.5px solid var(--border)", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{exp.period}</span>
                {exp.tags.map((t, i) => (
                  <motion.span key={t}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                    style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "6px", background: "rgba(99,102,241,0.07)", border: "0.5px solid rgba(99,102,241,0.22)", color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}
                  >{t}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeCert && (
          <CertLightbox cert={activeCert} onClose={() => setActiveCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}