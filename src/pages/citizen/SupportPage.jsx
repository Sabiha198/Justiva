import { FiPhoneCall, FiMapPin, FiMail, FiCheckCircle } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import PageHeader from "../../components/ui/PageHeader";
import { ngos } from "../../data/ngos";
import { emergencyContactSettings } from "../../data/platformSettings";

const nearbyStations = [
  { name: "Kotwali Police Station", distance: "1.2 km", address: "Kotwali Road, Chattogram", phone: "+880 31-610100" },
  { name: "Panchlaish Police Station", distance: "3.4 km", address: "Panchlaish, Chattogram", phone: "+880 31-654321" },
  { name: "Double Mooring Police Station", distance: "5.1 km", address: "Double Mooring, Chattogram", phone: "+880 31-720044" },
];

export default function SupportPage() {
  return (
    <div className="container-page py-8">
      <PageHeader title="Support / NGOs" subtitle="Emergency contacts, nearby police stations, and legal aid organizations." />

      <div className="mt-6 rounded-lg border border-alert-100 bg-alert-100/40 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-alert-700">
          <FiPhoneCall className="h-4 w-4" /> Emergency contacts
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {emergencyContactSettings.map((c) => (
            <a key={c.id} href={`tel:${c.number}`} className="rounded-md bg-white px-3 py-2.5 text-center shadow-card hover:shadow-lift transition-shadow">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className="mt-0.5 font-mono text-base font-semibold text-alert-700">{c.number}</p>
            </a>
          ))}
        </div>
      </div>

      <h3 className="mt-8 font-display text-lg font-semibold text-ink">Nearby police stations</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {nearbyStations.map((s) => (
          <Card key={s.name} className="p-4">
            <p className="text-sm font-semibold text-ink">{s.name}</p>
            <p className="mt-1 text-xs text-slate-400">{s.distance} away</p>
            <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
              <FiMapPin className="mt-0.5 h-3 w-3 shrink-0" /> {s.address}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink">
              <FiPhoneCall className="h-3 w-3" /> {s.phone}
            </p>
          </Card>
        ))}
      </div>

      <h3 className="mt-8 font-display text-lg font-semibold text-ink">Legal aid organizations</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {ngos.map((n) => (
          <Card key={n.id} tab="var(--color-pine-600)" className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{n.name}</p>
                <p className="text-xs text-slate-500">{n.focus}</p>
              </div>
              {n.verified && <Badge tone="pine"><FiCheckCircle className="h-3 w-3" /> Verified</Badge>}
            </div>
            <p className="mt-2 text-sm text-slate-600">{n.description}</p>
            <div className="mt-3 space-y-1 text-xs text-slate-500">
              <p className="flex items-center gap-1.5"><FiMapPin className="h-3 w-3" /> {n.city}</p>
              <p className="flex items-center gap-1.5"><FiPhoneCall className="h-3 w-3" /> {n.contact}</p>
              <p className="flex items-center gap-1.5"><FiMail className="h-3 w-3" /> {n.email}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
