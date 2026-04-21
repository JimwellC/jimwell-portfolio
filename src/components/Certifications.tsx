"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { certifications, categoryStyles, categoryLabels } from "@/data/certifications";

const featured = certifications.filter(c => c.featured);

function CertRow({ cert, i, total }: {
  cert: typeof certifications[0];
  i: number;
  total: number;
}) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div
        onClick={() => setLightbox(true)}
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: "var(--s1)",
          borderBottom: i < total - 1 ? "0.5px solid var(--border)" : "none",
          transition: "background 0.15s",
          cursor: "pointer", gap: "16px",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--s2)"}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--s1)"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: cert.dot, flexShrink: 0 }}/>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#eaecf6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {cert.name}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...categoryStyles[cert.category] }}>
            {categoryLabels[cert.category]}
          </span>
          <span style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>{cert.issuer}</span>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", background: "var(--s2)", padding: "2px 8px", borderRadius: "6px", border: "0.5px solid var(--border)" }}>{cert.date}</span>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>↗</span>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", maxWidth: "800px", width: "100%", border: "0.5px solid var(--border2)", boxShadow: "0 0 80px rgba(99,102,241,0.2)", cursor: "default" }}
            >
              <Image src={cert.image} alt={cert.name} width={800} height={600} style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "16px 20px", background: "var(--s1)", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{cert.name}</div>
                  <div style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>{cert.issuer} · {cert.date}</div>
                </div>
                <button onClick={() => setLightbox(false)} style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer" }}>close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile card for horizontal scroll
function MobileCertCard({ cert }: { cert: typeof certifications[0] }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div
        onClick={() => setLightbox(true)}
        style={{
          flexShrink: 0, width: "200px", borderRadius: "14px",
          overflow: "hidden", background: "var(--s1)",
          border: "0.5px solid var(--border)", cursor: "pointer",
        }}
      >
        {/* Certificate image preview */}
        <div style={{ position: "relative", height: "120px", background: "var(--s2)" }}>
          <Image src={cert.image} alt={cert.name} fill style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.8) 0%, transparent 60%)", pointerEvents: "none" }}/>
          <span style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "9px", padding: "2px 7px", borderRadius: "10px", fontFamily: "var(--font-space-mono)", ...categoryStyles[cert.category] }}>
            {categoryLabels[cert.category]}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: "10px 12px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#eaecf6", lineHeight: 1.4, marginBottom: "4px" }}>
            {cert.name}
          </p>
          <p style={{ fontSize: "10px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>
            {cert.issuer}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", maxWidth: "800px", width: "100%", border: "0.5px solid var(--border2)", cursor: "default" }}
            >
              <Image src={cert.image} alt={cert.name} width={800} height={600} style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "14px 18px", background: "var(--s1)", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{cert.name}</div>
                  <div style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>{cert.issuer} · {cert.date}</div>
                </div>
                <button onClick={() => setLightbox(false)} style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer" }}>close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Certifications() {
  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>

      {/* ── DESKTOP — table rows ── */}
      <div className="certs-desktop">
        <div className="col">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
            Certifications
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 }}
            style={{ borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--border)", marginBottom: "16px" }}
          >
            {featured.map((cert, i) => (
              <CertRow key={cert.id} cert={cert} i={i} total={featured.length} />
            ))}
          </motion.div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
              * Microsoft Certificate of Appreciation listed under Experience.
            </p>
            <Link href="/certifications" style={{
              fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border2)",
            }}>
              View all {certifications.length} certificates →
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE — horizontal scroll cards ── */}
      <div className="certs-mobile">
        <div style={{ padding: "0 20px" }}>
          <div className="eyebrow">Certifications</div>
        </div>

        {/* Scroll strip */}
        <div style={{
          display: "flex", gap: "10px",
          overflowX: "auto", paddingBottom: "16px",
          paddingLeft: "20px", paddingRight: "20px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}>
          {featured.map(cert => (
            <MobileCertCard key={cert.id} cert={cert} />
          ))}

          {/* View all card */}
          <Link href="/certifications" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: "120px", height: "100%", minHeight: "180px",
              borderRadius: "14px", padding: "16px",
              background: "var(--s1)", border: "0.5px dashed rgba(99,102,241,0.25)",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: "8px",
            }}>
              <div style={{ fontSize: "22px", color: "var(--a2)" }}>→</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#eaecf6", textAlign: "center" }}>View all</div>
              <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", textAlign: "center" }}>{certifications.length} certs</div>
            </div>
          </Link>
        </div>

        <div style={{ padding: "12px 20px 0" }}>
          <p style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
            * Microsoft Certificate listed under Experience.
          </p>
        </div>
      </div>

    </section>
  );
}