import { useState } from "react";
import { Link } from "react-router-dom";
import { FiImage, FiFile, FiArchive, FiSearch } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import { Input } from "../../components/ui/Field";
import { cases } from "../../data/cases";

const iconByType = { image: FiImage, document: FiFile, archive: FiArchive };

export default function EvidencePage() {
  const [query, setQuery] = useState("");

  const allEvidence = cases.flatMap((c) => c.evidence.map((e) => ({ ...e, caseId: c.id, caseTitle: c.title })));
  const filtered = allEvidence.filter(
    (e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.caseId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container-page py-8">
      <PageHeader title="Evidence" subtitle="All evidence submitted across your assigned cases." />

      <div className="relative mt-5 max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search evidence or case ID" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => {
          const Icon = iconByType[e.type] || FiFile;
          return (
            <Link key={e.id} to={`/authority/cases/${e.caseId}`}>
              <Card className="p-4 transition-shadow hover:shadow-lift">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{e.name}</p>
                    <p className="truncate text-xs text-slate-400">{e.caseTitle}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">{e.caseId}</span>
                  <Badge tone={e.status === "Verified" ? "pine" : "brass"} className="!py-0.5">{e.status}</Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
