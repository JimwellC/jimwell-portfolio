"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, badgeStyles } from "@/data/projects";
import { createPortal } from "react-dom";

const featured = projects.filter(p => p.featured).slice(0, 3);

// ── Global lightbox rendered at body level ──
function Lightbox({ images, current, onClose, onPrev, onNext }: {
  images: string[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        cursor: "zoom-out",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", borderRadius: "12px", overflow: "hidden", cursor: "default" }}
      >
        <Image src={images[current]} alt={`screenshot ${current + 1}`} width={1200} height={800} style={{ objectFit: "contain", maxHeight: "85vh", width: "auto", display: "block" }} />
        {images.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            <div style={{ position: "absolute", bottom: "12px", right: "14px", fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 8px", borderRadius: "10px" }}>{current + 1}/{images.length}</div>
          </>
        )}
        <button onClick={e => { e.stopPropagation(); onClose(); }} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </motion.div>
      <div style={{ position: "absolute", bottom: "24px", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-space-mono)" }}>click outside to close</div>
    </motion.div>,
    document.body
  );
}

// ── Carousel — no internal lightbox ──
function ImageCarousel({ images, name, onOpenLightbox }: {
  images: string[];
  name: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === 0 ? images.length - 1 : i - 1); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === images.length - 1 ? 0 : i + 1); };

  if (!images?.length) return null;

  return (
    <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "16px" }}>
      <div style={{ position: "relative", height: "200px", background: "var(--s2)" }}>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} style={{ position: "absolute", inset: 0 }}>
            <Image
              src={images[current]}
              alt={`${name} screenshot ${current + 1}`}
              fill
              style={{ objectFit: "cover", cursor: "zoom-in" }}
              onClick={e => { e.stopPropagation(); onOpenLightbox(current); }}
            />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,9,16,0.5) 0%,transparent 50%)", pointerEvents: "none" }}/>
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            <div style={{ position: "absolute", bottom: "8px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "2px 7px", borderRadius: "10px" }}>{current + 1}/{images.length}</div>
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
  );
}

function useSpotlight() {
  const ref = { current: null as HTMLDivElement | null };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--so", "1");
  };
  const handleMouseLeave = () => ref.current?.style.setProperty("--so", "0");
  return { ref, handleMouseMove, handleMouseLeave };
}

