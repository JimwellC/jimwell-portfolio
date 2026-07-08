"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { caseStudySections } from "@/data/reachable";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "reachable")!;

const SPEC: Spec[] = [
  ["Platform", "Flutter · iOS/Android", true],
  ["Backend", "Firebase", false],
  ["Auth", "Firebase Auth", false],
  ["Database", "Cloud Firestore", false],
  ["Location", "GPS + Google Maps", false],
  ["Trigger", "Voice + manual SOS", true],
  ["Offline", "SMS fallback", true],
  ["Role", "Lead dev · team of 4", false],
  ["Status", "Capstone prototype", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Flutter", desc: "Cross-platform iOS & Android client" },
  { label: "Firebase Auth", desc: "Secure user authentication" },
  { label: "Cloud Firestore", desc: "Real-time emergency data" },
  { label: "Firebase Storage", desc: "Profile media storage" },
  { label: "Google Maps API", desc: "Live location visualization" },
  { label: "Geolocator", desc: "GPS location retrieval" },
  { label: "Speech Recognition", desc: "Voice-triggered activation" },
  { label: "SMS", desc: "Offline emergency fallback" },
];

const CAPABILITIES = [
  "Voice-command SOS trigger",
  "Manual SOS activation",
  "Real-time GPS + Google Maps",
  "SMS fallback when offline",
  "Emergency contact management",
  "Accessibility-first interface",
];

// Honest project scope — a capstone prototype, not a shipped product.
const FACTS: [string, string][] = [
  ["Team", "4 developers"],
  ["My role", "Lead developer"],
  ["Emergency triggers", "2 · voice + manual"],
  ["Platforms", "Android + iOS (Flutter)"],
  ["Evaluation", "Capstone-assessed"],
  ["Public users", "0 · not deployed"],
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/reachable", dim: true },
  { pfx: ">", text: "REACHABLE // accessible emergency comms  [ capstone · lead dev ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "net-state: online(firebase) → offline(sms fallback)", dim: true },
];

const images = caseStudySections.flatMap((s) =>
  s.images.map((im) => ({ ...im, section: s.title }))
);

export default function ReachableCase() {
  return (
    <CaseShell
      code={`RCH-${P.num}`}
      status="Capstone prototype"
      statusActive
      classification="// Accessibility Emergency System"
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
        <div className="cs-sec"><b>Project Facts</b> Team &amp; scope <span className="rule" /><span className="n">{String(FACTS.length).padStart(2, "0")}</span></div>
        <div className="stats">
          {FACTS.map(([k, v]) => (
            <div className="stat" key={k}><span className="sk">{k}</span><span className="sv acc">{v}</span></div>
          ))}
        </div>
        <p className="mod-spec" style={{ marginTop: 14 }}>Undergraduate capstone — evaluated academically, built as a working prototype. Not published to app stores.</p>
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
          <div className="telem-grid phones">
            {images.map((im, i) => (
              <Telemetry key={i} src={im.src} alt={im.alt} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.caption ?? im.section} contain />
            ))}
          </div>
        </motion.section>
      )}
    </CaseShell>
  );
}
