import {
  Anchor,
  Crown,
  Droplets,
  Scissors,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<ServiceIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  crown: Crown,
  anchor: Anchor,
  sparkles: Sparkles,
  droplets: Droplets,
};

export function ServiceIconGlyph({
  name,
  className,
}: {
  name: ServiceIcon;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={cn("size-5", className)} strokeWidth={1.7} />;
}
