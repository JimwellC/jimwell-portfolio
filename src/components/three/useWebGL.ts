"use client";
import { useEffect, useState } from "react";

/**
 * Shared progressive-enhancement gate for every WebGL layer.
 * Returns true only on capable machines: no reduced-motion preference,
 * a fine pointer, and a large-enough viewport. Starts false so nothing
 * WebGL renders during SSR or the first paint — the static/2D fallback
 * shows until this flips on the client.
 */
export function useWebGLAllowed() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limited = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    setOk(!reduce && !limited);
  }, []);
  return ok;
}
