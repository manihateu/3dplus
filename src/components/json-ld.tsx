type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Структурированные данные Schema.org.
 *
 * `<` экранируется, чтобы строка не могла закрыть тег script
 * (см. рекомендации Next.js по JSON-LD).
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
