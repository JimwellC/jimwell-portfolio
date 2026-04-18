"use client";

export default function Experience() {
  return (
    <section className="section">
      <div className="col">
        <div className="eyebrow">Experience</div>
        <div style={{
          display:"grid", gridTemplateColumns:"24px 1fr auto",
          gap:"20px", padding:"22px", borderRadius:"16px",
          background:"var(--s1)", border:"0.5px solid var(--border)"
        }}>
          {/* timeline dot */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"3px" }}>
            <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"linear-gradient(135deg,var(--accent),var(--cyan))", flexShrink:0 }}/>
            <div style={{ width:"1px", flex:1, marginTop:"6px", background:"linear-gradient(var(--border2),transparent)" }}/>
          </div>

          {/* body */}
          <div>
            <h3 style={{ fontSize:"15px", fontWeight:600, color:"#eaecf6", marginBottom:"3px" }}>Software Engineer Intern</h3>
            <p style={{ fontSize:"11px", color:"var(--a2)", fontFamily:"var(--font-space-mono)", marginBottom:"12px" }}>
              Hooli Software · Microsoft Project
            </p>
            <p style={{ fontSize:"13px", color:"var(--muted)", lineHeight:1.68 }}>
              Tasked with making a Microsoft mobile app actually accessible — on iOS and macOS, where Apple&apos;s
              own VoiceOver engine is the harshest judge. Learned that good accessibility isn&apos;t a checklist;
              it&apos;s a different way of thinking about UX entirely. Shipped features that passed Microsoft&apos;s own compliance review.
            </p>
          </div>

          {/* right */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"6px" }}>
            <span style={{
              fontSize:"10px", padding:"3px 10px", borderRadius:"6px", fontFamily:"var(--font-space-mono)",
              background:"var(--s2)", border:"0.5px solid var(--border)", color:"var(--dim)"
            }}>2024</span>
            {["iOS / macOS","WCAG 2.1","VoiceOver"].map(t => (
              <span key={t} style={{
                fontSize:"10px", padding:"2px 8px", borderRadius:"6px", fontFamily:"var(--font-space-mono)",
                background:"rgba(99,102,241,0.07)", border:"0.5px solid rgba(99,102,241,0.22)", color:"var(--a2)"
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}