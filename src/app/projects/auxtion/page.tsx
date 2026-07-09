"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import {
  techStack, challenges, bidFlow, builtFeatures, inProgressFeatures, auctionImageSections, metrics,
} from "@/data/auxtion";
import { Boot, type BootLine } from "@/components/case/Boot";
import { Telemetry } from "@/components/case/Telemetry";

const P = projects.find((x) => x.slug === "auxtion")!;

// Spec sheet — the project's real, verified architecture.
const SPEC: [string, string, boolean][] = [
  ["Class", "Live auction marketplace", true],
  ["Transport", "Socket.IO / WS", false],
  ["Bid integrity", "Row-lock · FOR UPDATE", true],
  ["Auth", "JWT · socket handshake", false],
  ["Payment", "PayMongo + manual GCash", false],
  ["Video", "HMS / 100ms", false],
  ["Bid modes", "Swipe + Chat bid", false],
  ["Status", "TestFlight-ready", true],
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/auxtion", dim: true },
  { pfx: ">", text: "AUXTION // live auction marketplace  [ solo build ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "modules: socket-gateway · atomic-bid · paymongo-webhook · rn-client", dim: true },
];

const images = auctionImageSections.flatMap((s) =>
  s.images.map((im) => ({ ...im, section: s.title }))
);

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export default function AuxtionCase() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* command bar */}
      <header className="cs-bar">
        <div className="col">
          <div className="l">
            <span className="file">[ CASE FILE ]</span>
            <span>AUX-{P.num}</span>
          </div>
          <div className="r">
            <span className="stat"><span className="dot" /> In development</span>
            <Link href="/projects">← archive</Link>
            <Link href="/">home</Link>
          </div>
        </div>
      </header>

      <div className="col">
        {/* hero readout */}
        <section className="cs-hero">
          <div className="cs-class">// System Architecture Readout</div>
          <h1 className="cs-title">{P.name}</h1>
          <div className="cs-tagline">{P.tagline} · {P.tech.join(" / ")}</div>
          <Boot lines={BOOT} />
        </section>

        {/* asymmetric dashboard */}
        <div className="cs-grid">
          {/* MAIN COLUMN */}
          <div className="cs-main">
            {/* data flow */}
            <motion.section {...reveal}>
              <div className="cs-sec"><b>Data Flow</b> Bid lifecycle <span className="rule" /><span className="n">{String(bidFlow.length).padStart(2, "0")} stages</span></div>
              <div className="flow">
                {bidFlow.map((s) => (
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

            {/* verified metrics */}
            <motion.section {...reveal}>
              <div className="cs-sec"><b>Metrics</b> Verified instrumentation <span className="rule" /><span className="n">{String(metrics.length).padStart(2, "0")} tracked</span></div>
              <div className="stats">
                {metrics.map(([k, v]) => (
                  <div className="stat" key={k}><span className="sk">{k}</span><span className="sv acc">{v}</span></div>
                ))}
              </div>
              <p className="mod-spec" style={{ marginTop: 14 }}>Measured on device — pre-launch, local development. No production traffic yet.</p>
            </motion.section>

            {/* anomaly / post-mortem log */}
            <motion.section {...reveal}>
              <div className="cs-sec"><b>Post-mortem</b> Engineering anomalies <span className="rule" /><span className="n">{String(challenges.length).padStart(2, "0")} logged</span></div>
              {challenges.map((c) => (
                <div className="anomaly" key={c.num}>
                  <div className="anomaly-h">
                    <span className="id">ANOMALY {c.num}</span>
                    {c.title}
                    <span className="a-tag">{c.tag}</span>
                  </div>
                  <div className="anomaly-b">
                    <div className="anomaly-field"><span className="lbl">// Problem</span><p>{c.problem}</p></div>
                    <div className="anomaly-field"><span className="lbl">// Resolution</span><p>{c.solution}</p></div>
                  </div>
                </div>
              ))}
            </motion.section>

            {/* module status */}
            <motion.section {...reveal}>
              <div className="cs-sec"><b>System Modules</b> Build status <span className="rule" /></div>
              <div className="modules">
                <div className="module-col">
                  <h4><span className="dot" /> Online — shipped</h4>
                  {builtFeatures.map((f) => (
                    <div className="module-row" key={f}>{f}<span className="st online">Online</span></div>
                  ))}
                </div>
                <div className="module-col">
                  <h4>Compiling — in progress</h4>
                  {inProgressFeatures.map((f) => (
                    <div className="module-row" key={f}>{f}<span className="st pending">Queued</span></div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* telemetry viewports */}
            {images.length > 0 && (
              <motion.section {...reveal}>
                <div className="cs-sec"><b>Telemetry</b> Monitored feeds <span className="rule" /><span className="n">{String(images.length).padStart(2, "0")} feeds</span></div>
                <div className="telem-grid phones">
                  {images.map((im, i) => (
                    <Telemetry key={i} src={im.src} alt={im.alt} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.section} contain={P.containImage} />
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* STICKY RAIL */}
          <aside className="cs-rail">
            <div className="spec">
              <div className="spec-h"><span className="dot" /> System Specification</div>
              <div className="spec-body">
                {SPEC.map(([k, v, acc]) => (
                  <div className="spec-row" key={k}>
                    <span className="spec-k">{k}</span>
                    <span className={`spec-v${acc ? " acc" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="spec-stream">◊ stream: bid-update · timer-tick · room-sync · 0x{P.num}f9a…</div>
            </div>

            <div className="spec">
              <div className="spec-h"><span className="dot" /> Stack Manifest · {String(techStack.length).padStart(2, "0")}</div>
              <div className="spec-body">
                {techStack.map((t, i) => (
                  <div className="manifest-row" key={t.label}>
                    <div className="m-l"><span className="m-name">{t.label}</span><span className="m-idx">{String(i + 1).padStart(2, "0")}</span></div>
                    <div className="m-desc">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rail-links">
              {P.github && <a className="rail-link" href={P.github} target="_blank" rel="noopener noreferrer">Source repository <span>↗</span></a>}
              {P.live && <a className="rail-link" href={P.live} target="_blank" rel="noopener noreferrer">Live deployment <span>↗</span></a>}
            </div>
          </aside>
        </div>
      </div>

      <footer className="cs-foot">
        <div className="col">
          <Link href="/projects">← all case files</Link>
          <Link href="/">home ↗</Link>
        </div>
      </footer>
    </main>
  );
}
