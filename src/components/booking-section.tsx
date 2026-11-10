import Link from "next/link";
import { CalendarCheck, Clock, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const bullets = [
  {
    icon: MessageCircle,
    title: "Перезвоним и уточним запрос",
    text: "Поможем выбрать направление и врача под вашу задачу.",
  },
  {
    icon: CalendarCheck,
    title: "Подберём удобное время",
    text: "Работаем по записи — без длинного ожидания в очереди.",
  },
  {
    icon: Clock,
    title: "Расскажем, как подготовиться",
    text: "Дадим понятные инструкции перед визитом.",
  },
];

export function BookingSection({ id = "zapis" }: { id?: string }) {
  return (
    <section id={id} className="noise relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-0 size-[460px] rounded-full bg-teal/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[380px] rounded-full bg-lime/10 blur-[110px]" />

      <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow text-mint-deep">Запись на приём</p>
          <h2 className="mt-4 font-display text-[2rem] font-medium leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Сделайте первый шаг к здоровой улыбке
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/55 sm:text-base">
            Первичная консультация — это знакомство, осмотр и понятный план. Без навязанных
            процедур и неожиданных сумм.
          </p>

          <ul className="mt-8 space-y-5">
            {bullets.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] text-mint-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-paper/45">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <a href={site.phone.href} className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-lime text-ink">
                <Phone className="size-4" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-paper/40">
                  Позвонить
                </span>
                <span className="block text-sm font-extrabold">{site.phone.display}</span>
              </span>
            </a>
            <span className="h-8 w-px bg-white/10" />
            <Link href="/contacts" className="text-xs font-bold text-paper/60 hover:text-mint-deep">
              Как добраться →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
