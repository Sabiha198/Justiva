import { useState } from "react";
import { FiEye, FiCheck, FiX, FiUserPlus } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { Select, Label } from "../../components/ui/Field";
import { reports as seed, incidentTypes } from "../../data/crimeReports";
import { authorities } from "../../data/authorities";
import { formatDateTime } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

// Reports are the citizen-facing intake queue — distinct from `cases`,
// which only exist once an authority has reviewed and assigned a
// report. This page works off the reports dataset so "New reports"
// here (and the matching dashboard stat) never gets mixed up with
// case-stage statistics.
const typeLabel = (value) => incidentTypes.find((t) => t.value === value)?.label || value;

export default function ReportsReviewPage() {
  const [rows, setRows] = useState(seed);
  const [selected, setSelected] = useState(null);
  const [assignTo, setAssignTo] = useState("");
  const toast = useToast();

  const columns = [
    { key: "reportId", header: "Report ID", className: "font-mono text-xs" },
    { key: "title", header: "Title", className: "max-w-[220px] truncate" },
    { key: "type", header: "Type", render: (r) => typeLabel(r.type) },
    { key: "priority", header: "Priority" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "submittedOn", header: "Submitted", render: (r) => formatDateTime(r.submittedOn) },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelected(r); setAssignTo(r.assignedOfficer || ""); }}>
          <FiEye /> Review
        </Button>
      ),
    },
  ];

  const updateStatus = (reportId, status) => {
    setRows((prev) => prev.map((r) => (r.reportId === reportId ? { ...r, status } : r)));
    setSelected(null);
    toast.success(`Report ${reportId} marked as ${status}.`);
  };

  const assignReport = () => {
    setRows((prev) =>
      prev.map((r) => (r.reportId === selected.reportId ? { ...r, assignedOfficer: assignTo, status: "Assigned" } : r))
    );
    toast.success(`Report ${selected.reportId} assigned to ${assignTo}.`);
    setSelected(null);
  };

  const canTriage = selected && (selected.status === "Submitted" || selected.status === "Under Review");

  return (
    <div className="container-page py-8">
      <PageHeader title="Reports" subtitle="Review incoming citizen reports and assign them to an officer." />

      <div className="mt-6"><DataTable columns={columns} rows={rows} onRowClick={(r) => { setSelected(r); setAssignTo(r.assignedOfficer || ""); }} /></div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} maxWidth="max-w-lg">
        {selected && (
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-400">{selected.reportId}</span>
              <StatusBadge status={selected.status} />
              {selected.caseId && <span className="text-xs text-slate-400">· Case {selected.caseId}</span>}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-slate-400">Reporter</p><p className="font-medium text-ink">{selected.reporter}</p></div>
              <div><p className="text-xs text-slate-400">Location</p><p className="font-medium text-ink">{selected.location}</p></div>
              <div><p className="text-xs text-slate-400">Priority</p><p className="font-medium text-ink">{selected.priority}</p></div>
              <div><p className="text-xs text-slate-400">Type</p><p className="font-medium text-ink">{typeLabel(selected.type)}</p></div>
              <div className="col-span-2"><p className="text-xs text-slate-400">Department</p><p className="font-medium text-ink">{selected.department}</p></div>
            </div>

            {canTriage ? (
              <>
                <div className="mt-4">
                  <Label htmlFor="assignTo">Assign to officer</Label>
                  <Select id="assignTo" value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
                    <option value="">Select an officer</option>
                    {authorities.map((a) => (
                      <option key={a.id} value={a.name}>{a.name} — {a.department}</option>
                    ))}
                  </Select>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Button variant="brass" onClick={assignReport} disabled={!assignTo}>
                    <FiUserPlus /> Assign report
                  </Button>
                  <Button variant="subtle" onClick={() => updateStatus(selected.reportId, "Under Review")}>
                    <FiCheck /> Accept report
                  </Button>
                  <Button variant="danger" className="col-span-2" onClick={() => updateStatus(selected.reportId, "Closed")}>
                    <FiX /> Reject / close
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                This report has already been triaged{selected.caseId ? ` and is tracked as case ${selected.caseId}.` : "."}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
