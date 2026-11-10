import { cn } from "../../utils/cn";

export default function Card({ className, tab, children, ...props }) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-line bg-white shadow-card",
        className
      )}
      {...props}
    >
      {tab && (
        <span
          className="absolute -top-2 left-5 h-2 w-10 rounded-t-sm"
          style={{ backgroundColor: tab }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
