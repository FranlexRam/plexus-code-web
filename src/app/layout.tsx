// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plexus Code | AI-Powered Software & Defensive Cybersecurity",
  description: "High-performance web platforms, autonomous AI agents, and AppSec defensive architectures.",
  icons: {
    icon: [
      { url: "/logo.png", href: "/logo.png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#06090f] text-slate-100 antialiased selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}