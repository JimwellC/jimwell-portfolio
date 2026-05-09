"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { internproofImages } from "@/data/internproof";

const AMBER        = "#f59e0b";
const AMBER_DIM    = "rgba(245,158,11,0.15)";
const AMBER_BORDER = "rgba(245,158,11,0.25)";

const techStack = [
  { cat: "Smart Contract", items: ["Solidity 0.8.24", "UUPS (EIP-1822)", "OpenZeppelin", "Hardhat"] },
  { cat: "Frontend",       items: ["Next.js 14", "TypeScript", "ethers.js v6", "Tailwind CSS"] },
  { cat: "Web3 / Storage", items: ["MetaMask (EIP-1193)", "Pinata IPFS", "Ethereum Sepolia"] },
  { cat: "Other",          items: ["jsPDF", "Syne", "IBM Plex Mono"] },
];

const roles = [
  { name: "Student",     color: AMBER,     desc: "Clocks in/out on-chain with block timestamp enforcement. Uploads IPFS proof image on every clock-out. Downloads completion certificate as PDF." },
  { name: "Supervisor",  color: "#818cf8", desc: "Verifies or rejects log entries with reason. Views IPFS proof images inline. Issues final sign-off when hours are reached." },
  { name: "Coordinator", color: "#22d3ee", desc: "Confirms OJT completion after supervisor sign-off. Views all students under their school. Status advances to OJT Complete on-chain." },
  { name: "Admin",       color: "#4ade80", desc: "Registers schools, courses, and companies. Approves or revokes supervisor registrations. One admin per deployment." },
];

const flow = [
  { n: "01", title: "Student registers on-chain",          desc: "Connects MetaMask, enters their supervisor code, calls registerStudent(). Wallet permanently linked to school, course, and supervisor." },
  { n: "02", title: "Daily clock-in records the timestamp", desc: "clockIn() records the block timestamp as timeIn. The contract enforces one active session per student at a time." },
  { n: "03", title: "Clock-out with task + IPFS proof",    desc: "On clockOut(), hours are calculated (4hr minimum enforced), proof image CID stored on-chain permanently alongside the task description." },
  { n: "04", title: "Supervisor verifies on-chain",        desc: "verifyLogEntry() checks wallet authorization then atomically updates totalVerifiedHours. Rejected entries store the reason on-chain." },
  { n: "05", title: "Sign-off and coordinator confirm",    desc: "issueFinalSignOff() then coordinatorConfirm() advances status to OJT Complete. Student downloads a jsPDF certificate generated client-side." },
];

const decisions = [
  { q: "Why UUPS instead of Transparent proxy?",     a: "UUPS puts the upgrade logic in the implementation contract, not the proxy — cheaper proxy deployment and the implementation can disable upgrades entirely if needed. Transparent proxies check the caller against the admin address on every call, adding unnecessary gas overhead." },
  { q: "Why IPFS instead of on-chain image storage?", a: "Storing images on-chain would cost thousands of dollars in gas per entry. IPFS stores the image off-chain but the CID — a cryptographic hash — is stored on-chain. If anyone tampers with the image, the CID won't match. Tamper-evidence without the gas cost." },
  { q: "Couldn't someone fake a clock-in?",          a: "Only the student's registered wallet can call clockIn(). The contract enforces that the caller matches the registered student address. Every action requires a private key signature — there's no admin backdoor or override." },
  { q: "Why Sepolia over a local testnet?",          a: "Real deployment means the contract address is permanent and publicly verifiable on Etherscan. Anyone can check the bytecode, read the state, and verify transactions without running anything locally. That's the whole point — trustless verification." },
];

const stats = [
  { value: "23,531", label: "Contract bytes",   sub: "of 24,576 limit"    },
  { value: "46",     label: "Public functions", sub: "across 4 roles"     },
  { value: "100%",   label: "Tamper-resistant", sub: "post-submission"    },
  { value: "<$1",    label: "Per record",       sub: "gas cost on Sepolia" },
];

