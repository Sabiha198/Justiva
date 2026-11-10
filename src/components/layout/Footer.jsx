import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Find Lawyers", to: "/find-lawyers" },
      { label: "Legal Resources", to: "/legal-resources" },
      { label: "Legal Aid / NGOs", to: "/legal-aid" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Emergency & Safety", to: "/emergency-safety" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "About Justiva", to: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
      { label: "Responsible AI Use", to: "#" },
      { label: "Cookie Policy", to: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            A calmer path through legal trouble — report incidents securely, reach verified
            lawyers, and get guidance in plain language.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 transition-colors hover:text-brass-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Justiva. All rights reserved.</p>
          <p>This is a demo frontend — no data is stored or transmitted.</p>
        </div>
      </div>
    </footer>
  );
}
