"use client";

const items = [
  { label:"React Native", sub:"mobile" }, { label:"NestJS", sub:"backend" },
  { label:"WebSockets", sub:"real-time" }, { label:"Flutter", sub:"cross-platform" },
  { label:"Redis", sub:"caching" }, { label:"Socket.IO", sub:"live data" },
  { label:"PostgreSQL", sub:"database" }, { label:"WCAG 2.1", sub:"accessibility" },
  { label:"TypeScript", sub:"language" }, { label:"Firebase", sub:"realtime db" },
  { label:"Node.js", sub:"runtime" }, { label:"Angular", sub:"frontend" },
];
const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div style={{ borderBottom:"0.5px solid var(--border)", background:"var(--s1)", overflow:"hidden", padding:"10px 0" }}>
      <div className="marquee-track" style={{ display:"flex", whiteSpace:"nowrap" }}>
        {doubled.map((item,i) => (
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:"6px",
            padding:"0 18px", fontSize:"11px",
            fontFamily:"var(--font-space-mono)", color:"var(--dim)"
          }}>
            <span>{item.label}</span>
            <span style={{ color:"var(--accent)", opacity:0.55, fontSize:"10px" }}>{item.sub}</span>
            <span style={{ marginLeft:"6px", color:"var(--dim)", opacity:0.4 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}