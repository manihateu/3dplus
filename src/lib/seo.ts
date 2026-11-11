import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Единый набор метаданных для внутренних страниц:
 * canonical, Open Graph и Twitter Card с картинкой 1200×630.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  imageAlt = "Стоматология 3D plus в Ульяновске",
  type = "website",
}: PageMetadataOptions): Metadata {
  const ogTitle = title.includes("стоматология")
    ? title
    : `${title} — стоматология 3D plus`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ru_RU",
      url: path,
      siteName: "Стоматология 3D plus",
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
