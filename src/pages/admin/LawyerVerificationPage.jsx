import { useState } from "react";
import { FiCheckCircle, FiXCircle, FiFileText } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { lawyers } from "../../data/lawyers";
import { useToast } from "../../context/ToastContext";

// A small curated queue built from the unverified demo lawyers, plus a
// couple of synthetic pending applications for a fuller review queue.
const seedQueue = [
  ...lawyers.filter((l) => !l.verified).map((l) => ({ id: l.id, name: l.name, city: l.city, degree: l.degree, status: "Pending" })),
  { id: "app-201", name: "Adv. Imtiaz Karim", city: "Khulna", degree: "LLB, LLM", status: "Pending" },
  { id: "app-202", name: "Adv. Rehana Yasmin", city: "Rajshahi", degree: "LLB, Bar-at-Law", status: "Pending" },
];

export default function LawyerVerificationPage() {
  const [queue, setQueue] = useState(seedQueue);
  const toast = useToast();

  const decide = (id, status) => {
    setQueue((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    toast.success(status === "Verified" ? "Lawyer approved and verified." : "Application rejected.");
  };

  const pending = queue.filter((q) => q.status === "Pending");
  const decided = queue.filter((q) => q.status !== "Pending");

  return (
    <div className="container-page py-8">
      <PageHeader title="Lawyer Verification" subtitle="Review credential submissions and approve or reject applications." />

      <h3 className="mt-7 font-display text-base font-semibold text-ink">Pending review ({pending.length})</h3>
      {pending.length === 0 ? (
        <EmptyState icon={FiCheckCircle} title="Queue is clear" description="No pending lawyer applications." className="mt-3" />
      ) : (
        <div className="mt-3 space-y-3">
          {pending.map((q) => (
            <Card key={q.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-semibold text-white">
                  {q.name.charAt(4) || q.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{q.name}</p>
                  <p className="text-xs text-slate-500">{q.degree} · {q.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="slate" className="hidden sm:inline-flex"><FiFileText className="h-3 w-3" /> 3 documents</Badge>
                <Button size="sm" variant="brass" onClick={() => decide(q.id, "Verified")}>
                  <FiCheckCircle /> Approve
                </Button>
                <Button size="sm" variant="subtle" onClick={() => decide(q.id, "Rejected")}>
                  <FiXCircle /> Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {decided.length > 0 && (
        <>
          <h3 className="mt-8 font-display text-base font-semibold text-ink">Recently decided</h3>
          <div className="mt-3 space-y-2">
            {decided.map((q) => (
              <Card key={q.id} className="flex items-center justify-between p-4">
                <p className="text-sm font-medium text-ink">{q.name}</p>
                <Badge tone={q.status === "Verified" ? "pine" : "alert"}>{q.status}</Badge>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
