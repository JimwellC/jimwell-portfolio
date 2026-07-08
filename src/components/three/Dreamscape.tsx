"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A soft radial sprite so points render as feathered circles (dust motes),
 * not hard squares. White so the material's --cobalt color tints it.
 */
function softSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.18, "rgba(255,255,255,0.35)");
  g.addColorStop(0.5, "rgba(255,255,255,0.08)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Ambient dust field behind the whole page: tiny, dim, soft-edged cobalt motes
 * drifting deep in the background. Additive blending (safe now that the site is
 * dark-locked) gives a faint glow rather than solid dots.
 */
export default function Dreamscape({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18;
      a[i * 3 + 1] = (Math.random() - 0.5) * 11;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4; // pushed deeper
    }
    return a;
  }, [count]);

  const sprite = useMemo(softSprite, []);
  const color = useMemo(() => {
    const c = getComputedStyle(document.documentElement).getPropertyValue("--cobalt").trim();
    return new THREE.Color(c || "#6e80ff");
  }, []);

  useFrame((state, dt) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.012;
    const tx = state.pointer.x * 0.28;
    const ry = -state.pointer.y * 0.1;
    p.position.x += (tx - p.position.x) * 0.03;
    p.rotation.x += (ry - p.rotation.x) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
