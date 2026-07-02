import Link from "next/link";
import type { Glider } from "@/generated/prisma/client";
import { formatPrice, morphGradient, splitTraits } from "@/lib/format";
import { Mascot } from "./Mascot";
import { StatusPill } from "./StatusPill";

export function GliderCard({ glider }: { glider: Glider }) {
  const [from, to] = morphGradient(glider.morph);
  return (
    <Link
      href={`/sugar-glider/${glider.slug}`}
      className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10"
    >
      <div
        className="relative flex h-52 items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {glider.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={glider.imageUrl}
            alt={`${glider.name} — sugar glider ${glider.morph}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Mascot
            className="h-32 w-32 opacity-80 transition-transform duration-500 group-hover:scale-110"
            animated={false}
          />
        )}
        <span className="absolute left-3.5 top-3.5">
          <StatusPill status={glider.status} />
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {glider.name}
          </h3>
          <span className="text-sm font-bold text-brand-strong">
            {formatPrice(glider.price)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted">
          {glider.morph} · {glider.sex === "jantan" ? "Jantan" : "Betina"} ·{" "}
          {glider.ageMonths} bulan
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {splitTraits(glider.traits).slice(0, 2).map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-strong"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
