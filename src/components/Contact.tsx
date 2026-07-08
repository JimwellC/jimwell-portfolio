import Parallax from "./Parallax";

const links = [
  { label: "jimwellwork28@gmail.com", href: "mailto:jimwellwork28@gmail.com" },
  { label: "github ↗", href: "https://github.com/JimwellC" },
  { label: "linkedin ↗", href: "https://linkedin.com/in/jimwellcalma" },
  { label: "download cv ↓", href: "/Jimwell_Calma_CV.pdf" },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact">
        <Parallax className="col">
          {/* The one glass moment — a frosted panel over the page's cobalt wash. */}
          <div className="glass" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
            <div className="eyebrow"><span className="ix">§06</span> Contact</div>
            <h2>Let&apos;s build something that has to <em>work.</em></h2>
            <p className="body-p">
              Open to full-stack and mobile roles, remote preferred. If the problem is hard
              and the product matters, I want to hear about it.
            </p>
            <div className="contact-links">
              {links.map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </Parallax>
      </section>

      <footer className="foot">
        <div className="col">
          <span>© 2026 Jimwell Calma — Angeles, Philippines</span>
          <span>Built under pressure</span>
        </div>
      </footer>
    </>
  );
}
