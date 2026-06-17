"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadelanImages } from "@/data/fadelan";

// ── accent colour (purple, matches glow in projects.ts) ──────────────
const PURPLE        = "#a855f7";
const PURPLE_DIM    = "rgba(168,85,247,0.15)";
const PURPLE_BORDER = "rgba(168,85,247,0.25)";

// ── static data ──────────────────────────────────────────────────────

const stats = [
  { value: "12",  label: "Pages",         sub: "6 public + 6 admin"      },
  { value: "9",   label: "API Routes",    sub: "REST, fully typed"        },
  { value: "20+", label: "Sanity fields", sub: "schema from scratch"      },
  { value: "2",   label: "Developers",   sub: "backend + frontend split"  },
];

const layers = [
  {
    name:  "CMS Layer",
    color: PURPLE,
    desc:  "Sanity CMS v3 with a fully custom schema — 20+ TypeScript-typed fields, PortableText descriptions, slug auto-generation, multi-select checklists, and a dedicated SEO tab. All GROQ queries return TypeScript-typed shapes with no any types.",
  },
  {
    name:  "API Layer",
    color: "#22d3ee",
    desc:  "Nine REST routes for bag CRUD, settings management, and inquiry routing. A Sanity revalidation webhook hits a Next.js API route on content change and calls revalidatePath() per affected path — not a blanket cache bust. Only the relevant pages rebuild.",
  },
  {
    name:  "Admin Layer",
    color: "#4ade80",
    desc:  "Custom admin panel behind iron-session authentication — dashboard, full bag CRUD, inline status management, and site settings. Zero dependency on Sanity Studio. Built for a non-technical client who needed to manage inventory without learning a new CMS UI.",
  },
];

const decisions = [
  {
    q: "Why a custom admin panel instead of Sanity Studio?",
    a: "The client is not technical. Sanity Studio's schema explorer and document list UI is confusing to non-developers. A purpose-built panel with a bag table, status toggles, and a dashboard is faster for the client and safer for the data. They never see a JSON document or a schema field they don't need.",
  },
  {
    q: "How does content update without a redeploy?",
    a: "Sanity revalidation webhooks hit a Next.js API route on every content publish. The route calls revalidatePath() with the specific affected path — not a blanket cache bust. Only the relevant pages rebuild, so the rest of the site stays cached and fast.",
  },
  {
    q: "How did you isolate the admin layout from the public site?",
    a: "Next.js App Router applies the root layout to every route. Admin pages needed a completely separate shell — no navbar, no footer, no public chrome. Solved with a usePathname() check in the root layout component that conditionally renders the public shell, keeping admin routes fully isolated without spinning up a separate Next.js app.",
  },
  {
    q: "Why Resend instead of a standard SMTP service?",
    a: "Resend has a dead-simple API, first-class Next.js support, and built-in reply-to routing. The inquiry form needed to route replies directly to the client's inbox — not back to a no-reply address. Resend handles that in two lines. No SMTP credentials, no deliverability headaches.",
  },
];

const techStack = [
  { cat: "Frontend",  items: ["Next.js 15", "TypeScript", "Tailwind CSS v4"] },
  { cat: "CMS",       items: ["Sanity CMS v3", "GROQ queries", "PortableText", "Sanity webhooks"] },
  { cat: "Backend",   items: ["Next.js API Routes", "iron-session", "Resend API"] },
  { cat: "DevOps",    items: ["Vercel", "GoDaddy DNS", "Google Search Console"] },
];

const nextItems = [
  {
    title: "Stripe integration",
    desc:  "The inquiry flow works but requires manual payment coordination. Direct checkout with a deposit hold would remove the client from the loop entirely — inquiry to reserved, no human needed.",
  },
  {
    title: "Inventory alerts",
    desc:  "A webhook that auto-posts to Instagram via the Graph API when a bag status changes to Sold. Every sold item becomes organic social proof with zero manual work.",
  },
  {
    title: "Analytics dashboard",
    desc:  "Plausible or Vercel Analytics embedded in the admin panel so the client can see which bags get the most views — without leaving the platform or reading a separate report.",
  },
];

