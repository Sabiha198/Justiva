import { FiLock } from "react-icons/fi";
import ReportWizard from "../../components/reports/ReportWizard";

export default function SubmitReportPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-500">
          <FiLock className="h-3.5 w-3.5 text-brass-600" />
          Secure &amp; Anonymous
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Submit Anonymous Report</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your safety is our priority. All submissions are encrypted and anonymized by default.
        </p>
      </div>
      <div className="mt-10">
        <ReportWizard />
      </div>
    </div>
  );
}
