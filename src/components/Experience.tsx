"use client";
import { Fragment, useState } from "react";
import Parallax from "./Parallax";
import { experiences, type Certificate } from "@/data/experience";
import CertLightbox from "./CertLightbox";

// Bold the `highlight` phrase where it appears in the description.
function withHighlight(desc: string, highlight?: string) {
  if (!highlight || !desc.includes(highlight)) return desc;
  return desc.split(highlight).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <b>{highlight}</b>}
      {part}
    </Fragment>
  ));
}

export default function Experience() {
  const [active, setActive] = useState<Certificate | null>(null);
  const location = experiences[0]?.location ?? "";

  return (
    <section id="experience" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§03</span> Experience</div>
        <div className="panel">
          <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
          <div className="panel-tag">
            <span className="l"><span className="dot" /> SYS.03 · <b>SERVICE RECORD</b></span>
            <span className="r">{location.toUpperCase()}</span>
          </div>

          {experiences.map((xp) => {
            const cert = xp.certificates[0];
            const open = () => cert && setActive(cert);
            return (
              <div
                className={`xp${cert ? " xp-clickable" : ""}`}
                key={xp.id}
                onClick={cert ? open : undefined}
                role={cert ? "button" : undefined}
                tabIndex={cert ? 0 : undefined}
                aria-label={cert ? `${xp.role} at ${xp.company} — view certificate` : undefined}
                onKeyDown={cert ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } } : undefined}
              >
                <div className="when">{xp.period} —<br />{xp.location}</div>
                <div>
                  <h3 className="role">{xp.role}</h3>
                  <div className="org">{xp.company}</div>
                  <p className="desc">{withHighlight(xp.description, xp.highlight)}</p>
                  <div className="chips">
                    {xp.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {cert && (
                    <span className="xp-cert">◈ View certificate <span>↗</span></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Parallax>

      {/* certificate viewer */}
      <CertLightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}
