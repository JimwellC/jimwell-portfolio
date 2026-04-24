"use client";
import { motion } from "framer-motion";

const stats = [
  ["Status",     "Exploring opportunities", "var(--a2)"],
  ["Based in",   "Angeles, Philippines",    "var(--cyan)"],
  ["Focus",      "Full stack + mobile",     "var(--a2)"],
  ["Remote",     "Yes, preferred",          "var(--green)"],
  ["Education",  "HAU · BS IT · 2026",      "var(--text)"],
  ["Internship", "Compass Group · Microsoft","var(--text)"],
] as const;

export default function About() {
  return (
    <section id="about" className="section">
      <div className="col">
        <div className="eyebrow">About</div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}
          className="about-grid"
        >
          {/* Left */}
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#eaecf6", lineHeight: 1.3, marginBottom: "16px" }}>
              I like building things where the{" "}
              <span style={{ color: "var(--a2)" }}>stakes are real.</span>
            </h2>
            {[
              "I graduated from Holy Angel University in early 2026 with a BS in Information Technology, specializing in Web Development. Before finishing school, I was already contributing to a real Microsoft project — building the DiSH Dashboard for Compass Group at Microsoft's Redmond headquarters.",
              "Outside of software, I run a small side hustle buying and selling vintage clothes — which is actually what inspired Fad Fashiown, my TikTok live selling automation platform. I understand the problem because I lived it.",
              "I'm exploring what's next. I want to join a team where the technical problems are hard, the product actually matters, and the people care about doing it right.",
            ].map((p, i) => (
              <p key={i} style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "12px" }}>{p}</p>
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