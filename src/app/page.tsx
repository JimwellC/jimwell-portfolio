import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Craft from "@/components/Craft";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Experience />
      <Craft />
      <Footer />
    </main>
  );
}