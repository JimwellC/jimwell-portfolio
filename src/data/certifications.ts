export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: "technical" | "course" | "award";
  featured: boolean;
  image: string;
  color: string;
  dot: string;
  href?: string;
};

export const certifications: Certificate[] = [
  {
    id: "ccna",
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    date: "2024",
    category: "technical",
    featured: true,
    image: "/certificates/ccna.jpg",
    color: "var(--cyan)",
    dot: "rgba(34,211,238,0.5)",
    href: "",
  },
  {
    id: "react-essential",
    name: "React Essential Training",
    issuer: "LinkedIn Learning",
    date: "2024",
    category: "course",
    featured: true,
    image: "/certificates/react-essential.jpg",
    color: "var(--a2)",
    dot: "rgba(99,102,241,0.5)",
    href: "",
  },
  {
    id: "nodejs-essential",
    name: "Node.js Essential Training",
    issuer: "LinkedIn Learning",
    date: "2024",
    category: "course",
    featured: true,
    image: "/certificates/nodejs-essential.jpg",
    color: "var(--green)",
    dot: "rgba(74,222,128,0.5)",
    href: "",
  },
  // ── ADD MORE CERTIFICATES BELOW ──────────────────────────
  // {
  //   id: "my-cert",
  //   name: "Certificate Name",
  //   issuer: "Issuer",
  //   date: "2024",
  //   category: "technical",  // "technical" | "course" | "award"
  //   featured: false,        // true = shows on home page
  //   image: "/certificates/my-cert.jpg",
  //   color: "var(--pink)",
  //   dot: "rgba(244,114,182,0.5)",
  //   href: "",               // optional verify link
  // },
];

export const categoryStyles: Record<string, React.CSSProperties> = {
  technical: {
    background: "rgba(34,211,238,0.08)",
    border: "0.5px solid rgba(34,211,238,0.2)",
    color: "var(--cyan)",
  },
  course: {
    background: "rgba(99,102,241,0.08)",
    border: "0.5px solid rgba(99,102,241,0.2)",
    color: "var(--a2)",
  },
  award: {
    background: "rgba(250,204,21,0.08)",
    border: "0.5px solid rgba(250,204,21,0.2)",
    color: "#fbbf24",
  },
};

export const categoryLabels: Record<string, string> = {
  technical: "Technical",
  course: "Course",
  award: "Award",
};