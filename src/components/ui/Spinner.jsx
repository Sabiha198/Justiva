export default function Spinner({ className = "h-4 w-4", tone = "border-current" }) {
  return <span className={`inline-block animate-spin rounded-full border-2 ${tone} border-t-transparent ${className}`} />;
}
