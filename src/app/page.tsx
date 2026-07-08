import Nav            from "@/components/Nav";
import Hero           from "@/components/Hero";
import Work           from "@/components/Work";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Certifications from "@/components/Certifications";
import AiConsole      from "@/components/AiConsole";
import Contact        from "@/components/Contact";
import Reveal         from "@/components/Reveal";

// ── "Under Pressure" redesign ────────────────────────────────
// The hero's WebGL is scoped inside <Hero> — sections below scroll
// normally over the page's cobalt wash. Data in the sections is mocked;
// AiConsole runs on local canned replies (single API seam in getReply()).
// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Reveal><Work /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Certifications /></Reveal>
      <Reveal><AiConsole /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}
