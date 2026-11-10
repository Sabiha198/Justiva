import { motion } from "framer-motion";
import { FiPhoneCall, FiShield, FiAlertTriangle, FiHeart, FiUsers, FiBookOpen } from "react-icons/fi";
import Card from "../../components/ui/Card";
import { emergencyContactSettings } from "../../data/platformSettings";
import PageHero from "../../components/art/PageHero";
import { pageMedia } from "../../data/media";

const contactVisuals = {
  police: { icon: FiShield, tone: "bg-navy-100 text-navy-800" },
  fire: { icon: FiAlertTriangle, tone: "bg-alert-100 text-alert-700" },
  ambulance: { icon: FiHeart, tone: "bg-pine-100 text-pine-700" },
  womenChild: { icon: FiUsers, tone: "bg-brass-100 text-brass-700" },
  legalAid: { icon: FiBookOpen, tone: "bg-navy-100 text-navy-800" },
};

const safetyGuides = [
  {
    title: "If you're in immediate danger",
    points: [
      "Call the emergency number for your situation right away — police, fire, or ambulance.",
      "Move to a safe, public location if possible before making the call.",
      "Stay on the line until the dispatcher tells you it's okay to hang up.",
    ],
  },
  {
    title: "After the immediate danger has passed",
    points: [
      "Note down what happened while it's fresh — time, location, and any details.",
      "Preserve evidence where safe to do so; avoid disturbing a scene.",
      "File a report through Justiva when you're able, to get a trackable case ID.",
    ],
  },
  {
    title: "If someone else needs help",
    points: [
      "Do not put yourself at risk trying to intervene directly.",
      "Call the appropriate emergency number and clearly describe the location.",
      "Reach out to a nearby NGO or shelter if ongoing support is needed.",
    ],
  },
];

export default function EmergencySafetyPage() {
  return (
    <div>
      <PageHero
        variant="animated"
        backdrop="rings"
        art="shield"
        media={pageMedia.emergency}
        badge={
          <span className="inline-flex items-center gap-2 rounded-full bg-alert-100 px-3.5 py-1.5 text-xs font-semibold text-alert-700">
            <FiAlertTriangle className="h-3.5 w-3.5" /> Always accessible, no login required
          </span>
        }
        title="Emergency &amp; Safety"
        subtitle="If you or someone else is in immediate danger, contact emergency services first. This page and its numbers are always public, so you never need an account to see them."
      />

      <div className="container-page py-10 sm:py-12">
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {emergencyContactSettings.map((c, i) => {
          const visual = contactVisuals[c.id] || { icon: FiPhoneCall, tone: "bg-alert-100 text-alert-700" };
          return (
            <motion.a
              key={c.id}
              href={`tel:${c.number}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="block"
            >
              <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${visual.tone}`}>
                  <visual.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{c.label}</p>
                  <p className="font-mono text-lg font-semibold text-alert-700">{c.number}</p>
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {safetyGuides.map((g) => (
          <Card key={g.title} className="p-6">
            <FiShield className="h-5 w-5 text-navy-700" />
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{g.title}</h3>
            <ul className="mt-3 space-y-2.5">
              {g.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-600" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine-100 text-pine-700">
          <FiHeart className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Need ongoing support, not just an emergency number?</p>
          <p className="mt-0.5 text-sm text-slate-500">Browse legal aid organizations and NGOs offering free help.</p>
        </div>
        <a href="/legal-aid" className="text-sm font-semibold text-navy-800 hover:text-brass-600">
          View Legal Aid directory →
        </a>
      </Card>
      </div>
    </div>
  );
}
