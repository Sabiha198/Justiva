import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { Input, Select } from "../../components/ui/Field";
import { cases, caseStatuses } from "../../data/cases";
import { formatDateTime } from "../../utils/format";

export default function CaseManagementPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const filtered = cases.filter((c) => {
    const matchesQuery = !query.trim() || c.title.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = !status || c.status === status;
    return matchesQuery && matchesStatus;
  });

  const columns = [
    { key: "id", header: "Case ID", className: "font-mono text-xs" },
    { key: "title", header: "Title", className: "max-w-[240px] truncate" },
    { key: "assignedTo", header: "Assigned to" },
    { key: "severity", header: "Severity" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "updatedOn", header: "Last updated", render: (r) => formatDateTime(r.updatedOn) },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader title="Case Management" subtitle="Every case currently open on the platform." />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input className="pl-10" placeholder="Search by case ID or title" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-56">
          <option value="">All statuses</option>
          {caseStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={filtered} onRowClick={(r) => navigate(`/authority/cases/${r.id}`)} />
      </div>
    </div>
  );
}
