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

type Filter = "all" | "technical" | "course" | "award";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Technical", value: "technical" },
  { label: "Courses", value: "course" },
  { label: "Awards", value: "award" },
];

function CertCard({ cert }: { cert: Certificate }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        onClick={() => setLightbox(true)}
        style={{
          borderRadius: "14px", overflow: "hidden",
          background: "var(--s1)", border: "0.5px solid var(--border)",
          cursor: "pointer", transition: "border-color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"}
      >
        {/* Certificate image preview */}
        <div style={{
          position: "relative", height: "160px",
          background: "var(--s2)", overflow: "hidden",
        }}>
          <Image
            src={cert.image}
            alt={cert.name}
            fill
            style={{ objectFit: "cover", transition: "transform 0.3s" }}
          />
          {/* Overlay on hover hint */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(8,9,16,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0, transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0"}
          >
            <span style={{
              fontSize: "11px", color: "#fff",
              fontFamily: "var(--font-space-mono)",
              padding: "6px 14px", borderRadius: "20px",
              background: "rgba(0,0,0,0.6)",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}>
              view certificate ↗
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{
              fontSize: "10px", padding: "2px 8px", borderRadius: "20px",
              fontFamily: "var(--font-space-mono)",
              ...categoryStyles[cert.category],
            }}>
              {categoryLabels[cert.category]}
            </span>
            <span style={{
              fontSize: "10px", color: "var(--dim)",
              fontFamily: "var(--font-space-mono)",
              background: "var(--s2)", padding: "2px 8px",
              borderRadius: "6px", border: "0.5px solid var(--border)",
            }}>
              {cert.date}
            </span>
          </div>

          <h3 style={{
            fontSize: "13px", fontWeight: 600,
            color: "#eaecf6", marginBottom: "4px", lineHeight: 1.4,
          }}>
            {cert.name}
          </h3>
          <span style={{
            fontSize: "11px", color: cert.color,
            fontFamily: "var(--font-space-mono)",
          }}>
            {cert.issuer}
          </span>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center",
              justifyContent: "center", padding: "24px",
              cursor: "zoom-out",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative", borderRadius: "16px",
                overflow: "hidden", maxWidth: "860px", width: "100%",
                border: "0.5px solid var(--border2)",
                boxShadow: "0 0 80px rgba(99,102,241,0.2)",
                cursor: "default",
              }}
            >
              <Image
                src={cert.image}
                alt={cert.name}
                width={860}
                height={640}
                style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
              />

              {/* Bottom bar */}
              <div style={{
                padding: "16px 20px", background: "var(--s1)",
                borderTop: "0.5px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>
                    {cert.name}
                  </div>
                  <div style={{ fontSize: "11px", color: cert.color, fontFamily: "var(--font-space-mono)" }}>
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {cert.href && (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        fontSize: "11px", color: "var(--a2)",
                        textDecoration: "none", fontFamily: "var(--font-space-mono)",
                        padding: "6px 14px", borderRadius: "8px",
                        border: "0.5px solid var(--border2)",
                      }}
                    >
                      verify ↗
                    </a>
                  )}
                  <button
                    onClick={() => setLightbox(false)}
                    style={{
                      fontSize: "11px", color: "var(--dim)",
                      fontFamily: "var(--font-space-mono)",
                      padding: "6px 14px", borderRadius: "8px",
                      border: "0.5px solid var(--border)",
                      background: "transparent", cursor: "pointer",
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </motion.div>

            <div style={{
              position: "absolute", bottom: "24px",
              fontSize: "11px", color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-space-mono)",
            }}>
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

      {/* Nav */}
      <div style={{
        borderBottom: "0.5px solid var(--border)", padding: "14px 0",
        background: "rgba(8,9,16,0.9)", backdropFilter: "blur(14px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "7px",
              background: "linear-gradient(135deg,var(--accent),var(--cyan))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, color: "#fff",
              fontFamily: "var(--font-space-mono)",
            }}>JC</div>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>
              ← back home
            </span>
          </Link>
          <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
            {filtered.length} certificate{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="col" style={{ paddingTop: "56px", paddingBottom: "80px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "48px" }}
        >
          <p style={{
            fontFamily: "var(--font-space-mono)", fontSize: "10px",
            color: "var(--a2)", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "12px", opacity: 0.7,
          }}>
            All credentials
          </p>
          <h1 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700,
            color: "#eaecf6", letterSpacing: "-0.02em",
            lineHeight: 1.1, marginBottom: "12px",
          }}>
            Certifications & credentials.
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)", maxWidth: "440px", lineHeight: 1.7 }}>
            Click any certificate to view the full image. All credentials are real and verifiable.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: "flex", gap: "6px", marginBottom: "36px", flexWrap: "wrap" }}
        >
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "7px 16px", borderRadius: "100px",
                fontSize: "12px", cursor: "pointer",
                fontFamily: "var(--font-space-mono)",
                border: filter === f.value ? "0.5px solid var(--accent)" : "0.5px solid var(--border)",
                background: filter === f.value ? "rgba(99,102,241,0.12)" : "var(--s1)",
                color: filter === f.value ? "var(--a2)" : "var(--muted)",
                transition: "all 0.15s",
              }}
            >
              {f.label}
              <span style={{ marginLeft: "6px", fontSize: "10px", opacity: 0.6 }}>
                {f.value === "all"
                  ? certifications.length
                  : certifications.filter(c => c.category === f.value).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
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
      </div>
    </main>
  );
}