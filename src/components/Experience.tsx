"use client";
import { motion } from "framer-motion";

export default function Experience() {
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            display: "grid",
            gridTemplateColumns: "20px 1fr auto",
            gap: "24px",
            padding: "28px",
            borderRadius: "16px",
            background: "var(--s1)",
            border: "0.5px solid var(--border)",
            alignItems: "start",
          }}
        >
          {/* Timeline dot */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
            }}/>
            <div style={{
              width: "1px", flex: 1, marginTop: "8px", minHeight: "40px",
              background: "linear-gradient(var(--border2), transparent)",
            }}/>
          </div>

          {/* Body */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>
              Software Engineer Intern
            </h3>
            <p style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", marginBottom: "14px" }}>
              Hooli Software · Compass Group at Microsoft — Redmond, WA
            </p>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.72, marginBottom: "12px" }}>
              Contributed to the design, testing, and deployment of the{" "}
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>DiSH Dashboard</strong>{" "}
              — a Dining Service Health platform built for Microsoft&apos;s operations at their
              Redmond Global Headquarters in Washington, United States.
            </p>

            {/* Certificate callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
              style={{
                marginTop: "16px", padding: "12px 16px", borderRadius: "10px",
                background: "rgba(99,102,241,0.06)",
                border: "0.5px solid rgba(99,102,241,0.2)",
                display: "flex", alignItems: "center", gap: "12px",
              }}
            >
              {/* Microsoft logo colors */}
              <div style={{
                width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0,
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr", gap: "2px", padding: "4px",
                background: "rgba(255,255,255,0.05)",
              }}>
                <div style={{ background: "#f25022", borderRadius: "1px" }}/>
                <div style={{ background: "#7fba00", borderRadius: "1px" }}/>
                <div style={{ background: "#00a4ef", borderRadius: "1px" }}/>
                <div style={{ background: "#ffb900", borderRadius: "1px" }}/>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>
                  Certificate of Appreciation — Microsoft Corporation
                </div>
                <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
                  Compass Group at Microsoft · August 15, 2025 · Redmond, WA
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right tags */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <span style={{
              fontSize: "10px", padding: "3px 10px", borderRadius: "6px",
              background: "var(--s2)", border: "0.5px solid var(--border)",
              color: "var(--dim)", fontFamily: "var(--font-space-mono)",
            }}>2025</span>
            {["DiSH Dashboard", "Microsoft HQ", "Redmond, WA"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                style={{
                  fontSize: "10px", padding: "2px 8px", borderRadius: "6px",
                  background: "rgba(99,102,241,0.07)",
                  border: "0.5px solid rgba(99,102,241,0.22)",
                  color: "var(--a2)", fontFamily: "var(--font-space-mono)",
                }}
              >{t}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}