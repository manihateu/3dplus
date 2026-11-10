import { NextResponse } from "next/server";

type BookingPayload = {
  name?: string;
  phone?: string;
  service?: string;
  comment?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10 || !payload.consent) {
    return NextResponse.json({ ok: false, error: "Проверьте поля формы" }, { status: 422 });
  }

  // TODO: подключить отправку в CRM (YCLIENTS) или на почту клиники.
  console.info("[booking] новая заявка", {
    name,
    phone,
    service: payload.service || "консультация",
    comment: payload.comment || "",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
