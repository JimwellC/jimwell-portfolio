"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { fadelanImages } from "@/data/fadelan";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "fad-elan")!;

const SPEC: Spec[] = [
  ["Class", "Catalog + custom CMS", true],
  ["Framework", "Next.js 15 · App Router", false],
  ["CMS", "Sanity · GROQ · no Studio", false],
  ["Caching", "revalidate: 0 (always fresh)", true],
  ["Admin", "iron-session · /admin", false],
  ["Inquiries", "Messenger · SMS · IG", false],
  ["Email", "Resend API", false],
  ["Hosting", "Vercel · custom domain", false],
  ["Status", "Live · fadelan.com", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Next.js 15", desc: "App Router server-rendered catalog" },
  { label: "TypeScript", desc: "End-to-end type safety" },
  { label: "Tailwind v4", desc: "Utility styling (public site)" },
  { label: "Sanity CMS", desc: "Headless store + image CDN" },
  { label: "GROQ", desc: "Typed content queries" },
  { label: "Resend", desc: "Transactional inquiry email" },
  { label: "iron-session", desc: "Encrypted admin auth cookie" },
  { label: "Vercel", desc: "Deploy · serverless · edge" },
];

const MODULES = [
  "Filterable catalog (brand, price, condition…)",
  "Bag detail + layaway + JSON-LD schema",
  "Custom admin panel (no Sanity Studio)",
  "Photo upload → Sanity CDN",
  "Inquiry deep links (Messenger / SMS / IG)",
  "SEO: sitemap, robots, structured data",
];

// Measured on PageSpeed Insights (mobile), Jun 2026.
const METRICS: [string, string][] = [
  ["Lighthouse perf", "95 / 100"],
  ["Largest Contentful Paint", "1.3 s"],
  ["Total Blocking Time", "50 ms"],
  ["Indexed pages", "6 · Search Console"],
];

// Real production debugging — the caching bug is the headline.
const ANOMALIES = [
  {
    num: "01",
    title: "Stale availability in production",
    tag: "next.js cache",
    problem: "Route-level export const revalidate = 0 / force-dynamic had no effect — availability was up to 1 hour stale. App Router's per-fetch() data cache is independent of route config.",
    solution: "Traced it (via raw curl against Sanity's HTTP API) to sanityFetch()'s default next: { revalidate: 3600 }. Fixed by passing { revalidate: 0 } at every dynamic call site.",
  },
  {
    num: "02",
    title: "Photo references corrupting on save",
    tag: "sanity data",
    problem: "BagForm kept the resolved asset object { _id, url } from the asset-> projection instead of a Sanity reference. Saving without touching photos silently overwrote valid refs — gray-box images and catalog crashes.",
    solution: "The photo state initializer now detects resolved objects and converts them back to { _type: 'reference', _ref } before submission.",
  },
  {
    num: "03",
    title: "Instagram DM has no pre-fill API",
    tag: "deep links",
    problem: "Messenger (m.me/?text=) and SMS (sms:?body=) support pre-filled messages; Instagram exposes no equivalent for DM links.",
    solution: "A navigator.clipboard.writeText() fallback fires on click before opening ig.me/m/, so the customer lands in the DM thread with the message already on their clipboard.",
  },
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/fad-elan", dim: true },
  { pfx: ">", text: "FAD ÉLAN // luxury catalog platform  [ client · production ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "deploy: fadelan.com @ vercel · sanity-cms · resend", dim: true },
];

export default function FadElanCase() {
  return (
    <CaseShell
      code={`ELN-${P.num}`}
      status="Live · client"
      statusActive
      classification="// Luxury Catalog · Custom CMS"
      name={P.name}
      tagline={`${P.tagline} · ${P.tech.join(" / ")}`}
      boot={BOOT}
      spec={SPEC}
      manifest={MANIFEST}
      github={P.github}
      live={P.live}
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> Platform architecture <span className="rule" /></div>
        <div className="readout">{P.detail}</div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Metrics</b> Field performance <span className="rule" /><span className="n">{String(METRICS.length).padStart(2, "0")} tracked</span></div>
        <div className="stats">
          {METRICS.map(([k, v]) => (
            <div className="stat" key={k}><span className="sk">{k}</span><span className="sv acc">{v}</span></div>
          ))}
        </div>
        <p className="mod-spec" style={{ marginTop: 14 }}>Measured on PageSpeed Insights (mobile simulation), June 2026.</p>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Post-mortem</b> Engineering anomalies <span className="rule" /><span className="n">{String(ANOMALIES.length).padStart(2, "0")} logged</span></div>
        {ANOMALIES.map((a) => (
          <div className="anomaly" key={a.num}>
            <div className="anomaly-h">
              <span className="id">ANOMALY {a.num}</span>
              {a.title}
              <span className="a-tag">{a.tag}</span>
            </div>
            <div className="anomaly-b">
              <div className="anomaly-field"><span className="lbl">// Problem</span><p>{a.problem}</p></div>
              <div className="anomaly-field"><span className="lbl">// Resolution</span><p>{a.solution}</p></div>
            </div>
          </div>
        ))}
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Modules</b> Shipped <span className="rule" /><span className="n">{String(MODULES.length).padStart(2, "0")}</span></div>
        <div className="modules">
          <div className="module-col">
            {MODULES.slice(0, 3).map((m) => (
              <div className="module-row" key={m}>{m}<span className="st online">Online</span></div>
            ))}
          </div>
          <div className="module-col">
            {MODULES.slice(3).map((m) => (
              <div className="module-row" key={m}>{m}<span className="st online">Online</span></div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Telemetry</b> Interface feeds <span className="rule" /><span className="n">{String(fadelanImages.length).padStart(2, "0")} feeds</span></div>
        <div className="telem-grid">
          {fadelanImages.map((im, i) => (
            <Telemetry key={i} src={im.src} alt={im.label} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.label} contain={false} />
          ))}
        </div>
      </motion.section>
    </CaseShell>
  );
}
