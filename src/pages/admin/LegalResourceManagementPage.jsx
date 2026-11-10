import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUpload } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import { Input, Label, Textarea } from "../../components/ui/Field";
import { rightsGuides as seed } from "../../data/legalCases";
import { useToast } from "../../context/ToastContext";

export default function LegalResourceManagementPage() {
  const [guides, setGuides] = useState(seed);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", summary: "" });
  const toast = useToast();

  const removeGuide = () => {
    setGuides((prev) => prev.filter((g) => g.slug !== removeTarget.slug));
    toast.success("Guide removed.");
  };

  const addGuide = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setGuides((prev) => [
      { slug: `new-${prev.length + 1}`, title: form.title, category: form.category || "General", readTime: "3 min read", summary: form.summary, points: [] },
      ...prev,
    ]);
    toast.success("Guide added.");
    setForm({ title: "", category: "", summary: "" });
    setAddOpen(false);
  };

  return (
    <div className="container-page py-8">
      <PageHeader
        title="Legal Resources"
        subtitle="Laws, guides, and articles shown in the public and citizen libraries."
        actions={<Button variant="brass" onClick={() => setAddOpen(true)}><FiPlus /> Add resource</Button>}
      />

      <div className="mt-6 space-y-3">
        {guides.map((g) => (
          <Card key={g.slug} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink">{g.title}</p>
                <Badge tone="navy" className="!py-0.5">{g.category}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{g.summary}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.info("Editing guides is a UI-only demo.")}>
                <FiEdit2 /> Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => setRemoveTarget(g)}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={removeGuide}
        title="Remove guide"
        description={`Remove "${removeTarget?.title}" from Legal Resources?`}
        confirmLabel="Remove"
        tone="danger"
      />

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add legal resource" maxWidth="max-w-md">
        <form onSubmit={addGuide} className="space-y-4">
          <div>
            <Label htmlFor="r-title" required>Title</Label>
            <Input id="r-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="r-category">Category</Label>
            <Input id="r-category" placeholder="e.g. Criminal Law" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="r-summary">Summary</Label>
            <Textarea id="r-summary" rows={3} value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />
          </div>
          <Button type="button" variant="outline" className="w-full" onClick={() => toast.info("Document upload is a UI-only demo.")}>
            <FiUpload /> Attach source document
          </Button>
          <Button type="submit" variant="brass" className="w-full">Add resource</Button>
        </form>
      </Modal>
    </div>
  );
}
