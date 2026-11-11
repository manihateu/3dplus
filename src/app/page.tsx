import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { AboutPreview } from "@/components/home/about-preview";
import { Promo } from "@/components/home/promo";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { ReviewsSection } from "@/components/home/reviews-section";
import { BookingSection } from "@/components/booking-section";
import { ContactsSection } from "@/components/contacts-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesOverview />
      <AboutPreview />
      <Promo />
      <DoctorsPreview />
      <ReviewsSection />
      <BookingSection />
      <ContactsSection />
    </>
  );
}
