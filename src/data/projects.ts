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
    badge: { label: "● live", style: "live" },
    category: ["mobile"],
    featured: true,
    name: "Auxtion",
    tagline: "Live auction marketplace",
    containImage: true,
    story:
      "Built a live auction marketplace because existing platforms couldn't handle the latency demands of real-time bidding. The hard part wasn't the bidding — it was making sure two people placing a bid at the exact same millisecond didn't both win.",
    detail:
      "Engineered a WebSocket-first architecture with Redis pub/sub to fan out bid events to all connected clients in under 10ms. The auction timer uses server-authoritative state to prevent client-side manipulation.",
    tech: ["WebSockets", "Redis", "React Native", "Node.js"],
    keyTech: ["WebSockets", "Redis"],
    images: [
      "/projects/auxtion/AuxtionLogo.png",
    ],
    glow: "rgba(99,102,241,0.08)",
    glowHover: "rgba(99,102,241,0.14)",
    github: "https://github.com/JimwellC",
    live: "",
    caseStudy: "/projects/auxtion",
  },
  {
    slug: "fad-fashiown",
    num: "02",
    badge: { label: "◆ saas", style: "saas" },
    category: ["web", "saas"],
    featured: true,
    name: "Fad Fashiown",
    tagline: "TikTok live selling automation",
    story:
      "Sellers on TikTok Live were drowning in comments. I built a SaaS that reads the stream, detects orders in real time, routes them to the right queue, and prints receipts automatically. What used to take 3 people now runs on its own.",
    detail:
      "Multi-tenant NestJS backend with per-client PostgreSQL schemas for data isolation. Comment parser runs a regex pipeline against TikTok's live comment feed. Thermal printer integration via ESC/POS protocol.",
    tech: ["NestJS", "Socket.IO", "PostgreSQL", "Redis"],
    keyTech: ["NestJS", "Socket.IO"],
    images: [
      "/projects/fad-fashiown/1.png",
      "/projects/fad-fashiown/2.png",
    ],
    glow: "rgba(34,211,238,0.06)",
    glowHover: "rgba(34,211,238,0.12)",
    github: "https://github.com/JimwellC/fad-fashiown-system",
    live: "",
  },
  {
    slug: "reachable",
    num: "03",
    badge: { label: "◈ thesis", style: "thesis" },
    category: ["mobile", "thesis"],
    featured: true,
    name: "ReachAble",
    tagline: "Emergency communication app for PWDs",
    story:
      "Our thesis project — an emergency communication app for persons with disabilities. Built so that in the moments that matter most, the app gets out of the way and just works. Voice commands, gesture recognition, and real-time GPS tracking.",
    detail:
      "Flutter cross-platform app with voice command input, gesture-based navigation, and real-time GPS location sharing via Firebase. Designed with accessibility-first thinking for users who can't rely on standard touch.",
    tech: ["Flutter", "Firebase", "GPS APIs", "Voice Commands"],
    keyTech: ["Flutter", "Firebase"],
    images: [
      "/projects/reachable/logo.png",
    ],
    glow: "rgba(244,114,182,0.06)",
    glowHover: "rgba(244,114,182,0.12)",
    github: "https://github.com/JimwellC",
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
    tagline: "Blockchain-verified OJT logbook system",
    containImage: true,                              // ← add this
    story: "Started as a school requirement — then I kept going after graduation and polished it into a production-grade system. Paper OJT logbooks are easy to fake. InternProof puts every clock-in, task, and signature on Ethereum — verifiable by anyone, falsifiable by no one.",
    detail: "Deployed a UUPS upgradeable Solidity smart contract at 23,531 / 24,576 bytes — engineered to stay under Ethereum's hard size limit. IPFS proof images via Pinata, CID stored permanently on-chain. Four role types with on-chain access control: Student, Supervisor, Coordinator, Admin. PDF certificates generated client-side with jsPDF.",
    tech: ["Solidity", "Next.js", "ethers.js", "Hardhat", "IPFS", "TypeScript"],
    keyTech: ["Solidity", "ethers.js"],
    images: [
      "/projects/internproof/internproofLogo.png",              // ← logo first
      "/projects/internproof/landing.png",
    ],
    glow: "rgba(245,158,11,0.06)",
    glowHover: "rgba(245,158,11,0.12)",
    github: "https://github.com/JimwellC",
    live: "https://internproof.vercel.app",
    caseStudy: "/projects/internproof",
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