"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Parallax from "./Parallax";
import { experiences, type Certificate } from "@/data/experience";

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
      <AnimatePresence>
        {active && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div
              className="lb-frame"
              style={{ maxWidth: 960, width: "100%" }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={960}
                height={620}
                sizes="(max-width: 900px) 92vw, 960px"
                style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
              />
              <div className="telem-bar" style={{ padding: "12px 16px" }}>
                <span className="id">{active.title}</span>
                <span>{active.subtitle}</span>
              </div>
              <button className="lb-btn" style={{ top: 12, right: 12 }} onClick={(e) => { e.stopPropagation(); setActive(null); }} aria-label="Close">✕</button>
            </motion.div>
            <div className="lb-hint">click outside to close</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
