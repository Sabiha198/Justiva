import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import Drawer from "../../components/ui/Drawer";
import { Input, Select } from "../../components/ui/Field";
import { users as seed } from "../../data/users";
import { useToast } from "../../context/ToastContext";

export default function UsersPage() {
  const [users, setUsers] = useState(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  const filtered = users.filter((u) => {
    const q = !query.trim() || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const s = !status || u.status === status;
    return q && s;
  });

  const setUserStatus = (id, newStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    setSelected((s) => (s ? { ...s, status: newStatus } : s));
    toast.success(`User ${newStatus === "suspended" ? "suspended" : "updated"}.`);
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "city", header: "City" },
    { key: "reports", header: "Reports filed" },
    { key: "joined", header: "Joined" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader title="Users" subtitle="Every citizen account registered on Justiva." />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input className="pl-10" placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </Select>
      </div>

      <div className="mt-5"><DataTable columns={columns} rows={filtered} onRowClick={setSelected} /></div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-semibold text-white">
                {selected.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-ink">{selected.name}</p>
                <StatusBadge status={selected.status} />
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p className="flex justify-between"><span className="text-slate-400">Email</span>{selected.email}</p>
              <p className="flex justify-between"><span className="text-slate-400">City</span>{selected.city}</p>
              <p className="flex justify-between"><span className="text-slate-400">Reports filed</span>{selected.reports}</p>
              <p className="flex justify-between"><span className="text-slate-400">Joined</span>{selected.joined}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {selected.status !== "active" && (
                <Button variant="brass" onClick={() => setUserStatus(selected.id, "active")}>Activate</Button>
              )}
              {selected.status === "active" && (
                <Button variant="outline" onClick={() => setUserStatus(selected.id, "inactive")}>Deactivate</Button>
              )}
              <Button variant="danger" onClick={() => setUserStatus(selected.id, "suspended")}>Suspend</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
