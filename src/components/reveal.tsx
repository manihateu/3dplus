import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Появление блоков без JavaScript и без скрытия контента до гидратации.
 * Анимация описана в globals.css (.reveal).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
