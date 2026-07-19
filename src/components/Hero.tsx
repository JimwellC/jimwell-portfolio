"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HologramPortrait from "./three/HologramPortrait";

function useManilaClock() {
  const [time, setTime] = useState("—");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-PH", {
          timeZone: "Asia/Manila",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        }).format(new Date()) + " +08"
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Small oscilloscope readout — the "live signal" instrument detail. */
function MiniScope() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [lat, setLat] = useState("18 ms");
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = cv.width, H = cv.height;
    let t = 0, raf = 0;
    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--cobalt").trim() || "#1731D8";
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color();
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y =
          H / 2 + Math.sin(x * 0.05 + t) * 11 + Math.sin(x * 0.019 - t * 0.7) * 6 + (Math.random() - 0.5) * 2;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.12;
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    frame();
    const id = reduce ? undefined : setInterval(() => setLat(14 + Math.floor(Math.random() * 9) + " ms"), 1400);
    return () => { cancelAnimationFrame(raf); if (id) clearInterval(id); };
  }, []);
  return (
    <div className="scope">
      <canvas ref={ref} width={560} height={92} />
      <div className="cap"><span>ws · live signal</span><span>{lat}</span></div>
    </div>
  );
}

export default function Hero() {
  const time = useManilaClock();
  return (
    <div className="col">
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Full-stack &amp; mobile developer — Angeles, PH</div>
          <h1>
            I build systems that hold under&nbsp;<em>pressure.</em>
          </h1>
          <p className="lede">
            Real-time auction platforms. TikTok live-selling automation. Emergency apps
            for people who need them most — built while I was still in school. I care about{" "}
            <b>how things work under load</b>, not just how they look.
          </p>
          <div className="actions">
            <a href="#work" className="btn primary">See the work →</a>
            <a href="/Jimwell_Calma_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn ghost">↓ CV</a>
          </div>
        </div>

        <div className="card">
          <div className="portrait">
            <Image
              src="/images/jimwell-cut.png"
              alt="Jimwell Calma"
              width={400}
              height={430}
              sizes="(max-width: 900px) 320px, 300px"
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority
            />
            <HologramPortrait />
            <div className="band">
              <span className="nm">Jimwell Calma</span>
              <span className="st"><span className="dot" />Open to work</span>
            </div>
          </div>
          <div className="rail">
            <div className="row"><span className="k">Local — Manila</span><span className="v">{time}</span></div>
            <MiniScope />
            <div className="row">
              <span className="k">Now shipping</span>
              <a
                className="v acc ship"
                href="https://apps.apple.com/ph/app/aigos/id6787352080"
                target="_blank"
                rel="noopener noreferrer"
              >
                aigos · App Store <span className="arw">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
