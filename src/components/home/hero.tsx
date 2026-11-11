import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { site, stats } from "@/lib/site";
import { Stars } from "@/components/stars";

export function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -left-32 -top-32 size-[560px] rounded-full bg-teal/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 top-24 size-[420px] rounded-full bg-lime/10 blur-[110px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-24">
        <div className="hero-enter">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-paper/70 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-mint-deep opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-mint-deep" />
            </span>
            3D plus · клиника в центре
          </div>

          <h1 className="mt-6 font-display text-[2.55rem] font-medium leading-[1.03] tracking-[-0.03em] text-balance sm:text-[3.4rem] lg:text-[3.1rem] xl:text-[3.85rem]">
            Стоматология в Ульяновске, которой{" "}
            <span className="relative inline-block text-mint-deep">
              доверяют
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full text-lime/70"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 9C50 3 150 3 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/60 sm:text-lg">
            Лечим бережно и без боли, возвращаем здоровье и эстетику зубов. Терапия,
            хирургия, имплантация и протезирование — в одной клинике в центре Ульяновска.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#zapis" className="btn btn-mint">
              <CalendarCheck className="size-4" />
              Записаться на приём
            </Link>
            <Link href="/services" className="btn btn-ghost-light group">
              Смотреть услуги
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Stars size="size-3.5" className="text-lime" label="Рейтинг 4.8 из 5" />
              <span className="font-semibold text-paper/80">4.8 из 5</span>
              <span className="text-paper/40">211 отзывов</span>
            </div>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-2 text-paper/55">
              <ShieldCheck className="size-4 text-mint-deep" />
              Стерильность по стандартам
            </span>
          </div>
        </div>

        <div className="hero-enter hero-enter-delay relative mx-auto w-full max-w-[520px] lg:max-w-none">

          <div className="absolute -right-8 -top-8 hidden size-40 rounded-full border border-white/10 sm:block" />
          <div className="absolute -bottom-10 -left-8 hidden size-52 rounded-full border border-white/10 sm:block" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/4.6] sm:aspect-[4/4.2]">
              <Image
                src="/images/clinic-4.jpg"
                alt="Стоматологическая клиника 3D plus в Ульяновске"
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl acrylic-dark p-4 sm:inset-x-5 sm:bottom-5 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mint-deep">
                    3D plus
                  </p>
                  <p className="mt-1 font-sans text-xl font-extrabold tracking-tight sm:text-[1.4rem]">
                    Бережно. Без боли.
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Sparkles className="size-5" />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-paper/60">
                <Check className="size-3.5 text-mint-deep" />
                Индивидуальный план лечения
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-6 animate-float rounded-2xl acrylic p-3.5 text-ink sm:-left-8 sm:top-10">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-mint">
                <MapPin className="size-4 text-forest" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
                  Адрес
                </p>
                <p className="text-xs font-extrabold">ул. Федерации, 50</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-24 animate-float-slow rounded-2xl acrylic p-3.5 text-ink sm:-right-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blush">
                <Clock className="size-4 text-[#a63d24]" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
                  Режим работы
                </p>
                <p className="text-xs font-extrabold">Пн–Пт 9:00–19:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-[1.5rem] border border-b-0 border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-ink/35 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-6 sm:py-6"
            >
              <p className="font-display text-2xl font-medium tracking-tight text-mint-deep sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1.5 max-w-[180px] text-[11px] leading-snug text-paper/45 sm:text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="sr-only">
        <a href={site.phone.href}>{site.phone.display}</a>
      </div>
    </section>
  );
}
