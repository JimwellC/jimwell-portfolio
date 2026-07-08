"use client";
import { useEffect, useRef } from "react";

/**
 * Spatial parallax: glides its content vertically as it passes through the
 * viewport, so the foreground moves at a slightly different rate than the
 * fixed particle void behind it. Symmetric mapping means a section centered
 * in the viewport sits at y≈0 (no load-time jump).
 *
 * Driven by a passive scroll listener throttled to requestAnimationFrame
 * (GPU translate3d), which is lighter and more reliable here than a scroll
 * MotionValue. Progressive enhancement: under prefers-reduced-motion it never
 * attaches and renders a plain, untransformed div.
 */
export default function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as the element enters (top at viewport bottom) → 1 as it exits (bottom at top)
      const progress = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      const y = distance - progress * distance * 2; // +distance → −distance
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
