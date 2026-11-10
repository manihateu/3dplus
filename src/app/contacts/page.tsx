import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  FileText,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ContactsSection } from "@/components/contacts-section";
import { BookingSection } from "@/components/booking-section";
import { documents, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты стоматологии 3D plus в Ульяновске: ул. Федерации, 50, офис 12. Телефоны 8 (8422) 44-11-03 и 8 (8422) 27-17-10. Режим работы Пн–Пт с 9:00 до 19:00.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Мы в центре Ульяновска"
        description="Приходите на консультацию или запишитесь заранее по телефону — администратор подберёт удобное время и расскажет, как подготовиться к визиту."
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.phone.href} className="btn btn-primary !py-3">
            <Phone className="size-4" />
            {site.phone.display}
          </a>
          <Link href="#zapis" className="btn btn-outline !py-3">
            <CalendarCheck className="size-4" />
            Записаться онлайн
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper pt-14 sm:pt-16">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                label: "Адрес",
                value: site.address,
                helper: "вход со стороны улицы",
                href: site.mapUrl,
                external: true,
              },
              {
                icon: Clock,
                label: "Режим работы",
                value: site.hours,
                helper: site.hoursNote,
              },
              {
                icon: Phone,
                label: "Телефоны",
                value: site.phone.display,
                helper: site.phone2.display,
                href: site.phone.href,
              },
              {
                icon: Mail,
                label: "Электронная почта",
                value: site.email,
                helper: "ответим в рабочие часы",
                href: site.emailHref,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="grid size-11 place-items-center rounded-2xl bg-mint text-forest">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[13.5px] font-extrabold leading-snug">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink/45">{item.helper}</p>
                  {item.href ? (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-teal">
                      <Navigation className="size-3.5" />
                      {item.external ? "Построить маршрут" : "Связаться"}
                    </span>
                  ) : null}
                </>
              );

              return (
                <Reveal key={item.label} delay={index * 0.05}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="flex h-full flex-col rounded-[1.5rem] acrylic p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_25px_50px_-38px_rgba(8,33,31,0.45)]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-[1.5rem] acrylic p-5">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ContactsSection withHeading={false} />

      <section className="bg-paper pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[1.75rem] acrylic p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                  Документы
                </p>
                <h2 className="mt-2 font-display text-xl font-medium tracking-tight sm:text-2xl">
                  Информация для пациентов
                </h2>
                <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-ink/50">
                  Лицензия, правила оказания медицинских услуг, гарантии и телефоны
                  контролирующих организаций.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:w-[520px]">
                {documents.slice(0, 4).map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 rounded-xl glass-chip px-3.5 py-2.5 text-[11.5px] font-bold leading-snug transition-colors hover:border-teal/40 hover:text-teal"
                  >
                    <FileText className="size-3.5 shrink-0 text-teal" />
                    {doc.title}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-ink/35">
            Стоматология 3D plus — медицинская организация. Информация на сайте не является
            публичной офертой. Имеются противопоказания, необходима консультация специалиста.
          </p>
        </div>
      </section>

      <BookingSection id="zapis" />
    </>
  );
}
