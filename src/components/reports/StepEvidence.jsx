import { useRef, useState } from "react";
import { FiUploadCloud, FiFile, FiX, FiArrowLeft } from "react-icons/fi";
import Button from "../ui/Button";
import { Label } from "../ui/Field";

export default function StepEvidence({ data, onNext, onBack }) {
  const [files, setFiles] = useState(data.files || []);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (fileList) => {
    const arr = Array.from(fileList).map((f) => ({ name: f.name, size: f.size }));
    setFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  return (
    <div className="space-y-6">
      <div>
        <Label>Attach evidence (optional)</Label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragOver ? "border-brass-500 bg-brass-100/50" : "border-line bg-navy-50/40 hover:border-slate-300"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files?.length && addFiles(e.target.files)}
          />
          <FiUploadCloud className="h-7 w-7 text-slate-400" />
          <p className="mt-2 text-sm font-medium text-slate-600">Drop files here or click to upload</p>
          <p className="mt-1 text-xs text-slate-400">Documents, photos, or audio — up to 10MB each</p>
        </div>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f) => (
              <li key={f.name} className="flex items-center justify-between rounded-md border border-line bg-white px-3.5 py-2.5 text-sm">
                <span className="flex items-center gap-2 truncate text-ink">
                  <FiFile className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate">{f.name}</span>
                </span>
                <button type="button" onClick={() => removeFile(f.name)} className="text-slate-400 hover:text-alert-600">
                  <FiX className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <FiArrowLeft /> Back
        </Button>
        <Button type="button" variant="brass" className="flex-1" onClick={() => onNext({ files })}>
          Continue
        </Button>
      </div>
    </div>
  );
}
