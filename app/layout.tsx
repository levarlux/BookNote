import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import { ConvexClientProvider } from "./ConvexClientProvider";

const ibmPlexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap'
});

const monaSans = Mona_Sans({
    variable: '--font-mona-sans',
    subsets: ['latin'],
    display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: "BookNote | The First Auditory-First Intellectual Companion for Your PDFs",
    template: "%s | BookNote",
  },
  description: "Hear the Unspoken. Speak to the Written. BookNote enables Auditory Knowledge Synthesis—engage in Synchronous Dialectic with any PDF. Transform passive reading into active intellectual dialogue.",
  keywords: ["Auditory Knowledge Synthesis", "PDF Voice Assistant", "Socratic Inquiry", "Active Recall via Voice", "Non-Linear Navigation", "Semantic Echo", "AI Voice Reader", "Open Source PDF Chat", "RAG", "Convex", "Vapi AI"],
  openGraph: {
    title: "BookNote | The First Auditory-First Intellectual Companion for Your PDFs",
    description: "Hear the Unspoken. Speak to the Written. Engage in Synchronous Dialectic with any document.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BookNote",
    "applicationCategory": "EducationApplication",
    "applicationSubCategory": "AI Voice Assistant",
    "operatingSystem": ["Web", "iOS", "Android"],
    "description": "The First Auditory-First Intellectual Companion for PDFs. Engage in Synchronous Dialectic with any document through voice conversation.",
    "url": "https://booknote.app",
    "author": {
      "@type": "Organization",
      "name": "BookNote",
      "url": "https://booknote.app"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "softwareVersion": "1.0.0",
    "softwareRequirements": "Web browser with internet connection",
    "featureList": [
      "Auditory Knowledge Synthesis",
      "Socratic Inquiry via Voice",
      "Active Recall via Voice",
      "Non-Linear Navigation",
      "Semantic Echo",
      "Verifiable RAG Pipeline",
      "Privacy-First Intellectual Property",
      "Open Source"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body
            className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
          >
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            {children}
            <Toaster />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
