import { useState } from "react";
import { FiSearch, FiAlertTriangle } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Input, Select } from "../../components/ui/Field";
import { appointments as seed, appointmentStatuses } from "../../data/appointments";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);
  const toast = useToast();

  const filtered = appointments.filter((a) => {
    const q = !query.trim() || a.lawyerName.toLowerCase().includes(query.toLowerCase()) || a.clientName.toLowerCase().includes(query.toLowerCase());
    const s = !status || a.status === status;
    return q && s;
  });

  const cancelAppointment = () => {
    setAppointments((prev) => prev.map((a) => (a.id === cancelTarget.id ? { ...a, status: "Cancelled" } : a)));
    toast.success(`Appointment ${cancelTarget.id} cancelled by admin.`);
  };

  const columns = [
    { key: "id", header: "ID", className: "font-mono text-xs" },
    { key: "clientName", header: "Client" },
    { key: "lawyerName", header: "Lawyer" },
    { key: "date", header: "Date" },
    { key: "time", header: "Time" },
    { key: "fee", header: "Fee", render: (a) => formatCurrency(a.fee) },
    { key: "status", header: "Status", render: (a) => <StatusBadge status={a.status} /> },
    {
      key: "actions",
      header: "",
      render: (a) =>
        (a.status === "Upcoming" || a.status === "Pending") && (
          <Button size="sm" variant="subtle" onClick={(e) => { e.stopPropagation(); setCancelTarget(a); }}>
            <FiAlertTriangle /> Cancel
          </Button>
        ),
    },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader title="Appointments" subtitle="Monitor and moderate appointments across the platform." />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input className="pl-10" placeholder="Search by client or lawyer" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48">
          <option value="">All statuses</option>
          {appointmentStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </div>

      <div className="mt-5"><DataTable columns={columns} rows={filtered} /></div>

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={cancelAppointment}
        title="Cancel appointment"
        description={`Cancel appointment ${cancelTarget?.id} between ${cancelTarget?.clientName} and ${cancelTarget?.lawyerName}?`}
        confirmLabel="Cancel appointment"
        tone="danger"
      />
    </div>
  );
}
