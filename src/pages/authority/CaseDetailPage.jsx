import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { FiArrowLeft, FiFile, FiImage, FiSend, FiCheckCircle } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Field";
import { getCaseById } from "../../data/cases";
import { formatDateTime } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

export default function CaseDetailPage() {
  const { id } = useParams();
  const caseItem = getCaseById(id);
  const [notes, setNotes] = useState(caseItem?.notes || []);
  const [note, setNote] = useState("");
  const toast = useToast();

  if (!caseItem) return <Navigate to="/authority/cases" replace />;

  const addNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNotes((prev) => [...prev, { author: "You", timestamp: new Date().toISOString(), note }]);
    setNote("");
    toast.success("Investigation note added.");
  };

  return (
    <div className="container-page py-8">
      <Link to="/authority/cases" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800">
        <FiArrowLeft className="h-4 w-4" /> All cases
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink">{caseItem.title}</h1>
        <StatusBadge status={caseItem.status} />
      </div>
      <p className="mt-1 font-mono text-sm text-slate-400">{caseItem.id} · linked report {caseItem.reportId}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Case timeline</h3>
            <ol className="mt-4 space-y-4">
              {caseItem.timeline.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white">
                    <FiCheckCircle className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.label}</p>
                    <p className="text-xs text-slate-400">{formatDateTime(t.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Investigation notes</h3>
            <div className="mt-4 space-y-3">
              {notes.map((n, i) => (
                <div key={i} className="rounded-lg border border-line px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">{n.author}</p>
                    <p className="text-xs text-slate-400">{formatDateTime(n.timestamp)}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{n.note}</p>
                </div>
              ))}
            </div>
            <form onSubmit={addNote} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Textarea rows={1} placeholder="Add an investigation note…" value={note} onChange={(e) => setNote(e.target.value)} className="!py-2.5" />
              <Button type="submit" variant="outline" className="sm:w-32"><FiSend /> Add</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Case details</h3>
            <div className="mt-3 space-y-2.5 text-sm">
              <p className="flex justify-between"><span className="text-slate-400">Reporter</span><span className="font-medium text-ink">{caseItem.reporter}</span></p>
              <p className="flex justify-between"><span className="text-slate-400">Location</span><span className="font-medium text-ink text-right">{caseItem.location}</span></p>
              <p className="flex justify-between"><span className="text-slate-400">Type</span><span className="font-medium text-ink">{caseItem.type}</span></p>
              <p className="flex justify-between"><span className="text-slate-400">Severity</span><span className="font-medium text-ink">{caseItem.severity}</span></p>
              <p className="flex justify-between"><span className="text-slate-400">Assigned to</span><span className="font-medium text-ink">{caseItem.assignedTo}</span></p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Evidence</h3>
            <div className="mt-3 space-y-2.5">
              {caseItem.evidence.length === 0 && <p className="text-sm text-slate-400">No evidence attached.</p>}
              {caseItem.evidence.map((e) => (
                <div key={e.id} className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5">
                  {e.type === "image" ? <FiImage className="h-4 w-4 text-slate-400" /> : <FiFile className="h-4 w-4 text-slate-400" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-ink">{e.name}</p>
                    <Badge tone={e.status === "Verified" ? "pine" : "brass"} className="mt-1 !py-0.5">{e.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
