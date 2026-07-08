"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Interactive 3D tilt panel. Tracks the cursor to rotate the card in space and
 * drives a --gx/--gy glow position. Disabled under prefers-reduced-motion
 * (renders flat). Touch devices simply never fire mousemove, so they stay flat.
 */
export default function TiltCard({
  href,
  className = "",
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [reduce, setReduce] = useState(false);
  const [st, setSt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 7;
    setSt({ ry: (px - 0.5) * 2 * max, rx: -(py - 0.5) * 2 * max, gx: px * 100, gy: py * 100 });
    setActive(true);
  }
  function onLeave() {
    setActive(false);
    setSt((s) => ({ ...s, rx: 0, ry: 0 }));
  }

  const Tag = (href ? "a" : "div") as "a";
  return (
    <Tag
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          transform: `perspective(900px) rotateX(${st.rx}deg) rotateY(${st.ry}deg)`,
          transition: active ? "transform .08s ease-out" : "transform .5s cubic-bezier(.22,1,.36,1)",
          "--gx": `${st.gx}%`,
          "--gy": `${st.gy}%`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
