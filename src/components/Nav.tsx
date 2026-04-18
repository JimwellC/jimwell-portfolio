"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        width: "100%",
        borderBottom: "0.5px solid var(--border)",
        background: scrolled ? "rgba(8,9,16,0.96)" : "rgba(8,9,16,0.75)",
        backdropFilter: "blur(14px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "linear-gradient(135deg,var(--accent),var(--cyan))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "12px",
            fontFamily: "var(--font-space-mono)",
          }}>JC</div>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#e0e2f4" }}>Jimwell Calma</span>
          <span style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "2px 10px", borderRadius: "20px", fontSize: "11px",
            background: "rgba(74,222,128,0.08)", border: "0.5px solid rgba(74,222,128,0.2)",
            color: "var(--green)", fontFamily: "var(--font-space-mono)",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)", animation: "pulse-dot 2s ease infinite" }} />
            open to work
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {["work","about","contact"].map(l => (
            <a key={l} href={`#${l}`} style={{
              fontSize: "12px", color: "var(--muted)",
              textDecoration: "none", fontFamily: "var(--font-space-mono)",
            }}>{l}</a>
          ))}
          <a href="mailto:jimwellcalma@email.com" style={{
            fontSize: "12px", padding: "6px 16px", borderRadius: "20px",
            border: "0.5px solid rgba(255,255,255,0.12)",
            color: "var(--text)", textDecoration: "none",
            fontFamily: "var(--font-space-mono)",
          }}>hire me</a>
        </div>
      </div>
    </motion.nav>
  );
}