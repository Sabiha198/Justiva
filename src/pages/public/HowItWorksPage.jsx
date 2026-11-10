
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAlertOctagon,
  FiSearch,
  FiUserCheck,
  FiCalendar,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHero from "../../components/art/PageHero";
import Art from "../../components/art/Art";
import { pageMedia } from "../../data/media";

// Photos selected for the crime-reporting process.

const reportSteps = [
  { icon: FiAlertOctagon, title: "File a report", desc: "Choose a crime category, describe what happened, attach evidence, and submit — anonymously if you prefer.", art: "report" },
  { icon: FiSearch, title: "Get a tracking ID", desc: "Receive a unique report ID instantly. Use it anytime to check status without creating an account.", art: "idcard" },
  { icon: FiUserCheck, title: "Case officer review", desc: "A case officer reviews your report, may request more information, and opens an investigation if warranted.", art: "review" },
  { icon: FiMessageSquare, title: "Stay updated", desc: "Follow your case through Submitted → Under Review → Investigation → Resolved, all from your dashboard.", art: "track" },
];

const lawyerSteps = [
  { icon: FiSearch, title: "Search & filter", desc: "Browse lawyers by specialty, city, or fee — every profile shows real experience and verification status.", art: "search" },
  { icon: FiUserCheck, title: "Review their profile", desc: "See practice areas, past client feedback, and consultation fees before reaching out.", art: "profile" },
  { icon: FiCalendar, title: "Book a consultation", desc: "Pick a date and time slot, share the reason for your visit, and get instant confirmation.", art: "calendar" },
  { icon: FiMessageSquare, title: "Manage the relationship", desc: "Message, reschedule, or review your lawyer directly from your appointments dashboard.", art: "chat" },
];

function StepRow({ steps }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
        >
          <Card className="h-full overflow-hidden p-0">
            <div className="p-3 pb-0"><Art name={s.art} className="rounded-xl" /></div>
            <div className="p-6">
              <span className="font-mono text-xs text-brass-600">
                Step {i + 1}
              </span>

              <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                <s.icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {s.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {s.desc}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <PageHero
        variant="animated"
        backdrop="paths"
        art="match"
        media={pageMedia.howItWorks}
        title="How Justiva Works"
        subtitle="Two clear paths: report an incident, or find legal representation. Both take minutes, not days."
      />

      {/* Reporting a crime */}
      <div className="container-page mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Reporting a crime
        </h2>

        <p className="mt-1.5 max-w-lg text-sm text-slate-500">
          From incident to resolution, tracked every step of the way.
        </p>

        <div className="mt-6">
          <StepRow steps={reportSteps} />
        </div>
      </div>

      {/* Hiring a lawyer */}
      <div className="container-page mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Hiring a lawyer
        </h2>

        <p className="mt-1.5 max-w-lg text-sm text-slate-500">
          Find verified representation suited to your situation.
        </p>

        <div className="mt-6">
          <StepRow steps={lawyerSteps} />
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="container-page mt-20 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            as={Link}
            to="/login?role=citizen"
            variant="brass"
            size="lg"
          >
            Report an Incident <FiArrowRight />
          </Button>

          <Button
            as={Link}
            to="/find-lawyers"
            variant="outline"
            size="lg"
          >
            Find a Lawyer
          </Button>
        </div>
      </div>
    </div>
  );
}
