import { FiStar } from "react-icons/fi";

export default function RatingStars({ rating = 0, size = "h-3.5 w-3.5", showValue = true, reviews }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex items-center gap-0.5 text-brass-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} className={size} fill={i < Math.round(rating) ? "currentColor" : "none"} />
        ))}
      </span>
      {showValue && <span className="text-xs font-medium text-slate-500">({typeof rating === "number" && Number.isFinite(rating)
  ? rating.toFixed(1)
  : "Not rated"})</span>}
      {reviews != null && <span className="text-xs text-slate-400">· {reviews} reviews</span>}
    </span>
  );
}