function ProjectCard({ project: p, expanded, setExpanded, onOpenLightbox }: {
  project: typeof projects[0];
  expanded: string | null;
  setExpanded: (v: string | null) => void;
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const isOpen = expanded === p.num;
  const { ref, handleMouseMove, handleMouseLeave } = useSpotlight();

  return (
    <motion.div
      layout
      ref={el => { ref.current = el; }}
      onClick={() => setExpanded(isOpen ? null : p.num)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: "16px", cursor: "pointer", position: "relative",
        overflow: "hidden", height: "100%",
        background: isOpen ? p.glowHover : "var(--s1)",
        border: `0.5px solid ${isOpen ? "var(--border2)" : "var(--border)"}`,
        transition: "background 0.2s, border-color 0.2s",
        "--mx": "50%", "--my": "50%", "--so": "0",
      } as React.CSSProperties}
    >
      {/* Spotlight */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(300px circle at var(--mx) var(--my), rgba(99,102,241,0.12), transparent 70%)", opacity: "var(--so)" as unknown as number, transition: "opacity 0.3s", pointerEvents: "none", zIndex: 1, borderRadius: "16px" }}/>

      <div className="pointer-events-none" style={{ position: "absolute", top: 0, right: 0, width: "140px", height: "140px", borderRadius: "50%", background: p.glow, filter: "blur(32px)", transform: "translate(30%,-30%)", zIndex: 0 }}/>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.num}</span>
            <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>{p.badge.label}</span>
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#eaecf6", marginBottom: "3px" }}>{p.name}</h3>
          <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>{p.tagline}</p>
        </div>

        <div style={{ padding: "0 20px" }}>
          <ImageCarousel
            images={p.images}
            name={p.name}
            onOpenLightbox={(index) => onOpenLightbox(p.images, index)}
          />
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
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>live →</a>}
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{isOpen ? "collapse ↑" : "read more ↓"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Single global lightbox state
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i === 0 ? lightboxImages.length - 1 : i - 1), [lightboxImages]);
  const nextImage = useCallback(() => setLightboxIndex(i => i === lightboxImages.length - 1 ? 0 : i + 1), [lightboxImages]);

  return (
    <section id="work" style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>

      {/* Single global lightbox — renders at body level */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            current={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* Desktop */}
      <div className="projects-desktop">
        <div className="col">
          <div className="eyebrow">
            Featured work
            <span style={{ marginLeft: "auto", paddingLeft: "12px" }}>{featured.length} projects</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            {featured.slice(0, 2).map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ProjectCard project={p} expanded={expanded} setExpanded={setExpanded} onOpenLightbox={openLightbox} />
              </motion.div>
            ))}
          </div>

          {featured[2] && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "28px" }}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                <ProjectCard project={featured[2]} expanded={expanded} setExpanded={setExpanded} onOpenLightbox={openLightbox} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Link href="/projects" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div style={{ borderRadius: "16px", padding: "28px", height: "100%", background: "var(--s1)", border: "0.5px dashed rgba(99,102,241,0.25)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px", cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.5)"; (e.currentTarget as HTMLDivElement).style.background = "var(--s2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.25)"; (e.currentTarget as HTMLDivElement).style.background = "var(--s1)"; }}
                  >
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "12px" }}>all work</div>
                      <div style={{ fontSize: "22px", marginBottom: "10px" }}>→</div>
                      <div style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "6px" }}>View all projects</div>
                      <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.6 }}>See everything I&apos;ve built — filterable by type.</p>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", marginTop: "16px" }}>{projects.length} total projects →</div>
                  </div>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="projects-mobile">
        <div style={{ padding: "0 20px" }}>
          <div className="eyebrow">
            Featured work
            <span style={{ marginLeft: "auto", paddingLeft: "12px" }}>{featured.length} projects</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "16px", paddingLeft: "20px", paddingRight: "20px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
          {featured.map(p => (
            <Link key={p.num} href="/projects" style={{ textDecoration: "none", flexShrink: 0, width: "260px" }}>
              <div style={{ borderRadius: "14px", overflow: "hidden", background: "var(--s1)", border: "0.5px solid var(--border)", width: "260px" }}>
                {p.images?.[0] && (
                  <div style={{ position: "relative", height: "140px", background: "var(--s2)" }}>
                    <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,9,16,0.7) 0%,transparent 60%)", pointerEvents: "none" }}/>
                    <span style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>{p.badge.label}</span>
                  </div>
                )}
                <div style={{ padding: "12px 14px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", marginBottom: "3px" }}>{p.name}</h3>
                  <p style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "8px" }}>{p.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {p.keyTech.map(t => (
                      <span key={t} style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "4px", background: "rgba(99,102,241,0.08)", border: "0.5px solid rgba(99,102,241,0.25)", color: "var(--a2)", fontFamily: "var(--font-space-mono)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/projects" style={{ textDecoration: "none", flexShrink: 0, width: "160px" }}>
            <div style={{ borderRadius: "14px", padding: "20px", width: "160px", height: "100%", background: "var(--s1)", border: "0.5px dashed rgba(99,102,241,0.25)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px", minHeight: "200px" }}>
              <div style={{ fontSize: "24px", color: "var(--a2)" }}>→</div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#eaecf6", textAlign: "center" }}>View all</div>
              <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", textAlign: "center" }}>{projects.length} projects</div>
            </div>
          </Link>
        </div>
      </div>

    </section>
  );
}