import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { Input, Label } from "../../components/ui/Field";
import { authorities as seed } from "../../data/authorities";
import { useToast } from "../../context/ToastContext";

export default function AuthoritiesManagementPage() {
  const [authorities, setAuthorities] = useState(seed);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", badge: "", department: "", city: "" });
  const toast = useToast();

  const filtered = authorities.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));

  const columns = [
    { key: "name", header: "Officer" },
    { key: "badge", header: "Badge ID", className: "font-mono text-xs" },
    { key: "department", header: "Department" },
    { key: "city", header: "City" },
    { key: "casesAssigned", header: "Cases assigned" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  const addAuthority = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setAuthorities((prev) => [
      { id: `auth-${prev.length + 1}`, ...form, casesAssigned: 0, status: "pending" },
      ...prev,
    ]);
    toast.success(`${form.name} added — pending verification.`);
    setForm({ name: "", badge: "", department: "", city: "" });
    setAddOpen(false);
  };

  return (
    <div className="container-page py-8">
      <PageHeader
        title="Authorities"
        subtitle="Case officers and authority accounts on the platform."
        actions={<Button variant="brass" onClick={() => setAddOpen(true)}><FiPlus /> Add authority</Button>}
      />

      <div className="relative mt-5 max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search officers" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-5"><DataTable columns={columns} rows={filtered} /></div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add authority account" maxWidth="max-w-sm">
        <form onSubmit={addAuthority} className="space-y-4">
          <div>
            <Label htmlFor="a-name" required>Full name</Label>
            <Input id="a-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="a-badge">Badge ID</Label>
            <Input id="a-badge" value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="a-department">Department</Label>
            <Input id="a-department" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="a-city">City</Label>
            <Input id="a-city" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
          </div>
          <Button type="submit" variant="brass" className="w-full">Add authority</Button>
        </form>
      </Modal>
    </div>
  );
}
