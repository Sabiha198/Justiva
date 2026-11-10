import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../components/ui/Button";
import CaseSeal from "../components/ui/CaseSeal";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <CaseSeal size={72} animate={false} />
      <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button as={Link} to="/" variant="brass" className="mt-6">
        <FiArrowLeft /> Back to home
      </Button>
    </div>
  );
}
