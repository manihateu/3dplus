import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return (
    <section className={cn("noise relative overflow-hidden bg-sand/60 pb-14 pt-10 sm:pb-20 sm:pt-14", className)}>
      <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-mint/70 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[380px] rounded-full bg-blush/70 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #08211f 1px, transparent 1px), linear-gradient(to bottom, #08211f 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="container-page relative">
        <Breadcrumbs items={breadcrumb ?? [{ label: "Главная", href: "/" }, { label: eyebrow }]} />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow text-teal">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.1rem] font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/55 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
