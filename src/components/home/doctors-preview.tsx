import Link from "next/link";
import { ArrowUpRight, GraduationCap, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { doctors } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DoctorCard({
  doctor,
  index,
  detailed = false,
}: {
  doctor: (typeof doctors)[number];
  index: number;
  detailed?: boolean;
}) {
  return (
    <div className="group flex h-full flex-col rounded-[1.75rem] acrylic p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_30px_60px_-40px_rgba(8,33,31,0.5)]">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-sand">
        <div
          className={cn(
            "flex aspect-[4/3.1] items-center justify-center",
            index % 3 === 0 && "bg-gradient-to-br from-mint via-mint/60 to-sand",
            index % 3 === 1 && "bg-gradient-to-br from-blush via-blush/60 to-sand",
            index % 3 === 2 && "bg-gradient-to-br from-sand via-mint/40 to-blush/50",
          )}
        >
          <span className="grid size-20 place-items-center rounded-full border border-white/60 bg-white/55 font-display text-2xl font-medium tracking-tight text-ink/70 backdrop-blur-sm sm:size-24 sm:text-3xl">
            {doctor.initials}
          </span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/50 backdrop-blur">
          {doctor.role.includes("Администратор") ? "Команда" : "Врач"}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[15px] font-medium leading-snug tracking-tight">
        {doctor.name}
      </h3>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-teal">
        {doctor.role}
      </p>
      <p className="mt-3 text-[12.5px] leading-relaxed text-ink/50">{doctor.summary}</p>

      {detailed ? (
        <details className="group/details mt-4 border-t border-line pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-bold text-ink/60">
            Образование и сертификаты
            <Plus className="size-3.5 transition-transform group-open/details:rotate-45" />
          </summary>
          <p className="mt-2 flex gap-2 text-[11.5px] leading-relaxed text-ink/45">
            <GraduationCap className="mt-0.5 size-3.5 shrink-0" />
            {doctor.education}
          </p>
        </details>
      ) : null}
    </div>
  );
}

export function DoctorsPreview() {
  return (
    <section className="relative overflow-hidden bg-sand/50 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-20 top-32 size-[420px] rounded-full bg-mint/60 blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[380px] rounded-full bg-blush/60 blur-[130px]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="Специалисты"
            title="Врачи, которым доверяют"
            description="Опытные врачи с профильным образованием и постоянным повышением квалификации. Работают в команде — от диагностики до финального результата."
            action={{ href: "/about#team", label: "Вся команда" }}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.slice(0, 3).map((doctor, index) => (
            <Reveal key={doctor.name} delay={index * 0.06}>
              <DoctorCard doctor={doctor} index={index} />
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <Link
              href="/about#team"
              className="group flex h-full min-h-[360px] flex-col justify-between rounded-[1.75rem] acrylic-dark p-6 text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                  <Plus className="size-5 transition-transform duration-300 group-hover:rotate-90" />
                </span>
                <ArrowUpRight className="size-5 text-paper/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint-deep">
                  Команда
                </p>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight">
                  Познакомиться со всеми специалистами
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-paper/50">
                  Терапевты, хирурги, ортопеды и гигиенисты — единая команда клиники.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
