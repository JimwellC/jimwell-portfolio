"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { internproofImages } from "@/data/internproof";
import { CaseShell, reveal, type Spec, type ManifestItem } from "@/components/case/CaseShell";
import { Telemetry } from "@/components/case/Telemetry";
import type { BootLine } from "@/components/case/Boot";

const P = projects.find((x) => x.slug === "internproof")!;

const SPEC: Spec[] = [
  ["Class", "On-chain OJT ledger", true],
  ["Network", "Ethereum Sepolia", false],
  ["Contract", "UUPS upgradeable", false],
  ["Bytecode", "23,531 / 24,576", true],
  ["Roles", "4 · on-chain ACL", false],
  ["Proofs", "IPFS · Pinata", false],
  ["Min session", "4h (block time)", false],
  ["Verify", "Public, no account", true],
  ["Status", "Live deployment", true],
];

const MANIFEST: ManifestItem[] = [
  { label: "Solidity", desc: "UUPS upgradeable smart contract" },
  { label: "Next.js", desc: "Frontend + verification portal" },
  { label: "ethers.js", desc: "Contract calls · EIP-1193 wallet" },
  { label: "Hardhat", desc: "Compile, test, deploy pipeline" },
  { label: "IPFS", desc: "Proof images via Pinata, CID on-chain" },
  { label: "TypeScript", desc: "End-to-end type safety" },
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
    >
      <motion.section {...reveal}>
        <div className="cs-sec"><b>System Breakdown</b> Contract architecture <span className="rule" /></div>
        <div className="readout">{P.detail}</div>
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
