import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIconGlyph } from "@/components/service-icon";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentClasses = {
  mint: "bg-mint text-forest",
  sand: "bg-sand text-ink",
  blush: "bg-blush text-[#a63d24]",
} as const;

export function ServicesOverview() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-24 size-[420px] rounded-full bg-mint/50 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-[380px] rounded-full bg-blush/60 blur-[130px]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="Наши услуги"
            title="Полный спектр стоматологии — в одной клинике"
            description="От профилактической чистки до сложной имплантации. Подбираем лечение под задачу, а не наоборот."
            action={{ href: "/services", label: "Все услуги" }}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] acrylic p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_30px_60px_-40px_rgba(8,33,31,0.55)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6",
                      accentClasses[service.accent],
                    )}
                  >
                    <ServiceIconGlyph name={service.icon} className="size-5.5" />
                  </span>
                  <span className="rounded-full glass-chip px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink/50">
                    {service.priceFrom}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[1.15rem] font-medium leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/50">{service.short}</p>

                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {service.items.slice(0, 3).map((item) => (
                    <li key={item.title} className="flex items-start gap-2 text-[12.5px] text-ink/60">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-teal" strokeWidth={2.4} />
                      {item.title}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center justify-between pt-5 text-[12px] font-bold text-teal">
                  Подробнее
                  <span className="grid size-8 place-items-center rounded-full border border-teal/20 transition-all duration-300 group-hover:bg-teal group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
