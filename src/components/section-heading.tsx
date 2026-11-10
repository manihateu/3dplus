import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cn("eyebrow", dark ? "text-mint-deep" : "text-teal")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "mt-4 font-display text-[1.85rem] font-medium leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.65rem]",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-[15px] leading-relaxed sm:text-base",
              align === "center" && "mx-auto",
              dark ? "text-paper/60" : "text-ink/55",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 text-sm font-bold",
            dark ? "text-mint-deep" : "text-teal",
          )}
        >
          {action.label}
          <span className="grid size-8 place-items-center rounded-full border border-current/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}
