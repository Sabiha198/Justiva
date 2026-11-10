import { FiMessageSquare, FiThumbsUp, FiFlag, FiActivity } from "react-icons/fi";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import BarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/DonutChart";
import { aiAnalytics } from "../../data/statistics";

export default function AiAnalyticsPage() {
  return (
    <div className="container-page py-8">
      <PageHeader title="AI Analytics" subtitle="Usage patterns for the AI Legal Assistant. No real AI service is connected." />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiMessageSquare} label="Total conversations" value={aiAnalytics.totalConversations.toLocaleString()} tone="navy" delay={0} />
        <StatCard icon={FiActivity} label="Avg. messages / convo" value={aiAnalytics.avgMessagesPerConvo} tone="brass" delay={0.05} />
        <StatCard icon={FiThumbsUp} label="Positive feedback" value={`${aiAnalytics.positiveFeedbackRate}%`} tone="pine" delay={0.1} />
        <StatCard icon={FiFlag} label="Flagged responses" value={aiAnalytics.flaggedResponses} tone="alert" delay={0.15} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Most common questions</h3>
          <div className="mt-5">
            <BarChart
              data={aiAnalytics.topQuestions.map((q) => ({ label: q.question.length > 34 ? q.question.slice(0, 34) + "…" : q.question, value: q.count }))}
              orientation="horizontal"
              tone="brass"
            />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Source usage</h3>
          <div className="mt-5"><DonutChart data={aiAnalytics.sourceUsage.map((s) => ({ label: s.source, value: s.value }))} /></div>
        </Card>
      </div>
    </div>
  );
}
