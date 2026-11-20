import type { Metadata } from "next";
import { Cardo, Hanken_Grotesk } from "next/font/google";
import styles from "./page.module.css";

const cardo = Cardo({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cardo", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  title: "Venture Forge",
  description: "Investing in innovation. Forging eternal impact.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${cardo.variable} ${hanken.variable} ${styles.root}`}>{children}</div>;
}
