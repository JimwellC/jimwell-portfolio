"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { internproofImages } from "@/data/internproof";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "internproof")!;

const CONTRACT = "0x9A8BD5059F3ec602c9b54D2C78d1f11eE0580bf4";

const SPEC: Spec[] = [
  ["Class", "On-chain OJT ledger", true],
  ["Network", "Ethereum Sepolia", false],
  ["Contract", "UUPS proxy", false],
  ["Bytecode", "23,531 / 24,576 B", true],
  ["Roles", "4 · on-chain ACL", false],
  ["Storage", "IPFS/Pinata + on-chain CID", false],
  ["Wallet", "MetaMask · ethers v6", false],
  ["Verify", "Public, no account", true],
  ["Status", "Live · Sepolia", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Next.js 14 + TS", desc: "Frontend, dashboards, verify portal" },
  { label: "Solidity (UUPS)", desc: "Upgradeable on-chain logbook proxy" },
  { label: "ethers.js v6", desc: "Contract calls · MetaMask signing" },
  { label: "IPFS · Pinata", desc: "Proof images off-chain, CID on-chain" },
  { label: "jsPDF", desc: "Client-side A4 certificate generation" },
  { label: "Tailwind CSS", desc: "Amber dark design system" },
  { label: "Vercel", desc: "Frontend hosting + deployment" },
];

// Measured — the headline is a single contract at 95.7% of the EVM cap.
const METRICS: [string, string][] = [
  ["Contract size", "23,531 / 24,576 B"],
  ["EVM cap used", "95.7%"],
  ["On-chain roles", "4 dashboards"],
  ["Log pagination", "5 entries / page"],
];

// Real on-chain roles — the access-control model.
const ROLES: [string, string][] = [
  ["Student", "Clock in/out on-chain, download certificate"],
  ["Supervisor", "Verify entries, view IPFS proofs, sign off"],
  ["Coordinator", "Confirm completion after sign-off"],
  ["Admin", "Register schools, approve supervisors"],
];

const BOOT: BootLine[] = [
  { pfx: ">", text: "mount /case-file/internproof", dim: true },
  { pfx: ">", text: "INTERNPROOF // blockchain OJT ledger  [ solo · production ]" },
  { pfx: ">", text: P.story },
  { pfx: ">", text: "contract: 0x9A8BD5…0bf4 @ ethereum-sepolia · verified", dim: true },
];

export default function InternProofCase() {
  return (
    <CaseShell
      code={`INP-${P.num}`}
      status="Live · Sepolia"
      statusActive
      classification="// On-chain Verification System"
      name={P.name}
      tagline={`${P.tagline} · ${P.tech.join(" / ")}`}
      boot={BOOT}
      spec={SPEC}
      manifest={MANIFEST}
      github={P.github}
      live={P.live}
      links={[{ label: "Contract on Etherscan", href: `https://sepolia.etherscan.io/address/${CONTRACT}` }]}
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> Contract architecture <span className="rule" /></div>
        <div className="readout">{P.detail}</div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Metrics</b> On-chain footprint <span className="rule" /><span className="n">{String(METRICS.length).padStart(2, "0")} tracked</span></div>
        <div className="stats">
          {METRICS.map(([k, v]) => (
            <div className="stat" key={k}><span className="sk">{k}</span><span className="sv acc">{v}</span></div>
          ))}
        </div>
        <p className="mod-spec" style={{ marginTop: 14 }}>The whole system is one contract engineered to 95.7% of Ethereum&apos;s 24,576-byte limit — every feature had to fit under the cap.</p>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Access Control</b> On-chain roles <span className="rule" /><span className="n">04 roles</span></div>
        <div className="modules">
          <div className="module-col">
            {ROLES.slice(0, 2).map(([r, d]) => (
              <div className="module-row" key={r}><span>{r} — <span style={{ color: "var(--grey)" }}>{d}</span></span><span className="st online">On-chain</span></div>
            ))}
          </div>
          <div className="module-col">
            {ROLES.slice(2).map(([r, d]) => (
              <div className="module-row" key={r}><span>{r} — <span style={{ color: "var(--grey)" }}>{d}</span></span><span className="st online">On-chain</span></div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal}>
        <div className="cs-sec"><b>Telemetry</b> Interface feeds <span className="rule" /><span className="n">{String(internproofImages.length).padStart(2, "0")} feeds</span></div>
        <div className="telem-grid">
          {internproofImages.map((im, i) => (
            <Telemetry key={i} src={im.src} alt={im.label} id={`FEED-${String(i + 1).padStart(2, "0")}`} caption={im.label} contain />
          ))}
        </div>
      </motion.section>
    </CaseShell>
  );
}
