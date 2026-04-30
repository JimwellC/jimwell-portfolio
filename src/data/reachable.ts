export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
  images: CaseStudyImage[];
};

// ── ADD IMAGES HERE ──────────────────────────────────────
export const caseStudySections: CaseStudySection[] = [
  {
    id: "ui",
    title: "UI Showcase",
    images: [
      { src: "/projects/reachable/1.png", alt: "ReachAble home screen", caption: "Home screen" },
      { src: "/projects/reachable/2.png", alt: "Emergency trigger", caption: "Emergency trigger" },
      // add more: { src: "/projects/reachable/3.png", alt: "...", caption: "..." },
    ],
  },
  {
    id: "flow",
    title: "User Flow",
    images: [
      // { src: "/projects/reachable/flow-1.png", alt: "Onboarding flow" },
      // { src: "/projects/reachable/flow-2.png", alt: "Emergency flow" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    images: [
      // { src: "/projects/reachable/arch.png", alt: "System architecture diagram" },
    ],
  },
];

// ── FLAT LIST — for lightbox navigation across all sections ──
export const allImages: CaseStudyImage[] = caseStudySections.flatMap(s => s.images);