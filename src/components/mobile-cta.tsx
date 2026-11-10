import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/60 bg-paper/75 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-20px_50px_-40px_rgba(8,33,31,0.6)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden">
      <div className="flex gap-2.5">
        <a href={site.phone.href} className="btn btn-outline flex-1 !py-3.5">
          <Phone className="size-4" />
          Позвонить
        </a>
        <Link href="/contacts#zapis" className="btn btn-primary flex-1 !py-3.5">
          <CalendarCheck className="size-4" />
          Записаться
        </Link>
      </div>
    </div>
  );
}
