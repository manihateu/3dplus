import type { Metadata, Viewport } from "next";
import { Manrope, Nunito, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";

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

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3dplus73.ru"),
  title: {
    default: "Стоматология 3D plus — клиника в Ульяновске",
    template: "%s — стоматология 3D plus",
  },
  description:
    "Стоматология 3D plus в Ульяновске: лечение кариеса, имплантация, протезирование, виниры и профессиональная гигиена. Опытные врачи и современное оборудование.",
  keywords: [
    "стоматология Ульяновск",
    "3D plus",
    "имплантация зубов Ульяновск",
    "лечение кариеса",
    "виниры",
    "протезирование",
    "чистка зубов",
  ],
  applicationName: "Стоматология 3D plus",
  authors: [{ name: "Стоматология 3D plus" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://3dplus73.ru",
    siteName: "Стоматология 3D plus",
    title: "Стоматология 3D plus — клиника в Ульяновске",
    description:
      "Забота о здоровье зубов в 3D plus: терапия, хирургия, ортопедия, имплантация, эстетика и гигиена.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08211f",
  width: "device-width",
  initialScale: 1,
};

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Стоматология 3D plus",
  description:
    "Стоматологическая клиника в Ульяновске: лечение, имплантация, протезирование и гигиена.",
  url: "https://3dplus73.ru",
  telephone: "+7-8422-44-11-03",
  email: "dentalik73@mail.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Федерации, 50, офис 12",
    addressLocality: "Ульяновск",
    addressCountry: "RU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₽₽",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "211",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${unbounded.variable} ${nunito.variable}`}
    >
      <body className="min-h-screen bg-paper pb-[70px] text-ink lg:pb-0">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileCta />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </body>
    </html>
  );
}
