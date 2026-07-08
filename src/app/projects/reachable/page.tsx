"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { caseStudySections } from "@/data/reachable";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "reachable")!;

const SPEC: Spec[] = [
  ["Class", "Emergency comms app", true],
  ["Trigger", "Voice / gesture", true],
  ["Sync", "Firebase realtime", false],
  ["Fallback", "SMS gateway (offline)", true],
  ["Location", "Live GPS share", false],
  ["A11y", "Accessibility-first", false],
  ["Platform", "Flutter · iOS/Android", false],
  ["Role", "Lead developer", false],
  ["Status", "Thesis · shipped", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Flutter", desc: "Cross-platform iOS & Android client" },
  { label: "Firebase", desc: "Realtime location sync + auth" },
  { label: "GPS APIs", desc: "Live location sharing" },
  { label: "Voice Commands", desc: "Hands-free emergency trigger" },
];

const CAPABILITIES = [
  "Voice-command SOS trigger",
  "Gesture-based navigation",
  "Real-time GPS via Firebase",
  "SMS fallback when offline",
  "Accessibility-first interface",
  "Responder companion view",
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/reachable", dim: true },
  { pfx: ">", text: "REACHABLE // emergency comms for PWDs  [ thesis · lead dev ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "net-state: online(firebase) → degraded(buffer) → offline(sms)", dim: true },
];

const images = caseStudySections.flatMap((s) =>
  s.images.map((im) => ({ ...im, section: s.title }))
);

export default function ReachableCase() {
  return (
    <CaseShell
      code={`RCH-${P.num}`}
      status="Thesis · shipped"
      statusActive
      classification="// Tactical Field Application"
      name={P.name}
      tagline={`${P.tagline} · ${P.tech.join(" / ")}`}
      boot={BOOT}
      spec={SPEC}
      manifest={MANIFEST}
      github={P.github}
      live={P.live}
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> Technical summary <span className="rule" /></div>
        <div className="readout">{P.detail}</div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Capabilities</b> Field modules <span className="rule" /><span className="n">{String(CAPABILITIES.length).padStart(2, "0")}</span></div>
        <div className="modules">
          <div className="module-col">
            <h4><span className="dot" /> Online</h4>
            {CAPABILITIES.slice(0, 3).map((c) => (
              <div className="module-row" key={c}>{c}<span className="st online">Online</span></div>
            ))}
          </div>
          <div className="module-col">
            <h4><span className="dot" /> Online</h4>
            {CAPABILITIES.slice(3).map((c) => (
              <div className="module-row" key={c}>{c}<span className="st online">Online</span></div>
            ))}
          </div>
        </div>
      </motion.section>

      {images.length > 0 && (
        <motion.section {...reveal}>
          <div className="cs-sec"><b>Telemetry</b> Interface feeds <span className="rule" /><span className="n">{String(images.length).padStart(2, "0")} feeds</span></div>
          <div className="telem-grid">
            {images.map((im, i) => (
              <Telemetry key={i} src={im.src} alt={im.alt} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.caption ?? im.section} contain />
            ))}
          </div>
        </motion.section>
      )}
    </CaseShell>
  );
}
