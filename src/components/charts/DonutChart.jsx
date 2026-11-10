const colors = ["#14304D", "#B8862E", "#29684E", "#B3402A", "#5B6B7C", "#2A5279", "#93691F"];

export default function DonutChart({ data, size = 160 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;

  // Precompute each slice's dash length and starting offset without
  // mutating a variable across the map — keeps the render pure.
  const slices = data.reduce((acc, d) => {
    const dash = (d.value / total) * circumference;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    acc.push({ ...d, dash, offset });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {slices.map((d, i) => (
            <circle
              key={d.label}
              r={radius}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="16"
              strokeDasharray={`${d.dash} ${circumference - d.dash}`}
              strokeDashoffset={-d.offset}
            />
          ))}
        </g>
      </svg>
      <ul className="space-y-1.5 text-sm">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-slate-600">{d.label}</span>
            <span className="ml-auto font-medium text-ink">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
