
import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiCheckCircle, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { Input } from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";
import API_URL from "../../config/api";

import PageHero from "../../components/art/PageHero";
import { pageMedia } from "../../data/media";

export default function LegalAidPage() {
  const [query, setQuery] = useState("");
  
const [ngos, setNgos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const controller = new AbortController();

  const loadNGOs = async () => {
    try {
      const response = await fetch(`${API_URL}/public/ngos`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to load NGOs");
      }

      const data = await response.json();
      setNgos(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("NGO directory:", err);
        setError("Unable to load organizations.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  loadNGOs();

  return () => controller.abort();
}, []);


  const results = useMemo(() => {
    if (!query.trim()) return ngos;
    const q = query.toLowerCase();
return ngos.filter(
  (n) =>
    (n.name || "").toLowerCase().includes(q) ||
    (n.focus || "").toLowerCase().includes(q) ||
    (n.city || "").toLowerCase().includes(q)
);  }, [query,ngos]);

  return (
    <div className="container-page py-8">
      <PageHero
        variant="inline"
        art="aid"
        media={pageMedia.legalAid}
        title="NGO &amp; Pro-bono Help"
        subtitle="Vetted non-profits offering free legal aid, shelter, mediation, and support services."
      />

      <div className="relative mt-5 max-w-md">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search by name, focus, or city" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {loading && (
  <p className="mt-6 text-sm text-slate-500">
    Loading organizations...
  </p>
)}

{error && (
  <p className="mt-6 text-sm text-red-600">
    {error}
  </p>
)}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {results.map((n) => (
          <Card key={n.id || n._id} tab="var(--color-pine-600)" className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-pine-100">
                  {n.logo ? (
                    <img src={n.logo} alt={`${n.name} logo`} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display font-semibold text-pine-700">
                      {n.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-ink">{n.name}</p>
                  <p className="text-xs text-slate-500">{n.focus}</p>
                </div>
              </div>
              {n.verified && (
                <Badge tone="pine"><FiCheckCircle className="h-3 w-3" /> Verified</Badge>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{n.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(n.servicesOffered || []).map((s) => (
                <Badge key={s} tone="slate">{s}</Badge>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-slate-500">
              <p className="flex items-center gap-2"><FiMapPin className="h-3.5 w-3.5" /> {n.city}</p>
              <p className="flex items-center gap-2"><FiPhone className="h-3.5 w-3.5" /> {n.contact}</p>
              <p className="flex items-center gap-2"><FiMail className="h-3.5 w-3.5" /> {n.email}</p>
            </div>
          </Card>
        ))}
      </div>

{!loading && !error && results.length === 0 && (
          <EmptyState icon={FiSearch} title="No matching organizations" description="Try a different search term." className="mt-4" />
      )}
    </div>
  );
}
