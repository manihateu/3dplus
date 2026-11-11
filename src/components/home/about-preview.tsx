import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { advantages } from "@/lib/site";

const icons = [BadgeCheck, HeartHandshake, ShieldCheck, Sparkles];

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-sand/50 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-1/3 size-[400px] rounded-full bg-mint/50 blur-[120px]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="О клинике"
            title="Забота, которую видно в деталях"
            description="3D plus — клиника с профессиональным подходом к каждому пациенту. Мы лечим не «по шаблону», а по понятному плану, где важны ваше состояние и комфорт."
            action={{ href: "/about", label: "О клинике" }}
          />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="h-full">
            <div className="group relative h-full min-h-[380px] overflow-hidden rounded-[2rem] bg-forest">
              <Image
                src="/images/about-1.jpg"
                alt="Коллектив стоматологии 3D plus"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink/40 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-paper backdrop-blur">
                <span className="size-1.5 rounded-full bg-lime" />
                Клиника в центре Ульяновска
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="max-w-sm font-display text-xl font-medium leading-snug tracking-tight text-paper sm:text-2xl">
                    «Мы всегда готовы прийти на помощь»
                  </p>
                  <p className="mt-2 text-xs text-paper/55">Команда стоматологии 3D plus</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <HeartHandshake className="size-5" />
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((item, index) => {
              const Icon = icons[index];
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="flex h-full flex-col rounded-[1.5rem] acrylic p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_26px_50px_-40px_rgba(8,33,31,0.5)]">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-mint text-forest">
                        <Icon className="size-4.5" strokeWidth={1.8} />
                      </span>
                      <span className="font-display text-xs text-ink/20">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 text-[14px] font-extrabold leading-snug">{item.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={0.24} className="sm:col-span-2">
              <Link
                href="/about"
                className="group flex items-center justify-between rounded-[1.5rem] acrylic-dark p-5 text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint-deep">
                    Подробнее
                  </p>
                  <p className="mt-1 text-sm font-bold">Познакомиться с клиникой и врачами</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
