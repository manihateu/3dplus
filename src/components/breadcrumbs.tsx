import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav
        aria-label="Хлебные крошки"
        className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="size-3" aria-hidden /> : null}
              {isLast ? (
                <span className="text-ink/60" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          );
        })}
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
