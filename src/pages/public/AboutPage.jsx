import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShield, FiUsers, FiHeart, FiTarget, FiArrowRight } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import CaseSeal from "../../components/ui/CaseSeal";
import MediaPanel from "../../components/art/MediaPanel";
import { pageMedia } from "../../data/media";

const MISSION_VIDEO = pageMedia.aboutVideo.src;
const MISSION_VIDEO_POSTER = pageMedia.aboutVideo.poster;

const values = [
  { icon: FiShield, title: "Privacy first", desc: "Anonymous reporting is a first-class option, not an afterthought — your identity stays yours to share." },
  { icon: FiUsers, title: "Verified professionals", desc: "Every lawyer on Justiva goes through a credential-verification process before they can accept clients." },
  { icon: FiHeart, title: "Community support", desc: "We partner with NGOs and legal-aid organizations so cost is never the reason someone goes without help." },
  { icon: FiTarget, title: "Clarity over jargon", desc: "Legal processes explained in plain language, so you always know what happens next." },
];

const timeline = [
  { year: "2024", label: "Justiva founded", desc: "Started as a small legal-aid directory for underserved communities." },
  { year: "2025", label: "Crime reporting launched", desc: "Added secure, trackable incident reporting with case-officer routing." },
  { year: "2026", label: "AI legal assistant", desc: "Introduced plain-language guidance grounded in verified legal resources." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <CaseSeal size={64} />
            </motion.div>
            <h1 className="text-balance mt-6 font-display text-4xl font-semibold sm:text-5xl">
              Legal help shouldn't feel out of reach
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Justiva connects citizens with verified lawyers, secure crime reporting, and
              plain-language legal guidance — built to be usable by anyone, in a moment of stress.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto w-full max-w-md"
          >
            <MediaPanel media={pageMedia.aboutHero} art="courthouse" />
          </motion.div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <MediaPanel media={pageMedia.aboutStory} art="courthouse" radius="rounded-2xl" />
          </motion.div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">Our story</span>
            <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Built by people who watched good cases stall for the wrong reasons
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Too often, the barrier isn't whether someone has a case — it's whether they know
              where to start, whether they can afford a first consultation, or whether they're
              too afraid to put their name on a report. Justiva exists to remove those barriers
              one step at a time, without asking anyone to navigate a legal system alone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              We work directly with verified lawyers and community organizations so that every
              path on the platform — reporting, hiring counsel, or just asking a question — leads
              somewhere real.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">What we stand for</span>
          <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Our values</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">Our mission</span>
          <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Hear it directly from the team
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            A short look at why Justiva exists and how we think about serving people in
            difficult moments.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl shadow-lift"
        >
          <video
            src={MISSION_VIDEO}
            poster={MISSION_VIDEO_POSTER}
            className="h-64 w-full object-cover sm:h-96"
            controls
            playsInline
            preload="metadata"
          >
            Your browser doesn't support embedded video.
          </video>
        </motion.div>
      </section>

      <section className="bg-navy-50/60 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">Our journey</span>
            <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">How Justiva has grown</h2>
          </div>
          <div className="mt-10 space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-5">
                <span className="w-16 shrink-0 font-mono text-sm text-brass-600">{t.year}</span>
                <div className="border-l border-line pl-5">
                  <p className="font-display text-lg font-semibold text-ink">{t.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Ready to get started?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Report an incident, find a verified lawyer, or ask our AI assistant a question.
        </p>
        <Button as={Link} to="/login" variant="brass" size="lg" className="mt-6">
          Get Started <FiArrowRight />
        </Button>
      </section>
    </div>
  );
}
