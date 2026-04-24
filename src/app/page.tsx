import Nav            from "@/components/Nav";
import Hero           from "@/components/Hero";
import Marquee        from "@/components/Marquee";
import Projects       from "@/components/Projects";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Craft          from "@/components/Craft";
import AiChat         from "@/components/AiChat";
import Elsewhere      from "@/components/Elsewhere";
import Footer         from "@/components/Footer";
import ScrollReveal   from "@/components/ScrollReveal";
import ScrollToTop    from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Marquee />
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal delay={0.05}><About /></ScrollReveal>
      <ScrollReveal delay={0.05}><Experience /></ScrollReveal>
      <ScrollReveal delay={0.05}><Certifications /></ScrollReveal>
      <ScrollReveal delay={0.05}><Craft /></ScrollReveal>
      <ScrollReveal delay={0.05}><AiChat /></ScrollReveal>
      <ScrollReveal delay={0.05}><Elsewhere /></ScrollReveal>
      <Footer />

      {/* Fixed — outside scroll flow */}
      <ScrollToTop />
    </main>
  );
}