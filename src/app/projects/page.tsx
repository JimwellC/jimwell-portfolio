"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, badgeStyles, type Project } from "@/data/projects";

type Filter = "all" | "web" | "mobile" | "saas" | "thesis";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "SaaS", value: "saas" },
  { label: "Thesis", value: "thesis" },
];

function ProjectCard({ project: p }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === 0 ? p.images.length - 1 : i - 1); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => i === p.images.length - 1 ? 0 : i + 1); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      style={{
        borderRadius: "16px", overflow: "hidden",
        background: "var(--s1)", border: "0.5px solid var(--border)",
        position: "relative", cursor: "pointer",
        transition: "border-color 0.2s",
      }}
      onClick={() => setExpanded(e => !e)}
      whileHover={{ borderColor: "var(--border2)" } as never}
    >
      {/* Glow */}
      <div className="pointer-events-none" style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", borderRadius: "50%", background: p.glow, filter: "blur(28px)", transform: "translate(30%,-30%)" }}/>

      {/* Image */}
      {p.images?.length > 0 && (
        <div style={{ position: "relative", height: "180px", background: "var(--s2)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ position: "absolute", inset: 0 }}>
              <Image src={p.images[current]} alt={`${p.name} screenshot`} fill style={{ objectFit: "cover" }} />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.6) 0%, transparent 60%)", pointerEvents: "none" }}/>
          {p.images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "26px", height: "26px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={next} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "26px", height: "26px", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(8,9,16,0.7)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
              <div style={{ position: "absolute", bottom: "8px", right: "10px", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.5)", padding: "1px 6px", borderRadius: "8px" }}>{current + 1}/{p.images.length}</div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{p.num}</span>
          <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontFamily: "var(--font-space-mono)", ...badgeStyles[p.badge.style] }}>{p.badge.label}</span>
        </div>

        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>{p.name}</h3>
        <p style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "10px" }}>{p.tagline}</p>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "12px" }}>{p.story}</p>

        {/* Expanded detail */}
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

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "6px", fontFamily: "var(--font-space-mono)", ...(p.keyTech.includes(t) ? { background: "rgba(99,102,241,0.08)", border: "0.5px solid rgba(99,102,241,0.25)", color: "var(--a2)" } : { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", color: "rgba(201,204,230,0.45)" }) }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "11px", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>github →</a>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", fontFamily: "var(--font-space-mono)" }}>live →</a>}
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{expanded ? "less ↑" : "more ↓"}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter(p => p.category.includes(filter as Exclude<Filter, "all">));

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Nav bar */}
      <div style={{
        borderBottom: "0.5px solid var(--border)",
        padding: "14px 0",
        background: "rgba(8,9,16,0.9)",
        backdropFilter: "blur(14px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div className="col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "8px",
            textDecoration: "none",
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "7px",
              background: "linear-gradient(135deg,var(--accent),var(--cyan))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, color: "#fff",
              fontFamily: "var(--font-space-mono)",
            }}>JC</div>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-space-mono)" }}>← back home</span>
          </Link>
          <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="col" style={{ paddingTop: "56px", paddingBottom: "80px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "var(--a2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px", opacity: 0.7 }}>All work</p>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#eaecf6", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "12px" }}>
            Things I&apos;ve built.
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)", maxWidth: "440px", lineHeight: 1.7 }}>
            A collection of projects I&apos;ve worked on — personal, academic, and professional. Click any card to read more.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: "flex", gap: "6px", marginBottom: "36px", flexWrap: "wrap" }}
        >
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "7px 16px", borderRadius: "100px",
                fontSize: "12px", cursor: "pointer",
                fontFamily: "var(--font-space-mono)",
                border: filter === f.value ? "0.5px solid var(--accent)" : "0.5px solid var(--border)",
                background: filter === f.value ? "rgba(99,102,241,0.12)" : "var(--s1)",
                color: filter === f.value ? "var(--a2)" : "var(--muted)",
                transition: "all 0.15s",
              }}
            >
              {f.label}
              <span style={{ marginLeft: "6px", fontSize: "10px", opacity: 0.6 }}>
                {f.value === "all" ? projects.length : projects.filter(p => p.category.includes(f.value as Exclude<Filter, "all">)).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "12px",
            }}
          >
            {filtered.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "13px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
                  no projects in this category yet
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}