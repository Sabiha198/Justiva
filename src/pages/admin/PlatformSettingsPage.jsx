import { useState } from "react";
import { FiSave, FiPhoneCall } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { Input, Label } from "../../components/ui/Field";
import { crimeCategorySettings, emergencyContactSettings, generalPlatformSettings } from "../../data/platformSettings";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../utils/cn";

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", checked ? "bg-navy-800" : "bg-slate-200")}
      role="switch"
      aria-checked={checked}
    >
      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

export default function PlatformSettingsPage() {
  const [categories, setCategories] = useState(crimeCategorySettings);
  const [contacts, setContacts] = useState(emergencyContactSettings);
  const [general, setGeneral] = useState(generalPlatformSettings);
  const toast = useToast();

  const toggleCategory = (id) => setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  const updateContact = (id, number) => setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, number } : c)));
  const toggleGeneral = (key) => setGeneral((prev) => ({ ...prev, [key]: !prev[key] }));

  const save = () => toast.success("Platform settings saved for this session.");

  return (
    <div className="container-page py-8">
      <PageHeader title="Platform Settings" subtitle="Configure crime categories, emergency contacts, and general platform behavior." />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-ink">Crime categories</h3>
          <div className="mt-4 divide-y divide-line">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-ink">{c.label}</span>
                <Toggle checked={c.active} onChange={() => toggleCategory(c.id)} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <FiPhoneCall className="h-4 w-4 text-alert-600" /> Emergency contacts
          </h3>
          <div className="mt-4 space-y-3">
            {contacts.map((c) => (
              <div key={c.id}>
                <Label htmlFor={c.id}>{c.label}</Label>
                <Input id={c.id} value={c.number} onChange={(e) => updateContact(c.id, e.target.value)} className="font-mono" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-ink">General settings</h3>
          <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-ink">Auto-assign new reports</span>
              <Toggle checked={general.autoAssignReports} onChange={() => toggleGeneral("autoAssignReports")} />
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-ink">Require lawyer verification</span>
              <Toggle checked={general.requireLawyerVerification} onChange={() => toggleGeneral("requireLawyerVerification")} />
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-ink">Allow anonymous reports</span>
              <Toggle checked={general.allowAnonymousReports} onChange={() => toggleGeneral("allowAnonymousReports")} />
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-ink">Maintenance mode</span>
              <Toggle checked={general.maintenanceMode} onChange={() => toggleGeneral("maintenanceMode")} />
            </div>
          </div>
        </Card>
      </div>

      <Button variant="brass" className="mt-6" onClick={save}>
        <FiSave /> Save platform settings
      </Button>
    </div>
  );
}
