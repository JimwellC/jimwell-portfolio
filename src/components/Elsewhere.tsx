"use client";
import { motion } from "framer-motion";

const links = [
  {
    icon: "GH",
    name: "GitHub",
    handle: "JimwellC",
    href: "https://github.com/JimwellC",
    color: "rgba(255,255,255,0.08)",
  },
  {
    icon: "LI",
    name: "LinkedIn",
    handle: "jimwell-calma",
    href: "https://linkedin.com/in/jimwell-calma-9420b12b1",
    color: "rgba(10,102,194,0.15)",
  },
  {
    icon: "✉",
    name: "Email",
    handle: "your@email.com",   // ← replace with your real email
    href: "mailto:your@email.com",  // ← replace with your real email
    color: "rgba(99,102,241,0.1)",
  },
  {
    icon: "🌐",
    name: "Portfolio (old)",
    handle: "jimwellcalma.netlify.app",
    href: "https://jimwellcalma.netlify.app",
    color: "rgba(34,211,238,0.08)",
  },
];

export default function Elsewhere() {
  return (
    <section
      id="contact"
      style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}
    >
      <div className="col">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Elsewhere
        </motion.div>

        {/* CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ marginBottom: "32px" }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#eaecf6", marginBottom: "8px" }}>
            Let&apos;s work together.
          </h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "420px", lineHeight: 1.7 }}>
            I&apos;m currently open to full-time roles and freelance projects.
            If you&apos;re building something interesting, I&apos;d love to hear about it.
          </p>
        </motion.div>

        {/* Social links grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 18px", borderRadius: "12px",
                background: "var(--s1)", border: "0.5px solid var(--border)",
                textDecoration: "none", cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--border2)";
                e.currentTarget.style.background = "var(--s2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--s1)";
              }}
            >
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: link.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700, color: "var(--text)",
                fontFamily: "var(--font-space-mono)", flexShrink: 0,
              }}>
                {link.icon}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#eaecf6", marginBottom: "2px" }}>
                  {link.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>
                  {link.handle}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}