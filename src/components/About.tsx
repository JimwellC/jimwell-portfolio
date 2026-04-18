"use client";

export default function Experience() {
  return (
    <section style={{ width: "100%", padding: "64px 0", borderBottom: "0.5px solid var(--border)" }}>
      <div className="col">
        <div className="eyebrow">Experience</div>
        <div style={{
          display: "grid", gridTemplateColumns: "20px 1fr auto",
          gap: "24px", padding: "28px", borderRadius: "16px",
          background: "var(--s1)", border: "0.5px solid var(--border)",
          alignItems: "start",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,var(--accent),var(--cyan))" }}/>
            <div style={{ width: "1px", flex: 1, marginTop: "8px", background: "linear-gradient(var(--border2),transparent)", minHeight: "40px" }}/>
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#eaecf6", marginBottom: "4px" }}>Software Engineer Intern</h3>
            <p style={{ fontSize: "11px", color: "var(--a2)", fontFamily: "var(--font-space-mono)", marginBottom: "14px" }}>
              Hooli Software · Microsoft Project
            </p>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7 }}>
              Tasked with making a Microsoft mobile app actually accessible — on iOS and macOS, where Apple&apos;s
              own VoiceOver engine is the harshest judge. Learned that good accessibility isn&apos;t a checklist;
              it&apos;s a different way of thinking about UX entirely. Shipped features that passed Microsoft&apos;s own compliance review.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <span style={{
              fontSize: "10px", padding: "3px 10px", borderRadius: "6px",
              background: "var(--s2)", border: "0.5px solid var(--border)",
              color: "var(--dim)", fontFamily: "var(--font-space-mono)",
            }}>2024</span>
            {["iOS / macOS","WCAG 2.1","VoiceOver"].map(t => (
              <span key={t} style={{
                fontSize: "10px", padding: "2px 8px", borderRadius: "6px",
                background: "rgba(99,102,241,0.07)", border: "0.5px solid rgba(99,102,241,0.22)",
                color: "var(--a2)", fontFamily: "var(--font-space-mono)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}