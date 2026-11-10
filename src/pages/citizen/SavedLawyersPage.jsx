import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import LawyerCard from "../../components/lawyers/LawyerCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { lawyers } from "../../data/lawyers";

const defaultSavedIds = ["lw-001", "lw-003", "lw-006"];

export default function SavedLawyersPage() {
  const [savedIds, setSavedIds] = useState(defaultSavedIds);
  const saved = lawyers.filter((l) => savedIds.includes(l.id));

  return (
    <div className="container-page py-8">
      <PageHeader title="Saved Lawyers" subtitle="Lawyers you've bookmarked for quick access." />

      {saved.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="No saved lawyers yet"
          description="Save a lawyer's profile to find them here later."
          action={<Button as={Link} to="/citizen/lawyers" variant="brass">Browse lawyers</Button>}
          className="mt-8"
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((l) => (
            <div key={l.id} className="relative">
              <LawyerCard lawyer={l} />
              <button
                onClick={() => setSavedIds((prev) => prev.filter((id) => id !== l.id))}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-alert-600 shadow-card hover:bg-alert-100"
                aria-label="Remove from saved"
              >
                <FiHeart className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
