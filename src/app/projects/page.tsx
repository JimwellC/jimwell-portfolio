"use client";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Telemetry } from "@/components/case/Telemetry";

type Filter = "all" | "web" | "mobile" | "saas" | "thesis";

const filters: { label: string; value: Filter }[] = [
  { label: "ALL", value: "all" },
  { label: "WEB", value: "web" },
  { label: "MOBILE", value: "mobile" },
  { label: "SAAS", value: "saas" },
  { label: "THESIS", value: "thesis" },
];

// Terminal boot-in stagger for the module stream.
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } };
const item: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } } };

const fileHref = (p: (typeof projects)[number]) => p.caseStudy || `/projects/${p.slug}`;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category.includes(filter as Exclude<Filter, "all">));

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* command bar */}
      <header className="cs-bar">
        <div className="col">
          <div className="l">
            <span className="file">[ SYSTEM INDEX ]</span>
            <span>DIR-ROOT</span>
          </div>
          <div className="r">
            <span className="stat"><span className="dot" /> {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} entries</span>
            <Link href="/">← home</Link>
          </div>
        </div>
      </header>

      <div className="col">
        <section className="cs-hero" style={{ borderBottom: "none", paddingBottom: "clamp(20px,3vw,34px)" }}>
          <div className="cs-class">// Project Archive</div>
          <h1 className="cs-title">Index</h1>
          <div className="cs-tagline">Mainframe file explorer · {projects.length} sub-system modules</div>
        </section>

        <div className="sysindex">
          {/* directory sidebar */}
          <aside className="dir">
            <div className="dir-h">
              <span className="l"><span className="dot" /> Directory</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>
            <div className="dir-body">
              {filters.map((f) => {
                const count = f.value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category.includes(f.value as Exclude<Filter, "all">)).length;
                return (
                  <button key={f.value} className={`dir-item${filter === f.value ? " active" : ""}`} onClick={() => setFilter(f.value)}>
                    <span className="tk" />
                    <span className="lbl">DIR // {f.label}</span>
                    <span className="cnt">{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
            <div className="dir-foot">
              <span className="ok">● SYS ONLINE</span><br />
              index synced · {String(projects.length).padStart(2, "0")} files · sha-ok
            </div>
          </aside>

          {/* data stream */}
          <AnimatePresence mode="wait">
            <motion.div key={filter} className="stream" variants={container} initial="hidden" animate="show">
              {filtered.map((p, i) => (
                <motion.div key={p.slug} variants={item}>
                  <Link className="module" href={fileHref(p)}>
                    <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
                    <div className="mod-inner">
                      <div className="mod-view">
                        <Telemetry
                          src={p.images[0]}
                          alt={p.name}
                          id="VIEWPORT"
                          caption={`${p.badge.style.toUpperCase()} · LIVE_FEED`}
                          contain={p.containImage}
                        />
                      </div>
                      <div className="mod-body">
                        <div className="mod-coord">
                          <span>[ IDX_{String(i + 1).padStart(2, "0")} ]</span>
                          <span className="st">{fileHref(p)}</span>
                          <span className="tag">{p.badge.style}</span>
                        </div>
                        <h2 className="mod-title">{p.name}</h2>
                        <p className="mod-spec">{p.story}</p>
                        <div className="mod-deps">
                          {p.tech.map((t) => (
                            <span className="dep" key={t}>DEP // {p.keyTech.includes(t) ? <b>{t}</b> : t}</span>
                          ))}
                        </div>
                        <span className="mod-access">access file <span>↗</span></span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <motion.div variants={item} style={{ padding: "60px 0", fontFamily: "var(--mono)", fontSize: 12, color: "var(--grey)" }}>
                  // no modules in this directory
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="cs-foot">
        <div className="col">
          <Link href="/">← home</Link>
        </div>
      </footer>
    </main>
  );
}
