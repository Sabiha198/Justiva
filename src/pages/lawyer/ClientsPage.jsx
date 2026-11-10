import { useState } from "react";
import { FiMail, FiMapPin, FiMessageSquare } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import Drawer from "../../components/ui/Drawer";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Field";
import { clients } from "../../data/lawyerPanel";
import { useToast } from "../../context/ToastContext";

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const columns = [
    { key: "name", header: "Client", render: (c) => (
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white">{c.name.charAt(0)}</div>
        <span className="font-medium text-ink">{c.name}</span>
      </div>
    ) },
    { key: "city", header: "City" },
    { key: "activeCases", header: "Active cases" },
    { key: "totalConsultations", header: "Consultations" },
    { key: "lastContact", header: "Last contact" },
    { key: "status", header: "Status", render: (c) => <Badge tone={c.status === "active" ? "pine" : "slate"}>{c.status}</Badge> },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader title="Clients" subtitle="Everyone you've consulted with on Justiva." />

      <div className="mt-5 max-w-sm">
        <Input placeholder="Search clients…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={filtered} onRowClick={setSelected} emptyLabel="No clients match your search" />
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-semibold text-white">
                {selected.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-ink">{selected.name}</p>
                <Badge tone={selected.status === "active" ? "pine" : "slate"}>{selected.status}</Badge>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2"><FiMail className="h-4 w-4 text-slate-400" /> {selected.email}</p>
              <p className="flex items-center gap-2"><FiMapPin className="h-4 w-4 text-slate-400" /> {selected.city}</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line px-3 py-2.5 text-center">
                <p className="font-display text-lg font-semibold text-navy-800">{selected.activeCases}</p>
                <p className="text-xs text-slate-400">Active cases</p>
              </div>
              <div className="rounded-lg border border-line px-3 py-2.5 text-center">
                <p className="font-display text-lg font-semibold text-navy-800">{selected.totalConsultations}</p>
                <p className="text-xs text-slate-400">Consultations</p>
              </div>
            </div>
            <Button
              variant="brass"
              className="mt-6 w-full"
              onClick={() => toast.info("Messaging is a mock interface in this demo.")}
            >
              <FiMessageSquare /> Message client
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
