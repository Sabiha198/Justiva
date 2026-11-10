import { useState } from "react";
import { FiSave, FiMapPin, FiDollarSign, FiClock } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { Input, Label, Textarea } from "../../components/ui/Field";
import { currentLawyer, categories } from "../../data/lawyers";
import { useToast } from "../../context/ToastContext";

export default function LawyerProfileEditPage() {
  const me = currentLawyer;
  const [form, setForm] = useState({
    name: me.name,
    title: me.title,
    degree: me.degree,
    experienceYears: me.experienceYears,
    fee: me.fee,
    city: me.city,
    availability: me.availability,
    bio: me.bio,
  });
  const [practiceAreas, setPracticeAreas] = useState(me.categories);
  const toast = useToast();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const togglePracticeArea = (slug) => {
    setPracticeAreas((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Professional profile updated for this session.");
  };

  return (
    <div className="container-page py-8">
      <PageHeader title="Professional Profile" subtitle="How citizens see you when browsing lawyers." />

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-xl font-semibold text-white">
                {me.initials}
              </div>
              <Badge tone="pine">Verified Lawyer</Badge>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={update("name")} />
              </div>
              <div>
                <Label htmlFor="title">Professional title</Label>
                <Input id="title" value={form.title} onChange={update("title")} />
              </div>
              <div>
                <Label htmlFor="degree">Education / degree</Label>
                <Input id="degree" value={form.degree} onChange={update("degree")} />
              </div>
              <div>
                <Label htmlFor="experienceYears">Years of experience</Label>
                <Input id="experienceYears" type="number" value={form.experienceYears} onChange={update("experienceYears")} />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} value={form.bio} onChange={update("bio")} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Practice areas</h3>
            <p className="mt-1 text-xs text-slate-500">Select every specialization that applies.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.slug}
                  onClick={() => togglePracticeArea(c.slug)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    practiceAreas.includes(c.slug) ? "border-brass-600 bg-brass-100 text-brass-700" : "border-line text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-ink">Consultation details</h3>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="fee">Consultation fee (BDT)</Label>
                <div className="relative">
                  <FiDollarSign className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <Input id="fee" type="number" className="pl-10" value={form.fee} onChange={update("fee")} />
                </div>
              </div>
              <div>
                <Label htmlFor="city">Location</Label>
                <div className="relative">
                  <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <Input id="city" className="pl-10" value={form.city} onChange={update("city")} />
                </div>
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <div className="relative">
                  <FiClock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <Input id="availability" className="pl-10" value={form.availability} onChange={update("availability")} />
                </div>
              </div>
            </div>
          </Card>
          <Button type="submit" variant="brass" className="w-full">
            <FiSave /> Save profile
          </Button>
        </div>
      </form>
    </div>
  );
}
