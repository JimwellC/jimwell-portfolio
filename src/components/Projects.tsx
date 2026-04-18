"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

// ─── ADD NEW PROJECTS HERE ───────────────────────────────────────────────────
const projects = [
  {
    num: "01",
    badge: { label: "● live", style: "live" },
    name: "Auxtion",
    tagline: "Live auction marketplace",
    story:
      "Built a live auction marketplace because existing platforms couldn't handle the latency demands of real-time bidding. The hard part wasn't the bidding — it was making sure two people placing a bid at the exact same millisecond didn't both win.",
    detail:
      "Engineered a WebSocket-first architecture with Redis pub/sub to fan out bid events to all connected clients in under 10ms. The auction timer uses server-authoritative state to prevent client-side manipulation.",
    tech: ["WebSockets", "Redis", "React Native", "Node.js"],
    keyTech: ["WebSockets", "Redis"],
    images: [
      "/projects/auxtion/1.png",
      "/projects/auxtion/2.png",
      "/projects/auxtion/3.png",
    ],
    glow: "rgba(99,102,241,0.08)",
    glowHover: "rgba(99,102,241,0.14)",
    github: "https://github.com/JimwellC",
    live: "",
  },
  {
    num: "02",
    badge: { label: "◆ saas", style: "saas" },
    name: "Fad Fashiown",
    tagline: "TikTok live selling automation",
    story:
      "Sellers on TikTok Live were drowning in comments. I built a SaaS that reads the stream, detects orders in real time, routes them to the right queue, and prints receipts automatically. What used to take 3 people now runs on its own.",
    detail:
      "Multi-tenant NestJS backend with per-client PostgreSQL schemas for data isolation. Comment parser runs a regex pipeline against TikTok's live comment feed. Thermal printer integration via ESC/POS protocol.",
    tech: ["NestJS", "Socket.IO", "PostgreSQL", "Redis"],
    keyTech: ["NestJS", "Socket.IO"],
    images: [
      "/projects/fad-fashiown/1.png",
      "/projects/fad-fashiown/2.png",
    ],
    glow: "rgba(34,211,238,0.06)",
    glowHover: "rgba(34,211,238,0.12)",
    github: "https://github.com/JimwellC",
    live: "",
  },
  {
    num: "03",
    badge: { label: "◈ thesis", style: "thesis" },
    name: "ReachAble",
    tagline: "Emergency communication app for PWDs",
    story:
      "Our thesis project — an emergency communication app for persons with disabilities. Built so that in the moments that matter most, the app gets out of the way and just works. Voice commands, gesture recognition, and real-time GPS tracking.",
    detail:
      "Flutter cross-platform app with voice command input, gesture-based navigation, and real-time GPS location sharing via Firebase. Designed with accessibility-first thinking — making sure every interaction worked for users who can't rely on standard touch.",
    tech: ["Flutter", "Firebase", "GPS APIs", "Voice Commands"],
    keyTech: ["Flutter", "Firebase"],
    images: [
      "/projects/reachable/1.png",
      "/projects/reachable/2.png",
    ],
    glow: "rgba(244,114,182,0.06)",
    glowHover: "rgba(244,114,182,0.12)",
    github: "https://github.com/JimwellC",
    live: "",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const badgeStyles: Record<string, React.CSSProperties> = {
  live:   { background: "rgba(74,222,128,0.08)",  border: "0.5px solid rgba(74,222,128,0.2)",  color: "var(--green)" },
  saas:   { background: "rgba(99,102,241,0.08)",  border: "0.5px solid rgba(99,102,241,0.2)",  color: "var(--a2)" },
  thesis: { background: "rgba(244,114,182,0.08)", border: "0.5px solid rgba(244,114,182,0.2)", color: "var(--pink)" },
  client: { background: "rgba(34,211,238,0.08)",  border: "0.5px solid rgba(34,211,238,0.2)",  color: "var(--cyan)" },
};

// Carousel component
function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Carousel */}
      <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "16px" }}>
        {/* Image track */}
        <div ref={trackRef} style={{ position: "relative", height: "200px", background: "var(--s2)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={images[current]}
                alt={`${name} screenshot ${current + 1}`}
                fill
                style={{ objectFit: "cover", cursor: "zoom-in" }}
                onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,9,16,0.5) 0%, transparent 50%)",
            pointerEvents: "none",
          }}/>

          {/* Nav arrows — only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button onClick={prev} style={{
                position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
                width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)",
                background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)",
                color: "#fff", fontSize: "12px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>‹</button>
              <button onClick={next} style={{
                position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
                width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)",
                background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)",
                color: "#fff", fontSize: "12px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>›</button>
            </>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div style={{
              position: "absolute", bottom: "8px", right: "10px",
              fontSize: "10px", color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-space-mono)",
              background: "rgba(8,9,16,0.6)", padding: "2px 7px", borderRadius: "10px",
            }}>
              {current + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={{
            display: "flex", justifyContent: "center", gap: "5px",
            padding: "8px 0 4px",
            background: "var(--s2)",
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                style={{
                  width: i === current ? "16px" : "5px",
                  height: "5px", borderRadius: "3px", border: "none",
                  background: i === current ? "var(--accent)" : "rgba(255,255,255,0.15)",
                  cursor: "pointer", padding: 0,
                  transition: "width 0.2s, background 0.2s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", borderRadius: "12px", overflow: "hidden" }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[current]}
                alt={`${name} screenshot ${current + 1}`}
                width={1200}
                height={800}
                style={{ objectFit: "contain", maxHeight: "85vh", width: "auto" }}
              />
              {/* Lightbox nav */}
              {images.length > 1 && (
                <>
                  <button onClick={prev} style={{
                    position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)",
                    color: "#fff", fontSize: "18px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>‹</button>
                  <button onClick={next} style={{
                    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)",
                    color: "#fff", fontSize: "18px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>›</button>
                </>
              )}
              {/* Close */}
              <button onClick={(e) => { e.stopPropagation(); setLightbox(false); }} style={{
                position: "absolute", top: "12px", right: "12px",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)",
                color: "#fff", fontSize: "16px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Project card
function ProjectCard({
  project: p,
  expanded,
  setExpanded,
}: {
  project: (typeof projects)[0];
  expanded: string | null;
  setExpanded: (v: string | null) => void;
}) {
  const isOpen = expanded === p.num;

  return (
    <motion.div
      layout
      onClick={() => setExpanded(isOpen ? null : p.num)}
      style={{
        borderRadius: "16px", padding: "0",
        cursor: "pointer", position: "relative", overflow: "hidden",
        background: isOpen ? p.glowHover : "var(--s1)",
        border: `0.5px solid ${isOpen ? "var(--border2)" : "var(--border)"}`,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {/* Glow orb */}
      <div className="pointer-events-none" style={{
        position: "absolute", top: 0, right: 0,
        width: "140px", height: "140px", borderRadius: "50%",
        background: p.glow, filter: "blur(32px)",
        transform: "translate(30%,-30%)",
      }}/>

      <div style={{ position: "relative", padding: "20px 20px 0" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.num}</span>
          <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>
            {p.badge.label}
          </span>
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#eaecf6", marginBottom: "3px" }}>{p.name}</h3>
        <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>{p.tagline}</p>
      </div>

      {/* Image carousel — always visible */}
      <div style={{ padding: "0 20px" }}>
        <ImageCarousel images={p.images} name={p.name} />
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        {/* Story */}
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "12px" }}>{p.story}</p>

        {/* Expanded detail */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ overflow: "hidden" }}
        >
          <p style={{
            fontSize: "12px", color: "var(--muted)", lineHeight: 1.65,
            paddingBottom: "12px", marginBottom: "12px",
            borderBottom: "0.5px solid var(--border)",
          }}>
            {p.detail}
          </p>
        </motion.div>

        {/* Tech chips */}
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

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
            github →
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
              live demo →
            </a>
          )}
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
            {isOpen ? "collapse ↑" : "read more ↓"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Main section
export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Split: first 2 featured, rest overflow
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="work" style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <div className="eyebrow">
          Selected work
          <span style={{ marginLeft: "auto", paddingLeft: "12px" }}>{projects.length} projects</span>
        </div>

        {/* Top 2 — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          {featured.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <ProjectCard project={p} expanded={expanded} setExpanded={setExpanded} />
            </motion.div>
          ))}
        </div>

        {/* Rest — responsive grid */}
        {rest.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: rest.length === 1 ? "2fr 1fr" : "repeat(3, 1fr)",
            gap: "12px",
          }}>
            {rest.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <ProjectCard project={p} expanded={expanded} setExpanded={setExpanded} />
              </motion.div>
            ))}

            {/* placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: rest.length * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                borderRadius: "16px", padding: "24px",
                background: "var(--s1)", border: "0.5px dashed rgba(255,255,255,0.08)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: "160px",
              }}
            >
              <div>
                <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>next</div>
                <div style={{ fontSize: "17px", fontWeight: 600, color: "rgba(201,204,230,0.15)", marginBottom: "8px" }}>Something new</div>
                <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.6 }}>
                  Always building. Check GitHub for what&apos;s cooking.
                </p>
              </div>
              <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
                github.com/JimwellC →
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}