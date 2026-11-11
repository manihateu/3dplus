import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Phone,
  Plus,
  Wallet,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { BookingSection } from "@/components/booking-section";
import { JsonLd } from "@/components/json-ld";
import { getServicePage, servicePages } from "@/lib/service-pages";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { doctors, services, site } from "@/lib/site";
import { priceCategories, type PriceCategory } from "@/lib/prices";

function getPriceExamples(category: PriceCategory | undefined, keywords?: string[]) {
  if (!category) return [];

  const allItems = category.groups.flatMap((group) => group.items);
  const filtered = keywords
    ? allItems.filter((item) =>
        keywords.some((keyword) => item.name.toLowerCase().includes(keyword.toLowerCase())),
      )
    : allItems;

  return (filtered.length > 0 ? filtered : allItems).slice(0, 5);
}

export function ServiceDetail({ slug }: { slug: string }) {
  const content = getServicePage(slug);
  const service = services.find((item) => item.slug === slug);

  if (!content || !service) notFound();

  const category = priceCategories.find((item) => item.slug === content.priceCategory);
  const priceItems = getPriceExamples(category, content.priceKeywords);
  const pageDoctors = doctors.filter((doctor) => content.doctors.includes(doctor.name));
  const related = content.related
    .map((relatedSlug) => servicePages.find((page) => page.slug === relatedSlug))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  const breadcrumb = [
    { label: "Главная", href: "/" },
    { label: "Услуги", href: "/services" },
    { label: service.short, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[serviceSchema(content, service.priceFrom), faqSchema(content.faqs)]}
      />
      <PageHero
        eyebrow={service.short}
        title={content.h1}
        description={content.intro[0]}
        breadcrumb={breadcrumb}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full glass-chip px-4 py-2.5 text-[11px] font-bold text-ink/60">
            <Wallet className="size-3.5 text-teal" aria-hidden />
            Стоимость {service.priceFrom}
          </span>
          <Link href="/contacts#zapis" className="btn btn-primary !py-3">
            <CalendarCheck className="size-4" aria-hidden />
            Записаться
          </Link>
          <Link href="/price" className="btn btn-outline !py-3">
            Прайс-лист
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <Reveal>
              <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-3xl">
                Когда стоит обратиться
              </h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {content.indications.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] font-semibold leading-relaxed text-ink/70"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-forest">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.04}>
              <h2 className="mt-12 font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-3xl">
                Что входит в направление
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <div key={item.title} className="h-full rounded-[1.4rem] acrylic p-5">
                    <h3 className="text-[13.5px] font-extrabold leading-snug">{item.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{item.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {content.extra ? (
              <Reveal delay={0.06}>
                <h2 className="mt-12 font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-3xl">
                  {content.extra.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink/55">
                  {content.extra.description}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {content.extra.items.map((item) => (
                    <div key={item.title} className="rounded-[1.4rem] acrylic p-5">
                      <h3 className="text-[13px] font-extrabold">{item.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{item.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.08}>
              <h2 className="mt-12 font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-3xl">
                Как проходит лечение
              </h2>
              <ol className="mt-5 space-y-3">
                {content.process.map((step, index) => (
                  <li key={step.title} className="flex gap-4 rounded-[1.4rem] acrylic p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint font-display text-xs text-forest">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[13.5px] font-extrabold">{step.title}</h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink/50">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="space-y-4">
            <Reveal>
              <div className="rounded-[1.75rem] acrylic p-6">
                <p className="eyebrow text-teal">Стоимость</p>
                <p className="mt-3 font-display text-3xl font-medium tracking-tight">
                  {service.priceFrom}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink/45">
                  Итоговая цена зависит от клинической ситуации. Ниже — примеры из прайса.
                </p>
                <ul className="mt-4 divide-y divide-line/80">
                  {priceItems.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3 py-2.5">
                      <span className="text-[11.5px] leading-snug text-ink/65">{item.name}</span>
                      <span className="mb-1 flex-1 border-b border-dotted border-ink/15" />
                      <span className="shrink-0 text-[11.5px] font-extrabold tabular-nums">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/price" className="btn btn-primary mt-5 w-full !py-3">
                  Смотреть весь прайс
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="rounded-[1.75rem] acrylic p-6">
                <p className="eyebrow text-teal">Врачи направления</p>
                <ul className="mt-4 space-y-3">
                  {pageDoctors.map((doctor) => (
                    <li
                      key={doctor.name}
                      className="border-b border-line pb-3 last:border-0 last:pb-0"
                    >
                      <p className="text-[13px] font-extrabold leading-snug">{doctor.name}</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-ink/45">{doctor.role}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about#team"
                  className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-teal hover:underline"
                >
                  Вся команда
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.75rem] acrylic-dark p-6 text-paper">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint-deep">
                  Нужна консультация?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">
                  Позвоните — администратор подберёт удобное время и подскажет, к какому
                  врачу записаться.
                </p>
                <a
                  href={site.phone.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-mint-deep hover:underline"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.phone.display}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-sand/40 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Вопросы и ответы"
              title="Частые вопросы"
              description="Если вопроса нет в списке, позвоните — ответим без записи."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {content.faqs.map((item) => (
              <Reveal key={item.question} delay={0.03}>
                <details className="group rounded-[1.4rem] acrylic p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13.5px] font-extrabold leading-snug">
                    {item.question}
                    <Plus
                      className="size-4 shrink-0 text-teal transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink/55">{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Другие направления"
              title="С чем ещё мы помогаем"
              action={{ href: "/services", label: "Все услуги" }}
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((page) => (
              <Link
                key={page.slug}
                href={`/services/${page.slug}`}
                className="group flex h-full flex-col justify-between rounded-[1.5rem] acrylic p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white"
              >
                <div>
                  <h3 className="font-display text-[15px] font-medium leading-snug tracking-tight">
                    {page.h1}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink/50">
                    {page.metaDescription}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-teal">
                  Подробнее
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
