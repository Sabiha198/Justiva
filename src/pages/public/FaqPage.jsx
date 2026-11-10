import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import Card from "../../components/ui/Card";
import { Input } from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";
import PageHero from "../../components/art/PageHero";
import { pageMedia } from "../../data/media";

const faqs = [
  { q: "Is my crime report really anonymous?", a: "Yes — anonymous reporting is a first-class option. You can submit without providing your name or contact details, though identified reports are sometimes easier for case officers to follow up on." },
  { q: "How long does it take to hear back after filing a report?", a: "Most reports receive an initial review within 24–48 hours. Urgent categories like fire or medical emergencies are fast-tracked for immediate routing." },
  { q: "Are all lawyers on Justiva verified?", a: "Every lawyer profile shows a verification status. Verified lawyers have submitted their bar certificate, practicing license, and identity documents for review." },
  { q: "Is the AI legal assistant a substitute for a real lawyer?", a: "No. The AI assistant gives general, plain-language guidance and points you to relevant resources — it does not replace advice from a licensed lawyer for your specific situation." },
  { q: "Do I need an account to browse lawyers or read legal resources?", a: "No — public browsing of lawyer profiles, legal resources, legal aid organizations, and emergency information never requires an account." },
  { q: "What happens to my data if I don't create an account?", a: "In this current version, nothing is stored — this is a frontend-only demo, so all mock interactions reset when you refresh the page." },
  { q: "Can I cancel or reschedule an appointment?", a: "Yes, from My Appointments in the Citizen panel — you can request a reschedule or cancel an upcoming appointment directly." },
  { q: "How do I escalate a report that seems urgent?", a: "For anything involving immediate danger, always contact emergency services directly first — see the Emergency & Safety page for numbers that don't require login." },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const results = faqs.filter((f) => !query.trim() || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHero
        art="faq"
        media={pageMedia.faq}
        title="Frequently Asked Questions"
        subtitle="Answers about reporting, lawyer verification, privacy, and how Justiva works."
      />

    <div className="container-page pb-16 sm:pb-20">
      <div className="relative mx-auto mt-8 max-w-md">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
        <Input className="pl-10" placeholder="Search questions…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {results.map((f, i) => {
          const open = openIndex === i;
          return (
            <Card key={f.q} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <p className="text-sm font-semibold text-ink">{f.q}</p>
                <FiChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-line"
                  >
                    <p className="px-5 py-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
        {results.length === 0 && (
          <EmptyState icon={FiSearch} title="No matching questions" description="Try a different search term." />
        )}
      </div>
    </div>
    </div>
  );
}
