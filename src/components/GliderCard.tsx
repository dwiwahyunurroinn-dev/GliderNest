import Link from "next/link";
import type { Glider } from "@/lib/types";
import { formatPrice } from "@/data/gliders";
import { GliderMark } from "./GliderMark";
import { StatusPill } from "./StatusPill";

export function GliderCard({ glider }: { glider: Glider }) {
  const [from, to] = glider.palette;
  return (
    <Link
      href={`/gliders/${glider.slug}`}
      className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="relative flex h-48 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <GliderMark className="h-24 w-24 text-night/70 transition-transform group-hover:scale-110" />
        <span className="absolute left-3 top-3">
          <StatusPill status={glider.status} />
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {glider.name}
          </h3>
          <span className="text-sm font-semibold text-brand-strong">
            {formatPrice(glider.price)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted">
          {glider.morph} · {glider.sex === "jantan" ? "Jantan" : "Betina"} ·{" "}
          {glider.ageMonths} bulan
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {glider.traits.slice(0, 2).map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-strong"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
