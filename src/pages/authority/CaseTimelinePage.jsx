import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import { cases } from "../../data/cases";
import { formatDateTime } from "../../utils/format";

// Merges every case's timeline into one reverse-chronological feed —
// a bird's-eye view of everything moving across the authority's cases.
export default function CaseTimelinePage() {
  const events = cases
    .flatMap((c) => c.timeline.map((t) => ({ ...t, caseId: c.id, caseTitle: c.title, status: c.status })))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="container-page py-8">
      <PageHeader title="Case Timeline" subtitle="A combined activity feed across all your assigned cases." />

      <div className="mt-6 space-y-0">
        {events.map((e, i) => (
          <Link key={i} to={`/authority/cases/${e.caseId}`} className="block">
            <div className="flex gap-4 border-l-2 border-line pb-6 pl-5 last:pb-0 hover:border-brass-500">
              <div className="relative -ml-[26px] mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-brass-600 bg-white" />
              <Card className="flex-1 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{e.label} — {e.caseTitle}</p>
                  <span className="font-mono text-xs text-slate-400">{e.caseId}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{formatDateTime(e.timestamp)}</p>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
