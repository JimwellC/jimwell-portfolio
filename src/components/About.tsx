import Parallax from "./Parallax";

// Real content — there is no @/data/about source, so the bio/stats live here.
const stats: [string, string, boolean][] = [
  ["Status", "Open to work", true],
  ["Based in", "Angeles, Philippines", false],
  ["Focus", "Full-stack + mobile", false],
  ["Remote", "Yes, preferred", true],
  ["Education", "HAU · BS IT · 2026", false],
  ["Internship", "Compass Group · Microsoft", false],
];

const paragraphs = [
  "I graduated from Holy Angel University in early 2026 with a BS in Information Technology, specializing in Web Development. Before finishing school, I was already contributing to a real Microsoft project — the DiSH Dashboard for Compass Group at Microsoft's Redmond headquarters.",
  "Outside of software, I run a small side hustle buying and selling vintage clothes — which is what inspired Fad Fashiown. I understand the problem because I lived it.",
  "I'm exploring what's next: a team where the technical problems are hard, the product actually matters, and the people care about doing it right.",
];

export default function About() {
  return (
    <section id="about" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§02</span> About</div>
        <div className="panel">
          <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
          <div className="panel-tag">
            <span className="l"><span className="dot" /> SYS.02 · <b>PROFILE</b></span>
            <span className="r">ANGELES → REMOTE</span>
          </div>
          <div className="split">
            <div>
              <h2>I like building things where the <em>stakes are real.</em></h2>
              {paragraphs.map((p, i) => (
                <p key={i} className="body-p">{p}</p>
              ))}
            </div>
            <div className="stats">
              {stats.map(([k, v, acc]) => (
                <div key={k} className="stat">
                  <span className="sk">{k}</span>
                  <span className={`sv${acc ? " acc" : ""}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
