import Link from "next/link";
import TiltCard from "./TiltCard";
import Parallax from "./Parallax";
import { projects } from "@/data/projects";

// Prefer a case study, then a live URL, then the repo — for the card's link.
function linkFor(p: (typeof projects)[number]) {
  if (p.caseStudy) return { href: p.caseStudy, label: "case study" };
  if (p.live) return { href: p.live, label: "live" };
  return { href: p.github, label: "github" };
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const total = String(projects.length).padStart(2, "0");
  const remaining = projects.length - featured.length;

  return (
    <section id="work" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§01</span> Selected work <span className="n">{total} projects</span></div>

        <div className="work-grid">
          {featured.map((p) => {
            const link = linkFor(p);
            return (
              <TiltCard key={p.slug} href={link.href || "#"} className="card3d">
                <div className="c3-head">
                  <span className="c3-num"><span className="dot" /> {p.num}</span>
                  <span className="c3-tag">{p.badge.style}</span>
                </div>
                <h3 className="c3-title">{p.name}</h3>
                <p className="c3-desc">{p.story}</p>
                <div className="c3-foot">
                  <span className="c3-tech">{p.tech.join(" · ")}</span>
                  <span className="c3-arrow">↗ {link.label}</span>
                </div>
              </TiltCard>
            );
          })}

          {/* Completes the grid and leads to the full archive. */}
          <Link href="/projects" className="work-more">
            <span className="big">{remaining > 0 ? `+${remaining} more` : "Full archive"}</span>
            <span className="sub">View all projects ↗</span>
          </Link>
        </div>
      </Parallax>
    </section>
  );
}
