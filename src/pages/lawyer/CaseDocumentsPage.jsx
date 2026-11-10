import { useState } from "react";
import { FiUpload, FiFileText, FiDownload, FiSearch } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Field";
import { caseDocuments } from "../../data/lawyerPanel";
import { useToast } from "../../context/ToastContext";

export default function CaseDocumentsPage() {
  const [query, setQuery] = useState("");
  const toast = useToast();

  const filtered = caseDocuments.filter(
    (d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.client.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container-page py-8">
      <PageHeader
        title="Case Documents"
        subtitle="Organize documents by client and case."
        actions={
          <Button variant="brass" onClick={() => toast.info("File upload is a UI-only demo — nothing is stored.")}>
            <FiUpload /> Upload document
          </Button>
        }
      />

      <div className="relative mt-5 max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search documents or clients…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((d) => (
          <Card key={d.id} className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <FiFileText className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{d.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <Badge tone="navy" className="!py-0.5">{d.category}</Badge>
                <span>{d.client}</span>
                <span>· {d.size}</span>
                <span>· {d.uploadedOn}</span>
              </div>
            </div>
            <button
              onClick={() => toast.info("This is a demo document — nothing to download yet.")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-slate-500 hover:border-slate-300 hover:text-navy-800"
              aria-label={`Download ${d.name}`}
            >
              <FiDownload className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
