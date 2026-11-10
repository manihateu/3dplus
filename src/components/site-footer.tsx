import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { documents, nav, services, site } from "@/lib/site";

// Год зафиксирован, чтобы страницы оставались статическими (cacheComponents).
const year = 2026;

export function SiteFooter() {
  return (
    <footer className="noise relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-teal/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[360px] rounded-full bg-lime/10 blur-[110px]" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-mint-deep">3D plus · Ульяновск</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
              Готовы позаботиться о вашей улыбке
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contacts#zapis" className="btn btn-mint">
              Записаться на приём
              <ArrowUpRight className="size-4" />
            </Link>
            <a href={site.phone.href} className="btn btn-ghost-light">
              <Phone className="size-4" />
              {site.phone.display}
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-white.png"
                alt=""
                width={75}
                height={75}
                className="size-14 w-auto object-contain"
              />
              <span>
                <span className="block font-display text-lg font-semibold tracking-tight">
                  3D plus
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-paper/40">
                  стоматология
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
              Стоматологическая клиника с профессиональным подходом к каждому пациенту.
              Лечим бережно, безопасно и без боли.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper/35">
              Разделы
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-paper/65 transition-colors hover:text-mint-deep">
                  Главная
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/65 transition-colors hover:text-mint-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper/35">
              Услуги
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.anchor}`}
                    className="text-paper/65 transition-colors hover:text-mint-deep"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper/35">
              Контакты
            </p>
            <ul className="mt-4 space-y-3 text-sm text-paper/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-mint-deep" />
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-mint-deep"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-mint-deep" />
                <span>
                  <a href={site.phone.href} className="block hover:text-mint-deep">
                    {site.phone.display}
                  </a>
                  <a href={site.phone2.href} className="block hover:text-mint-deep">
                    {site.phone2.display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-mint-deep" />
                <a href={site.emailHref} className="hover:text-mint-deep">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-mint-deep" />
                <span>
                  {site.hours}
                  <br />
                  {site.hoursNote}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-paper/35">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {documents.slice(0, 1).map((doc) => (
              <a key={doc.href} href={doc.href} className="hover:text-paper/70" target="_blank">
                {doc.title}
              </a>
            ))}
            <Link href="/privacy" className="hover:text-paper/70">
              Политика обработки персональных данных
            </Link>
            <Link href="/price" className="hover:text-paper/70">
              Цены
            </Link>
          </div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <p>
              © {year}, стоматология 3D plus. Не является публичной офертой.
            </p>
            <p>
              Сайт работает на{" "}
              <span className="text-paper/55">Next.js</span> · дизайн обновлён в 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
