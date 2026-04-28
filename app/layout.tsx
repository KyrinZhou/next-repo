import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, Geist } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
});

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Next.js Rendering Playbook",
  description: "用一张表和四个独立页面讲清 Next.js App Router 里的 CSR、SSR、SSG、ISR。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
      <body className={`${displayFont.variable} ${serifFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
