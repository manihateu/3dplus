import Link from "next/link";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Stars } from "@/components/stars";
import { reviews } from "@/lib/site";

export function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-[1.6rem] acrylic p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_25px_50px_-38px_rgba(8,33,31,0.45)]">
      <div className="flex items-center justify-between">
        <Stars size="size-3.5" />
        <Quote className="size-5 text-ink/10" />
      </div>
      <p className="mt-4 line-clamp-5 text-[13px] leading-relaxed text-ink/65">«{review.text}»</p>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="text-[13px] font-extrabold">{review.name}</p>
          <p className="mt-0.5 text-[10px] text-ink/35">{review.date}</p>
        </div>
        <a
          href={review.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-teal hover:underline"
        >
          {review.platform}
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </article>
  );
}

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/3 top-10 size-[460px] rounded-full bg-mint/40 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 size-[400px] rounded-full bg-blush/50 blur-[130px]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="Отзывы"
            title="Нас рекомендуют близким"
            description="Собираем обратную связь на независимых площадках. Спасибо каждому пациенту за доверие."
            action={{ href: "/reviews", label: "Все отзывы" }}
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-9 grid gap-4 rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-mint/80 via-mint/45 to-white/40 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_26px_55px_-44px_rgba(8,33,31,0.5)] backdrop-blur-xl backdrop-saturate-150 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7">
            <div className="flex items-end gap-2">
              <span className="font-display text-5xl font-medium leading-none tracking-tight">
                4.8
              </span>
              <span className="pb-1 text-sm font-bold text-ink/40">/ 5</span>
            </div>
            <div>
              <Stars className="text-amber-500" label="Рейтинг 4.8 из 5" />
              <p className="mt-1.5 text-xs font-semibold text-ink/60">
                211 отзывов на Про докторов и ZOON
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://prodoctorov.ru/ulyanovsk/lpu/32098-dr-dent/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline !bg-white/50 !py-2.5 !text-[11px]"
              >
                <Star className="size-3.5" />
                Про докторов
              </a>
              <a
                href="https://ulyanovsk.zoon.ru/medical/stomatologiya_3d_plus/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline !bg-white/50 !py-2.5 !text-[11px]"
              >
                <Star className="size-3.5" />
                ZOON
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((review, index) => (
            <Reveal key={`${review.name}-${index}`} delay={index * 0.06}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] acrylic px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-ink/45">
              Были у нас? Расскажите о визите — это помогает нам становиться лучше.
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] font-bold">
              <Link href="/reviews" className="text-teal hover:underline">
                Читать все отзывы
              </Link>
              <a
                href="https://prodoctorov.ru/ulyanovsk/lpu/32098-dr-dent/"
                target="_blank"
                rel="noreferrer"
                className="text-ink/60 hover:text-ink"
              >
                Оставить отзыв
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
