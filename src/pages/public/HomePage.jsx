
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API_URL  from "../../config/api";
import {
  FiLock,
  FiPhoneCall,
  FiArrowRight,
  FiAlertOctagon,
  FiBriefcase,
  FiMessageSquare,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import CaseSeal from "../../components/ui/CaseSeal";
import Art from "../../components/art/Art";
import { LawyerAvatar, MonogramAvatar } from "../../components/ui/Avatar";




// Hero video unchanged
const HERO_VIDEO = "https://assets.mixkit.co/videos/42644/42644-720.mp4";
const HERO_POSTER = "https://assets.mixkit.co/videos/42644/42644-thumb-720-0.jpg";

const testimonials = [
  {
    name: "S. Rahman",
    role: "Filed a theft report",
    quote: "I tracked my case from my phone the whole way through — no confusing phone calls, no runaround.",
  },
  {
    name: "Farzana Akter",
    role: "Found a family lawyer",
    quote: "Booking a consultation took minutes. My lawyer had my documents ready before we even met.",
  },
  {
    name: "Anonymous",
    role: "Reported anonymously",
    quote: "I could report safely without giving my name, and still got updates on what happened next.",
  },
];

const focusAreas = [
  {
    icon: FiAlertOctagon,
    title: "Report a Crime",
    desc: "File an anonymous or identified report in minutes, then track it with a secure case ID.",
    to: "/citizen/report",
    tab: "var(--color-alert-600)",
  },
  {
    icon: FiBriefcase,
    title: "Hire a Lawyer",
    desc: "Browse verified advocates by specialty, compare fees, and book a consultation directly.",
    to: "/find-lawyers",
    tab: "var(--color-navy-700)",
  },
  {
    icon: FiMessageSquare,
    title: "AI Legal Assistant",
    desc: "Ask a plain-language question and get grounded guidance with cited next steps.",
    to: "/citizen/ai",
    tab: "var(--color-brass-600)",
  },
  {
    icon: FiHeart,
    title: "NGO & Pro-bono Help",
    desc: "Connect with vetted non-profits offering free legal aid, shelter, and mediation.",
    to: "/legal-aid",
    tab: "var(--color-pine-600)",
  },
];

// Your supplied images
const steps = [
  { n: "01", title: "Report the incident", desc: "Submit details, evidence, and location — anonymously if you prefer.", art: "phone" },
  { n: "02", title: "Know your rights", desc: "Read plain-language guides on what happens next and what you're entitled to.", art: "book" },
  { n: "03", title: "Get matched to aid", desc: "Find a verified lawyer or pro-bono NGO suited to your specific situation.", art: "match" },
  { n: "04", title: "Track it through", desc: "Follow your case status and appointments from a single dashboard.", art: "progress" },
];



export default function LandingPage() {
  
  const [publicStats, setPublicStats] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadStats = async () => {
      try {
        const response = await fetch(
          `${API_URL}/public/stats`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }

        const data = await response.json();
        setPublicStats(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Homepage stats:", error);
        }
      }
    };

    loadStats();

    return () => controller.abort();
  }, []);
  
const [featuredLawyers, setFeaturedLawyers] = useState([]);

