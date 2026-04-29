import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = "https://wrapstyle.co";
const siteName = "Wrapstyle";
const siteTitle = "Wrapstyle | Luxury Gift Wrapping, Hampers & Bespoke Gifting";
const siteDescription =
  "Wrapstyle is a Mumbai gifting atelier creating bespoke gift wrapping, curated hampers, wedding gifting, festive collections, and corporate gifting experiences.";
const seoKeywords = [
  "Wrapstyle",
  "luxury gift wrapping",
  "bespoke gifting",
  "curated hampers",
  "corporate gifting",
  "wedding gifting",
  "festive hampers",
  "Diwali gifts",
  "premium gift boxes",
  "Mumbai gifting atelier",
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "lifestyle",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/logo2.png",
        alt: "Wrapstyle logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo2.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo2.png`,
  description: siteDescription,
  email: "hello@wrapstyle.co",
  telephone: "+91 98215 50199",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atelier 14, Bandra West",
    addressLocality: "Mumbai",
    postalCode: "400050",
    addressCountry: "IN",
  },
  areaServed: "India",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
