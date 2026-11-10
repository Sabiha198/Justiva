import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUp, FiPaperclip, FiZap } from "react-icons/fi";
import { suggestedPrompts } from "../../data/aiResponses";

export default function AiAssistantHomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const go = (q) => {
    const value = (q ?? query).trim();
    if (!value) return;
    navigate(`/citizen/ai/chat?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-balance text-center font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        From Confusion to Clarity
      </motion.h1>
      <p className="mt-3 max-w-md text-center text-sm text-slate-500">
        Ask a legal question in plain language — grounded answers, cited next steps.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 w-full max-w-2xl rounded-xl border border-line bg-white shadow-card"
      >
        <textarea
          rows={2}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              go();
            }
          }}
          placeholder="Search anything… e.g. 'What are my rights if I'm arrested?'"
          className="w-full resize-none rounded-t-xl px-5 pt-4 text-sm text-ink placeholder:text-slate-300 focus:outline-none"
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button type="button" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-navy-50">
              <FiZap className="h-3.5 w-3.5" /> Focus
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-navy-50">
              <FiPaperclip className="h-3.5 w-3.5" /> Attach
            </button>
          </div>
          <button
            onClick={() => go()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-white transition-colors hover:bg-navy-900"
            aria-label="Ask"
          >
            <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex max-w-2xl flex-wrap justify-center gap-2"
      >
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brass-500 hover:text-navy-800"
          >
            {p}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
