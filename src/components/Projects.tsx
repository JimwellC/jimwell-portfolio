"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    num: "01", badge: { label: "● live", style: "live" },
    name: "Auxtion",
    story: "Built a live auction marketplace because existing platforms couldn't handle the latency demands of real-time bidding. The hard part wasn't the bidding — it was making sure two people placing a bid at the exact same millisecond didn't both win.",
    detail: "Engineered a WebSocket-first architecture with Redis pub/sub to fan out bid events to all connected clients in under 10ms. The auction timer uses server-authoritative state to prevent client-side manipulation.",
    tech: ["WebSockets", "Redis", "React Native", "Node.js"], keyTech: ["WebSockets", "Redis"],
    glow: "rgba(99,102,241,0.08)", glowHover: "rgba(99,102,241,0.14)",
    accentColor: "var(--accent)", github: "https://github.com/JimwellC", live: "#",
  },
  {
    num: "02", badge: { label: "◆ saas", style: "saas" },
    name: "Fad Fashiown",
    story: "Sellers on TikTok Live were drowning in comments. I built a SaaS that reads the stream, detects orders in real time, routes them to the right queue, and prints receipts automatically. What used to take 3 people now runs on its own.",
    detail: "Multi-tenant NestJS backend with per-client PostgreSQL schemas for data isolation. Comment parser runs a regex pipeline against TikTok's live comment feed. Thermal printer integration via ESC/POS protocol.",
    tech: ["NestJS", "Socket.IO", "PostgreSQL", "Redis"], keyTech: ["NestJS", "Socket.IO"],
    glow: "rgba(34,211,238,0.06)", glowHover: "rgba(34,211,238,0.12)",
    accentColor: "var(--cyan)", github: "https://github.com/JimwellC", live: "#",
  },
  {
    num: "03", badge: { label: "◈ social impact", style: "social" },
    name: "ReachAble",
    story: "An emergency communication app for persons with disabilities — built so that in the moments that matter most, the app gets out of the way and just works. Voice, gesture, GPS. WCAG 2.1 AA from day one, not as an afterthought.",
    detail: "Flutter cross-platform app with VoiceOver and TalkBack support, gesture-based navigation, and real-time GPS sharing via Firebase. Designed every interaction against WCAG 2.1 AA contrast and focus guidelines.",
    tech: ["Flutter", "Firebase", "WCAG 2.1", "GPS APIs"], keyTech: ["Flutter", "WCAG 2.1"],
    glow: "rgba(244,114,182,0.06)", glowHover: "rgba(244,114,182,0.12)",
    accentColor: "var(--pink)", github: "https://github.com/JimwellC", live: "#",
  },
];

const badgeStyles: Record<string, React.CSSProperties> = {
  live:   { background: "rgba(74,222,128,0.08)",  border: "0.5px solid rgba(74,222,128,0.2)",  color: "var(--green)" },
  saas:   { background: "rgba(99,102,241,0.08)",  border: "0.5px solid rgba(99,102,241,0.2)",  color: "var(--a2)" },
  social: { background: "rgba(244,114,182,0.08)", border: "0.5px solid rgba(244,114,182,0.2)", color: "var(--pink)" },
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        {/* Eyebrow */}
        <div className="eyebrow">
          Selected work
          <span style={{ marginLeft: "auto", paddingLeft: "12px" }}>{projects.length} projects</span>
        </div>

        {/* Top 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          {projects.slice(0, 2).map(p => (
            <ProjectCard key={p.num} project={p} expanded={expanded} setExpanded={setExpanded} />
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
          <ProjectCard project={projects[2]} expanded={expanded} setExpanded={setExpanded} />
          <div style={{
            borderRadius: "16px", padding: "24px",
            background: "var(--s1)", border: "0.5px dashed rgba(255,255,255,0.08)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>next</div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: "rgba(201,204,230,0.15)", marginBottom: "8px" }}>Something new</div>
              <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.6 }}>Always building. Check GitHub for what&apos;s cooking.</p>
            </div>
            <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
              github.com/JimwellC →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, expanded, setExpanded }: {
  project: typeof projects[0];
  expanded: string | null;
  setExpanded: (v: string | null) => void;
}) {
  const isOpen = expanded === p.num;
  return (
    <motion.div layout onClick={() => setExpanded(isOpen ? null : p.num)}
      style={{
        borderRadius: "16px", padding: "24px", cursor: "pointer",
        position: "relative", overflow: "hidden",
        background: isOpen ? p.glowHover : "var(--s1)",
        border: `0.5px solid ${isOpen ? "var(--border2)" : "var(--border)"}`,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div className="pointer-events-none" style={{
        position: "absolute", top: 0, right: 0, width: "120px", height: "120px",
        borderRadius: "50%", background: p.glow, filter: "blur(28px)",
        transform: "translate(30%,-30%)",
      }}/>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.num}</span>
          <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>{p.badge.label}</span>
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#eaecf6", marginBottom: "10px" }}>{p.name}</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "14px" }}>{p.story}</p>

        <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, paddingBottom: "14px", marginBottom: "14px", borderBottom: "0.5px solid var(--border)" }}>{p.detail}</p>
        </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontSize: "10px", padding: "2px 8px", borderRadius: "6px",
              fontFamily: "var(--font-space-mono)",
              ...(p.keyTech.includes(t)
                ? { background: "rgba(99,102,241,0.08)", border: "0.5px solid rgba(99,102,241,0.25)", color: "var(--a2)" }
                : { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", color: "rgba(201,204,230,0.45)" })
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
            github →
          </a>
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
            {isOpen ? "collapse ↑" : "read more ↓"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}