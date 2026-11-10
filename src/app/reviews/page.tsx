import type { Metadata } from "next";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ReviewCard } from "@/components/home/reviews-section";
import { Stars } from "@/components/stars";
import { BookingSection } from "@/components/booking-section";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Отзывы",
  description:
    "Отзывы пациентов о стоматологии 3D plus в Ульяновске. Рейтинг 4.8 из 5 на основе 211 отзывов на Про докторов и ZOON.",
  alternates: { canonical: "/reviews" },
};

const platforms = [
  {
    name: "Про докторов",
    rating: "4.8",
    count: "211 отзывов",
    href: "https://prodoctorov.ru/ulyanovsk/lpu/32098-dr-dent/",
    note: "Независимая площадка с проверенными отзывами пациентов.",
  },
  {
    name: "ZOON",
    rating: "4.8",
    count: "Отзывы пациентов",
    href: "https://ulyanovsk.zoon.ru/medical/stomatologiya_3d_plus/",
    note: "Городской справочник с оценками и фотографиями клиники.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Отзывы"
        title="Нам доверяют здоровье и улыбку"
        description="Собираем обратную связь на независимых площадках — так честнее. Спасибо каждому пациенту, который нашёл время рассказать о визите."
      >
        <div className="flex flex-wrap items-center gap-4 rounded-[1.5rem] glass-chip px-5 py-4">
          <div className="flex items-end gap-2">
            <span className="font-display text-4xl font-medium leading-none tracking-tight">
              4.8
            </span>
            <span className="pb-1 text-xs font-bold text-ink/40">/ 5</span>
          </div>
          <div className="h-10 w-px bg-ink/10" />
          <div>
            <Stars size="size-4" />
            <p className="mt-1 text-[11px] font-semibold text-ink/50">
              211 отзывов на Про докторов и ZOON
            </p>
          </div>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-10 size-[400px] rounded-full bg-mint/45 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[380px] rounded-full bg-blush/45 blur-[130px]" />
        <div className="container-page relative">
          <div className="grid gap-4 md:grid-cols-2">
            {platforms.map((platform, index) => (
              <Reveal key={platform.name} delay={index * 0.06}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 rounded-[1.6rem] acrylic p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_30px_60px_-40px_rgba(8,33,31,0.5)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                        Площадка
                      </p>
                      <h2 className="mt-2 font-display text-xl font-medium tracking-tight">
                        {platform.name}
                      </h2>
                      <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-ink/45">
                        {platform.note}
                      </p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                  <div className="flex items-center gap-4 border-t border-line pt-4">
                    <span className="font-display text-2xl font-medium tracking-tight">
                      {platform.rating}
                    </span>
                    <div>
                      <Stars size="size-3.5" />
                      <p className="mt-1 text-[10px] text-ink/40">{platform.count}</p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 sm:mt-16">
            <Reveal>
              <SectionHeading
                eyebrow="Что говорят пациенты"
                title="Живые истории наших пациентов"
                description="Ниже — несколько отзывов, опубликованных на Про докторов и ZOON. Полные версии доступны по ссылкам на площадках."
                action={{ href: platforms[0].href, label: "Читать на Про докторов" }}
              />
            </Reveal>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={`${review.name}-${index}`} delay={index * 0.05}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/50 py-16 sm:py-20">
        <div className="container-page grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-teal">Обратная связь</p>
            <h2 className="mt-4 font-display text-[1.85rem] font-medium leading-[1.12] tracking-tight text-balance sm:text-4xl">
              Были у нас? Расскажите о визите
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/55">
              Отзыв помогает нам становиться лучше, а будущим пациентам — решиться на
              первый шаг. Оставить его можно на любой из площадок ниже.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl acrylic px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-mint text-forest">
                      <Star className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-extrabold">
                        Оставить отзыв на {platform.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-ink/40">
                        Откроется в новой вкладке
                      </span>
                    </span>
                  </span>
                  <Quote className="size-5 shrink-0 text-ink/15 transition-colors group-hover:text-teal" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
