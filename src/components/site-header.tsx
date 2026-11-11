"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="hidden bg-ink text-paper/70 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[11px] font-semibold tracking-wide">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-mint-deep" />
              {site.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3.5 text-mint-deep" />
              {site.hours}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              href={site.emailHref}
            >
              <Mail className="size-3.5 text-mint-deep" />
              {site.email}
            </a>
            <a
              className="inline-flex items-center gap-2 text-paper transition-colors hover:text-mint-deep"
              href={site.phone.href}
            >
              <Phone className="size-3.5 text-mint-deep" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-white/60 bg-paper/70 shadow-[0_12px_40px_-30px_rgba(8,33,31,0.45)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-paper/50 backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <div className="container-page flex h-[82px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Стоматология 3D plus — на главную"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={75}
              height={75}
              className="size-[54px] w-auto object-contain transition-transform duration-300 group-hover:-rotate-6"
              loading="eager"
            />
            <span className="leading-none">
              <span className="block font-display text-[19px] font-semibold tracking-tight text-ink">
                3D plus
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
                стоматология
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-full border border-white/60 bg-white/35 p-1 backdrop-blur-xl backdrop-saturate-150 lg:flex"
            aria-label="Основная навигация"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2.5 text-[13.5px] font-bold transition-colors",
                  isActive(item.href)
                    ? "bg-ink text-paper"
                    : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={site.phone.href}
              className="hidden text-sm font-extrabold tracking-tight text-ink transition-colors hover:text-teal xl:block"
            >
              {site.phone.display}
            </a>
            <div className="hidden sm:block">
              <Link href="/contacts#zapis" className="btn btn-primary !px-5 !py-3">
                <CalendarCheck className="size-4" />
                Записаться
              </Link>
            </div>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-full border border-ink/10 bg-paper text-ink transition-colors hover:bg-ink hover:text-paper lg:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Меню сайта"
          className="mobile-menu fixed inset-0 z-40 bg-paper px-5 pb-8 pt-24 lg:hidden"
        >
            <div className="flex h-full flex-col">
              <nav className="flex flex-col" aria-label="Мобильная навигация">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium tracking-tight",
                      isActive(item.href) ? "text-teal" : "text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-ink/30" aria-hidden />
                  </Link>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <a href={site.phone.href} className="flex items-center gap-3 text-lg font-extrabold">
                  <span className="grid size-10 place-items-center rounded-full bg-mint">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  {site.phone.display}
                </a>
                <p className="flex items-center gap-3 text-sm text-ink/60">
                  <span className="grid size-10 place-items-center rounded-full bg-sand">
                    <Clock className="size-4" aria-hidden />
                  </span>
                  {site.hours}
                </p>
                <p className="flex items-center gap-3 text-sm text-ink/60">
                  <span className="grid size-10 place-items-center rounded-full bg-sand">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  {site.address}
                </p>
              </div>

              <Link
                href="/contacts#zapis"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-auto w-full"
              >
                <CalendarCheck className="size-4" aria-hidden />
                Записаться на приём
              </Link>
            </div>
          </div>
      ) : null}
    </>
  );
}
