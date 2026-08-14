import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plexus Code | AI-Powered Software & Cybersecurity",
  description: "Secure by design. Scalable by default. High-performance software engineering, autonomous AI agents, and defensive cybersecurity architectures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-slate-100 selection:bg-cyber-cyan selection:text-black min-h-screen relative bg-grid-pattern">
        {/* Aura de resplandor superior */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
        {children}
      </body>
    </html>
  );
}