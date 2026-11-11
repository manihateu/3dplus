"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { priceCategories } from "@/lib/prices";
import { cn } from "@/lib/utils";

const categories = [{ slug: "all", title: "Все услуги" }, ...priceCategories.map((item) => ({ slug: item.slug, title: item.title }))];

export function PriceExplorer() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleCategories = useMemo(() => {
    const source =
      active === "all" ? priceCategories : priceCategories.filter((item) => item.slug === active);

    if (!normalizedQuery) return source;

    return source
      .map((category) => ({
        ...category,
        groups: category.groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.name.toLowerCase().includes(normalizedQuery)),
          }))
          .filter((group) => group.items.length),
      }))
      .filter((category) => category.groups.length);
  }, [active, normalizedQuery]);

  const total = visibleCategories.reduce(
    (sum, category) => sum + category.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
    0,
  );

  return (
    <div>
      <div className="sticky top-[82px] z-20 -mx-5 border-b border-white/60 bg-paper/70 px-5 py-3 backdrop-blur-2xl backdrop-saturate-150 sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
            <input
              type="search"
              name="price-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти услугу: кариес, коронка, чистка…"
              enterKeyHint="search"
              className="w-full rounded-full border border-white/70 bg-white/60 py-3 pl-11 pr-10 text-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none backdrop-blur-xl transition-colors placeholder:text-ink/35 focus:border-teal focus:bg-white/85"
              aria-label="Поиск по прайс-листу"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-sand text-ink/50"
                aria-label="Очистить поиск"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActive(category.slug)}
                aria-pressed={active === category.slug}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold transition-colors",
                  active === category.slug
                    ? "bg-ink text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
                    : "glass-chip text-ink/55 hover:text-ink",
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
        <p
          aria-live="polite"
          className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35"
        >
          Найдено услуг: {total}
        </p>
      </div>

      <div className="mt-8 space-y-10">
        {visibleCategories.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/80 bg-white/45 px-6 py-16 text-center backdrop-blur-xl">
            <p className="font-display text-lg font-medium">Ничего не найдено</p>
            <p className="mt-2 text-sm text-ink/45">
              Попробуйте другое название или позвоните — администратор подскажет.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="btn btn-outline mt-5 !py-3"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          visibleCategories.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-40 rounded-[1.75rem] acrylic p-5 sm:p-7"
            >
              <div className="flex flex-col gap-2 border-b border-ink/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                    {category.title}
                  </h2>
                  <p className="mt-1 text-xs text-ink/45">{category.description}</p>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/30">
                  {category.groups.reduce((sum, group) => sum + group.items.length, 0)} услуг
                </p>
              </div>

              <div className="mt-6 space-y-7">
                {category.groups.map((group) => (
                  <div key={`${category.slug}-${group.title}`}>
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-teal">
                      {group.title}
                    </h3>
                    <ul className="mt-2.5 divide-y divide-line/80">
                      {group.items.map((item) => (
                        <li
                          key={`${category.slug}-${group.title}-${item.name}`}
                          className="flex items-baseline gap-3 py-2.5"
                        >
                          <span className="text-[13px] leading-snug text-ink/70">{item.name}</span>
                          <span className="mb-1 flex-1 border-b border-dotted border-ink/15" />
                          <span className="shrink-0 text-[13px] font-extrabold tabular-nums">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
