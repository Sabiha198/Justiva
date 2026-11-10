import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "../../utils/cn";

export default function MiniCalendar({ selected, onSelect }) {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const monthLabel = viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))} className="rounded-md p-1.5 text-slate-400 hover:bg-navy-50 hover:text-navy-800">
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-ink">{monthLabel}</p>
        <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} className="rounded-md p-1.5 text-slate-400 hover:bg-navy-50 hover:text-navy-800">
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const isPast = date < today;
          const isSelected = selected && date.toDateString() === selected.toDateString();
          return (
            <button
              type="button"
              key={i}
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={cn(
                "aspect-square rounded-md text-sm transition-colors",
                isPast && "cursor-not-allowed text-slate-200",
                !isPast && !isSelected && "text-slate-600 hover:bg-navy-50",
                isSelected && "bg-brass-600 text-white font-semibold"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
