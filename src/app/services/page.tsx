import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Check, ClipboardList, MessageCircle, Stethoscope, Wallet } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ServiceIconGlyph } from "@/components/service-icon";
import { BookingSection } from "@/components/booking-section";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Стоматологические услуги 3D plus в Ульяновске: терапия, хирургия, ортопедия, имплантация, эстетическая стоматология и гигиена.",
  alternates: { canonical: "/services" },
};

const steps = [
  {
    icon: MessageCircle,
    title: "Знакомство",
    text: "Обсуждаем жалобы и ожидания, отвечаем на вопросы.",
  },
  {
    icon: Stethoscope,
    title: "Диагностика",
    text: "Осмотр и снимки, если они нужны для точного плана.",
  },
  {
    icon: ClipboardList,
    title: "План лечения",
    text: "Объясняем этапы, сроки и стоимость до начала работ.",
  },
  {
    icon: CalendarCheck,
    title: "Лечение и поддержка",
    text: "Выполняем план и даём рекомендации после процедур.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Стоматология по всем направлениям"
        description="Доверьте заботу о здоровье зубов клинике 3D plus. Индивидуальный подход и качественное оказание услуг — основа нашей работы."
      >
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.anchor}`}
              className="rounded-full glass-chip px-4 py-2.5 text-[11px] font-bold text-ink/65 transition-colors hover:border-teal hover:text-teal"
            >
              {service.short}
            </a>
          ))}
        </div>
      </PageHero>

      <div className="relative isolate overflow-hidden bg-paper">
        <div className="pointer-events-none absolute -left-32 top-40 -z-10 size-[420px] rounded-full bg-mint/40 blur-[140px]" />
        <div className="pointer-events-none absolute -right-32 top-[38%] -z-10 size-[440px] rounded-full bg-blush/45 blur-[140px]" />
        <div className="pointer-events-none absolute left-1/4 bottom-24 -z-10 size-[420px] rounded-full bg-lime/20 blur-[150px]" />
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.anchor}
            className={cn(
              "scroll-mt-24 border-b border-line py-14 sm:py-16 lg:py-20",
              index % 2 === 1 && "bg-sand/40",
            )}
          >
            <div className="container-page grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-mint text-forest">
                      <ServiceIconGlyph name={service.icon} className="size-5.5" />
                    </span>
                    <span className="font-display text-[11px] text-ink/30">
                      0{index + 1} / 0{services.length}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[1.7rem] font-medium leading-[1.12] tracking-tight text-balance sm:text-[2.1rem]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-ink/55 sm:text-sm">
                    {service.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full glass-chip px-4 py-2.5 text-[11px] font-bold text-ink/60">
                    <Wallet className="size-3.5 text-teal" />
                    Стоимость {service.priceFrom}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Link href="/contacts#zapis" className="btn btn-primary !py-3">
                      <CalendarCheck className="size-4" />
                      Записаться
                    </Link>
                    <Link href="/price" className="btn btn-outline !py-3">
                      Прайс-лист
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-2">
                {service.items.map((item, itemIndex) => (
                  <Reveal key={item.title} delay={itemIndex * 0.05}>
                    <div className="h-full rounded-[1.4rem] acrylic p-5">
                      <span className="grid size-8 place-items-center rounded-full bg-mint/70 text-forest">
                        <Check className="size-3.5" strokeWidth={2.6} />
                      </span>
                      <h3 className="mt-4 text-[13.5px] font-extrabold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={0.2} className="sm:col-span-2">
                  <div className="flex flex-col items-start justify-between gap-3 rounded-[1.4rem] acrylic-dark px-5 py-4 text-paper sm:flex-row sm:items-center">
                    <p className="text-xs text-paper/60">
                      Не знаете, какое направление нужно? Начните с консультации.
                    </p>
                    <Link
                      href="/contacts#zapis"
                      className="inline-flex items-center gap-2 text-xs font-bold text-mint-deep hover:underline"
                    >
                      Записаться на консультацию
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
        <div className="pointer-events-none absolute right-0 top-0 size-[380px] rounded-full bg-mint/45 blur-[140px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-[320px] rounded-full bg-blush/40 blur-[130px]" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow text-teal">Как проходит визит</p>
            <h2 className="mt-4 max-w-2xl font-display text-[1.85rem] font-medium leading-[1.12] tracking-tight text-balance sm:text-4xl">
              Понятный процесс — от первого звонка до результата
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <div className="relative h-full rounded-[1.5rem] acrylic p-5">
                    <span className="absolute right-5 top-5 font-display text-[10px] text-ink/20">
                      0{index + 1}
                    </span>
                    <span className="grid size-11 place-items-center rounded-xl bg-mint text-forest">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-[13.5px] font-extrabold">{step.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{step.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
