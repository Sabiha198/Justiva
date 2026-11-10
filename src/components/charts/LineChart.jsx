export default function LineChart({ data, height = 160, tone = "#B8862E", valueKey = "value", labelKey = "month" }) {
  const width = 560;
  const max = Math.max(...data.map((d) => d[valueKey]));
  const min = Math.min(...data.map((d) => d[valueKey]));
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);

  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = height - ((d[valueKey] - min) / range) * (height - 24) - 12;
    return `${x},${y}`;
  });

  const pathD = `M${points.join(" L")}`;
  const areaD = `${pathD} L${width},${height} L0,${height} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[420px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="0.18" />
            <stop offset="100%" stopColor={tone} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#lineFill)" />
        <path d={pathD} fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = i * stepX;
          const y = height - ((d[valueKey] - min) / range) * (height - 24) - 12;
          return <circle key={i} cx={x} cy={y} r="3.5" fill={tone} />;
        })}
      </svg>
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        {data.map((d) => (
          <span key={d[labelKey]}>{d[labelKey]}</span>
        ))}
      </div>
    </div>
  );
}
