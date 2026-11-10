import { Link } from "react-router-dom";
import {
  FiFileText,
  FiClock,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { cases } from "../../data/cases";
import { reports } from "../../data/crimeReports";

export default function AuthorityDashboardPage() {
  const { user } = useAuth();

  const newReports = reports.filter(
    (r) => r.status === "Submitted" || r.status === "Under Review"
  );

  const activeInvestigations = cases.filter(
    (c) => c.status === "Investigation"
  );

  const infoRequired = cases.filter(
    (c) => c.status === "Additional Information Required"
  );

  const resolved = cases.filter(
    (c) => c.status === "Resolved" || c.status === "Closed"
  );

  return (
    <div className="container-page py-8">
      <div>
        <p className="text-sm text-slate-500">Welcome back,</p>

        <h2 className="font-display text-2xl font-semibold text-ink">
          {user?.name || "User"}
        </h2>
      </div>

      

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiFileText} label="New reports" value={newReports.length} tone="navy" delay={0} />
        <StatCard icon={FiActivity} label="Active investigations" value={activeInvestigations.length} tone="brass" delay={0.05} />
        <StatCard icon={FiAlertTriangle} label="Info required" value={infoRequired.length} tone="alert" delay={0.1} />
        <StatCard icon={FiCheckCircle} label="Resolved cases" value={resolved.length} tone="pine" delay={0.15} />
      </div>

      <Card className="mt-8 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Cases needing attention</h3>
          <Link to="/authority/cases" className="text-sm font-semibold text-navy-800 hover:text-brass-600">View all cases</Link>
        </div>
        <div className="mt-4 space-y-3">
          {cases.slice(0, 5).map((c) => (
            <Link key={c.id} to="/authority/cases" className="flex items-center justify-between rounded-lg border border-line px-4 py-3 hover:bg-navy-50/40">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-slate-400">{c.id}</p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-1 truncate text-sm font-semibold text-ink">{c.title}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                <FiClock className="mr-1 inline h-3 w-3" /> {c.assignedTo}
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
