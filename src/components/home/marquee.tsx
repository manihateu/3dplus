const words = [
  "Терапия",
  "Хирургия",
  "Имплантация",
  "Ортопедия",
  "Эстетика",
  "Гигиена",
  "Виниры",
  "Протезирование",
];

export function Marquee() {
  const row = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-lime py-3.5 text-ink">
      <div className="mask-fade-x flex w-max animate-marquee items-center">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center" aria-hidden={group === 1}>
            {row.map((word, index) => (
              <span
                key={`${group}-${word}-${index}`}
                className="flex items-center gap-6 px-6 text-[11px] font-extrabold uppercase tracking-[0.18em] sm:text-xs"
              >
                {word}
                <span className="text-ink/35">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
