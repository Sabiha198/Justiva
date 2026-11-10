import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function Logo({ dark = false, className, to = "/" }) {
  return (
    <Link to={to} className={cn("inline-flex items-center gap-2.5 group", className)}>
      <svg width="30" height="30" viewBox="0 0 64 64" className="shrink-0">
        <circle cx="32" cy="32" r="30" fill={dark ? "#F6F5F1" : "#14304D"} />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#B8862E" strokeWidth="1.5" />
        <path
          d="M32 16 L32 40 M22 22 L42 22 M20 22 L16 34 A6 6 0 0 0 28 34 L24 22 M44 22 L40 34 A6 6 0 0 0 52 34 L48 22 M24 46 L40 46"
          fill="none"
          stroke={dark ? "#14304D" : "#F6F5F1"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn("font-display text-xl font-semibold tracking-tight", dark ? "text-paper" : "text-navy-900")}>
        Justiva
      </span>
    </Link>
  );
}
