"use client";
import { useEffect, useState } from "react";

export type BootLine = { pfx?: string; text: string; dim?: boolean };

/**
 * Terminal boot-up: types each line in sequence with a blinking cursor.
 * Under prefers-reduced-motion it renders every line instantly.
 */
export function Boot({ lines }: { lines: BootLine[] }) {
  const [shown, setShown] = useState(0); // fully-typed lines
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(lines.length);
      setDone(true);
      return;
    }
    let li = 0, ci = 0, cancelled = false;
    let to: ReturnType<typeof setTimeout>;
    const step = () => {
      if (cancelled) return;
      if (li >= lines.length) { setDone(true); return; }
      const full = lines[li].text;
      if (ci <= full.length) {
        setTyped(full.slice(0, ci));
        ci += 2;
        to = setTimeout(step, 16);
      } else {
        setShown((s) => s + 1);
        li++; ci = 0; setTyped("");
        to = setTimeout(step, 180);
      }
    };
    step();
    return () => { cancelled = true; clearTimeout(to); };
  }, [lines]);

  const line = (l: BootLine, content: React.ReactNode, key: number) => (
    <div key={key} className={`ln${l.dim ? " dim" : ""}`}>
      {l.pfx && <span className="pfx">{l.pfx} </span>}
      {content}
    </div>
  );

  return (
    <div className="cs-boot">
      {lines.slice(0, shown).map((l, i) => line(l, l.text, i))}
      {!done && shown < lines.length &&
        line(lines[shown], <>{typed}<span className="cs-cursor" /></>, shown)}
      {done && (
        <div className="ln"><span className="pfx">›</span> <span className="cs-cursor" /></div>
      )}
    </div>
  );
}
