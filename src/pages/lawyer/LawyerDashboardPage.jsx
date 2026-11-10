import { Link } from "react-router-dom";
import { FiMessageSquare, FiCalendar, FiCheckCircle, FiStar, FiArrowRight } from "react-icons/fi";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRole } from "../../context/RoleContext";
import { consultationRequests, clients } from "../../data/lawyerPanel";
import { appointments } from "../../data/appointments";
import { currentLawyer } from "../../data/lawyers";

export default function LawyerDashboardPage() {
  const { meta } = useRole();
  const me = currentLawyer;
  const pending = consultationRequests.filter((r) => r.status === "Pending");
  const todays = appointments.filter((a) => a.lawyerId === me.id && a.status === "Upcoming").slice(0, 3);

  return (
    <div className="container-page py-8">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h2 className="font-display text-2xl font-semibold text-ink">{meta?.demoName}</h2>
        </div>
        <Link to="/lawyer/profile" className="text-sm font-semibold text-navy-800 hover:text-brass-600">
          View profile
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiMessageSquare} label="Pending requests" value={pending.length} tone="brass" delay={0} />
        <StatCard icon={FiCalendar} label="Upcoming appointments" value={appointments.filter((a) => a.lawyerId === me.id && a.status === "Upcoming").length} tone="navy" delay={0.05} />
        <StatCard icon={FiCheckCircle} label="Completed consultations" value={appointments.filter((a) => a.lawyerId === me.id && a.status === "Completed").length} tone="pine" delay={0.1} />
        <StatCard icon={FiStar} label="Average rating" value={me.rating.toFixed(1)} tone="brass" delay={0.15} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">Consultation requests</h3>
            <Link to="/lawyer/requests" className="text-sm font-semibold text-navy-800 hover:text-brass-600">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {pending.length === 0 && <p className="text-sm text-slate-400">No pending requests right now.</p>}
            {pending.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-line px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{r.clientName}</p>
                  <p className="truncate text-xs text-slate-500">{r.topic}</p>
                </div>
                <StatusBadge status={r.urgency === "Urgent" ? "Cancelled" : "Pending"} className="shrink-0" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">Today's schedule</h3>
            <Link to="/lawyer/appointments" className="text-sm font-semibold text-navy-800 hover:text-brass-600">
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {todays.length === 0 && <p className="text-sm text-slate-400">No appointments today.</p>}
            {todays.map((a) => (
              <div key={a.id} className="rounded-lg border border-line px-3.5 py-2.5">
                <p className="text-sm font-semibold text-ink">{a.clientName}</p>
                <p className="text-xs text-slate-500">{a.time} · {a.mode}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Recent clients</h3>
          <Link to="/lawyer/clients" className="text-sm font-semibold text-navy-800 hover:text-brass-600">View all</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clients.slice(0, 4).map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white">
                {c.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                <p className="text-xs text-slate-400">{c.totalConsultations} consultations</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
