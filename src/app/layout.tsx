import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

// Editorial display serif — headlines and italic accent words only.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.category}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "inquiry system",
    "lead qualification",
    "lead tracking",
    "follow-up system",
    "Nepal",
  ],
  authors: [{ name: site.name }],
  // Static assets from /public (no dynamic image/icon routes).
  icons: {
    icon: "/avenor_filter_a_square.svg",
    shortcut: "/avenor_filter_a_square.svg",
    apple: "/avenor_filter_a_square.svg",
  },
  openGraph: {
    type: "website",
    title: `${site.name} · ${site.category}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.category}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#8B41FB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
