import { useState } from "react";
import { FiUpload, FiImage, FiX } from "react-icons/fi";
import Button from "../ui/Button";
import { Input, Textarea, Select, Label, ErrorText } from "../ui/Field";
import { incidentTypes } from "../../data/crimeReports";

const urgencyOptions = [
  { value: "EMERGENCY", label: "Emergency", desc: "Immediate danger or ongoing crime" },
  { value: "NON_EMERGENCY", label: "Non-emergency", desc: "Already resolved or lower urgency" },
];

export default function StepIncident({ data, onNext }) {
  const [form, setForm] = useState({
    urgency: data.urgency || "",
    incidentType: data.incidentType || "",
    title: data.title || "",
    description: data.description || "",
    imagePreview: data.imagePreview || null,
  });
  const [errors, setErrors] = useState({});
  const [analyzing, setAnalyzing] = useState(false);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAnalyzing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        update("imagePreview", reader.result);
        setAnalyzing(false);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!form.urgency) next.urgency = "Select the urgency of this incident.";
    if (!form.incidentType) next.incidentType = "Choose an incident type.";
    if (!form.title.trim()) next.title = "Give the report a short title.";
    if (!form.description.trim() || form.description.trim().length < 10)
      next.description = "Add a little more detail (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <Label required>Select emergency type</Label>
        <div className="grid grid-cols-2 gap-3">
          {urgencyOptions.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => update("urgency", opt.value)}
              className={`rounded-lg border-2 px-4 py-3.5 text-left transition-colors ${
                form.urgency === opt.value
                  ? opt.value === "EMERGENCY"
                    ? "border-alert-600 bg-alert-100"
                    : "border-navy-700 bg-navy-50"
                  : "border-line hover:border-slate-300"
              }`}
            >
              <p className={`text-sm font-semibold ${form.urgency === opt.value ? (opt.value === "EMERGENCY" ? "text-alert-700" : "text-navy-800") : "text-ink"}`}>
                {opt.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{opt.desc}</p>
            </button>
          ))}
        </div>
        <ErrorText>{errors.urgency}</ErrorText>
      </div>

      <div>
        <Label>Attach photo evidence (optional)</Label>
        <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-navy-50/40 text-center transition-colors hover:border-brass-500">
          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          {form.imagePreview ? (
            <div className="relative h-full w-full">
              <img src={form.imagePreview} alt="Evidence preview" className="h-full w-full rounded-lg object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  update("imagePreview", null);
                }}
                className="absolute right-2 top-2 rounded-full bg-navy-950/70 p-1.5 text-white hover:bg-navy-950"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : analyzing ? (
            <>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-navy-700 border-t-transparent" />
              <span className="mt-2 text-sm text-slate-500">Analyzing image…</span>
            </>
          ) : (
            <>
              <FiUpload className="h-6 w-6 text-slate-400" />
              <span className="mt-2 text-sm font-medium text-slate-600">Tap to upload an image</span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                <FiImage className="h-3 w-3" /> PNG or JPG
              </span>
            </>
          )}
        </label>
      </div>

      <div>
        <Label htmlFor="incidentType" required>Incident type</Label>
        <Select id="incidentType" value={form.incidentType} onChange={(e) => update("incidentType", e.target.value)} error={errors.incidentType}>
          <option value="">Select a type</option>
          {incidentTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>
        <ErrorText>{errors.incidentType}</ErrorText>
      </div>

      <div>
        <Label htmlFor="title" required>Title</Label>
        <Input id="title" placeholder="Short summary of what happened" value={form.title} onChange={(e) => update("title", e.target.value)} error={errors.title} />
        <ErrorText>{errors.title}</ErrorText>
      </div>

      <div>
        <Label htmlFor="description" required>Description</Label>
        <Textarea id="description" rows={4} placeholder="Describe what happened, when, and any other useful detail" value={form.description} onChange={(e) => update("description", e.target.value)} error={errors.description} />
        <ErrorText>{errors.description}</ErrorText>
      </div>

      <Button type="submit" variant="brass" className="w-full">
        Continue
      </Button>
    </form>
  );
}
