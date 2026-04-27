import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
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
    <html lang="zh-CN">
      <body className={`${displayFont.variable} ${serifFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
