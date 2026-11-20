import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--d-font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--d-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venture Forge",
  description: "Investing in innovation. Forging eternal impact.",
};

export default function DLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
