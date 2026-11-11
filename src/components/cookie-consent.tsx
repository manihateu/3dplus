"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { YandexMetrika } from "@/components/yandex-metrika";

const STORAGE_KEY = "3dplus-cookie-consent-v1";

type Consent = "accepted" | "essential";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    // Читаем localStorage после гидратации, чтобы не расходиться с серверным HTML.
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "accepted" || stored === "essential") {
          setConsent(stored);
          return;
        }
      } catch {
        // Приватный режим или заблокированное хранилище — покажем баннер.
      }
      setVisible(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Если запись недоступна, выбор действует до перезагрузки страницы.
    }
    setConsent(value);
    setVisible(false);
  }

  return (
    <>
      {visible ? (
        <div
          role="dialog"
          aria-label="Использование файлов cookie"
          aria-live="polite"
          className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-40 mx-auto max-w-3xl rounded-[1.4rem] border border-white/70 bg-paper/95 p-4 shadow-[0_30px_80px_-40px_rgba(8,33,31,0.55)] backdrop-blur-2xl backdrop-saturate-150 sm:p-5 lg:bottom-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                <Cookie className="size-4" aria-hidden />
              </span>
              <p className="text-[12px] leading-relaxed text-ink/60">
                Мы используем cookie и Яндекс.Метрику, чтобы понимать, как используется
                сайт, и улучшать его. Подробнее — в{" "}
                <Link href="/privacy" className="font-bold text-ink underline underline-offset-2">
                  политике обработки данных
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("essential")}
                className="btn btn-outline !px-4 !py-2.5 !text-[11px]"
              >
                Только необходимые
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="btn btn-primary !px-4 !py-2.5 !text-[11px]"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {consent === "accepted" ? <YandexMetrika /> : null}
    </>
  );
}
