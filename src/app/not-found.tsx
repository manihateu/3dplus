import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="noise relative overflow-hidden bg-sand/60">
      <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-mint/70 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[380px] rounded-full bg-blush/70 blur-[120px]" />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-[5rem] font-medium leading-none tracking-tight text-ink/15 sm:text-[7rem]">
          404
        </p>
        <p className="eyebrow mt-2 text-teal">Страница не найдена</p>
        <h1 className="mt-4 max-w-xl font-display text-[1.8rem] font-medium leading-tight tracking-tight text-balance sm:text-4xl">
          Кажется, эта страница выпала из улыбки
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">
          Возможно, ссылка устарела. Вернитесь на главную или свяжитесь с нами — поможем
          найти нужное.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="size-4" />
            На главную
          </Link>
          <Link href="/contacts#zapis" className="btn btn-outline">
            <CalendarCheck className="size-4" />
            Записаться
          </Link>
          <a href={site.phone.href} className="btn btn-outline">
            <Phone className="size-4" />
            Позвонить
          </a>
        </div>
      </div>
    </section>
  );
}
