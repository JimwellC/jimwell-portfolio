"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { HologramMaterial } from "./hologramMaterial";
import { useWebGLAllowed } from "./useWebGL";

// keep tree-shaking from dropping the side-effecting extend() call
void HologramMaterial;

const SRC = "/images/jimwell-cut.png"; // transparent-background cutout

function Plane() {
  const mat = useRef<THREE.ShaderMaterial & { uTime: number }>(null!);
  const { viewport } = useThree();
  const tex = useTexture(SRC);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  }, [tex]);

  useFrame((_, dt) => {
    if (mat.current) mat.current.uTime += dt;
  });

  // contain-fit the cutout inside the canvas so proportions are preserved
  const img = tex.image as { width: number; height: number } | undefined;
  const imgAspect = img ? img.width / img.height : 0.707;
  const vpAspect = viewport.width / viewport.height;
  const w = vpAspect > imgAspect ? viewport.height * imgAspect : viewport.width;
  const h = vpAspect > imgAspect ? viewport.height : viewport.width / imgAspect;

  return (
    <mesh scale={[w, h, 1]}>
      <planeGeometry args={[1, 1]} />
      <hologramMaterial ref={mat} uTex={tex} transparent depthWrite={false} />
    </mesh>
  );
}

/**
 * True floating hologram: a transparent-cutout portrait rendered through the
 * hologram shader, with a subtle bloom so bright edges glow against the dark
 * card. Desktop / non-reduced-motion only — the static <Image> is the fallback.
 */
export default function HologramPortrait() {
  const on = useWebGLAllowed();
  if (!on) return null;

  return (
    <div className="holo" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
