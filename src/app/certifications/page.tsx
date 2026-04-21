"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  certifications,
  categoryStyles,
  categoryLabels,
  type Certificate,
} from "@/data/certifications";

type Filter = "all" | "technical" | "course" | "award" | "webinar" | "seminar";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Technical", value: "technical" },
  { label: "Courses", value: "course" },
  { label: "Awards", value: "award" },
  { label: "Webinars", value: "webinar" },
  { label: "Seminars", value: "seminar" },
];

function CertCard({ cert }: { cert: Certificate }) {
  const [lightbox, setLightbox] = useState(false);
  const spotRef = { current: null as HTMLDivElement | null };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--so", "1");
  };
  const handleMouseLeave = () => spotRef.current?.style.setProperty("--so", "0");

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        // eslint-disable-next-line react-hooks/immutability
        ref={el => { spotRef.current = el; }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setLightbox(true)}
        style={{
          borderRadius: "16px", overflow: "hidden",
          background: "var(--s1)", border: "0.5px solid var(--border)",
          cursor: "pointer", position: "relative",
          transition: "border-color 0.2s",
          "--mx": "50%", "--my": "50%", "--so": "0",
        } as React.CSSProperties}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"}
      >
        {/* Spotlight */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(260px circle at var(--mx) var(--my), rgba(99,102,241,0.1), transparent 70%)",
          opacity: "var(--so)" as unknown as number,
          transition: "opacity 0.3s", borderRadius: "16px",
        }}/>

        {/* Certificate image */}
        <div style={{ position: "relative", height: "180px", background: "var(--s2)", overflow: "hidden" }}>
          <Image
            src={cert.image}
            alt={cert.name}
            fill
            style={{ objectFit: "cover", transition: "transform 0.3s" }}
            onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
            onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,16,24,1) 0%, transparent 55%)", pointerEvents: "none" }}/>

          {/* Badges on image */}
          <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "5px", zIndex: 2 }}>
            <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...categoryStyles[cert.category] }}>
              {categoryLabels[cert.category]}
            </span>
          </div>
          <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 7px", borderRadius: "8px" }}>
              {cert.date}
            </span>
          </div>

          {/* View hint */}
          <div style={{ position: "absolute", bottom: "10px", right: "10px", zIndex: 2, fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space-mono)" }}>
            tap to view ↗
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px", position: "relative", zIndex: 2 }}>
          <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px", lineHeight: 1.4 }}>
            {cert.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>
              {cert.issuer}
            </span>
            {cert.href && (
              <a href={cert.href} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontSize: "10px", color: "var(--a2)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
                verify ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", maxWidth: "860px", width: "100%", border: "0.5px solid var(--border2)", boxShadow: "0 0 80px rgba(99,102,241,0.2)", cursor: "default" }}
            >
              <Image src={cert.image} alt={cert.name} width={860} height={640} style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "16px 20px", background: "var(--s1)", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{cert.name}</div>
                  <div style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>{cert.issuer} · {cert.date}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {cert.href && (
                    <a href={cert.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{ fontSize: "11px", color: "var(--a2)", textDecoration: "none", fontFamily: "var(--font-space-mono)", padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border2)" }}>
                      verify ↗
                    </a>
                  )}
                  <button onClick={() => setLightbox(false)}
                    style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", padding: "6px 14px", borderRadius: "8px", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer" }}>
                    close
                  </button>
                </div>
              </div>
            </motion.div>
            <div style={{ position: "absolute", bottom: "24px", fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-space-mono)" }}>
              click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function CertificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? certifications
    : certifications.filter(c => c.category === filter);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <div style={{
        borderBottom: "0.5px solid var(--border)", padding: "0",
        background: "rgba(8,9,16,0.92)", backdropFilter: "blur(14px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "7px",
                background: "linear-gradient(135deg,var(--accent),var(--cyan))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, color: "#fff",
                fontFamily: "var(--font-space-mono)",
              }}>JC</div>
            </Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>
              certifications
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
              {filtered.length} / {certifications.length}
            </span>
            <Link href="/" style={{
              fontSize: "11px", color: "var(--muted)", textDecoration: "none",
              fontFamily: "var(--font-space-mono)", padding: "5px 12px",
              borderRadius: "8px", border: "0.5px solid var(--border)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--a2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
            >← home</Link>
          </div>
        </div>
      </div>

      <div className="col" style={{ paddingTop: "48px", paddingBottom: "80px" }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "var(--a2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", opacity: 0.7 }}>
                All credentials
              </p>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#eaecf6", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Certifications & credentials.
              </h1>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "300px", lineHeight: 1.7 }}>
              Click any certificate to view the full image. All credentials are real and verifiable.
            </p>
          </div>
        </motion.div>

        {/* ── FILTERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: "flex", gap: "6px", marginBottom: "32px", flexWrap: "wrap", borderBottom: "0.5px solid var(--border)", paddingBottom: "24px" }}
        >
          {filters.map(f => {
            const count = f.value === "all" ? certifications.length : certifications.filter(c => c.category === f.value).length;
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: "6px 14px", borderRadius: "8px",
                  fontSize: "12px", cursor: "pointer",
                  fontFamily: "var(--font-space-mono)",
                  border: isActive ? "0.5px solid var(--accent)" : "0.5px solid var(--border)",
                  background: isActive ? "rgba(99,102,241,0.1)" : "transparent",
                  color: isActive ? "var(--a2)" : "var(--muted)",
                  transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                {f.label}
                <span style={{
                  fontSize: "10px",
                  background: isActive ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                  padding: "1px 5px", borderRadius: "4px",
                  color: isActive ? "var(--a2)" : "var(--dim)",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "12px",
            }}
            className="certs-page-grid"
          >
            {filtered.map(cert => (
              <CertCard key={cert.id} cert={cert} />
            ))}

            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "13px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
                  no certificates in this category yet
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Microsoft note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: "32px", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}
        >
          * Certificate of Appreciation from Microsoft Corporation is listed under Experience on the main page.
        </motion.p>
      </div>
    </main>
  );
}