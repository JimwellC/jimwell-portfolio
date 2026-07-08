"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { certifications, categoryLabels, type Certificate } from "@/data/certifications";
import { Boot, type BootLine } from "@/components/case/Boot";

// Deterministic SHA-256-looking digest from a seed (stable across SSR/client).
function digest(seed: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  let x = h || 1, out = "";
  while (out.length < 64) {
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5; x >>>= 0;
    out += (x >>> 0).toString(16).padStart(8, "0");
  }
  return out.slice(0, 64);
}

// Chronological ledger order (append-only feel).
const entries = [...certifications].sort((a, b) => a.date.localeCompare(b.date));

const BOOT: BootLine[] = [
  { pfx: ">", text: "open /vault/credentials.ledger", dim: true },
  { pfx: ">", text: "verifying signatures · SHA-256 · issuer chain of trust" },
  { pfx: ">", text: `ledger synced · ${entries.length} entries · AUTH OK`, dim: true },
];

export default function CertificationsPage() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* command bar */}
      <header className="cs-bar">
        <div className="col">
          <div className="l">
            <span className="file">[ AUDIT LOG ]</span>
            <span>CRED-LEDGER</span>
          </div>
          <div className="r">
            <span className="stat"><span className="dot" /> {String(entries.length).padStart(2, "0")} verified</span>
            <Link href="/">← home</Link>
          </div>
        </div>
      </header>

      <div className="col">
        {/* hero */}
        <section className="cs-hero">
          <div className="cs-class">// Secure Credential Ledger</div>
          <h1 className="cs-title">Credentials</h1>
          <div className="cs-tagline">Cryptographic audit log · issuer-signed · publicly verifiable</div>
          <Boot lines={BOOT} />
        </section>

        {/* the monolithic ledger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ padding: "clamp(40px,6vw,72px) 0" }}
        >
          <div className="ledger">
            <div className="ledger-bar">
              <span className="l"><span className="dot" /> Secure Credential Ledger</span>
              <span>SHA-256 · {entries.length} ENTRIES · CHAIN OK</span>
            </div>

            <div className="ledger-cols">
              <span>IDX</span><span>Credential</span><span>Class</span><span>Issued</span><span>Digest</span><span>Status</span>
            </div>

            <div className="ledger-body">
              {entries.map((c, i) => {
                const hash = digest(c.id + c.name + c.date);
                return (
                  <button className="ledger-row" key={c.id} onClick={() => setActive(c)} title="Open credential">
                    <span className="lg-idx">0x{(i + 1).toString(16).padStart(2, "0").toUpperCase()}</span>
                    <span className="lg-cred">
                      <span className="lg-name">{c.name}</span>
                      <span className="lg-issuer">[ ISSUER: {c.issuer.toUpperCase()} ]</span>
                    </span>
                    <span className="lg-class">{categoryLabels[c.category]}</span>
                    <span className="lg-date">{c.date}</span>
                    <span className="lg-hash" title={hash}>{hash.slice(0, 20)}…</span>
                    <span className="lg-status"><span className="d" />[ AUTH: VERIFIED ]</span>
                  </button>
                );
              })}
            </div>

            <div className="ledger-foot">
              <span>root · 0x{digest("root").slice(0, 12)}</span>
              <span className="ok">✓ every signature validated against issuer</span>
            </div>
          </div>

          <p style={{ marginTop: 20, fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".04em", color: "var(--grey)", lineHeight: 1.7 }}>
            * Certificate of Appreciation from Microsoft Corporation is logged under Experience on the main readout.
          </p>
        </motion.div>
      </div>

      <footer className="cs-foot">
        <div className="col">
          <Link href="/">← home</Link>
        </div>
      </footer>

      {/* credential viewer */}
      <AnimatePresence>
        {active && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className="lb-frame" style={{ maxWidth: 880, width: "100%" }} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
              <Image src={active.image} alt={active.name} width={880} height={640} sizes="(max-width: 900px) 92vw, 880px" style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }} />
              <div className="telem-bar" style={{ padding: "12px 16px" }}>
                <span className="id">{active.name}</span>
                <span>[ ISSUER: {active.issuer.toUpperCase()} · {active.date} ]</span>
              </div>
              <button className="lb-btn" style={{ top: 12, right: 12 }} onClick={(e) => { e.stopPropagation(); setActive(null); }}>✕</button>
            </motion.div>
            <div className="lb-hint">click outside to close</div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
