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
    id: "compass-microsoft",
    role: "Software Engineer Intern",
    company: "Compass Group at Microsoft",
    location: "Redmond, WA",
    period: "2025",
    description:
      "Contributed to the design, testing, and deployment of the DiSH Dashboard — a Dining Service Health platform built for Microsoft's operations at their Redmond Global Headquarters in Washington, United States. 486 hours of OJT, Jun–Sep 2025.",
    highlight: "DiSH Dashboard",
    tags: ["DiSH Dashboard", "Microsoft HQ", "Redmond, WA"],
    certificates: [
      {
        id: "microsoft",
        src: "/certificates/microsoft-appreciation.png",
        alt: "Certificate of Appreciation — Microsoft Corporation & Compass Group at Microsoft",
        title: "Certificate of Appreciation — Microsoft Corporation",
        subtitle: "Compass Group at Microsoft · August 15, 2025 · Redmond, WA",
        icon: "microsoft",
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