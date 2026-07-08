"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "fad-fashiown")!;

const SPEC: Spec[] = [
  ["Class", "Live-selling automation", true],
  ["Ingest", "TikTok live comments", false],
  ["Parser", "Regex order pipeline", true],
  ["Tenancy", "Per-client PG schema", false],
  ["Realtime", "Socket.IO events", false],
  ["Output", "Thermal printer · ESC/POS", true],
  ["Backend", "NestJS · multi-tenant", false],
  ["Impact", "~80% less manual entry", true],
  ["Status", "Client · shipped", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "NestJS", desc: "Multi-tenant backend service" },
  { label: "Socket.IO", desc: "Realtime order + stream events" },
  { label: "PostgreSQL", desc: "Per-client schema isolation" },
  { label: "Redis", desc: "Pub/sub + caching layer" },
];

const MODULES = [
  "Live comment ingestion",
  "Real-time order detection",
  "Per-client data isolation",
  "Order queue routing",
  "Thermal receipt printing (ESC/POS)",
  "~80% manual-entry reduction",
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/fad-fashiown", dim: true },
  { pfx: ">", text: "FAD FASHIOWN // TikTok live-selling automation  [ client · saas ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "pipeline: stream → parse → queue → print (esc/pos)", dim: true },
];

const images = [
  { src: "/projects/fad-fashiown/logo.jpg", alt: "Fad Fashiown brand mark", caption: "Brand mark" },
  { src: "/projects/fad-fashiown/1.png", alt: "Fad Fashiown order console", caption: "Order console" },
  { src: "/projects/fad-fashiown/2.png", alt: "Fad Fashiown live view", caption: "Live console" },
];

export default function FadFashiownCase() {
  return (
    <CaseShell
      code={`FAF-${P.num}`}
      status="Client · shipped"
      statusActive
      classification="// Realtime Commerce Automation"
      name={P.name}
      tagline={`${P.tagline} · ${P.tech.join(" / ")}`}
      boot={BOOT}
      spec={SPEC}
      manifest={MANIFEST}
      github={P.github}
      live={P.live}
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> Pipeline architecture <span className="rule" /></div>
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
        <div className="cs-sec"><b>Telemetry</b> Interface feeds <span className="rule" /><span className="n">{String(images.length).padStart(2, "0")} feeds</span></div>
        <div className="telem-grid">
          {images.map((im, i) => (
            <Telemetry key={i} src={im.src} alt={im.alt} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.caption} contain />
          ))}
        </div>
      </motion.section>
    </CaseShell>
  );
}
