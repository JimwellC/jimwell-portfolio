"use client";
import { useState } from "react";

const links = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "ask ai", href: "#ask" },
  { label: "contact", href: "#contact" },
];

const hireMe = { label: "hire me", href: "mailto:jimwellwork28@gmail.com" };

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="col">
        <div className="brand">
          <span className="mark">
            Jimwell <em>Calma</em>
          </span>
          <span className="sub">Realtime · Mobile</span>
        </div>

        {/* Desktop / tablet inline links */}
        <nav className="navlinks">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={l.label === "contact" ? "" : "hide-sm"}>
              {l.label}
            </a>
          ))}
          <a href={hireMe.href} style={{ color: "var(--cobalt-ink)", borderBottom: "1px solid var(--cobalt-ink)" }}>
            {hireMe.label}
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={`navtoggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown — restores the full nav that the inline bar drops */}
      <div className={`navmenu${open ? " open" : ""}`} hidden={!open}>
        <div className="col">
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
              <span className="lbl">{l.label}</span>
              <span className="ix">0{i + 1}</span>
            </a>
          ))}
          <a href={hireMe.href} className="hire" onClick={() => setOpen(false)}>
            <span className="lbl">{hireMe.label}</span>
            <span className="ix">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
