"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { certifications, categoryStyles, categoryLabels } from "../data/certifications";

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
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: cert.dot, flexShrink: 0,
          }}/>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#eaecf6" }}>
            {cert.name}
          </span>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <span style={{
            fontSize: "10px", padding: "2px 8px", borderRadius: "20px",
            fontFamily: "var(--font-space-mono)",
            ...categoryStyles[cert.category],
          }}>
            {categoryLabels[cert.category]}
          </span>
          <span style={{
            fontSize: "11px", color: cert.color,
            fontFamily: "var(--font-space-mono)",
          }}>
            {cert.issuer}
          </span>
          <span style={{
            fontSize: "10px", color: "var(--dim)",
            fontFamily: "var(--font-space-mono)",
            background: "var(--s2)", padding: "2px 8px",
            borderRadius: "6px", border: "0.5px solid var(--border)",
          }}>
            {cert.date}
          </span>
          <span style={{
            fontSize: "10px", color: "var(--dim)",
            fontFamily: "var(--font-space-mono)",
          }}>
            view ↗
          </span>
        </div>
      </div>

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
                overflow: "hidden", maxWidth: "800px", width: "100%",
                border: "0.5px solid var(--border2)",
                boxShadow: "0 0 80px rgba(99,102,241,0.2)",
                cursor: "default",
              }}
            >
              <Image
                src={cert.image}
                alt={cert.name}
                width={800}
                height={600}
                style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
              />

              {/* Bottom overlay */}
              <div style={{
                padding: "16px 20px",
                background: "var(--s1)",
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
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {cert.href && (
                    <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                        fontSize: "11px",
                        color: "var(--a2)",
                        textDecoration: "none",
                        fontFamily: "var(--font-space-mono)",
                        padding: "5px 12px",
                        borderRadius: "8px",
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
                      padding: "5px 12px", borderRadius: "8px",
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

export default function Certifications() {
  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.div>

        {/* Featured list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            borderRadius: "14px", overflow: "hidden",
            border: "0.5px solid var(--border)",
            marginBottom: "16px",
          }}
        >
          {featured.map((cert, i) => (
            <CertRow key={cert.id} cert={cert} i={i} total={featured.length} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <p style={{
            fontSize: "11px", color: "var(--dim)",
            fontFamily: "var(--font-space-mono)",
          }}>
            * Microsoft Certificate of Appreciation listed under Experience.
          </p>
          <Link
            href="/certifications"
            style={{
              fontSize: "11px", color: "var(--a2)",
              fontFamily: "var(--font-space-mono)",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 14px", borderRadius: "8px",
              border: "0.5px solid var(--border2)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.08)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
          >
            View all {certifications.length} certificates →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}