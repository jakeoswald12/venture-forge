import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { brand } from "@/lib/content";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-c", display: "swap" });

export const metadata: Metadata = {
  title: brand.name,
  description: brand.tagline,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={figtree.variable}>{children}</div>;
}
