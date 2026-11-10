import { FiX, FiClock } from "react-icons/fi";
import { Select } from "../ui/Field";
import { categories } from "../../data/lawyers";
import { feeOptions, sortOptions, getLanguages } from "../../utils/lawyerSearch";
import { cn } from "../../utils/cn";

const languages = getLanguages();

function Chip({ active, onClick, children, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-navy-800 bg-navy-800 text-white"
          : "border-line bg-white text-slate-600 hover:border-navy-300 hover:text-navy-800"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Specialty chips + language / fee / sort controls + "Open today" toggle.
export default function LawyerFilterBar({ filters, onChange, onClear, activeCount }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="mt-5 space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin" role="group" aria-label="Specialty">
        <Chip active={!filters.category} onClick={() => set("category", "")}>
          All specialties
        </Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={filters.category === c.slug} onClick={() => set("category", c.slug)}>
            {c.title}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-40">
          <Select aria-label="Language" value={filters.language} onChange={(e) => set("language", e.target.value)}>
            <option value="">Any language</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
        </div>

        <div className="w-44">
          <Select aria-label="Maximum fee" value={filters.maxFee} onChange={(e) => set("maxFee", e.target.value)}>
            <option value="">Any fee</option>
            {feeOptions.map((f) => (
              <option key={f} value={f}>Up to {f.toLocaleString()} BDT</option>
            ))}
          </Select>
        </div>

        <Chip active={filters.openToday} onClick={() => set("openToday", !filters.openToday)}>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-3.5 w-3.5" aria-hidden="true" /> Open today
          </span>
        </Chip>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 hover:text-brass-600"
          >
            <FiX className="h-3.5 w-3.5" aria-hidden="true" /> Clear filters ({activeCount})
          </button>
        )}

        <div className="w-full sm:ml-auto sm:w-48">
          <Select aria-label="Sort lawyers" value={filters.sort} onChange={(e) => set("sort", e.target.value)}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>Sort: {o.label}</option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
