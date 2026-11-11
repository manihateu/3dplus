import { NextResponse } from "next/server";

type BookingPayload = {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  comment?: unknown;
  consent?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Honeypot: боты заполняют скрытое поле. Отвечаем успехом, но заявку не создаём.
  if (cleanText(payload.website, 200)) {
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const name = cleanText(payload.name, 100);
  const phone = cleanText(payload.phone, 30);
  const service = cleanText(payload.service, 120);
  const comment = cleanText(payload.comment, 1000);
  const phoneDigits = phone.replace(/\D/g, "");
  const consent = payload.consent === true;

  if (name.length < 2 || phoneDigits.length < 10 || phoneDigits.length > 15 || !consent) {
    return NextResponse.json(
      { ok: false, error: "Проверьте поля формы" },
      { status: 422, headers: { "Cache-Control": "no-store" } },
    );
  }

  // TODO: подключить отправку в CRM (YCLIENTS) или на почту клиники.
  // Персональные данные намеренно не пишутся в лог: только служебные признаки заявки.
  console.info("[booking] заявка принята", {
    service: service || "консультация",
    hasComment: Boolean(comment),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