// ── carousel (mobile) ────────────────────────────────────────────────

function FadelanCarousel({
  images,
  openLightbox,
}: {
  images: typeof fadelanImages;
  openLightbox: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
          onClick={() => openLightbox(current)}
          className="fe-gallery-card"
          style={{ width: "100%", cursor: "zoom-in" }}
        >
          <div style={{ position: "relative", height: "200px", background: "var(--s2)", overflow: "hidden" }}>
            <Image
              src={images[current].src}
              alt={images[current].label}
              fill
              sizes="90vw"
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="fe-gallery-img"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.65) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", borderRadius: "6px", background: "rgba(8,9,16,0.75)", border: `0.5px solid ${PURPLE_BORDER}`, fontSize: "10px", color: PURPLE, fontFamily: "var(--font-space-mono)" }}>
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
          </div>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>{images[current].label}</div>
            <div style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.6 }}>{images[current].desc}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={prev} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--s1)", border: "0.5px solid var(--border)", color: "var(--text)", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? "20px" : "6px", height: "6px", borderRadius: "3px", border: "none", background: i === current ? PURPLE : "rgba(255,255,255,0.15)", cursor: "pointer", padding: 0, transition: "width 0.2s, background 0.2s" }}
            />
          ))}
        </div>
        <button onClick={next} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--s1)", border: "0.5px solid var(--border)", color: "var(--text)", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
      </div>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────

