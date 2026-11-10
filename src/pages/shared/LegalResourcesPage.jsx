import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiClock,
  FiTag,
  FiBookmark,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import { Input } from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";

import { rightsGuides } from "../../data/legalCases";
import { useRole, ROLES } from "../../context/RoleContext";
import { useToast } from "../../context/ToastContext";
import PageHero from "../../components/art/PageHero";
import { pageMedia } from "../../data/media";

export default function LegalResourcesPage() {
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState(null);
  const [saved, setSaved] = useState(["arrest-rights"]);

  const { role } = useRole();
  const isCitizen = role === ROLES.CITIZEN;
  const toast = useToast();

  const results = useMemo(() => {
    if (!query.trim()) {
      return rightsGuides;
    }

    const q = query.toLowerCase();

    return rightsGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleSave = (slug) => {
    setSaved((prev) => {
      const isSaved = prev.includes(slug);

      toast.success(
        isSaved
          ? "Removed from saved resources."
          : "Saved for later."
      );

      return isSaved
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
    });
  };

  return (
    <div className="container-page py-8">
      {/* Header */}
      <PageHero
        variant="inline"
        art="book"
        media={pageMedia.legalResources}
        title="Legal Resources"
        subtitle="Plain-language guides to laws, acts, and legal procedures. Understand what happens next, and what you're entitled to."
      />

      {/* Search */}
      <div className="relative mt-5 max-w-md">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />

        <Input
          className="pl-10"
          placeholder="Search guides, e.g. 'arrest' or 'tenant'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Resources */}
      <div className="mt-7 space-y-3">
        {results.map((g) => {
          const open = openSlug === g.slug;
          const isSaved = saved.includes(g.slug);

          return (
            <Card key={g.slug} className="overflow-hidden">
              {/* Resource Header */}
              <div className="flex w-full items-center justify-between gap-4 px-5 py-4">
                {/* Clickable guide area */}
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? null : g.slug)}
                  className="flex min-w-0 flex-1 items-center justify-between gap-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">
                      {g.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FiTag className="h-3 w-3" />
                        {g.category}
                      </span>

                      <span className="flex items-center gap-1">
                        <FiClock className="h-3 w-3" />
                        {g.readTime}
                      </span>
                    </div>
                  </div>

                  <FiChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Bookmark */}
                {isCitizen && (
                  <button
                    type="button"
                    onClick={() => toggleSave(g.slug)}
                    className={`shrink-0 rounded-md p-1.5 transition-colors ${
                      isSaved
                        ? "text-brass-600"
                        : "text-slate-300 hover:text-slate-500"
                    }`}
                    aria-label={
                      isSaved
                        ? "Unsave resource"
                        : "Save resource"
                    }
                  >
                    <FiBookmark
                      className={
                        isSaved
                          ? "h-4 w-4 fill-current"
                          : "h-4 w-4"
                      }
                    />
                  </button>
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="overflow-hidden border-t border-line"
                  >
                    <div className="px-5 py-4">
                      <p className="text-sm text-slate-600">
                        {g.summary}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {g.points.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 text-sm text-slate-600"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-600" />

                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>

      {/* No results */}
      {results.length === 0 && (
        <EmptyState
          icon={FiSearch}
          title="No guides found"
          description="Try a different search term."
          className="mt-4"
        />
      )}
    </div>
  );
}