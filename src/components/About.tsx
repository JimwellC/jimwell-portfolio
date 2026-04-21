"use client";

import { motion } from "framer-motion";

export default function About() {
  const stats = [
    ["Status",     "Open to work",           "var(--green)"],
    ["Based in",   "Angeles, Philippines",   "var(--cyan)"],
    ["Focus",      "Full stack + mobile",    "var(--a2)"],
    ["Remote",     "Yes, preferred",         "var(--green)"],
    ["Internship", "Hooli · Microsoft",      "var(--text)"],
  ] as const;

  return (
    <section id="about" className="section">
      <div className="col">
        <div className="eyebrow">About</div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px", alignItems: "start",
          }}
          className="about-grid"
          >
          {/* Left */}
          <div>
            <h2 style={{ fontSize:"22px", fontWeight:600, color:"#eaecf6", lineHeight:1.3, marginBottom:"16px" }}>
              I like building things where the{" "}
              <span style={{ color:"var(--a2)" }}>stakes are real.</span>
            </h2>
            {[
              "I'm a fresh graduate from Holy Angel University who ended up building accessibility features for a Microsoft project before finishing school.",
              "That experience — making sure blind and motor-impaired users could actually use an app — changed how I think about software.",
              "Now I'm looking for a team that cares about the craft. I want to work on things that are technically interesting and that actually matter.",
            ].map((p,i) => (
              <p key={i} style={{ fontSize:"13px", color:"var(--muted)", lineHeight:1.72, marginBottom:"12px" }}>{p}</p>
            ))}
          </div>
          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stats.map(([label, value, color], i) => (
                <motion.div
                key={label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", borderRadius: "10px",
                    background: "var(--s1)", border: "0.5px solid var(--border)",
                }}
                >
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>{label}</span>
                <span style={{ fontSize: "13px", fontWeight: 500, color, fontFamily: "var(--font-space-mono)" }}>{value}</span>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}