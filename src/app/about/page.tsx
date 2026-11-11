import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Download, FileText, HeartHandshake, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DoctorCard } from "@/components/home/doctors-preview";
import { BookingSection } from "@/components/booking-section";
import { JsonLd } from "@/components/json-ld";
import { physiciansSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { documents, doctors, site, values } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "О клинике",
  description:
    "О стоматологии 3D plus в Ульяновске: команда врачей, принципы работы, оборудование, лицензия и документы клиники.",
  path: "/about",
});

const promises = [
  "Вам и вашим близким",
  "С заботой и вниманием",
  "Лечим бережно и без боли",
  "Качественно и профессионально",
  "Гарантируем безопасность и комфорт",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О клинике"
        title="Стоматология с профессиональным подходом к каждому пациенту"
        description="Наша цель — комплексная стоматологическая помощь при балансе качества, безопасности и цены. Пациент должен чувствовать, что мы всегда готовы прийти на помощь."
      >
        <div className="flex flex-wrap gap-2.5">
          {[
            "20+ видов услуг",
            "5 специалистов",
            "4.8 из 5 — рейтинг",
            "15% именинникам",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full glass-chip px-4 py-2.5 text-[11px] font-bold text-ink/65"
            >
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative row-span-2 overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/about-2.jpg"
                  alt="Приём в стоматологии 3D plus"
                  width={335}
                  height={500}
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="size-full object-cover"
                />
              </div>
              <div className="relative aspect-[5/3] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/about-1.jpg"
                  alt="Коллектив клиники 3D plus"
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/clinic-1.jpg"
                  alt="Оборудование стоматологии"
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow text-teal">Наш подход</p>
            <h2 className="mt-4 font-display text-[1.9rem] font-medium leading-[1.12] tracking-tight text-balance sm:text-4xl">
              Знайте: мы всегда готовы прийти на помощь
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/55 sm:text-base">
              Стоматология 3D plus работает для взрослых пациентов Ульяновска. Мы
              придерживаемся принципа: сначала диагностика и понятный план, затем лечение.
              Никаких лишних процедур и скрытых платежей.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] font-semibold text-ink/70">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-forest">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contacts#zapis" className="btn btn-primary">
                Записаться на приём
              </Link>
              <Link href="/services" className="btn btn-outline">
                Наши услуги
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Принципы"
              title="Почему пациенты остаются с нами"
              description="Четыре вещи, на которых держится клиника 3D plus."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <div className="h-full rounded-[1.5rem] acrylic p-5">
                  <span className="font-display text-xs text-ink/25">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-base font-medium leading-snug tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink/50">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-24 bg-paper py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Команда"
              title="Специалисты клиники"
              description="В 3D plus работает коллектив специалистов с большим практическим опытом. Врачи постоянно повышают квалификацию и применяют современные технологии."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor, index) => (
              <Reveal key={doctor.name} delay={index * 0.04}>
                <DoctorCard doctor={doctor} index={index} detailed />
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="flex h-full min-h-[300px] flex-col justify-between rounded-[1.75rem] acrylic-dark p-6 text-paper">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                  <HeartHandshake className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint-deep">
                    Вакансии
                  </p>
                  <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight">
                    Присоединяйтесь к команде профессионалов
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-paper/50">
                    Ищем врачей и ассистентов, которым близок бережный подход к пациентам.
                  </p>
                  <a
                    href={`mailto:${site.email}?subject=Вакансия`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-mint-deep hover:underline"
                  >
                    <Mail className="size-4" />
                    Написать нам
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand/50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Документы"
              title="Открыто о работе клиники"
              description="Лицензия, правила оказания услуг, гарантии и информация об обработке данных."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, index) => (
              <Reveal key={doc.href} delay={index * 0.04}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl acrylic p-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-mint text-forest">
                      <FileText className="size-4" />
                    </span>
                    <span className="text-[12.5px] font-bold leading-snug">{doc.title}</span>
                  </span>
                  <Download className="size-4 shrink-0 text-ink/25 transition-colors group-hover:text-teal" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <Link
                href="/privacy"
                className="group flex items-center justify-between gap-4 rounded-2xl acrylic p-4"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-sand text-ink">
                    <FileText className="size-4" />
                  </span>
                  <span className="text-[12.5px] font-bold leading-snug">
                    Политика обработки персональных данных
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink/25 transition-colors group-hover:text-teal" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={physiciansSchema()} />
      <BookingSection />
    </>
  );
}
