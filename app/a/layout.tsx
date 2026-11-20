import type { Metadata } from "next";
import { Gilda_Display, Hanken_Grotesk, Syncopate } from "next/font/google";

const display = Gilda_Display({ weight: "400", subsets: ["latin"], variable: "--a-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--a-body", display: "swap" });
const tag = Syncopate({ weight: ["400", "700"], subsets: ["latin"], variable: "--a-tag", display: "swap" });

export const metadata: Metadata = {
  title: "Venture Forge",
  description: "Investing in innovation. Forging eternal impact.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} ${tag.variable}`}>{children}</div>;
}
