export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: "technical" | "course" | "award" | "webinar" | "seminar";
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
    date: "2025",
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
    date: "2025",
    category: "course",
    featured: true,
    image: "/certificates/nodejs-essential.jpg",
    color: "var(--green)",
    dot: "rgba(74,222,128,0.5)",
    href: "",
  },

  {
  id: "python",
  name: "Complete Python Course",
  issuer: "Udemy",
  date: "2024",
  category: "course",
  featured: true,
  image: "/certificates/phyton-complete.jpeg",
  color: "var(--a2)",
  dot: "rgba(99,102,241,0.5)",
  href: "",
},
{
  id: "cybersecurity-essentials",
  name: "Cybersecurity Essentials",
  issuer: "Cisco",
  date: "2024",
  category: "technical",
  featured: true,
  image: "/certificates/cybersecurity-essentials.jpg",
  color: "var(--cyan)",
  dot: "rgba(34,211,238,0.5)",
  href: "",
},
{
  id: "git-webinar",
  name: "Git and GitHub Webinar",
  issuer: "Holy Angel University",
  date: "2024",
  category: "webinar",
  featured: true,
  image: "/certificates/git-webinar.jpg",
  color: "var(--pink)",
  dot: "rgba(244,114,182,0.5)",
  href: "",
},
{
  id: "cg-seminar",
  name: "Tech Seminar",
  issuer: "Holy Angel University",
  date: "2024",
  category: "seminar",
  featured: true,
  image: "/certificates/CG-seminar1.jpg",
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
  webinar: {
    background: "rgba(244,114,182,0.08)",
    border: "0.5px solid rgba(244,114,182,0.2)",
    color: "var(--pink)",
  },
  seminar: {
    background: "rgba(74,222,128,0.08)",
    border: "0.5px solid rgba(74,222,128,0.2)",
    color: "var(--green)",
  },
};

export const categoryLabels: Record<string, string> = {
  technical: "Technical",
  course: "Course",
  award: "Award",
  webinar: "Webinar",
  seminar: "Seminar",
};