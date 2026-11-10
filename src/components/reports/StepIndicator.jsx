import { cn } from "../../utils/cn";
import { FiCheck } from "react-icons/fi";

const steps = ["Incident", "Evidence", "Location", "Done"];

export default function StepIndicator({ current }) {
  return (
    <div className="mb-8 flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  done && "border-navy-800 bg-navy-800 text-white",
                  active && "border-brass-600 bg-brass-600 text-white",
                  !done && !active && "border-line bg-white text-slate-400"
                )}
              >
                {done ? <FiCheck className="h-4 w-4" /> : stepNum}
              </div>
              <span className={cn("mt-1.5 hidden text-xs font-medium sm:block", active ? "text-ink" : "text-slate-400")}>
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <div className={cn("mx-2 h-0.5 flex-1 rounded-full transition-colors", done ? "bg-navy-800" : "bg-line")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
