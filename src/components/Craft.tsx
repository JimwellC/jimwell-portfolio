"use client";
import { motion } from "framer-motion";

const items = [
  {
    num: "01",
    title: "I go deep, not wide",
    desc: "I don't move on until I understand why something works — not just that it does. That's how I ended up rewriting the auction timer three times until the race condition was actually gone, not just hidden.",
  },
  {
    num: "02",
    title: "Architecture first",
    desc: "Before I write a single line, I think about structure. A well-designed system is easier to debug, easier to scale, and easier for the next person to read. I've seen what happens when you skip this step.",
  },
  {
    num: "03",
    title: "Flow is my superpower",
    desc: "I don't need a specific time or environment to get into it — I just need an interesting problem. Once I'm in, I'm in. Some of my best work happened in a single uninterrupted afternoon.",
  },
];

export default function Craft() {
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
          How I think
        </motion.div>

        {/* Editorial layout — headline left, items right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Left — section headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700,
              color: "#eaecf6", lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}>
              The way I approach
              {" "}<em className="not-italic" style={{
                WebkitTextStroke: "1px rgba(129,140,248,0.5)",
                color: "transparent",
              }}>every problem.</em>
            </h2>
            <p style={{
              fontSize: "13px", color: "var(--muted)",
              lineHeight: 1.72, marginTop: "16px", maxWidth: "320px",
            }}>
              Not a methodology. Just patterns I&apos;ve noticed about how I work best — picked up from building real things under real constraints.
            </p>
          </motion.div>

          {/* Right — numbered items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  padding: "20px 0",
                  borderBottom: i < items.length - 1 ? "0.5px solid var(--border)" : "none",
                }}
              >
                {/* Number */}
                <span style={{
                  fontSize: "10px", color: "var(--dim)",
                  fontFamily: "var(--font-space-mono)",
                  paddingTop: "3px", flexShrink: 0, width: "20px",
                }}>
                  {item.num}
                </span>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: "14px", fontWeight: 600,
                    color: "#eaecf6", marginBottom: "6px",
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: "12px", color: "var(--muted)", lineHeight: 1.7,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}