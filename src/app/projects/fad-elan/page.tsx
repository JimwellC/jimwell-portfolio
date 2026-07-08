"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { fadelanImages } from "@/data/fadelan";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "fad-elan")!;

const SPEC: Spec[] = [
  ["Class", "Catalog + CMS platform", true],
  ["Framework", "Next.js 15 · App Router", false],
  ["CMS", "Sanity (custom schema)", false],
  ["API", "9 REST routes", true],
  ["Admin", "iron-session auth", false],
  ["Email", "Resend API", false],
  ["Deploy", "Vercel · custom domain", false],
  ["SEO", "Full infra, day one", false],
  ["Status", "Live · client", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Next.js 15", desc: "App Router production platform" },
  { label: "TypeScript", desc: "End-to-end type safety" },
  { label: "Sanity CMS", desc: "Custom schema · PortableText" },
  { label: "Vercel", desc: "Deploy + custom domain" },
  { label: "Resend", desc: "Transactional inquiry email" },
  { label: "iron-session", desc: "Auth for the admin panel" },
];

const MODULES = [
  "Sanity CMS catalog (real-time availability)",
  "Purpose-built admin panel",
  "Inquiry form → Resend email",
  "Nine REST API routes",
  "Full SEO infrastructure",
  "Custom domain, day one",
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
      classification="// Production E-commerce Platform"
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
