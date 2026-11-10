import { useState } from "react";
import { FiFlag, FiCheck, FiX, FiEye } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { moderationQueue as seed } from "../../data/moderation";
import { formatDateTime } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

export default function ReportModerationPage() {
  const [queue, setQueue] = useState(seed);
  const toast = useToast();

  const decide = (id, status) => {
    setQueue((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    toast.success(status === "Reviewed" ? "Report confirmed and kept." : "Flag dismissed.");
  };

  const pending = queue.filter((q) => q.status === "Pending");

  return (
    <div className="container-page py-8">
      <PageHeader title="Report Moderation" subtitle="Reports flagged as potentially false, abusive, or spam." />

      {pending.length === 0 ? (
        <EmptyState icon={FiFlag} title="Nothing to moderate" description="No reports are currently flagged." className="mt-6" />
      ) : (
        <div className="mt-6 space-y-3">
          {pending.map((q) => (
            <Card key={q.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="alert"><FiFlag className="h-3 w-3" /> Flagged</Badge>
                  <span className="font-mono text-xs text-slate-400">{q.reportId}</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-ink">{q.reason}</p>
                <p className="mt-0.5 text-xs text-slate-400">Flagged by {q.flaggedBy} · {formatDateTime(q.flaggedOn)}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.info("Opens the full report — demo only.")}>
                  <FiEye /> Inspect
                </Button>
                <Button size="sm" variant="brass" onClick={() => decide(q.id, "Reviewed")}>
                  <FiCheck /> Keep report
                </Button>
                <Button size="sm" variant="danger" onClick={() => decide(q.id, "Dismissed")}>
                  <FiX /> Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
