// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#06090f",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Plexus Code",
    default: "Plexus Code | Software B2B & Inteligencia Artificial",
  },
  description: "Ingeniería de Software a la medida, Sistemas Multiagente (MAS) e Inteligencia Artificial para operaciones críticas B2B.",
  keywords: "SaaS, MAS, B2B, Inteligencia Artificial, Agentes Autónomos, Software a la medida, Plexus Code",
  authors: [{ name: "Plexus Code" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://plexuscode.com',
    title: 'Plexus Code | Software B2B & Inteligencia Artificial',
    description: 'Ingeniería de Software a la medida, Sistemas Multiagente (MAS) e Inteligencia Artificial para operaciones críticas B2B.',
    siteName: 'Plexus Code',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Plexus Code - Software Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plexus Code | Software B2B & Inteligencia Artificial',
    description: 'Ingeniería de Software a la medida, Sistemas Multiagente (MAS) e Inteligencia Artificial para operaciones críticas B2B.',
    images: ['https://plexuscode.com/og-image.png'],
  },
  icons: {
    icon: [{ url: "/logo.png", href: "/logo.png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL('https://plexuscode.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Plexus Code",
    "url": "https://plexuscode.com",
    "email": "contact@plexuscode.com",
    "sameAs": [
      "https://www.linkedin.com/company/plexus-code/"
    ]
  };

  return (
    <html className="dark">
      <head>
        {/* Google Site Verification - placeholder for actual verification code */}
        <meta name="google-site-verification" content="google_site_verification_code_here" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[#06090f] text-slate-100 selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}