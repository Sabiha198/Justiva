import { FiFileText, FiDownload, FiCalendar, FiBookOpen, FiFolder } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import { useToast } from "../../context/ToastContext";

const documents = [
  { id: "doc-1", name: "Report Receipt — JST-24A1F9.pdf", category: "Report Receipt", icon: FiFileText, date: "2026-08-02" },
  { id: "doc-2", name: "Report Receipt — JST-77AA11.pdf", category: "Report Receipt", icon: FiFileText, date: "2026-08-18" },
  { id: "doc-3", name: "Appointment Confirmation — APT-7F2K91QZ.pdf", category: "Appointment", icon: FiCalendar, date: "2026-08-15" },
  { id: "doc-4", name: "Getting a Protection Order (saved guide).pdf", category: "Legal Resource", icon: FiBookOpen, date: "2026-08-10" },
  { id: "doc-5", name: "Case Notes Summary — CASE-2026-0142.pdf", category: "Case Document", icon: FiFolder, date: "2026-08-05" },
];

const categoryTone = {
  "Report Receipt": "alert",
  Appointment: "navy",
  "Legal Resource": "brass",
  "Case Document": "pine",
};

export default function SavedDocumentsPage() {
  const toast = useToast();

  return (
    <div className="container-page py-8">
      <PageHeader title="Saved Documents" subtitle="Report receipts, appointment confirmations, and saved resources." />

      <div className="mt-6 space-y-3">
        {documents.map((d) => (
          <Card key={d.id} className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <d.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{d.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone={categoryTone[d.category]} className="!py-0.5">{d.category}</Badge>
                <span className="text-xs text-slate-400">{d.date}</span>
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
