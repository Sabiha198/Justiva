import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCopy, FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import CaseSeal from "../ui/CaseSeal";
import { useToast } from "../../context/ToastContext";

export default function StepSuccess({ reportId }) {
  const toast = useToast();

  const copyId = () => {
    navigator.clipboard?.writeText(reportId);
    toast.success("Report ID copied to clipboard.");
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <CaseSeal size={80} tone="pine" />
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 font-display text-xl font-semibold text-ink"
      >
        Report successfully submitted
      </motion.h2>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">
        Your report has been securely transmitted. Save your report ID to check its status at any time.
      </p>

      <div className="mt-6 w-full max-w-sm rounded-lg bg-navy-900 p-5 text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Your report ID</p>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-md bg-white/5 px-3.5 py-2.5">
          <span className="font-mono text-sm text-brass-300">{reportId}</span>
          <button onClick={copyId} className="text-slate-400 hover:text-white" aria-label="Copy report ID">
            <FiCopy className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2.5 text-xs text-slate-400">
          Use this ID under Track Report to follow status updates securely.
        </p>
      </div>

<p className="mt-4 max-w-sm text-xs text-slate-400">
  Your report has been saved securely. Keep this ID to track your report later.
</p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button as={Link} to="/citizen/reports/track" variant="outline">
          Track this report
        </Button>
        <Button as={Link} to="/citizen/dashboard" variant="brass">
          Return to dashboard <FiArrowRight />
        </Button>
      </div>
    </div>
  );
}