export default function FadelanCaseStudy() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox  = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i === null ? 0 : i === 0 ? fadelanImages.length - 1 : i - 1);
  const nextImage = () => setLightboxIndex(i => i === null ? 0 : i === fadelanImages.length - 1 ? 0 : i + 1);

  return (
    <>

      {/* ══════════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.93)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: "24px" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: `0.5px solid ${PURPLE_BORDER}`, boxShadow: `0 0 80px rgba(168,85,247,0.15)`, maxWidth: "88vw", width: "fit-content", cursor: "default", display: "flex", flexDirection: "column", maxHeight: "90vh" }}
            >
              <div style={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}>
                <Image
                  src={fadelanImages[lightboxIndex].src}
                  alt={fadelanImages[lightboxIndex].label}
                  width={1400}
                  height={900}
                  sizes="88vw"
                  style={{ objectFit: "contain", display: "block", width: "min(88vw, 1400px)", height: "auto" }}
                />
              </div>

              <div style={{ padding: "12px 16px", background: "rgba(8,9,16,0.97)", borderTop: `0.5px solid ${PURPLE_BORDER}`, flexShrink: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>
                  {fadelanImages[lightboxIndex].label}
                </div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {fadelanImages[lightboxIndex].desc}
                </div>
              </div>

              <button onClick={e => { e.stopPropagation(); prevImage(); }}
                style={{ position: "absolute", left: "12px", top: "44%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={e => { e.stopPropagation(); nextImage(); }}
                style={{ position: "absolute", right: "12px", top: "44%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

              <div style={{ position: "absolute", top: "12px", left: "14px", fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.7)", padding: "3px 8px", borderRadius: "8px" }}>
                {lightboxIndex + 1} / {fadelanImages.length}
              </div>

              <button onClick={e => { e.stopPropagation(); closeLightbox(); }}
                style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </motion.div>

            <div style={{ position: "absolute", bottom: "28px", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-space-mono)" }}>
              click outside to close · arrows to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ width: "100%", paddingTop: "80px" }}>

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--dim)", textDecoration: "none", marginBottom: "32px", fontFamily: "var(--font-space-mono)" }}>
              ← All projects
            </Link>

            <div className="eyebrow">
              <span style={{ color: PURPLE }}>Web · E-Commerce · CMS</span>
            </div>

            <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#eaecf6", marginBottom: "20px" }}>
              Fad Élan
            </h1>

            <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.72, maxWidth: "560px", marginBottom: "32px" }}>
              A luxury pre-loved bag catalog and e-commerce inquiry platform built for a paying client.
              I owned the backend, CMS, admin panel, SEO, and DevOps — from schema design to DNS configuration.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href="https://www.fadelan.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, color: "#fff", background: PURPLE, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}>
                Live Site ↗
              </a>
              <a href="https://github.com/JimwellC/fadelan-website" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "13px", color: "var(--text)", border: "0.5px solid rgba(255,255,255,0.1)", textDecoration: "none", whiteSpace: "nowrap" }}>
                GitHub ↗
              </a>
            </div>

            {/* Hero screenshot — opens lightbox at index 1 (homepage) */}
            <div
              onClick={() => openLightbox(1)}
              style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", border: `0.5px solid ${PURPLE_BORDER}`, cursor: "zoom-in", boxShadow: `0 0 60px rgba(168,85,247,0.08)` }}
            >
              <Image
                src="/projects/fad-elan/homepage.png"
                alt="Fad Élan — homepage"
                width={1400}
                height={900}
                sizes="(max-width: 768px) 100vw, 90vw"
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
              <div style={{ position: "absolute", bottom: "16px", right: "16px", padding: "5px 10px", borderRadius: "6px", background: "rgba(8,9,16,0.8)", border: `0.5px solid ${PURPLE_BORDER}`, fontSize: "11px", color: PURPLE, fontFamily: "var(--font-space-mono)" }}>
                click to expand
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div style={{ display: "grid", gap: "1px", background: "var(--border)", border: "0.5px solid var(--border)", borderRadius: "14px", overflow: "hidden" }} className="fe-stats-grid">
              {stats.map(({ value, label, sub }) => (
                <div key={label} style={{ padding: "28px 24px", background: "var(--s1)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: PURPLE, fontFamily: "var(--font-space-mono)", letterSpacing: "-0.02em" }}>{value}</div>
                  <div style={{ fontSize: "13px", color: "#eaecf6", fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCREENSHOTS GALLERY
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">Screenshots</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "8px" }}>
              Every page, built from scratch.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "32px", maxWidth: "480px" }}>
              Click any screenshot to expand and navigate between them.
            </p>

            {/* Desktop grid */}
            <div className="fe-gallery-grid hide-mobile">
              {fadelanImages.map((img, i) => (
                <div key={img.src} onClick={() => openLightbox(i)} className="fe-gallery-card">
                  <div style={{ position: "relative", height: "180px", background: "var(--s2)", overflow: "hidden" }}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.3s ease" }}
                      className="fe-gallery-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.65) 0%, transparent 50%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", borderRadius: "6px", background: "rgba(8,9,16,0.75)", border: `0.5px solid ${PURPLE_BORDER}`, fontSize: "10px", color: PURPLE, fontFamily: "var(--font-space-mono)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>{img.label}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.6 }}>{img.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="show-mobile" style={{ flexDirection: "column", gap: "20px" }}>
              <FadelanCarousel images={fadelanImages} openLightbox={openLightbox} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PROBLEM / SOLUTION
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">The problem</div>
            <div className="fe-prose-grid">
              <div>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#eaecf6", marginBottom: "16px", lineHeight: 1.2 }}>
                  Instagram DMs are not a product catalog.
                </h2>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>
                  The client was selling luxury bags through Instagram DMs and Viber messages. No inventory system, no inquiry tracking. Every product update meant manually messaging followers. As the collection grew, the process was breaking down.
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, marginTop: "12px" }}>
                  There was no way for a customer to browse available stock, check condition details, or send a structured inquiry without going through a manual back-and-forth.
                </p>
              </div>
              <div style={{ padding: "28px", borderRadius: "14px", background: "var(--s1)", border: `0.5px solid ${PURPLE_BORDER}` }}>
                <div style={{ fontSize: "11px", color: PURPLE, fontFamily: "var(--font-space-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>The solution</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#eaecf6", marginBottom: "12px", lineHeight: 1.3 }}>
                  A full platform the client can run without touching code.
                </h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>
                  A production-grade Next.js 15 platform with a Sanity-powered CMS, a purpose-built admin panel, and a contact inquiry system — deployed to Vercel with a custom domain.
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, marginTop: "12px" }}>
                  The client updates inventory, manages bag status, and receives structured inquiries without opening Sanity Studio or writing a single line of code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SYSTEM ARCHITECTURE (3 LAYERS)
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">System architecture</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "8px" }}>
              Three layers, one developer owns all of them.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "36px", maxWidth: "520px" }}>
              Backend, CMS, and admin panel built as a cohesive system — not three separate tools bolted together.
            </p>
            <div className="fe-roles-grid">
              {layers.map(({ name, color, desc }) => (
                <div key={name} style={{ padding: "24px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${color}20`, border: `0.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6" }}>{name}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ARCHITECTURE DECISIONS
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">Architecture decisions</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "36px" }}>Design choices worth explaining.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--border)" }}>
              {decisions.map(({ q, a }) => (
                <div key={q} className="fe-decision-row" style={{ padding: "28px", background: "var(--s1)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", lineHeight: 1.5 }}>{q}</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.8 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TECH STACK
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">Tech stack</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "36px" }}>Production-grade architecture.</h2>
            <div className="fe-stack-grid">
              {techStack.map(({ cat, items }) => (
                <div key={cat} style={{ padding: "24px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)" }}>
                  <div style={{ fontSize: "11px", color: PURPLE, fontFamily: "var(--font-space-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>{cat}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {items.map(item => (
                      <div key={item} style={{ fontSize: "13px", color: "var(--text)", padding: "6px 10px", borderRadius: "6px", background: "var(--s2)", border: "0.5px solid var(--border)" }}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHAT I'D ADD NEXT
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">If this went further</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "36px" }}>What I&apos;d add next.</h2>
            <div className="fe-next-grid">
              {nextItems.map(({ title, desc }) => (
                <div key={title} style={{ padding: "24px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", marginBottom: "8px" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.72 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FOOTER NAV
        ══════════════════════════════════════════════ */}
        <section style={{ width: "100%", padding: "48px 0" }}>
          <div className="col" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "6px" }}>Next project</div>
              <Link href="/projects/internproof" style={{ fontSize: "16px", fontWeight: 600, color: "var(--a2)", textDecoration: "none" }}>
                InternProof — Blockchain OJT Verification →
              </Link>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link href="/projects"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "var(--muted)", textDecoration: "none", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)" }}>
                ← all projects
              </Link>
              <a href="https://www.fadelan.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "#fff", textDecoration: "none", background: PURPLE, fontFamily: "var(--font-space-mono)" }}>
                Live Site ↗
              </a>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .fe-stats-grid   { grid-template-columns: repeat(4, 1fr) !important; }
        .fe-prose-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .fe-roles-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .fe-stack-grid   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .fe-next-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .fe-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .fe-decision-row { display: grid; grid-template-columns: 1fr 1.4fr; gap: 32px; align-items: start; }

        .fe-gallery-card {
          border-radius: 12px;
          overflow: hidden;
          border: 0.5px solid var(--border);
          cursor: zoom-in;
          background: var(--s1);
          transition: border-color 0.2s, transform 0.2s;
        }
        .fe-gallery-card:hover { border-color: ${PURPLE_BORDER}; transform: translateY(-2px); }
        .fe-gallery-card:hover .fe-gallery-img { transform: scale(1.04); }

        @media (max-width: 768px) {
          .fe-stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .fe-prose-grid   { grid-template-columns: 1fr !important; gap: 24px !important; }
          .fe-roles-grid   { grid-template-columns: 1fr !important; }
          .fe-stack-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .fe-next-grid    { grid-template-columns: 1fr !important; }
          .fe-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .fe-decision-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        }

        @media (max-width: 480px) {
          .fe-roles-grid { grid-template-columns: 1fr !important; }
          .fe-stack-grid { grid-template-columns: 1fr !important; }
          .fe-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}