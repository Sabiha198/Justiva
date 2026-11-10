import { useState } from "react";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import Tabs from "../../components/ui/Tabs";
import EmptyState from "../../components/ui/EmptyState";
import { consultationRequests as seed } from "../../data/lawyerPanel";
import { formatDateTime } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const tabs = [
  { value: "Pending", label: "Pending" },
  { value: "Accepted", label: "Accepted" },
  { value: "Declined", label: "Declined" },
];

export default function ConsultationRequestsPage() {
  const [requests, setRequests] = useState(seed);
  const [active, setActive] = useState("Pending");
  const toast = useToast();

  const counts = tabs.reduce((acc, t) => {
    acc[t.value] = requests.filter((r) => r.status === t.value).length;
    return acc;
  }, {});

  const respond = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(status === "Accepted" ? "Request accepted — client notified." : "Request declined.");
  };

  const filtered = requests.filter((r) => r.status === active);

  return (
    <div className="container-page py-8">
      <PageHeader title="Consultation Requests" subtitle="Review and respond to new client requests." />

      <div className="mt-6"><Tabs tabs={tabs} active={active} onChange={setActive} counts={counts} /></div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && <EmptyState icon={FiClock} title={`No ${active.toLowerCase()} requests`} />}
        {filtered.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink">{r.clientName}</p>
                  {r.urgency === "Urgent" && <Badge tone="alert">Urgent</Badge>}
                </div>
                <p className="mt-0.5 text-sm text-slate-600">{r.topic}</p>
                <p className="mt-2 text-sm text-slate-500">{r.message}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDateTime(r.submittedOn)}</p>
              </div>
              {r.status === "Pending" && (
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="brass" onClick={() => respond(r.id, "Accepted")}>
                    <FiCheck /> Accept
                  </Button>
                  <Button size="sm" variant="subtle" onClick={() => respond(r.id, "Declined")}>
                    <FiX /> Decline
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
