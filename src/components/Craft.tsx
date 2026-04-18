"use client";
import { motion } from "framer-motion";

const items = [
  { icon: "⚡", title: "Performance is a feature",    desc: "A bidding system that lags by 200ms isn't a bidding system. I design for latency from the start, not as an optimization pass at the end." },
  { icon: "♿", title: "Accessibility by default",     desc: "Spent time building for people who use screen readers and can't rely on touch. That changes how you think about every interface you build after." },
  { icon: "🔧", title: "I read the hard parts",        desc: "WebSocket connection drops, Redis race conditions, multi-tenant data isolation — I find the edge cases interesting, not annoying." },
];

export default function Craft() {
  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <div className="eyebrow">How I think</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                padding: "22px", borderRadius: "14px",
                background: "var(--s1)", border: "0.5px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}