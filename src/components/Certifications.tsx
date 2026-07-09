"use client";
import { useState } from "react";
import Link from "next/link";
import Parallax from "./Parallax";
import { certifications } from "@/data/certifications";
import CertLightbox, { type CertView } from "./CertLightbox";

export default function Certifications() {
  const [active, setActive] = useState<CertView | null>(null);
  const count = String(certifications.length).padStart(2, "0");
  return (
    <section id="certifications" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§04</span> Certifications <span className="n">{count}</span></div>
        <div className="panel">
          <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
          <div className="panel-tag">
            <span className="l"><span className="dot" /> SYS.04 · <b>CREDENTIALS</b></span>
            <Link href="/certifications" className="r" style={{ textDecoration: "none" }}>{count} VERIFIED ↗</Link>
          </div>

          <div className="certgrid">
            {certifications.map((c) => (
              <button
                type="button"
                className="cert"
                key={c.id}
                onClick={() => setActive({ src: c.image, alt: c.name, title: c.name, subtitle: `${c.issuer} · ${c.date}` })}
              >
                <span className="cn">{c.name}</span>
                <span className="ci">{c.issuer} · {c.date}</span>
              </button>
            ))}
          </div>

          <Link href="/certifications" className="rail-link" style={{ marginTop: 20 }}>
            Open credential ledger — verify all {count}
            <span>↗</span>
          </Link>
        </div>
      </Parallax>

      <CertLightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}
