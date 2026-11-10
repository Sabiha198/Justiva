import { motion } from "framer-motion";

// Small dependency-free horizontal/vertical bar chart for the admin
// dashboards. `data`: [{ label, value }]
export default function BarChart({ data, orientation = "vertical", tone = "navy", height = 180, formatValue }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  if (orientation === "horizontal") {
    return (
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">{d.label}</span>
              <span className="text-slate-400">{formatValue ? formatValue(d.value) : d.value}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={tone === "brass" ? "h-full rounded-full bg-brass-500" : "h-full rounded-full bg-navy-700"}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-medium text-slate-500">{formatValue ? formatValue(d.value) : d.value}</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * (height - 40)}px` }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="w-full rounded-t-md bg-navy-700"
          />
          <span className="text-xs text-slate-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
