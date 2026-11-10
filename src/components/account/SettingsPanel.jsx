import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
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

export default function SettingsPanel({ title = "Settings", groups: initialGroups }) {
  const [groups, setGroups] = useState(initialGroups);
  const toast = useToast();

  const toggle = (groupIdx, itemIdx) => {
    setGroups((prev) =>
      prev.map((g, gi) =>
        gi !== groupIdx ? g : { ...g, items: g.items.map((it, ii) => (ii !== itemIdx ? it : { ...it, checked: !it.checked })) }
      )
    );
  };

  const handleSave = () => toast.success("Settings saved for this session.");

  return (
    <div className="container-page py-8">
      <PageHeader title={title} subtitle="Settings apply to this demo session only and reset on refresh." />

      <div className="mt-6 max-w-2xl space-y-5">
        {groups.map((g, gi) => (
          <Card key={g.label} className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">{g.label}</h3>
            <div className="mt-4 divide-y divide-line">
              {g.items.map((item, ii) => (
                <div key={item.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{item.label}</p>
                    {item.desc && <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>}
                  </div>
                  <Toggle checked={item.checked} onChange={() => toggle(gi, ii)} />
                </div>
              ))}
            </div>
          </Card>
        ))}
        <Button variant="brass" onClick={handleSave}>
          <FiSave /> Save settings
        </Button>
      </div>
    </div>
  );
}
