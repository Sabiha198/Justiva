import { LuGavel, LuLeaf, LuBuilding2, LuShieldCheck, LuUsers, LuHouse, LuScale } from "react-icons/lu";
import { cn } from "../../utils/cn";

const icons = {
  "criminal-law": LuGavel,
  "environmental-law": LuLeaf,
  "municipal-law": LuBuilding2,
  "security-law": LuShieldCheck,
  "family-law": LuUsers,
  "property-law": LuHouse,
};

const sizes = {
  sm: { box: "h-10 w-10 rounded-lg", icon: "h-5 w-5" },
  md: { box: "h-12 w-12 rounded-xl", icon: "h-6 w-6" },
  lg: { box: "h-20 w-20 rounded-2xl", icon: "h-9 w-9" },
};

// One consistent treatment for every practice area: navy tile, brass line icon.
export default function CategoryIcon({ slug, size = "md", className }) {
  const Icon = icons[slug] || LuScale;
  const s = sizes[size];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-navy-700 to-navy-950 text-brass-300 shadow-card",
        s.box,
        className
      )}
    >
      <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-brass-500/25" />
      <Icon className={cn("relative", s.icon)} strokeWidth={1.7} />
    </span>
  );
}
