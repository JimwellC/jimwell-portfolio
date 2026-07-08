"use client";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";

/**
 * Holographic portrait shader.
 * Effects: chromatic aberration (RGB split), horizontal scanlines, a slow
 * vertical scan-sweep, flicker, a cobalt tint, and luminance-driven
 * translucency with a soft vignette so the edges dissolve.
 */
export const HologramMaterial = shaderMaterial(
  {
    uTime: 0,
    uTex: null as THREE.Texture | null,
    uColor: new THREE.Color("#8a99ff"),
    uAberration: 0.006,
  },
  // vertex
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z += sin(p.y * 12.0 + uTime * 2.0) * 0.012; // subtle holographic wobble
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  // fragment
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTex;
    uniform vec3 uColor;
    uniform float uAberration;

    void main() {
      // chromatic aberration — split channels horizontally
      vec4 sr = texture2D(uTex, vUv + vec2(uAberration, 0.0));
      vec4 sg = texture2D(uTex, vUv);
      vec4 sb = texture2D(uTex, vUv - vec2(uAberration, 0.0));
      vec3 col = vec3(sr.r, sg.g, sb.b);

      // subject mask from the cutout's alpha — the transparent background stays gone
      float mask = min(min(sr.a, sg.a), sb.a);

      float lum = dot(col, vec3(0.299, 0.587, 0.114));

      float scan  = sin((vUv.y * 700.0) - uTime * 8.0) * 0.06;      // fine scanlines
      float sweep = smoothstep(0.0, 0.03, abs(fract(vUv.y - uTime * 0.08) - 0.5)); // moving band
      float flick = 0.92 + 0.08 * sin(uTime * 40.0);                // flicker

      col += scan;
      col = mix(col, uColor, 0.25);          // tint toward cobalt
      col *= flick * (0.7 + 0.5 * sweep);
      col += uColor * 0.35 * mask;           // emissive lift so bright edges bloom

      float edge  = smoothstep(0.5, 0.05, distance(vUv, vec2(0.5))); // soft vignette
      float alpha = (0.5 + 0.5 * lum) * edge * mask;                 // gated by subject

      // zero color outside the subject so bloom can't glow the empty plane
      gl_FragColor = vec4(col * mask, alpha);
    }
  `
);

extend({ HologramMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    hologramMaterial: ThreeElement<typeof HologramMaterial>;
  }
}
