import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "第二大脑展示页",
  description: "与 Obsidian Vault 打通的个人知识与学习展示网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body>
        <Header />
        <main className="min-h-[calc(100vh-129px)]">{children}</main>
        <footer className="border-t border-border-default px-6 py-6 text-center text-sm text-text-tertiary">
          Synced from Obsidian Vault
        </footer>
      </body>
    </html>
  );
}
