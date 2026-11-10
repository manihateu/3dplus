import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ className, size = "size-4" }: { className?: string; size?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-amber-500", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={cn(size, "fill-current")} strokeWidth={1.5} />
      ))}
    </span>
  );
}
