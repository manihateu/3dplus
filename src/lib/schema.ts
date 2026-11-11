import { doctors, services, site } from "@/lib/site";
import type { ServicePageContent } from "@/lib/service-pages";

export const clinicId = `${site.url}/#clinic`;
export const websiteId = `${site.url}/#website`;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function parsePriceFrom(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}

const serviceOffers = services.map((service) => ({
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
  },
  priceSpecification: {
    "@type": "PriceSpecification",
    priceCurrency: "RUB",
    minPrice: parsePriceFrom(service.priceFrom),
  },
}));

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": clinicId,
  name: site.name,
  alternateName: site.shortName,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  logo: absoluteUrl(site.logo),
  image: [
    absoluteUrl("/images/clinic-4.jpg"),
    absoluteUrl("/images/about-1.jpg"),
    absoluteUrl("/images/clinic-1.jpg"),
  ],
  telephone: "+7-8422-44-11-03",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Федерации, 50, офис 12",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  hasMap: site.mapUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: site.priceRange,
  currenciesAccepted: "RUB",
  medicalSpecialty: "Dentistry",
  areaServed: {
    "@type": "City",
    name: site.city,
  },
  sameAs: [...site.sameAs],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "211",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Стоматологические услуги",
    itemListElement: serviceOffers,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: site.name,
  inLanguage: "ru-RU",
  publisher: { "@id": clinicId },
};

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function servicesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Стоматологические услуги 3D plus",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  };
}

export function serviceSchema(content: ServicePageContent, priceFrom: string) {
  const url = absoluteUrl(`/services/${content.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: content.h1,
    serviceType: content.metaTitle,
    description: content.metaDescription,
    url,
    provider: { "@id": clinicId },
    areaServed: {
      "@type": "City",
      name: site.city,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "RUB",
        minPrice: parsePriceFrom(priceFrom),
      },
      url: absoluteUrl("/price"),
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function physiciansSchema() {
  return doctors
    .filter((doctor) => !doctor.role.includes("Администратор"))
    .map((doctor) => ({
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": `${absoluteUrl("/about")}#doctor-${doctor.name
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]+/gi, "-")
        .replace(/^-|-$/g, "")}`,
      name: doctor.name,
      jobTitle: doctor.role,
      description: `${doctor.summary} ${doctor.education}`,
      medicalSpecialty: "Dentistry",
      worksFor: { "@id": clinicId },
      url: `${absoluteUrl("/about")}#team`,
    }));
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contacts")}#contactpage`,
    url: absoluteUrl("/contacts"),
    name: "Контакты стоматологии 3D plus",
    about: { "@id": clinicId },
    mainEntity: { "@id": clinicId },
  };
}
