"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { aigosImages } from "@/data/aigos";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "aigos")!;

const PRIVACY = "https://ritzy-nebula-f7d.notion.site/aigos-Privacy-Policy-2d41569dab8180cc9cd6eef55d2c331d";

const SPEC: Spec[] = [
  ["Platform", "iOS 17+ · iPhone", true],
  ["Language", "Swift 6", false],
  ["Architecture", "Offline-first · zero backend", true],
  ["Storage", "SwiftData (on-device)", false],
  ["AI / NLP", "Rule-based · on-device", false],
  ["Maps", "Apple MapKit (optional)", false],
  ["Tests", "283 passing", true],
  ["Status", "Live on the App Store", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Swift 6", desc: "Strict concurrency, primary language" },
  { label: "SwiftUI", desc: "Every screen + custom components" },
  { label: "SwiftData", desc: "On-device persistence, zero cloud" },
  { label: "CLLocationManager", desc: "Foreground GPS trip tracking" },
  { label: "MapKit", desc: "Optional online map picker + routing" },
  { label: "Core Graphics", desc: "Shareable report-card rendering" },
  { label: "XCTest", desc: "283 tests · physics + NLP coverage" },
  { label: "Fastlane", desc: "Automated App Store build + upload" },
];

// Measured on build 99.
const METRICS: [string, string][] = [
  ["Unit tests", "283 passing"],
  ["PH vehicles", "100+ in database"],
  ["Offline places", "167+ gazetteer"],
  ["Expressway tolls", "13 · TRB 2026"],
  ["Physics factors", "~15 stacked"],
  ["External API calls", "0 · offline mode"],
];

const FLOW = [
  { num: "01", title: "Select Vehicle", desc: "Base efficiency (km/L) and tank size load from SwiftData." },
  { num: "02", title: "Enter Route", desc: "Origin and destination resolve via the offline gazetteer, or Apple MapKit when online." },
  { num: "03", title: "Resolve Distance", desc: "MKDirections road distance if online; a haversine × 1.30 estimate if offline." },
  { num: "04", title: "Set Driving Factors", desc: "Speed, AC, road type, traffic, load, and weather via the “how you'll drive” sheet." },
  { num: "05", title: "Stack Multipliers", desc: "The CalculationEngine applies each factor independently to the effective efficiency." },
  { num: "06", title: "Compute Cost", desc: "Adjusted efficiency × distance = litres; litres × current fuel price = PHP cost." },
  { num: "07", title: "Present Result", desc: "Full breakdown, fuel gauge, low-fuel warning, and a confidence badge." },
  { num: "08", title: "Auto-save Trip", desc: "Saved to TripRecord — feeds History, the monthly report, and DrivingProfile learning." },
];

const ANOMALIES = [
  {
    num: "01",
    title: "SwiftData Crash on Real Device",
    tag: "swiftdata",
    problem: "The VehicleProfile → DrivingProfile relationship had no inverse. It worked in the simulator's in-memory store but crashed on device when SwiftData serialized to SQLite.",
    solution: "Made the relationship bidirectional with @Relationship(inverse:) and added persistent-store tests that exercise on-disk saves — catching a bug class the simulator structurally can't reproduce.",
  },
  {
    num: "02",
    title: "GPS Accuracy vs Battery",
    tag: "location",
    problem: "Background tracking needed UIBackgroundModes = location, which crashed older devices (iPhone 11) when the Info.plist key was injected wrong.",
    solution: "Dropped to foreground-only tracking for v1.0 (users keep the dashboard open — matching real driving). Used kCLLocationAccuracyBest with a 10 m filter plus bad-point rejection (accuracy > 50 m, teleport > 500 m/s).",
  },
  {
    num: "03",
    title: "Apple Daily Upload Limit",
    tag: "ci/cd",
    problem: "Fastlane kept hitting Apple's undocumented daily binary-upload cap (error 90382), blocking TestFlight testing during active development.",
    solution: "Established strict build discipline — compile and test locally first, push to TestFlight only on explicit intent. Fewer but higher-quality builds reached review.",
  },
  {
    num: "04",
    title: "Offline NLP, No Cloud AI",
    tag: "nlp",
    problem: "Natural-language trip queries (“Magkano ang gas papuntang Baguio?”) with zero internet or API dependency.",
    solution: "A custom rule-based Swift parser: intent classification, entity extraction (places, vehicles, fuel types), and conversation context (stacking follow-ups like “with 4 passengers”) — all on-device in under 10 ms.",
  },
  {
    num: "05",
    title: "Cross-Island Trip Detection",
    tag: "routing",
    problem: "“Angeles to Cebu” produced a nonsensical 800+ km land distance across water.",
    solution: "An island-classification database maps every PH city/province to its island group; detection intercepts cross-island queries and returns a multi-modal breakdown (land + ferry/flight reference) instead of a misleading land estimate.",
  },
];

const SHIPPED = [
  "Physics fuel engine (15 factors)",
  "100+ PH vehicle database",
  "Offline gazetteer (167+ places)",
  "Talk to aigos — EN + Tagalog NLP",
  "Toll database (13 expressways)",
  "Cross-island multi-modal trips",
  "GPS trip tracking + comparison",
  "Monthly report (shareable image)",
  "Driving score + suggestions",
  "283 unit tests · Fastlane CI/CD",
];

const PLANNED = [
  "Remote price auto-update (GitHub Actions)",
  "Gas-station finder along route",
  "Home Screen widgets (WidgetKit)",
  "Apple Watch companion",
  "Offline OSRM routing",
  "Apple Intelligence (FoundationModels)",
  "Android version",
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/aigos", dim: true },
  { pfx: ">", text: "AIGOS // offline fuel-cost engine  [ solo · iOS ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "net-state: offline(on-device) · mapkit(optional, online)", dim: true },
  { pfx: ">", text: "status: APPROVED — live on the App Store (PH)", dim: true },
];

export default function AigosCase() {
  return (
    <CaseShell
      code={`AIG-${P.num}`}
      status="Live on the App Store"
      statusActive
      classification="// Offline Fuel-Cost Engine"
      name={P.name}
      tagline={`${P.tagline} · ${P.tech.join(" / ")}`}
      boot={BOOT}
      spec={SPEC}
      manifest={MANIFEST}
      github={P.github}
      live={P.live}
      liveLabel="Download on the App Store"
      links={[{ label: "Privacy policy", href: PRIVACY }]}
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> How it computes <span className="rule" /></div>
        <div className="readout">{P.detail}</div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Metrics</b> Verified footprint <span className="rule" /><span className="n">{String(METRICS.length).padStart(2, "0")} tracked</span></div>
        <div className="stats">
          {METRICS.map(([k, v]) => (
            <div className="stat" key={k}><span className="sk">{k}</span><span className="sv acc">{v}</span></div>
          ))}
        </div>
        <p className="mod-spec" style={{ marginTop: 14 }}>Measured on build 99. GPS accuracy runs ~96% on 20+ km trips (Manila→Batangas test); calculation stays under 100 ms.</p>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Data Flow</b> Trip calculation <span className="rule" /><span className="n">{String(FLOW.length).padStart(2, "0")} stages</span></div>
        <div className="flow">
          {FLOW.map((s) => (
            <div className="flow-step" key={s.num}>
              <div className="flow-idx">{s.num}</div>
              <div>
                <h3 className="flow-title">{s.title}</h3>
                <p className="flow-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
        <div className="cs-sec"><b>System Modules</b> Build status <span className="rule" /></div>
        <div className="modules">
          <div className="module-col">
            <h4><span className="dot" /> Shipped — build 99</h4>
            {SHIPPED.map((m) => (
              <div className="module-row" key={m}>{m}<span className="st online">Online</span></div>
            ))}
          </div>
          <div className="module-col">
            <h4>Planned — v1.1</h4>
            {PLANNED.map((m) => (
              <div className="module-row" key={m}>{m}<span className="st pending">Queued</span></div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Telemetry</b> App Store screens <span className="rule" /><span className="n">{String(aigosImages.length).padStart(2, "0")} feeds</span></div>
        <div className="telem-grid phones">
          {aigosImages.map((im, i) => (
            <Telemetry key={i} src={im.src} alt={im.label} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.label} contain />
          ))}
        </div>
      </motion.section>
    </CaseShell>
  );
}
