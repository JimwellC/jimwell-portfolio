"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, badgeStyles } from "@/data/projects";

const featured = projects.filter(p => p.featured);

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === 0 ? images.length - 1 : i - 1); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === images.length - 1 ? 0 : i + 1); };

  if (!images?.length) return null;

  return (
    <>
      <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ position: "relative", height: "200px", background: "var(--s2)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} style={{ position: "absolute", inset: 0 }}>
              <Image src={images[current]} alt={`${name} screenshot ${current + 1}`} fill style={{ objectFit: "cover", cursor: "zoom-in" }} onClick={e => { e.stopPropagation(); setLightbox(true); }} />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,9,16,0.5) 0%,transparent 50%)", pointerEvents: "none" }}/>
          {images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={next} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
              <div style={{ position: "absolute", bottom: "8px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 7px", borderRadius: "10px" }}>{current + 1} / {images.length}</div>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", padding: "8px 0 4px", background: "var(--s2)" }}>
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }} style={{ width: i === current ? "16px" : "5px", height: "5px", borderRadius: "3px", border: "none", background: i === current ? "var(--accent)" : "rgba(255,255,255,0.15)", cursor: "pointer", padding: 0, transition: "width 0.2s, background 0.2s" }} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { e.stopPropagation(); setLightbox(false); }} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", borderRadius: "12px", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
              <Image src={images[current]} alt={`${name} screenshot ${current + 1}`} width={1200} height={800} style={{ objectFit: "contain", maxHeight: "85vh", width: "auto" }} />
              {images.length > 1 && <>
                <button onClick={prev} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                <button onClick={next} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
              </>}
              <button onClick={e => { e.stopPropagation(); setLightbox(false); }} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project: p, expanded, setExpanded }: { project: typeof projects[0]; expanded: string | null; setExpanded: (v: string | null) => void }) {
  const isOpen = expanded === p.num;
  return (
    <motion.div layout onClick={() => setExpanded(isOpen ? null : p.num)} style={{ borderRadius: "16px", padding: "0", cursor: "pointer", position: "relative", overflow: "hidden", background: isOpen ? p.glowHover : "var(--s1)", border: `0.5px solid ${isOpen ? "var(--border2)" : "var(--border)"}`, transition: "background 0.2s, border-color 0.2s" }}>
      <div className="pointer-events-none" style={{ position: "absolute", top: 0, right: 0, width: "140px", height: "140px", borderRadius: "50%", background: p.glow, filter: "blur(32px)", transform: "translate(30%,-30%)" }}/>
      <div style={{ position: "relative", padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.num}</span>
          <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>{p.badge.label}</span>
        </div>
        <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#eaecf6", marginBottom: "3px" }}>{p.name}</h3>
        <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>{p.tagline}</p>
      </div>

      <div style={{ padding: "0 20px" }}>
        <ImageCarousel images={p.images} name={p.name} />
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "12px" }}>{p.story}</p>
        <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, paddingBottom: "12px", marginBottom: "12px", borderBottom: "0.5px solid var(--border)" }}>{p.detail}</p>
        </motion.div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "6px", fontFamily: "var(--font-space-mono)", ...(p.keyTech.includes(t) ? { background: "rgba(99,102,241,0.08)", border: "0.5px solid rgba(99,102,241,0.25)", color: "var(--a2)" } : { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", color: "rgba(201,204,230,0.45)" }) }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>github →</a>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>live demo →</a>}
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{isOpen ? "collapse ↑" : "read more ↓"}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <div className="eyebrow">
          Featured work
          <span style={{ marginLeft: "auto", paddingLeft: "12px" }}>{featured.length} projects</span>
        </div>

        {/* Top 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          {featured.slice(0, 2).map((p, i) => (
            <motion.div key={p.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}>
              <ProjectCard project={p} expanded={expanded} setExpanded={setExpanded} />
            </motion.div>
          ))}
        </div>

        {/* Third */}
        {featured[2] && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "28px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}>
              <ProjectCard project={featured[2]} expanded={expanded} setExpanded={setExpanded} />
            </motion.div>

            {/* View all CTA card */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Link href="/projects" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "16px", padding: "28px",
                  background: "var(--s1)",
                  border: "0.5px dashed rgba(99,102,241,0.25)",
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", height: "100%",
                  minHeight: "180px", cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.5)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--s2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.25)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--s1)";
                }}
                >
                  <div>
                    <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>all work</div>
                    <div style={{ fontSize: "22px", marginBottom: "10px" }}>→</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "6px" }}>View all projects</div>
                    <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.6 }}>
                      See everything I&apos;ve built — filterable by type.
                    </p>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", marginTop: "16px" }}>
                    {projects.length} total projects →
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}