export default function InternProofPage() {
  // null = closed, number = index open in lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex(i => i === null ? 0 : i === 0 ? internproofImages.length - 1 : i - 1);
  const nextImage = () =>
    setLightboxIndex(i => i === null ? 0 : i === internproofImages.length - 1 ? 0 : i + 1);

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
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: `0.5px solid ${AMBER_BORDER}`, boxShadow: `0 0 80px rgba(245,158,11,0.15)`, maxWidth: "88vw", width: "fit-content", cursor: "default", display: "flex", flexDirection: "column", maxHeight: "90vh" }}
>
            {/* Scrollable image area */}
            <div style={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}>
                <Image
                src={internproofImages[lightboxIndex].src}
                alt={internproofImages[lightboxIndex].label}
                width={1400}
                height={900}
                sizes="88vw"
                style={{ objectFit: "contain", display: "block", width: "min(88vw, 1400px)", height: "auto" }}
                />
            </div>

              {/* Caption */}
              <div style={{ padding: "12px 16px", background: "rgba(8,9,16,0.97)", borderTop: `0.5px solid ${AMBER_BORDER}`, flexShrink: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#eaecf6", marginBottom: "2px" }}>
                  {internproofImages[lightboxIndex].label}
                </div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {internproofImages[lightboxIndex].desc}
                </div>
              </div>

              {/* Prev / Next */}
              <button onClick={e => { e.stopPropagation(); prevImage(); }}
                style={{ position: "absolute", left: "12px", top: "44%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={e => { e.stopPropagation(); nextImage(); }}
                style={{ position: "absolute", right: "12px", top: "44%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(8,9,16,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

              {/* Counter */}
              <div style={{ position: "absolute", top: "12px", left: "14px", fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space-mono)", background: "rgba(8,9,16,0.7)", padding: "3px 8px", borderRadius: "8px" }}>
                {lightboxIndex + 1} / {internproofImages.length}
              </div>

              {/* Close */}
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
              <span style={{ color: AMBER }}>Web3 · Blockchain</span>
            </div>

            <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#eaecf6", marginBottom: "20px" }}>
              InternProof
            </h1>

            <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.72, maxWidth: "560px", marginBottom: "32px" }}>
              Blockchain-verified OJT logbook system on Ethereum Sepolia. Every clock-in, task, and supervisor signature is permanently on-chain — verifiable by anyone, falsifiable by no one.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href="https://internproof.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, color: "#0f0e0a", background: AMBER, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}>
                Live Demo ↗
              </a>
              <a href="https://sepolia.etherscan.io/address/0x9A8BD5059F3ec602c9b54D2C78d1f11eE0580bf4" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "13px", color: "var(--text)", border: `0.5px solid ${AMBER_BORDER}`, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}>
                Etherscan ↗
              </a>
              <a href="https://github.com/JimwellC" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "13px", color: "var(--text)", border: "0.5px solid rgba(255,255,255,0.1)", textDecoration: "none", whiteSpace: "nowrap" }}>
                GitHub ↗
              </a>
            </div>

            {/* Hero screenshot — opens lightbox at index 0 */}
            <div
              onClick={() => openLightbox(0)}
              style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", border: `0.5px solid ${AMBER_BORDER}`, cursor: "zoom-in", boxShadow: `0 0 60px rgba(245,158,11,0.08)` }}
            >
              <Image
                src="/projects/internproof/landing.png"
                alt="InternProof — landing page"
                width={1400}
                height={900}
                sizes="(max-width: 768px) 100vw, 90vw"
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
              <div style={{ position: "absolute", bottom: "16px", right: "16px", padding: "5px 10px", borderRadius: "6px", background: "rgba(8,9,16,0.8)", border: `0.5px solid ${AMBER_BORDER}`, fontSize: "11px", color: AMBER, fontFamily: "var(--font-space-mono)" }}>
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
            <div style={{ display: "grid", gap: "1px", background: "var(--border)", border: "0.5px solid var(--border)", borderRadius: "14px", overflow: "hidden" }} className="stats-grid">
              {stats.map(({ value, label, sub }) => (
                <div key={label} style={{ padding: "28px 24px", background: "var(--s1)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: AMBER, fontFamily: "var(--font-space-mono)", letterSpacing: "-0.02em" }}>{value}</div>
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
              Every dashboard, every role.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "32px", maxWidth: "480px" }}>
              Click any screenshot to expand and navigate between them.
            </p>
            <div className="gallery-grid">
              {internproofImages.map((img, i) => (
                <div
                  key={img.src}
                  onClick={() => openLightbox(i)}
                  className="gallery-card"
                >
                  <div style={{ position: "relative", height: "180px", background: "var(--s2)", overflow: "hidden" }}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.3s ease" }}
                      className="gallery-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,9,16,0.65) 0%, transparent 50%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", borderRadius: "6px", background: "rgba(8,9,16,0.75)", border: `0.5px solid ${AMBER_BORDER}`, fontSize: "10px", color: AMBER, fontFamily: "var(--font-space-mono)" }}>
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
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PROBLEM / SOLUTION
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">The problem</div>
            <div className="prose-grid">
              <div>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#eaecf6", marginBottom: "16px", lineHeight: 1.2 }}>
                  Paper logbooks are easily falsified.
                </h2>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>
                  Traditional OJT documentation depends on physical logbooks signed manually by supervisors. They&apos;re vulnerable to forgery, can be backdated, lost, or altered — with no cryptographic guarantee of authenticity.
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, marginTop: "12px" }}>
                  For Philippine HEIs alone, hundreds of thousands of OJT logbooks are processed every academic year with zero verifiability for future employers.
                </p>
              </div>
              <div style={{ padding: "28px", borderRadius: "14px", background: "var(--s1)", border: `0.5px solid ${AMBER_BORDER}` }}>
                <div style={{ fontSize: "11px", color: AMBER, fontFamily: "var(--font-space-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>The solution</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#eaecf6", marginBottom: "12px", lineHeight: 1.3 }}>
                  Cryptographic proof, not paper trust.
                </h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>
                  Every action — clock-in, clock-out, supervisor verification, coordinator confirmation — is a transaction signed by the actor&apos;s private key and recorded immutably on Ethereum.
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, marginTop: "12px" }}>
                  Verification is a public read: anyone can confirm a graduate&apos;s OJT history in seconds, with no human gatekeeper.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONTRACT INFO
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">Smart contract</div>
            <div style={{ padding: "28px", borderRadius: "14px", background: "var(--s1)", border: `0.5px solid ${AMBER_BORDER}`, display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", marginBottom: "8px" }}>PROXY ADDRESS (UUPS)</div>
                <a href="https://sepolia.etherscan.io/address/0x9A8BD5059F3ec602c9b54D2C78d1f11eE0580bf4" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "13px", color: AMBER, fontFamily: "var(--font-space-mono)", textDecoration: "none", wordBreak: "break-all" }}>
                  0x9A8BD5059F3ec602c9b54D2C78d1f11eE0580bf4
                </a>
              </div>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {[
                  { label: "Network",  value: "Ethereum Sepolia" },
                  { label: "Pattern",  value: "UUPS (EIP-1822)"  },
                  { label: "Language", value: "Solidity 0.8.24"  },
                  { label: "Bytecode", value: "23,531 / 24,576"  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--font-space-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{label}</div>
                    <div style={{ fontSize: "13px", color: "#eaecf6", fontFamily: "var(--font-space-mono)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ROLES
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">System architecture</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "8px" }}>Four roles, enforced on-chain.</h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "36px", maxWidth: "520px" }}>Role-based access control at the smart contract level using custom modifiers. No role can act outside its permissions.</p>
            <div className="roles-grid">
              {roles.map(({ name, color, desc }) => (
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
            VERIFICATION FLOW
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">Verification flow</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "36px" }}>From registration to certified completion.</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {flow.map(({ n, title, desc }, i) => (
                <div key={n} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", paddingBottom: i < flow.length - 1 ? "32px" : "0", position: "relative" }}>
                  {i < flow.length - 1 && (
                    <div style={{ position: "absolute", left: "31px", top: "40px", width: "1px", bottom: "0", background: "var(--border)" }} />
                  )}
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: AMBER_DIM, border: `0.5px solid ${AMBER_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: AMBER, fontFamily: "var(--font-space-mono)", flexShrink: 0 }}>
                    {n}
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#eaecf6", marginBottom: "6px" }}>{title}</div>
                    <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.72 }}>{desc}</div>
                  </div>
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
                <div key={q} className="decision-row" style={{ padding: "28px", background: "var(--s1)" }}>
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
            <div className="stack-grid">
              {techStack.map(({ cat, items }) => (
                <div key={cat} style={{ padding: "24px", borderRadius: "12px", background: "var(--s1)", border: "0.5px solid var(--border)" }}>
                  <div style={{ fontSize: "11px", color: AMBER, fontFamily: "var(--font-space-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>{cat}</div>
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
            WHAT I'D ADD IN PRODUCTION
        ══════════════════════════════════════════════ */}
        <section className="section">
          <div className="col">
            <div className="eyebrow">If this went to production</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#eaecf6", marginBottom: "36px" }}>What I&apos;d add next.</h2>
            <div className="next-grid">
              {[
                { title: "WalletConnect",        desc: "Mobile-friendly clock-in without needing a desktop browser or MetaMask extension." },
                { title: "L2 Deployment",        desc: "Migrate from Sepolia to Polygon or Base for real usage — gas cost drops from dollars to fractions of a cent." },
                { title: "School-deployed flow", desc: "A coordinator-managed onboarding so students don't need to understand blockchain to register and use the system." },
              ].map(({ title, desc }) => (
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
                <Link href="/projects/auxtion" style={{ fontSize: "16px", fontWeight: 600, color: "var(--a2)", textDecoration: "none" }}>
                    Auxtion — Live Auction Marketplace →
                </Link>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                <Link href="/projects"
                    style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "var(--muted)", textDecoration: "none", border: "0.5px solid var(--border)", fontFamily: "var(--font-space-mono)" }}>
                    ← all projects
                </Link>
                <a href="https://internproof.vercel.app" target="_blank" rel="noopener noreferrer"
                    style={{ padding: "10px 20px", borderRadius: "100px", fontSize: "12px", color: "#0f0e0a", textDecoration: "none", background: AMBER, fontFamily: "var(--font-space-mono)" }}>
                    Live Demo ↗
                </a>
                </div>
            </div>
            </section>

      </main>

      <style>{`
        /* ── Grids ── */
        .stats-grid   { grid-template-columns: repeat(4, 1fr) !important; }
        .prose-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .roles-grid   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .stack-grid   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .next-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .decision-row { display: grid; grid-template-columns: 1fr 1.4fr; gap: 32px; align-items: start; }

        /* ── Gallery card hover ── */
        .gallery-card {
          border-radius: 12px;
          overflow: hidden;
          border: 0.5px solid var(--border);
          cursor: zoom-in;
          background: var(--s1);
          transition: border-color 0.2s, transform 0.2s;
        }
        .gallery-card:hover {
          border-color: ${AMBER_BORDER};
          transform: translateY(-2px);
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.04);
        }

        /* ── Tablet (≤768px) ── */
        @media (max-width: 768px) {
          .stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .prose-grid   { grid-template-columns: 1fr !important; gap: 24px !important; }
          .roles-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .stack-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .next-grid    { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .decision-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        }

        /* ── Mobile (≤480px) ── */
        @media (max-width: 480px) {
          .roles-grid   { grid-template-columns: 1fr !important; }
          .stack-grid   { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}