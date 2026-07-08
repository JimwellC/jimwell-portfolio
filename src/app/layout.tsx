import type { Metadata } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvas from "@/components/three/GlobalCanvas";

// Editorial display face — high-contrast serif, used with restraint for headlines.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Utility / data face — used for eyebrows, labels, and instrument readouts.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jimwell Calma — Full Stack & Mobile Developer",
  description:
    "Full Stack and Mobile Developer specializing in real-time systems, scalable SaaS platforms, and cross-platform apps. Based in Angeles, Philippines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceMono.variable}`}>
      <body>
        <GlobalCanvas />
        {children}
      </body>
    </html>
  );
}
