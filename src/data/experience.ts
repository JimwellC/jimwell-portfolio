export type Certificate = {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  icon: "microsoft" | "default";
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
    id: "hooli-software",
    role: "Software Engineer Intern",
    company: "Hooli Software, Inc. · remote",
    location: "Remote · Philippines",
    period: "2025",
    description:
      "Contributed to the design, testing, and deployment of the DiSH Dashboard — a Dining Service Health platform built for Compass Group at Microsoft, serving Microsoft's dining operations at their Redmond headquarters. 486 hours of OJT, worked fully remote, Jun–Sep 2025.",
    highlight: "DiSH Dashboard",
    tags: ["DiSH Dashboard", "Compass Group at Microsoft", "Remote"],
    certificates: [
      {
        id: "microsoft",
        src: "/certificates/microsoft-appreciation.png",
        alt: "Certificate of Appreciation — Microsoft Corporation & Compass Group at Microsoft",
        title: "Certificate of Appreciation — Microsoft Corporation",
        subtitle: "Microsoft Corporation & Compass Group at Microsoft · August 15, 2025",
        icon: "microsoft",
      },
      {
        id: "hooli",
        src: "/certificates/hooli-completion.png",
        alt: "Certificate of Completion — Hooli Software, Inc.",
        title: "Certificate of Completion — Hooli Software, Inc.",
        subtitle: "486 hours OJT · Jun 23 – Sep 18, 2025 · Marilao, Bulacan",
        icon: "default",
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