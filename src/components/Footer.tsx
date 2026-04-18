export default function Footer() {
  return (
    <footer style={{ width: "100%", padding: "32px 0" }}>
      <div className="col" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", fontStyle: "italic", color: "var(--dim)", maxWidth: "400px" }}>
          &ldquo;I want to work on things that are technically interesting and that actually matter.&rdquo;
        </span>
        <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--font-space-mono)" }}>
          © 2026 Jimwell Calma · Next.js
        </span>
      </div>
    </footer>
  );
}