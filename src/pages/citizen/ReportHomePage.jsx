import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiPhoneCall, FiArrowRight, FiSearch } from "react-icons/fi";
import Button from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";

export default function ReportHomePage() {
  const toast = useToast();

  const handleEmergency = (e) => {
    e.preventDefault();
    toast.info("This demo can't place real calls — dial 999 directly in an emergency.", { title: "Emergency: 999" });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,134,46,0.08),transparent_55%)]" />
      <div className="container-page relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
        <a
          href="tel:999"
          onClick={handleEmergency}
          className="absolute right-4 top-6 inline-flex items-center gap-2 rounded-full border border-alert-600/30 bg-alert-100 px-4 py-1.5 text-sm font-semibold text-alert-700 hover:bg-alert-600/20 transition-colors sm:right-8"
        >
          <span className="h-2 w-2 rounded-full bg-alert-600" />
          Emergency: 999
        </a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-1.5 text-sm text-white"
        >
          <FiLock className="h-3.5 w-3.5 text-brass-300" />
          Secure &amp; Anonymous Reporting
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-balance mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl"
        >
          Report Incident. <span className="text-navy-700">Protect Identity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-lg text-base leading-relaxed text-slate-500"
        >
          Make your community safer without compromising your safety. Every submission is
          encrypted, and identifying details stay optional at each step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button as={Link} to="/citizen/report/new" variant="brass" size="lg">
            Make Anonymous Report <FiArrowRight />
          </Button>
          <Button as={Link} to="/citizen/reports/track" variant="outline" size="lg">
            <FiSearch /> Track a Report
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center gap-1.5 text-xs text-slate-400"
        >
          <FiPhoneCall className="h-3.5 w-3.5" />
          If someone is in immediate danger, call emergency services first.
        </motion.p>
      </div>
    </div>
  );
}
