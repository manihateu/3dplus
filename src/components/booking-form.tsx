"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send, ChevronDown } from "lucide-react";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";


type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-ink/10 bg-ink/[0.035] px-4 py-3 text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-colors placeholder:text-ink/40 focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Пожалуйста, укажите имя.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Укажите телефон в формате +7 (999) 000-00-00.");
      return;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, comment, consent }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Не удалось отправить заявку. Позвоните нам — мы поможем.");
    }
  }

  return (
    <div className="relative rounded-[2rem] acrylic-form p-6 text-ink sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[300px] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-mint text-forest">
              <Check className="size-7" strokeWidth={2.4} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">
              Заявка отправлена
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/55">
              Администратор свяжется с вами в рабочее время, чтобы подтвердить запись.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setPhone("");
                setService("");
                setComment("");
              }}
              className="btn btn-outline mt-6 !py-3"
            >
              Отправить ещё одну
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-4"
            noValidate
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                Записаться на приём
              </h3>
              <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-forest">
                <span className="size-1.5 rounded-full bg-forest" />
                Онлайн
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
              Оставьте контакты — администратор подберёт удобное время и ответит на вопросы.
            </p>
            <div className="!mt-5 h-px w-full bg-ink/[0.08] sm:!mt-6" />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink/55">Имя</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink/55">Телефон</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  autoComplete="tel"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink/55">Направление</span>
              <div className="relative">
                <select
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className={cn(fieldClass, "appearance-none pr-11")}
                >
                  <option value="">Не знаю / нужна консультация</option>
                  {services.map((item) => (
                    <option key={item.slug} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                  <option value="Гигиена и профилактика">Гигиена и профилактика</option>
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/40"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink/55">
                Комментарий <span className="font-medium text-ink/40">(необязательно)</span>
              </span>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={2}
                placeholder="Например, беспокоит зуб справа"
                className={cn(fieldClass, "resize-none")}
              />
            </label>

            <label className="flex items-start gap-2.5 rounded-xl bg-ink/[0.03] px-3.5 py-3 text-[11px] leading-relaxed text-ink/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-teal"
              />
              <span>
                Согласен на обработку персональных данных и принимаю{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:text-teal"
                >
                  политику конфиденциальности
                </a>
                .
              </span>
            </label>

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-[#a63d24]/20 bg-blush/80 px-4 py-3 text-xs font-semibold text-[#a63d24]"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {status === "loading" ? "Отправляем…" : "Отправить заявку"}
            </button>
            <p className="text-center text-[10px] text-ink/35">
              Нажимая кнопку, вы соглашаетесь с политикой обработки данных.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
