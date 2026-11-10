import { cn } from "../../utils/cn";

const tones = {
  navy: "bg-navy-50 text-navy-800 border-navy-100",
  brass: "bg-brass-100 text-brass-700 border-brass-300",
  pine: "bg-pine-100 text-pine-700 border-pine-100",
  alert: "bg-alert-100 text-alert-700 border-alert-100",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function Badge({ tone = "navy", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
