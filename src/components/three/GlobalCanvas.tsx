"use client";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Dreamscape from "./Dreamscape";
import { useWebGLAllowed } from "./useWebGL";

/**
 * Site-wide particle void. Fixed behind the entire page (z-index -10) so the
 * dreamscape floats seamlessly behind every section as you scroll. A subtle
 * Bloom pass gives the particles a soft, ethereal glow. Rendered once at the
 * app root; desktop / non-reduced-motion only.
 */
export default function GlobalCanvas() {
  const on = useWebGLAllowed();
  if (!on) return null;

  return (
    <div className="global-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Dreamscape count={2600} />
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.3} luminanceSmoothing={0.6} radius={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
