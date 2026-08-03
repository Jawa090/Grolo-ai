import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grolo — AI Business Growth Platform",
  description: "Enterprise local visibility, Google Business performance and local SEO automation dashboard.",
  keywords: ["AI Growth", "Local SEO", "Google Business Profile", "SEO Rankings", "Enterprise SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#111827] font-sans">
        {children}
      </body>
    </html>
  );
}
