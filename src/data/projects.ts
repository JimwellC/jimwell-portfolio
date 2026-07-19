export type Project = {
  slug: string;
  num: string;
  badge: { label: string; style: string };
  category: ("web" | "mobile" | "saas" | "thesis")[];
  featured: boolean;
  name: string;
  tagline: string;
  story: string;
  detail: string;
  tech: string[];
  keyTech: string[];
  images: string[];
  glow: string;
  glowHover: string;
  github: string;
  live: string;
  caseStudy?: string;
  containImage?: boolean;
};

export const projects: Project[] = [
  {
    slug: "auxtion",
    num: "01",
    badge: { label: "◐ in dev", style: "in dev" },
    category: ["mobile"],
    featured: true,
    name: "Auxtion",
    tagline: "Live auction marketplace for Filipinos",
    containImage: true,
    story:
      "Filipino sellers were running live auctions on Facebook and Instagram with zero infrastructure — manual bid tracking, payment disputes, no order management. I built Auxtion to give them a real platform: real-time bidding, atomic order creation, and integrated GCash/PayMongo payments — modeled on Whatnot, built for the Philippine market.",
    detail:
      "A React Native (Expo) app backed by a NestJS API using Socket.IO for real-time bidding and HMS/100ms for live video. Bids are atomic via Postgres row-level locks (SELECT…FOR UPDATE) to prevent double-sells, with Redis as a read-through cache. Payments run through PayMongo (card/GCash/QR Ph) via webhook-confirmed Payment Links, plus a manual GCash/bank transfer path.",
    tech: ["React Native", "NestJS", "Socket.IO", "PostgreSQL", "Redis", "PayMongo"],
    keyTech: ["Socket.IO", "PostgreSQL"],
    images: [
      "/projects/auxtion/AuxtionLogo.png",
    ],
    glow: "rgba(99,102,241,0.08)",
    glowHover: "rgba(99,102,241,0.14)",
    github: "",
    live: "",
    caseStudy: "/projects/auxtion",
  },
  {
    slug: "fad-fashiown",
    containImage: true,
    num: "02",
    badge: { label: "◆ saas", style: "saas" },
    category: ["web", "saas"],
    featured: false,
    name: "Fad Fashiown",
    tagline: "TikTok live selling automation",
    story:
      "Sellers on TikTok Live were drowning in comments. I built a SaaS that reads the stream, detects orders in real time, routes them to the right queue, and prints receipts automatically. What used to take 3 people now runs on its own.",
    detail:
      "Multi-tenant NestJS backend with per-client PostgreSQL schemas for data isolation. Comment parser runs a regex pipeline against TikTok's live comment feed. Thermal printer integration via ESC/POS protocol.",
    tech: ["NestJS", "Socket.IO", "PostgreSQL", "Redis"],
    keyTech: ["NestJS", "Socket.IO"],
    images: [
      "/projects/fad-fashiown/logo.jpg",
      "/projects/fad-fashiown/1.png",
      "/projects/fad-fashiown/2.png",
    ],
    glow: "rgba(34,211,238,0.06)",
    glowHover: "rgba(34,211,238,0.12)",
    github: "",
    live: "",
    caseStudy: "/projects/fad-fashiown",
  },
  {
    slug: "reachable",
    containImage: true,
    num: "03",
    badge: { label: "◈ capstone", style: "capstone" },
    category: ["mobile", "thesis"],
    featured: true,
    name: "ReachAble",
    tagline: "Accessible emergency communication for PWDs",
    story:
      "A research-driven accessibility product, built as our undergraduate capstone. Most emergency apps assume you can navigate menus and hit small targets under stress — ReachAble reduces that to a voice command or a single SOS, and still gets a located distress message out with no internet by falling back to SMS.",
    detail:
      "A cross-platform Flutter app on Firebase (Auth, Firestore, Storage). An emergency grabs the user's GPS, builds a distress message from their stored profile, and pushes it through Firebase — automatically falling back to SMS when connectivity drops so contacts still receive the alert. Accessibility-first: voice-triggered or one-tap SOS with minimal navigation.",
    tech: ["Flutter", "Firebase", "Cloud Firestore", "Google Maps", "Geolocator", "SMS"],
    keyTech: ["Flutter", "Firebase"],
    images: [
      "/projects/reachable/logo.png",
    ],
    glow: "rgba(244,114,182,0.06)",
    glowHover: "rgba(244,114,182,0.12)",
    github: "https://github.com/ReachAble-Team/ReachAble-App",
    live: "",
    caseStudy: "/projects/reachable",
  },
  {
    slug: "internproof",
    num: "04",
    badge: { label: "⬡ web3", style: "web3" },
    category: ["web"],
    featured: false,
    name: "InternProof",
    tagline: "Tamper-proof internship logbooks on Ethereum",
    containImage: true,
    story: "Started as a school requirement — then I kept going after graduation and polished it into a production-grade system. Paper OJT logbooks are easy to fake. InternProof puts every clock-in, task, and signature on Ethereum — verifiable by anyone, falsifiable by no one.",
    detail: "A UUPS upgradeable Solidity proxy on Ethereum Sepolia holds every log entry, role, and sign-off — the deployed bytecode sits at 23,531 / 24,576 bytes, 95.7% of Ethereum's hard contract-size limit. A Next.js 14 / TypeScript frontend talks to it via ethers.js v6 and MetaMask. Proof images live on IPFS (Pinata); only the CID is written on-chain. Certificates are generated client-side with jsPDF.",
    tech: ["Solidity", "Next.js", "ethers.js", "IPFS", "jsPDF", "TypeScript"],
    keyTech: ["Solidity", "ethers.js"],
    images: [
      "/projects/internproof/internproofLogo.png",
      "/projects/internproof/landing.png",
    ],
    glow: "rgba(245,158,11,0.06)",
    glowHover: "rgba(245,158,11,0.12)",
    github: "https://github.com/JimwellC/InternProof",
    live: "https://internproof.vercel.app",
    caseStudy: "/projects/internproof",
  },
  {
  slug: "fad-elan",
  num: "05",
  badge: { label: "◆ client", style: "client" },
  category: ["web"],
  featured: false,
  containImage: true,
  name: "Fad Élan",
  tagline: "Luxury pre-loved bag catalog, Philippines",
  story:
    "The client (@fadelan.26) was selling authentic luxury bags entirely through Instagram DMs — no catalog, no way to browse without already following. I built a browsable, filterable catalog that turns passive visitors into inquiries, plus a custom admin panel so she manages inventory without ever touching a CMS studio.",
  detail:
    "A Next.js 15 App Router site pulling bags and settings from Sanity CMS at request time (revalidate: 0, so availability is always fresh). A custom iron-session admin panel lets the client manage inventory, photos, and settings without touching Sanity Studio. Inquiry buttons build pre-filled deep links to Messenger and SMS, with a clipboard fallback for Instagram (which has no DM pre-fill API).",
  tech: ["Next.js 15", "TypeScript", "Sanity CMS", "Tailwind v4", "Vercel", "Resend"],
  keyTech: ["Next.js 15", "Sanity CMS"],
  images: [
    "/projects/fad-elan/logo.png",
    "/projects/fad-elan/homepage.png",
  ],
  glow: "rgba(168,85,247,0.06)",
  glowHover: "rgba(168,85,247,0.12)",
  github: "",
  live: "https://www.fadelan.com",
  caseStudy: "/projects/fad-elan",
},
  {
    slug: "aigos",
    num: "06",
    badge: { label: "● on the app store", style: "live" },
    category: ["mobile"],
    featured: true,
    containImage: true,
    name: "aigos",
    tagline: "Know your fuel cost before every trip",
    story:
      "Filipino drivers have no reliable way to estimate fuel costs before a trip — global apps ignore Philippine roads, fuel grades, and peso pricing. Every provincial drive is a guessing game of gas prices, traffic, and tolls. I built aigos to give a specific, honest answer in seconds — fully offline.",
    detail:
      "A fully offline iOS app (Swift 6 / SwiftUI). Every calculation runs on-device via a physics-based engine that stacks adjustment factors — speed, AC, road type, traffic, load, vehicle age, maintenance. Data persists locally with SwiftData (no backend, no auth), and a custom rule-based NLP parser answers English and Tagalog trip queries with no cloud AI. Apple MapKit is the only online dependency, and only for the optional map picker.",
    tech: ["Swift 6", "SwiftUI", "SwiftData", "MapKit", "XCTest", "Fastlane"],
    keyTech: ["Swift 6", "SwiftData"],
    images: [
      "/projects/aigos/app-icon-rounded.png",
    ],
    glow: "rgba(74,222,128,0.06)",
    glowHover: "rgba(74,222,128,0.12)",
    github: "",
    live: "https://apps.apple.com/ph/app/aigos/id6787352080",
    caseStudy: "/projects/aigos",
  },

  // ── ADD MORE PROJECTS BELOW ──────────────────────────────────────
  // {
  //   slug: "my-new-project",
  //   num: "04",
  //   badge: { label: "● web", style: "live" },
  //   category: ["web"],
  //   featured: false,          // won't show on home page
  //   name: "My New Project",
  //   tagline: "Short description",
  //   story: "Why you built it...",
  //   detail: "How you built it technically...",
  //   tech: ["React", "Node.js"],
  //   keyTech: ["React"],
  //   images: ["/projects/my-new-project/1.png"],
  //   glow: "rgba(34,211,238,0.06)",
  //   glowHover: "rgba(34,211,238,0.12)",
  //   github: "https://github.com/JimwellC/my-new-project",
  //   live: "",
  // },
];

export const badgeStyles: Record<string, React.CSSProperties> = {
  live:   { background: "rgba(74,222,128,0.08)",  border: "0.5px solid rgba(74,222,128,0.2)",  color: "var(--green)" },
  saas:   { background: "rgba(99,102,241,0.08)",  border: "0.5px solid rgba(99,102,241,0.2)",  color: "var(--a2)" },
  thesis: { background: "rgba(244,114,182,0.08)", border: "0.5px solid rgba(244,114,182,0.2)", color: "var(--pink)" },
  client: { background: "rgba(34,211,238,0.08)",  border: "0.5px solid rgba(34,211,238,0.2)",  color: "var(--cyan)" },
  web3:   { background: "rgba(245,158,11,0.08)",  border: "0.5px solid rgba(245,158,11,0.25)", color: "#f59e0b" },  // ← add this
};