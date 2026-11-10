import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { Input, Select } from "../../components/ui/Field";
import { reports, incidentTypes, statusSteps } from "../../data/crimeReports";
import { formatDateTime } from "../../utils/format";

// Platform-wide view of every report filed — sourced from the reports
// queue (not `cases`), since a report exists whether or not it has
// been picked up and opened as a case yet.
const typeLabel = (value) => incidentTypes.find((t) => t.value === value)?.label || value;
const allStatuses = [...statusSteps, "Additional Information Required", "Closed"];

export default function CrimeReportsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const filtered = reports.filter((r) => {
    const q = !query.trim() || r.title.toLowerCase().includes(query.toLowerCase()) || r.reportId.toLowerCase().includes(query.toLowerCase());
    const s = !status || r.status === status;
    return q && s;
  });

  const columns = [
    { key: "reportId", header: "Report ID", className: "font-mono text-xs" },
    { key: "title", header: "Title", className: "max-w-[220px] truncate" },
    { key: "type", header: "Type", render: (r) => typeLabel(r.type) },
    { key: "reporter", header: "Reporter" },
    { key: "priority", header: "Priority" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "submittedOn", header: "Submitted", render: (r) => formatDateTime(r.submittedOn) },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader title="Crime Reports" subtitle="Platform-wide view of every report filed." />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input className="pl-10" placeholder="Search by report ID or title" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-56">
          <option value="">All statuses</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </div>

      <div className="mt-5"><DataTable columns={columns} rows={filtered} /></div>
    </div>
  );
}
