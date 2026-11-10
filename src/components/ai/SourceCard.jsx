import { FiLink } from "react-icons/fi";

export default function SourceCard({ source }) {
  return (
    <div className="w-40 shrink-0 rounded-lg bg-navy-800 p-3.5 text-white sm:w-44">
      <p className="line-clamp-2 text-xs font-medium leading-snug">{source.title}</p>
      <p className="mt-2 flex items-center gap-1 truncate text-[11px] text-slate-400">
        <FiLink className="h-3 w-3 shrink-0" /> {source.url}
      </p>
    </div>
  );
}
