"use client";
import Link from "next/link";
import { Boot, type BootLine } from "./Boot";

export type Spec = [string, string, boolean];
export type ManifestItem = { label: string; desc: string };

// Shared scroll-reveal for case-study sections.
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

/**
 * The System Architecture Readout chrome — command bar, hero + boot terminal,
 * asymmetric dashboard grid, and the sticky spec/manifest rail. Each case study
 * composes its own main-column sections as children.
 */
export function CaseShell({
  code, status, statusActive = false, classification, name, tagline,
  boot, spec, manifest, github, live, links, children,
}: {
  code: string;
  status: string;
  statusActive?: boolean;
  classification: string;
  name: string;
  tagline: string;
  boot: BootLine[];
  spec: Spec[];
  manifest: ManifestItem[];
  github?: string;
  live?: string;
  links?: { label: string; href: string }[];
  children: React.ReactNode;
}) {
  return (
    <main style={{ minHeight: "100vh" }}>
      <header className="cs-bar">
        <div className="col">
          <div className="l">
            <span className="file">[ CASE FILE ]</span>
            <span>{code}</span>
          </div>
          <div className="r">
            <span className="stat">{statusActive && <span className="dot" />}{status}</span>
            <Link href="/projects">← archive</Link>
            <Link href="/">home</Link>
          </div>
        </div>
      </header>

      <div className="col">
        <section className="cs-hero">
          <div className="cs-class">{classification}</div>
          <h1 className="cs-title">{name}</h1>
          <div className="cs-tagline">{tagline}</div>
          <Boot lines={boot} />
        </section>

        <div className="cs-grid">
          <div className="cs-main">{children}</div>

          <aside className="cs-rail">
            <div className="spec">
              <div className="spec-h"><span className="dot" /> System Specification</div>
              <div className="spec-body">
                {spec.map(([k, v, acc]) => (
                  <div className="spec-row" key={k}>
                    <span className="spec-k">{k}</span>
                    <span className={`spec-v${acc ? " acc" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {manifest.length > 0 && (
              <div className="spec">
                <div className="spec-h"><span className="dot" /> Stack Manifest · {String(manifest.length).padStart(2, "0")}</div>
                <div className="spec-body">
                  {manifest.map((t, i) => (
                    <div className="manifest-row" key={t.label}>
                      <div className="m-l"><span className="m-name">{t.label}</span><span className="m-idx">{String(i + 1).padStart(2, "0")}</span></div>
                      <div className="m-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rail-links">
              {github && <a className="rail-link" href={github} target="_blank" rel="noopener noreferrer">Source repository <span>↗</span></a>}
              {live && <a className="rail-link" href={live} target="_blank" rel="noopener noreferrer">Live deployment <span>↗</span></a>}
              {links?.map((l) => (
                <a className="rail-link" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <span>↗</span></a>
              ))}
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
