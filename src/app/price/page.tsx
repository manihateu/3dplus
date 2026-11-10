import type { Metadata } from "next";
import { Info, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PriceExplorer } from "@/components/price-explorer";
import { BookingSection } from "@/components/booking-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Цены",
  description:
    "Актуальный прайс-лист стоматологии 3D plus в Ульяновске: лечение, имплантация, протезирование, гигиена. 150 услуг с ценами.",
  alternates: { canonical: "/price" },
};

export default function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="Цены"
        title="Прозрачные цены на стоматологические услуги"
        description="Прайс-лист клиники 3D plus. Итоговую стоимость лечения определяет врач после осмотра — она зависит от клинической ситуации."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href={site.phone.href} className="btn btn-primary !py-3">
            <Phone className="size-4" />
            Уточнить по телефону
          </a>
          <span className="text-[11px] text-ink/40">8 (8422) 44-11-03</span>
        </div>
      </PageHero>

      <section className="bg-paper py-10 sm:py-14">
        <div className="container-page">
          <div className="mb-7 flex items-start gap-3 rounded-[1.25rem] border border-white/70 bg-gradient-to-br from-sand/80 to-white/40 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl">
            <Info className="mt-0.5 size-4 shrink-0 text-teal" />
            <p className="text-[11.5px] leading-relaxed text-ink/55">
              Информация на сайте не является публичной офертой. Пожалуйста, уточняйте
              актуальные цены в клинике по телефону{" "}
              <a href={site.phone.href} className="font-bold text-ink underline">
                {site.phone.display}
              </a>
              . Цены указаны в рублях.
            </p>
          </div>
          <PriceExplorer />
        </div>
      </section>

      <BookingSection />
    </>
  );
}
