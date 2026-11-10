import { useState } from "react";
import { FiUpload, FiFileText, FiCheckCircle, FiClock } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { credentialDocuments } from "../../data/lawyerPanel";
import { useToast } from "../../context/ToastContext";

export default function CredentialVerificationPage() {
  const [docs, setDocs] = useState(credentialDocuments);
  const toast = useToast();
  const allVerified = docs.every((d) => d.status === "Verified");

  const simulateUpload = (id) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Under Review", uploadedOn: "Just now" } : d)));
    toast.success("Document uploaded — pending admin review.");
  };

  return (
    <div className="container-page py-8">
      <PageHeader title="Credential Verification" subtitle="Upload and track the documents required to verify your practice." />

      <Card className={`mt-6 flex items-center gap-4 p-5 ${allVerified ? "border-pine-100 bg-pine-100/30" : "border-brass-300 bg-brass-100/30"}`}>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${allVerified ? "bg-pine-700 text-white" : "bg-brass-600 text-white"}`}>
          {allVerified ? <FiCheckCircle className="h-5 w-5" /> : <FiClock className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">
            {allVerified ? "You're a Verified Lawyer" : "Verification in progress"}
          </p>
          <p className="text-xs text-slate-500">
            {allVerified ? "All required documents have been verified." : "One or more documents are still under review."}
          </p>
        </div>
        {allVerified && <Badge tone="pine" className="ml-auto">Verified Lawyer ✓</Badge>}
      </Card>

      <div className="mt-6 space-y-3">
        {docs.map((d) => (
          <Card key={d.id} className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <FiFileText className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{d.label}</p>
              <p className="text-xs text-slate-400">Uploaded {d.uploadedOn}</p>
            </div>
            <StatusBadge status={d.status} className="shrink-0" />
            <button
              onClick={() => simulateUpload(d.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-slate-500 hover:border-slate-300 hover:text-navy-800"
              aria-label={`Re-upload ${d.label}`}
            >
              <FiUpload className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
