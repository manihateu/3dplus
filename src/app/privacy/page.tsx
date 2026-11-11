import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Mail, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Политика обработки персональных данных",
    description:
      "Политика обработки персональных данных стоматологии 3D plus в Ульяновске: какие данные собираются, как используются и как их защищаем.",
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "1. Общие положения",
    paragraphs: [
      "Настоящая политика определяет порядок обработки персональных данных пациентов и посетителей сайта стоматологии 3D plus (далее — Клиника), расположенной по адресу: г. Ульяновск, ул. Федерации, 50, офис 12.",
      "Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных». Используя сайт и отправляя заявку, вы соглашаетесь с условиями настоящей политики.",
    ],
  },
  {
    title: "2. Какие данные мы обрабатываем",
    paragraphs: [
      "При отправке формы записи мы можем получать: имя, номер телефона, выбранное направление лечения и комментарий, который вы указали добровольно.",
      "При обращении по телефону или электронной почте обрабатываются контактные данные, необходимые для ответа на ваш запрос.",
      "Сайт не использует данные для автоматизированного принятия решений, влекущих юридические последствия.",
    ],
  },
  {
    title: "3. Цели обработки",
    paragraphs: [
      "Обработка персональных данных осуществляется для: записи на приём и подтверждения времени визита; ответа на вопросы об услугах и стоимости лечения; информирования о переносе приёма или изменении расписания.",
      "Мы не передаём ваши данные третьим лицам, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.",
    ],
  },
  {
    title: "4. Хранение и защита",
    paragraphs: [
      "Клиника принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения и распространения.",
      "Данные хранятся не дольше, чем это необходимо для целей обработки, если иной срок не установлен законом.",
    ],
  },
  {
    title: "5. Права субъекта персональных данных",
    paragraphs: [
      "Вы вправе запросить информацию об обработке своих персональных данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие на обработку.",
      "Для этого свяжитесь с нами по телефону или электронной почте, указанным ниже. Мы постараемся ответить в течение рабочего дня.",
    ],
  },
  {
    title: "6. Медицинская информация",
    paragraphs: [
      "Сведения о состоянии здоровья, полученные в ходе приёма, относятся к специальным категориям персональных данных. Они обрабатываются в соответствии с медицинским законодательством и составляют врачебную тайну.",
      "Информация, размещённая на сайте, носит справочный характер, не является публичной офертой и не заменяет консультацию врача.",
    ],
  },
  {
    title: "7. Cookie и аналитика",
    paragraphs: [
      "Сайт использует необходимые cookie для работы интерфейса. Аналитические cookie Яндекс.Метрики загружаются только после согласия в баннере; отказ не ограничивает доступ к сайту и услугам.",
      "Вы можете изменить решение, очистив данные сайта в настройках браузера. После этого баннер с выбором появится снова.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Правовая информация"
        title="Политика обработки персональных данных"
        description="Коротко и понятно о том, какие данные собирает сайт стоматологии 3D plus, зачем они нужны и как мы их защищаем."
      >
        <div className="flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2.5 text-[11px] font-bold text-ink/60 backdrop-blur">
            <ShieldCheck className="size-3.5 text-teal" />
            152-ФЗ
          </span>
          <a
            href="/docs/dannye.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2.5 text-[11px] font-bold text-ink/60 backdrop-blur transition-colors hover:text-teal"
          >
            <FileText className="size-3.5 text-teal" />
            Скачать PDF
          </a>
        </div>
      </PageHero>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                Содержание
              </p>
              <nav className="mt-4 space-y-1.5">
                {sections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#section-${index + 1}`}
                    className="block rounded-lg px-3 py-2 text-[12px] font-semibold text-ink/50 transition-colors hover:bg-sand hover:text-ink"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 rounded-[1.25rem] acrylic p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Вопросы по данным
                </p>
                <a
                  href={site.phone.href}
                  className="mt-2 flex items-center gap-2 text-[12px] font-extrabold hover:text-teal"
                >
                  <Phone className="size-3.5 text-teal" />
                  {site.phone.display}
                </a>
                <a
                  href={site.emailHref}
                  className="mt-1.5 flex items-center gap-2 text-[12px] text-ink/55 hover:text-teal"
                >
                  <Mail className="size-3.5 text-teal" />
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.03}>
                <article
                  id={`section-${index + 1}`}
                  className="scroll-mt-28 rounded-[1.5rem] acrylic p-6 sm:p-7"
                >
                  <h2 className="font-display text-[1.05rem] font-medium leading-snug tracking-tight sm:text-lg">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-2.5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[13px] leading-relaxed text-ink/60">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <div className="flex flex-col gap-4 rounded-[1.5rem] bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-[12.5px] leading-relaxed text-paper/60">
                  Актуальную редакцию документа также можно получить в клинике по адресу
                  ул. Федерации, 50, офис 12.
                </p>
                <Link href="/contacts" className="btn btn-mint shrink-0 !py-3">
                  <ArrowLeft className="size-4" />
                  Контакты
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
