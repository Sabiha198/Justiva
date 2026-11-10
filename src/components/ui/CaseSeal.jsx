import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

// Signature element: a circular "case seal" stamp used at moments of
// verification — report submitted, appointment confirmed, verified
// lawyer badges. References the wax-seal / notary-stamp motif that
// ties directly into the legal-documents domain.
export default function CaseSeal({ size = 96, animate = true, tone = "brass", className }) {
  const strokeColor = tone === "brass" ? "var(--color-brass-600)" : "var(--color-pine-600)";
  const fillColor = tone === "brass" ? "var(--color-navy-800)" : "var(--color-navy-800)";

  const content = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Verified seal"
    >
      <circle cx="48" cy="48" r="46" fill={fillColor} />
      <circle cx="48" cy="48" r="38" fill="none" stroke={strokeColor} strokeWidth="1.5" />
      <circle cx="48" cy="48" r="33" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 4" />
      <path
        d="M33 49.5L43 59L65 36"
        stroke={strokeColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ scale: 0.5, rotate: -18, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
    >
      {content}
    </motion.div>
  );
}
