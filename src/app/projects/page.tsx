"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { projects, badgeStyles, type Project } from "@/data/projects";

type Filter = "all" | "web" | "mobile" | "saas" | "thesis";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "SaaS", value: "saas" },
  { label: "Thesis", value: "thesis" },
];

// ── Portal lightbox ──
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
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
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

function ProjectCard({ project: p, onOpenLightbox }: {
  project: Project;
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { ref, handleMouseMove, handleMouseLeave } = useSpotlight();

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => i === 0 ? p.images.length - 1 : i - 1);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => i === p.images.length - 1 ? 0 : i + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      ref={el => { ref.current = el; }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setExpanded(e => !e)}
      style={{
        borderRadius: "16px", overflow: "hidden",
        background: "var(--s1)", border: "0.5px solid var(--border)",
        position: "relative", cursor: "pointer",
        transition: "border-color 0.2s",
        "--mx": "50%", "--my": "50%", "--so": "0",
      } as React.CSSProperties}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"}
    >
      {/* Spotlight */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "radial-gradient(280px circle at var(--mx) var(--my), rgba(99,102,241,0.1), transparent 70%)", opacity: "var(--so)" as unknown as number, transition: "opacity 0.3s", borderRadius: "16px" }}/>

      {/* Image */}
      {p.images?.length > 0 && (
        <div style={{ position: "relative", height: "200px", background: "var(--s2)", zIndex: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ position: "absolute", inset: 0 }}>
              <Image
                src={p.images[current]}
                alt={`${p.name} screenshot`}
                fill
                style={{ objectFit: p.containImage ? "contain" : "cover", cursor: "zoom-in" }}
                onClick={e => { e.stopPropagation(); onOpenLightbox(p.images, current); }}
              />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,16,24,1) 0%, transparent 60%)", pointerEvents: "none" }}/>

          {/* Zoom hint */}
          <div style={{ position: "absolute", top: "8px", left: "10px", fontSize: "9px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.55)", padding: "2px 6px", borderRadius: "6px", zIndex: 2 }}>
            tap to expand ↗
          </div>

          {/* Badge */}
          <div style={{ position: "absolute", top: "8px", right: "10px", zIndex: 2, display: "flex", alignItems: "center", gap: "6px" }}>
            {p.caseStudy && (
              <a
                href={p.caseStudy}
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: "9px", color: "#fff", textDecoration: "none",
                  fontFamily: "var(--font-space-mono)", padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(99,102,241,0.75)",
                  border: "0.5px solid rgba(99,102,241,0.9)",
                  whiteSpace: "nowrap", transition: "background 0.15s",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,1)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.75)"}
              >
                case study →
              </a>
            )}
            <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>
              {p.badge.label}
            </span>
          </div>

          {/* Nav arrows */}
          {p.images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "26px", height: "26px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>‹</button>
              <button onClick={next} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "26px", height: "26px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>›</button>
              <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.6)", padding: "1px 6px", borderRadius: "8px", zIndex: 2 }}>{current + 1}/{p.images.length}</div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "16px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{p.name}</h3>
            <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.tagline}</p>
          </div>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", flexShrink: 0, marginLeft: "8px", marginTop: "2px" }}>{p.num}</span>
        </div>

        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginTop: "10px", marginBottom: "12px" }}>{p.story}</p>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, overflow: "hidden", paddingBottom: "12px", marginBottom: "12px", borderBottom: "0.5px solid var(--border)" }}
            >
              {p.detail}
            </motion.p>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "14px" }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "6px", fontFamily: "var(--font-space-mono)", ...(p.keyTech.includes(t) ? { background: "rgba(99,102,241,0.08)", border: "0.5px solid rgba(99,102,241,0.25)", color: "var(--a2)" } : { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", color: "rgba(201,204,230,0.45)" }) }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--a2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--dim)"}
          >github →</a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>
              live →
            </a>
          )}
          <button onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
            style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            {expanded ? "less ↑" : "more ↓"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  // Global lightbox state
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

  const filtered = filter === "all"
    ? projects
    : projects.filter(p => p.category.includes(filter as Exclude<Filter, "all">));

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Global portal lightbox */}
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

      {/* NAV */}
      <div style={{ borderBottom: "0.5px solid var(--border)", padding: "0", background: "rgba(8,9,16,0.92)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg,var(--accent),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-space-mono)" }}>JC</div>
            </Link>
            <div style={{ width: "0.5px", height: "16px", background: "var(--border)" }}/>
            <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>projects</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{filtered.length} / {projects.length}</span>
            <Link href="/" style={{ fontSize: "11px", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-space-mono)", padding: "5px 12px", borderRadius: "8px", border: "0.5px solid var(--border)", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--a2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
            >← home</Link>
          </div>
        </div>
      </div>

      <div className="col" style={{ paddingTop: "48px", paddingBottom: "80px" }}>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "var(--a2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", opacity: 0.7 }}>All work</p>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#eaecf6", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Things I&apos;ve built.</h1>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "320px", lineHeight: 1.7 }}>Personal, academic, and professional. Click any card to read more.</p>
          </div>
        </motion.div>

        {/* FILTERS */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: "flex", gap: "6px", marginBottom: "32px", flexWrap: "wrap", borderBottom: "0.5px solid var(--border)", paddingBottom: "24px" }}
        >
          {filters.map(f => {
            const count = f.value === "all" ? projects.length : projects.filter(p => p.category.includes(f.value as Exclude<Filter, "all">)).length;
            const isActive = filter === f.value;
            return (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-space-mono)", border: isActive ? "0.5px solid var(--accent)" : "0.5px solid var(--border)", background: isActive ? "rgba(99,102,241,0.1)" : "transparent", color: isActive ? "var(--a2)" : "var(--muted)", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "6px" }}>
                {f.label}
                <span style={{ fontSize: "10px", background: isActive ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)", padding: "1px 5px", borderRadius: "4px", color: isActive ? "var(--a2)" : "var(--dim)" }}>{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* GRID */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}
            className="projects-page-grid"
          >
            {filtered.map(p => (
              <ProjectCard key={p.slug} project={p} onOpenLightbox={openLightbox} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "13px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>no projects in this category yet</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}