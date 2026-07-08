const links = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "ask ai", href: "#ask" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="topbar">
      <div className="col">
        <div className="brand">
          <span className="mark">
            Jimwell <em>Calma</em>
          </span>
          <span className="sub">Realtime · Mobile</span>
        </div>
        <nav className="navlinks">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={l.label === "contact" ? "" : "hide-sm"}>
              {l.label}
            </a>
          ))}
          <a href="mailto:jimwellwork28@gmail.com" style={{ color: "var(--cobalt-ink)", borderBottom: "1px solid var(--cobalt-ink)" }}>
            hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
