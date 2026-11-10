import { FiUsers, FiBriefcase, FiShield, FiFileText, FiActivity, FiCheckCircle, FiCalendar, FiHeart } from "react-icons/fi";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import { platformStats, reportsByCategory, monthlyReports, resolutionRate, reportStatusDistribution } from "../../data/statistics";

export default function AdminDashboardPage() {
  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-semibold text-ink">Platform overview</h2>
      <p className="mt-1 text-sm text-slate-500">A snapshot of everything happening on Justiva right now.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={FiUsers} label="Total users" value={platformStats.totalUsers.toLocaleString()} tone="navy" delay={0} />
        <StatCard icon={FiBriefcase} label="Total lawyers" value={platformStats.totalLawyers} tone="brass" delay={0.03} />
        <StatCard icon={FiShield} label="Authorities" value={platformStats.totalAuthorities} tone="navy" delay={0.06} />
        <StatCard icon={FiFileText} label="Crime reports" value={platformStats.totalReports.toLocaleString()} tone="alert" delay={0.09} />
        <StatCard icon={FiActivity} label="Active cases" value={platformStats.activeCases} tone="brass" delay={0.12} />
        <StatCard icon={FiCheckCircle} label="Resolved cases" value={platformStats.resolvedCases.toLocaleString()} tone="pine" delay={0.15} />
        <StatCard icon={FiCalendar} label="Appointments" value={platformStats.appointments.toLocaleString()} tone="navy" delay={0.18} />
        <StatCard icon={FiCheckCircle} label="Verified lawyers" value={platformStats.verifiedLawyers} tone="pine" delay={0.21} />
        <StatCard icon={FiHeart} label="Organizations" value={platformStats.organizations} tone="pine" delay={0.24} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Reports by category</h3>
          <div className="mt-5"><BarChart data={reportsByCategory} orientation="horizontal" /></div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Report status distribution</h3>
          <div className="mt-5"><DonutChart data={reportStatusDistribution} /></div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Monthly reports</h3>
          <div className="mt-5"><LineChart data={monthlyReports} tone="#14304D" valueKey="value" labelKey="month" /></div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Case resolution rate (%)</h3>
          <div className="mt-5"><LineChart data={resolutionRate} tone="#29684E" valueKey="rate" labelKey="month" /></div>
        </Card>
      </div>
    </div>
  );
}
