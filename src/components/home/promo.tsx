import Link from "next/link";
import { ArrowUpRight, Cake, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Promo() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Акции"
            title="Приятные поводы улыбнуться"
            description="Следите за сезонными предложениями — актуальные условия уточняйте у администратора."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-[2rem] bg-blush p-7 sm:p-9">
              <div className="absolute -right-10 -top-12 size-48 rounded-full border-[22px] border-white/35" />
              <div className="absolute -bottom-14 right-16 size-36 rounded-full bg-white/25 blur-md" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8f3a24]">
                  <Cake className="size-3.5" />
                  День рождения
                </span>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-display text-6xl font-medium leading-none tracking-tight text-[#8f3a24] sm:text-7xl">
                    −15
                  </span>
                  <span className="pb-1 font-display text-3xl font-medium text-[#8f3a24]">%</span>
                </div>
                <h3 className="mt-3 max-w-sm font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  Имениннику — скидка на лечение и гигиену
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/55">
                  Подарите себе ослепительную улыбку. Скидка действует в течение недели
                  вокруг дня рождения — уточните условия при записи.
                </p>
                <Link href="/contacts#zapis" className="btn btn-primary mt-7 !py-3.5">
                  Записаться
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="group relative h-full overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-teal/30 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 size-56 rounded-full bg-lime/10 blur-[60px]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-mint-deep">
                  <Sparkles className="size-3.5" />
                  Имплантация
                </span>
                <div className="mt-8 flex flex-wrap items-end gap-3">
                  <span className="font-display text-6xl font-medium leading-none tracking-tight text-lime sm:text-7xl">
                    24 000
                  </span>
                  <span className="pb-2 font-display text-2xl font-medium text-lime">₽</span>
                  <span className="pb-2 text-sm text-paper/35 line-through">29 000 ₽</span>
                </div>
                <h3 className="mt-3 max-w-sm font-display text-xl font-medium tracking-tight sm:text-2xl">
                  Имплант Osstem + формирователь десны
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/55">
                  Южная Корея, проверенная система. Точный план установки и сопровождение
                  после операции — обсудим на консультации имплантолога.
                </p>
                <Link href="/services/implantaciya" className="btn btn-mint mt-7 !py-3.5">
                  Об имплантации
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-4 text-[11px] text-ink/35">
          * Не является публичной офертой. Актуальные цены и условия акций уточняйте по
          телефону клиники.
        </p>
      </div>
    </section>
  );
}
