export type InternProofImage = {
  src: string;
  label: string;
  desc: string;
};

export const internproofImages: InternProofImage[] = [
  {
    src: "/projects/internproof/internproofLogo.png",         // ← add this first
    label: "InternProof",
    desc: "Blockchain-verified OJT logbook system on Ethereum Sepolia.",
  },
  {
    src: "/projects/internproof/landing.png",
    label: "Landing Page",
    desc: "Public landing page with live contract specs and verification flow.",
  },
  {
    src: "/projects/internproof/student.png",
    label: "Student Dashboard",
    desc: "Clock in/out on-chain, view log history, track verified hours, download certificate.",
  },
  {
    src: "/projects/internproof/supervisor.png",
    label: "Supervisor Dashboard",
    desc: "Verify or reject log entries, view IPFS proof images, issue final sign-off.",
  },
  {
    src: "/projects/internproof/coordinator.png",
    label: "Coordinator Dashboard",
    desc: "Confirm OJT completion after supervisor sign-off, track all students under the school.",
  },
  {
    src: "/projects/internproof/admin.png",
    label: "Admin Dashboard",
    desc: "Register schools, courses, companies. Approve or revoke supervisor registrations.",
  },
  {
    src: "/projects/internproof/verify.png",
    label: "Public Verify",
    desc: "Anyone can verify a graduate's OJT record by wallet address or student ID — no account needed.",
  },
];