import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-navy-800 text-white hover:bg-navy-900 focus-visible:outline-navy-800",
  brass: "bg-brass-600 text-white hover:bg-brass-700 focus-visible:outline-brass-600",
  outline: "border border-navy-800 text-navy-800 hover:bg-navy-50",
  ghost: "text-navy-800 hover:bg-navy-50",
  danger: "bg-alert-600 text-white hover:bg-alert-700",
  subtle: "bg-white text-navy-800 border border-line hover:border-navy-300 hover:bg-navy-50",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

const Button = forwardRef(
  ({ as: As = "button", variant = "primary", size = "md", className, children, loading, disabled, ...props }, ref) => {
    return (
      <As
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </As>
    );
  }
);

Button.displayName = "Button";
export default Button;
