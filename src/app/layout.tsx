import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";
import { CookieConsent } from "@/components/cookie-consent";
import { JsonLd } from "@/components/json-ld";
import { clinicSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Стоматология 3D plus — клиника в Ульяновске",
    template: "%s — стоматология 3D plus",
  },
  description: site.description,
  applicationName: "Стоматология 3D plus",
  authors: [{ name: "Стоматология 3D plus" }],
  creator: "Стоматология 3D plus",
  publisher: "Стоматология 3D plus",
  category: "health",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: "Стоматология 3D plus",
    title: "Стоматология 3D plus — клиника в Ульяновске",
    description:
      "Забота о здоровье зубов в 3D plus: терапия, хирургия, ортопедия, имплантация, эстетика и гигиена.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Стоматология 3D plus в Ульяновске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Стоматология 3D plus — клиника в Ульяновске",
    description:
      "Забота о здоровье зубов в 3D plus: терапия, хирургия, ортопедия, имплантация, эстетика и гигиена.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: "3D plus",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#08211f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${unbounded.variable}`}
    >
      <body className="min-h-screen bg-paper pb-[70px] text-ink lg:pb-0">
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <MobileCta />
        <CookieConsent />
        <JsonLd data={[websiteSchema, clinicSchema]} />
      </body>
    </html>
  );
}
