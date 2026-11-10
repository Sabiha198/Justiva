import { cn } from "../../utils/cn";

export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {required && <span className="text-alert-600"> *</span>}
    </label>
  );
}

export function ErrorText({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-alert-600">{children}</p>;
}

export function HelpText({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-slate-500">{children}</p>;
}

const fieldBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brass-300";

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(fieldBase, error ? "border-alert-600" : "border-line focus:border-brass-600", className)}
      {...props}
    />
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(fieldBase, "resize-none", error ? "border-alert-600" : "border-line focus:border-brass-600", className)}
      {...props}
    />
  );
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(fieldBase, "appearance-none bg-no-repeat", error ? "border-alert-600" : "border-line focus:border-brass-600", className)}
      {...props}
    >
      {children}
    </select>
  );
}
