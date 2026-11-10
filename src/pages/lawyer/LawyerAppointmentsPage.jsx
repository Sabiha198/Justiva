import { useState } from "react";
import { FiCalendar, FiClock, FiCheck, FiX } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Tabs from "../../components/ui/Tabs";
import EmptyState from "../../components/ui/EmptyState";
import { appointments as seed } from "../../data/appointments";
import { currentLawyer } from "../../data/lawyers";
import { useToast } from "../../context/ToastContext";

const tabs = [
  { value: "Upcoming", label: "Upcoming" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export default function LawyerAppointmentsPage() {
  const me = currentLawyer;
  const [appointments, setAppointments] = useState(seed.filter((a) => a.lawyerId === me.id));
  const [active, setActive] = useState("Upcoming");
  const toast = useToast();

  const counts = tabs.reduce((acc, t) => {
    acc[t.value] = appointments.filter((a) => a.status === t.value).length;
    return acc;
  }, {});

  const setStatus = (id, status) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(`Appointment ${status.toLowerCase()}.`);
  };

  const filtered = appointments.filter((a) => a.status === active);

  return (
    <div className="container-page py-8">
      <PageHeader title="Appointments" subtitle="Manage your consultation schedule." />

      <div className="mt-6"><Tabs tabs={tabs} active={active} onChange={setActive} counts={counts} /></div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && <EmptyState icon={FiCalendar} title={`No ${active.toLowerCase()} appointments`} />}
        {filtered.map((a) => (
          <Card key={a.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-slate-400">{a.id}</p>
                <StatusBadge status={a.status} />
              </div>
              <p className="mt-1.5 font-semibold text-ink">{a.clientName}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1"><FiCalendar className="h-3.5 w-3.5" /> {a.date}</span>
                <span className="flex items-center gap-1"><FiClock className="h-3.5 w-3.5" /> {a.time}</span>
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{a.reason}</p>
            </div>
            {a.status === "Pending" && (
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="brass" onClick={() => setStatus(a.id, "Upcoming")}>
                  <FiCheck /> Confirm
                </Button>
                <Button size="sm" variant="subtle" onClick={() => setStatus(a.id, "Cancelled")}>
                  <FiX /> Decline
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
