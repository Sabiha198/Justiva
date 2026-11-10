import { useState } from "react";
import { FiCheckCircle, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Input } from "../../components/ui/Field";
import { ngos as seed } from "../../data/ngos";
import { useToast } from "../../context/ToastContext";

export default function OrganizationsManagementPage() {
  const [orgs, setOrgs] = useState(seed);
  const [query, setQuery] = useState("");
  const [removeTarget, setRemoveTarget] = useState(null);
  const toast = useToast();

  const filtered = orgs.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()));

  const toggleVerify = (id) => {
    setOrgs((prev) => prev.map((o) => (o.id === id ? { ...o, verified: !o.verified } : o)));
    toast.success("Organization verification status updated.");
  };

  const removeOrg = () => {
    setOrgs((prev) => prev.filter((o) => o.id !== removeTarget.id));
    toast.success(`${removeTarget.name} removed.`);
  };

  return (
    <div className="container-page py-8">
      <PageHeader title="Organizations" subtitle="NGOs and legal aid organizations listed on Justiva." />

      <div className="relative mt-5 max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search organizations" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {filtered.map((o) => (
          <Card key={o.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{o.name}</p>
                <p className="text-xs text-slate-500">{o.focus}</p>
              </div>
              {o.verified ? <Badge tone="pine"><FiCheckCircle className="h-3 w-3" /> Verified</Badge> : <Badge tone="brass">Unverified</Badge>}
            </div>
            <p className="mt-2 text-sm text-slate-600">{o.description}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toggleVerify(o.id)}>
                {o.verified ? "Unverify" : "Verify"}
              </Button>
              <Button size="sm" variant="subtle" onClick={() => toast.info("Editing organizations is a UI-only demo.")}>
                <FiEdit2 /> Edit
              </Button>
              <Button size="sm" variant="danger" className="ml-auto" onClick={() => setRemoveTarget(o)}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={removeOrg}
        title="Remove organization"
        description={`Remove ${removeTarget?.name} from the directory?`}
        confirmLabel="Remove"
        tone="danger"
      />
    </div>
  );
}
