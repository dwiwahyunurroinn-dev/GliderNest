/** Grafik batang SVG sederhana (server-rendered, tanpa library). */
export function BarChart({
  data,
  height = 180,
  formatValue = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  height?: number;
  formatValue?: (v: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const barW = 100 / data.length;

  return (
    <div>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-label="Grafik batang"
      >
        {data.map((d, i) => {
          const h = Math.max(2, (d.value / max) * (height - 10));
          return (
            <rect
              key={d.label}
              x={i * barW + barW * 0.18}
              y={height - h}
              width={barW * 0.64}
              height={h}
              rx={2.5}
              fill="var(--brand)"
              opacity={d.value === 0 ? 0.25 : 0.9}
            />
          );
        })}
      </svg>
      <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((d) => (
          <div key={d.label} className="text-center">
            <p className="text-[11px] font-semibold text-muted">{d.label}</p>
            <p className="text-[11px] font-bold">{formatValue(d.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
