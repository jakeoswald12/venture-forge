import type { Metadata } from "next";
import { DM_Mono, Figtree, Outfit } from "next/font/google";

const sans = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--e-sans", display: "swap" });
const geom = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--e-geom", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--e-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Venture Forge",
  description: "Investing in innovation. Forging eternal impact.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${geom.variable} ${mono.variable}`}>{children}</div>;
}
