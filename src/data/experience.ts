export type Certificate = {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  icon: "microsoft" | "hooli" | "default";
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlight: string; // the bold word in description
  tags: string[];
  certificates: Certificate[];
};

export const experiences: Experience[] = [
  {
    id: "hooli-microsoft",
    role: "Software Engineer Intern",
    company: "Hooli Software · Compass Group at Microsoft",
    location: "Redmond, WA",
    period: "2025",
    description:
      "Contributed to the design, testing, and deployment of the DiSH Dashboard — a Dining Service Health platform built for Microsoft's operations at their Redmond Global Headquarters in Washington, United States.",
    highlight: "DiSH Dashboard",
    tags: ["DiSH Dashboard", "Microsoft HQ", "Redmond, WA"],
    certificates: [
      {
        id: "microsoft",
        src: "/certificates/microsoft-appreciation.png",
        alt: "Certificate of Appreciation — Microsoft Corporation",
        title: "Certificate of Appreciation — Microsoft Corporation",
        subtitle: "Compass Group at Microsoft · August 15, 2025 · Redmond, WA",
        icon: "microsoft",
      },
      {
        id: "hooli",
        src: "/certificates/hooli-completion.png",
        alt: "Certificate of Completion — Hooli Software",
        title: "Certificate of Completion — Hooli Software, Inc.",
        subtitle: "486 hours OJT · Jun 23, 2025 to Sep 18, 2025 · Marilao, Bulacan",
        icon: "hooli",
      },
    ],
  },
  // ── ADD MORE EXPERIENCES BELOW ───────────────────────────
  // {
  //   id: "next-company",
  //   role: "Full Stack Developer",
  //   company: "Company Name",
  //   location: "Remote",
  //   period: "2026",
  //   description: "What you did...",
  //   highlight: "key project name",
  //   tags: ["Tag1", "Tag2", "Tag3"],
  //   certificates: [],
  // },
];