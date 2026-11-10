import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function StatCard({ icon: Icon, label, value, delta, tone = "navy", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-lg border border-line bg-white p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        {Icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              tone === "navy" && "bg-navy-50 text-navy-700",
              tone === "brass" && "bg-brass-100 text-brass-700",
              tone === "pine" && "bg-pine-100 text-pine-700",
              tone === "alert" && "bg-alert-100 text-alert-700"
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-2.5 font-display text-2xl font-semibold text-ink">{value}</p>
      {delta && <p className="mt-1 text-xs font-medium text-pine-700">{delta}</p>}
    </motion.div>
  );
}
