import { NextResponse } from "next/server";

/** Проверка живости контейнера — используется healthcheck'ом в docker-compose. */
export async function GET() {
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
