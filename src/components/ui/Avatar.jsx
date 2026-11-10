import { useState } from "react";
import { cn } from "../../utils/cn";

// First letters of the first two words, ignoring titles like "Adv." / "Dr."
function getInitials(name = "") {
  const words = name.replace(/\b(adv|dr|mr|mrs|ms)\.?\s+/gi, "").trim().split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] || "") + (words[1]?.[0] || "")).toUpperCase() || "J";
}

// Consistent fallback portrait: navy gradient, brass ring, serif initials.
export function MonogramAvatar({ name, className = "h-12 w-12", textClass = "text-base", rounded = "rounded-full" }) {
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-navy-600 to-navy-950 font-display font-semibold text-brass-300 ring-2 ring-brass-500/40",
        rounded,
        textClass,
        className
      )}
    >
      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-brass-500/20" />
      <span className="relative">{getInitials(name)}</span>
    </div>
  );
}

// Uses a real photo when one exists, otherwise the monogram.
// To add a photo, drop it in  public/lawyers/<lawyer id>.jpg  (for example public/lawyers/lw-001.jpg).
// Every photo gets the same soft navy tint so the set looks consistent.
export function LawyerAvatar({ lawyer, className = "h-14 w-14", textClass = "text-lg", rounded = "rounded-full" }) {
  const sources = [
    `/lawyers/${lawyer.id}.jpg`,
    lawyer.photo && !lawyer.photo.includes("dicebear") ? lawyer.photo : null,
  ].filter(Boolean);

  const [failed, setFailed] = useState(0);

  if (failed >= sources.length) {
    return <MonogramAvatar name={lawyer.name} className={className} textClass={textClass} rounded={rounded} />;
  }

  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-navy-100 ring-2 ring-brass-500/40", rounded, className)}>
      <img
        src={sources[failed]}
        alt={lawyer.name}
        className="h-full w-full object-cover saturate-[.85]"
        loading="lazy"
        onError={() => setFailed((n) => n + 1)}
      />
      <div className="pointer-events-none absolute inset-0 bg-navy-900/10 mix-blend-multiply" />
    </div>
  );
}