useEffect(() => {
  const controller = new AbortController();

  const loadFeaturedLawyers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/lawyers/featured`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Failed to load featured lawyers");
      }

      const data = await response.json();
      setFeaturedLawyers(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Featured lawyers:", error);
      }
    }
  };

  loadFeaturedLawyers();

  return () => controller.abort();
}, []);


const formatCount = (value) =>
  typeof value === "number"
    ? value.toLocaleString()
    : "—";

const stats = [
  {
    value: formatCount(publicStats?.reportsFiled),
    label: "Reports filed securely",
  },
  {
    value: formatCount(publicStats?.verifiedAdvocates),
    label: "Verified advocates",
  },
  {
    value:
      typeof publicStats?.medianFirstResponseHours === "number"
        ? `${publicStats.medianFirstResponseHours} hrs`
        : "—",
    label: "Median first response",
  },
  {
    value: formatCount(publicStats?.partnerNGOs),
    label: "Partner NGOs",
  },
];


  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,134,46,0.16),transparent_55%)]" />

        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-200"
            >
              <FiLock className="h-3.5 w-3.5 text-brass-300" />
              Secure &amp; anonymous by default
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-balance mt-6 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
            >
              Report incidents.
              <br />
              <span className="text-brass-300">
                Protect your identity.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-slate-300"
            >
              Justiva helps you file crime reports, reach verified lawyers, and understand your
              rights — all in one calm, guided place. No account required to start.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as={Link} to="/citizen/report" variant="brass" size="lg">
                Report an Incident <FiArrowRight />
              </Button>
              <Button
                as={Link}
                to="/find-lawyers"
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Find a Lawyer
              </Button>
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="tel:999"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-alert-600/40 bg-alert-600/10 px-4 py-2 text-sm font-semibold text-alert-100 hover:bg-alert-600/20 transition-colors"
            >
              <FiPhoneCall className="h-4 w-4" />
              In immediate danger? Call Emergency: 999
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto w-full max-w-sm space-y-5"
          >
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <video
                src={HERO_VIDEO}
                poster={HERO_POSTER}
                className="h-56 w-full object-cover sm:h-64"
                autoPlay
                loop
                muted
                playsInline
                aria-label="A short loop of a Justiva advocate meeting with a client"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lift backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wide text-slate-400">
                  CASE FILE
                </span>
                <Badge tone="pine">Resolved</Badge>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <CaseSeal size={64} />
                <div>
                  <p className="font-mono text-sm text-brass-300">JST-88C0B2</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Phishing attempt via SMS
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {["Submitted", "Assigned", "Resolved"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
                    {s}
                    <span className="ml-auto font-mono text-xs text-slate-500">
                      Day {i * 2 + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="container-page py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
            What you can do here
          </span>
          <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Four ways Justiva stands with you
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link to={f.to} className="group block h-full">
                <Card tab={f.tab} className="h-full p-6 transition-shadow hover:shadow-lift">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800 group-hover:bg-navy-800 group-hover:text-white transition-colors">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {f.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">
                    Explore
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works — updated photos */}
      <section className="bg-navy-50/60 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
              The path forward
            </span>
            <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              From confusion to clarity, in four steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <Art name={s.art} className="mb-4 rounded-xl shadow-card" />
                <span className="font-mono text-sm text-brass-600">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <span className="absolute right-[-1.1rem] top-[150px] hidden text-slate-300 lg:block">
                    <FiArrowRight />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-20">
        <div className="grid gap-8 rounded-2xl border border-line bg-white p-8 shadow-card sm:grid-cols-4 sm:p-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-display text-3xl font-semibold text-navy-900">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured verified lawyers */}
      <section className="container-page py-4 sm:py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
              Verified professionals
            </span>
            <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Meet a few of our featured lawyers
            </h2>
          </div>
          <Link
            to="/find-lawyers"
            className="flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-brass-600"
          >
            Browse all lawyers <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLawyers.length > 0 ? featuredLawyers.map((l) => (
            <Link key={l.id} to={`/find-lawyers/${l.id}`}>
              <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                <LawyerAvatar lawyer={l} className="h-12 w-12" textClass="text-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{l.name}</p>
                  <p className="truncate text-xs text-slate-500">{l.title}</p>
                </div>
                {l.verified && (
                  <Badge tone="pine" className="!py-0.5 shrink-0">
                    Verified
                  </Badge>
                )}
              </Card>
            </Link>
                    )) : (
            <p className="col-span-full py-8 text-center text-sm text-slate-500">
              No verified lawyers available yet.
            </p>
          )}
        </div>
      </section>

      {/* Testimonials */}

      {/* Testimonials */}
      <section className="bg-navy-50/60 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
              Success stories
            </span>
            <h2 className="text-balance mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Trusted by citizens across the country
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <p className="text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <MonogramAvatar name={t.name} className="h-9 w-9" textClass="text-xs" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety and FAQ */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card tab="var(--color-alert-600)" className="p-8">
            <FiPhoneCall className="h-6 w-6 text-alert-600" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Emergency &amp; safety information
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Emergency contacts, police, fire, and ambulance numbers are always publicly
              accessible — no login required.
            </p>
            <Button as={Link} to="/emergency-safety" variant="outline" className="mt-5">
              View emergency contacts
            </Button>
          </Card>

          <Card className="p-8">
            <FiMessageSquare className="h-6 w-6 text-navy-800" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Have questions?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Read answers to common questions about reporting, lawyer verification, and how
              Justiva protects your privacy.
            </p>
            <Button as={Link} to="/faq" variant="outline" className="mt-5">
              Visit the FAQ
            </Button>
          </Card>
        </div>
      </section>

      {/* Role split CTA */}
      <section className="pb-24">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
            <FiShield className="h-7 w-7 text-brass-300" />
            <h3 className="mt-5 font-display text-2xl font-semibold">
              I need help as a civilian
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Report an incident, ask the AI assistant a question, or find a lawyer near you —
              free to start, no commitment.
            </p>
            <Button as={Link} to="/login?role=citizen" variant="brass" className="mt-6">
              Continue as Civilian <FiArrowRight />
            </Button>
          </div>

          <div className="rounded-2xl border border-line bg-white p-8 sm:p-10">
            <FiUsers className="h-7 w-7 text-navy-800" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
              I'm a legal professional
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              List your practice, manage appointment requests, and reach civilians who need
              verified representation.
            </p>
            <Button as={Link} to="/login?role=lawyer" variant="outline" className="mt-6">
              Continue as Lawyer <FiArrowRight />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
