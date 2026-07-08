import Parallax from "./Parallax";
import { experiences } from "@/data/experience";
import { Fragment } from "react";

// Bold the `highlight` phrase where it appears in the description.
function withHighlight(desc: string, highlight?: string) {
  if (!highlight || !desc.includes(highlight)) return desc;
  return desc.split(highlight).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <b>{highlight}</b>}
      {part}
    </Fragment>
  ));
}

export default function Experience() {
  const location = experiences[0]?.location ?? "";
  return (
    <section id="experience" className="section">
      <Parallax className="col">
        <div className="eyebrow"><span className="ix">§03</span> Experience</div>
        <div className="panel">
          <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
          <div className="panel-tag">
            <span className="l"><span className="dot" /> SYS.03 · <b>SERVICE RECORD</b></span>
            <span className="r">{location.toUpperCase()}</span>
          </div>

          {experiences.map((xp) => (
            <div className="xp" key={xp.id}>
              <div className="when">{xp.period} —<br />{xp.location}</div>
              <div>
                <h3 className="role">{xp.role}</h3>
                <div className="org">{xp.company}</div>
                <p className="desc">{withHighlight(xp.description, xp.highlight)}</p>
                <div className="chips">
                  {xp.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Parallax>
    </section>
  );
}
