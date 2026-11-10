import { cn } from "../../utils/cn";

export default function Tabs({ tabs, active, onChange, counts }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-white p-1 scrollbar-thin">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
            active === tab.value ? "bg-navy-800 text-white" : "text-slate-500 hover:bg-navy-50 hover:text-navy-800"
          )}
        >
          {tab.label}
          {counts?.[tab.value] != null && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-xs",
                active === tab.value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              )}
            >
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
