import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export function ContactsSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-28 top-16 size-[420px] rounded-full bg-mint/45 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-8 size-[380px] rounded-full bg-blush/50 blur-[130px]" />
      <div className="container-page relative">
        {withHeading ? (
          <Reveal>
            <SectionHeading
              eyebrow="Контакты"
              title="Мы в центре Ульяновска"
              description="Удобно добираться на машине и общественном транспорте. Приём по предварительной записи."
              action={{ href: "/contacts", label: "Контакты и схема" }}
            />
          </Reveal>
        ) : null}

        <div className="mt-9 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.5rem] acrylic p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-mint text-forest">
                  <MapPin className="size-4.5" />
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Адрес
                </p>
                <p className="mt-1 text-sm font-extrabold leading-snug">{site.address}</p>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-teal hover:underline"
                >
                  <Navigation className="size-3.5" />
                  Построить маршрут
                </a>
              </div>

              <div className="rounded-[1.5rem] acrylic p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-blush text-[#a63d24]">
                  <Clock className="size-4.5" />
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Режим работы
                </p>
                <p className="mt-1 text-sm font-extrabold leading-snug">{site.hours}</p>
                <p className="mt-1 text-[11px] text-ink/45">{site.hoursNote}</p>
              </div>

              <div className="rounded-[1.5rem] acrylic p-5 sm:col-span-2 lg:col-span-1">
                <span className="grid size-10 place-items-center rounded-xl bg-sand text-ink">
                  <Phone className="size-4.5" />
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Телефоны
                </p>
                <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm font-extrabold">
                  <a href={site.phone.href} className="hover:text-teal">
                    {site.phone.display}
                  </a>
                  <a href={site.phone2.href} className="hover:text-teal">
                    {site.phone2.display}
                  </a>
                </div>
                <a
                  href={site.emailHref}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-ink/45 hover:text-teal"
                >
                  <Mail className="size-3.5" />
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-[380px] overflow-hidden rounded-[1.75rem] border border-line bg-sand sm:h-[440px] lg:h-full lg:min-h-[430px]">
              <iframe
                src={site.mapEmbed}
                title="Стоматология 3D plus на карте Ульяновска"
                className="absolute inset-0 size-full grayscale-[0.15]"
                loading="lazy"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-paper/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl backdrop-saturate-150 sm:inset-x-5 sm:bottom-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal">
                      3D plus
                    </p>
                    <p className="mt-1 text-xs font-extrabold">Ульяновск, ул. Федерации, 50</p>
                    <p className="mt-0.5 text-[10px] text-ink/40">офис 12 · вход со стороны улицы</p>
                  </div>
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary !px-4 !py-2.5 !text-[10px]"
                  >
                    На карте
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
