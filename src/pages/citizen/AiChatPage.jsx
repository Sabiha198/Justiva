import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBookOpen, FiCopy, FiTrash2, FiPlus, FiMessageSquare } from "react-icons/fi";
import SourceCard from "../../components/ai/SourceCard";
import MarkdownAnswer from "../../components/ai/MarkdownAnswer";
import Button from "../../components/ui/Button";
import { suggestedPrompts } from "../../data/aiResponses";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
import { useToast } from "../../context/ToastContext";

function useTypewriter(fullText, active, speed = 12) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    setText("");
    let i = 0;
    const id = setInterval(() => {
      i += speed;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [fullText, active, speed]);
  return text;
}

export default function AiChatPage() {
  const [params] = useSearchParams();
  const question = params.get("q") || "";
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadingAnswer, setLoadingAnswer] = useState(true);
  const [cleared, setCleared] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useAuth();

// Stores the actual answer returned by our backend/Groq.
const [answer, setAnswer] = useState("");

// Stores AI source information.
// For now we don't have real sources yet.
const [sources, setSources] = useState([]);


useEffect(() => {
  // Reset the page whenever the question changes.
  setCleared(false);
  setLoadingSources(true);
  setLoadingAnswer(true);

  // Clear the previous AI answer.
  setAnswer("");

  // If there is no question, don't call the AI.
  if (!question || !token) {
    setLoadingSources(false);
    setLoadingAnswer(false);
    return;
  }

  // Save the question in our temporary conversation history.
  setHistory((prev) =>
    prev[0] === question
      ? prev
      : [question, ...prev].slice(0, 8)
  );

  // Send the question to our Express backend.
  const askAI = async () => {
    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        // We are sending data to the backend.
        method: "POST",

        // Tell Express that we're sending JSON.
        headers: {
          "Content-Type": "application/json",

          // Send the logged-in user's JWT token.
          Authorization: `Bearer ${token}`,
        },

        // Send the user's question.
        body: JSON.stringify({
          message: question,
        }),
      });

      // Convert the backend response from JSON.
      const data = await response.json();

      // If the backend returned an error, show it.
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get AI response."
        );
      }

      // Store the answer returned by Groq.
      setAnswer(data.answer || "");

      // We don't have real knowledge-base sources yet.
      setSources(data.sources || []);

      // Sources finished loading.
      setLoadingSources(false);

      // Answer finished loading.
      setLoadingAnswer(false);

    } catch (error) {
      console.error("AI request error:", error);

      // Display the error inside the chatbot.
      setAnswer(
        error.message || "Something went wrong while contacting Justiva AI."
      );

      setLoadingSources(false);
      setLoadingAnswer(false);
    }
  };

  // Start the API request.
  askAI();

}, [question, token]);

// Show the Groq answer through our existing typewriter effect.
const typed = useTypewriter(answer, !loadingAnswer);

// The text displayed inside MarkdownAnswer.
const displayedText = loadingAnswer ? "" : typed;

  const copyAnswer = () => {
  // Copy the real Groq response.
  navigator.clipboard?.writeText(answer);

  toast.success("Response copied to clipboard.");
};

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Conversation sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line bg-white lg:block">
        <div className="p-4">
          <Button as={Link} to="/citizen/ai" variant="outline" size="sm" className="w-full">
            <FiPlus /> New conversation
          </Button>
        </div>
        <div className="px-4 pb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Recent</p>
          <div className="space-y-1">
            {history.length === 0 && <p className="text-xs text-slate-400">No conversations yet this session.</p>}
            {history.map((h) => (
              <button
                key={h}
                onClick={() => navigate(`/citizen/ai/chat?q=${encodeURIComponent(h)}`)}
                className={`flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-xs transition-colors ${
                  h === question ? "bg-navy-50 text-navy-800 font-medium" : "text-slate-500 hover:bg-navy-50"
                }`}
              >
                <FiMessageSquare className="mt-0.5 h-3 w-3 shrink-0" />
                <span className="line-clamp-2">{h}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="container-page max-w-3xl flex-1 py-8">
        <div className="flex items-center justify-between">
          <Link to="/citizen/ai" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800">
            <FiArrowLeft className="h-4 w-4" /> New question
          </Link>
          {!cleared && !loadingAnswer && (
            <button
              onClick={() => setCleared(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-alert-600"
            >
              <FiTrash2 className="h-3.5 w-3.5" /> Clear conversation
            </button>
          )}
        </div>

        {cleared ? (
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-400">Conversation cleared.</p>
            <Button as={Link} to="/citizen/ai" variant="outline" className="mt-4">
              Ask something new
            </Button>
          </div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-balance mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl"
            >
              {question || "Your question"}
            </motion.h1>

            {/* Sources */}
            <div className="mt-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <FiBookOpen className="h-4 w-4 text-slate-400" /> Sources
              </div>
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                {loadingSources
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-[86px] w-40 shrink-0 animate-pulse rounded-lg bg-slate-100 sm:w-44" />
                    ))
                  : sources.length > 0
                  ? sources.map((s, i) => (
                      <SourceCard key={i} source={s} />
                    ))
                  : (
                      <p className="text-sm text-slate-400">
                        No sources available for this response yet.
                      </p>
                    )}
              </div>
            </div>

            {/* Answer */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="font-display text-base font-semibold text-ink">Justiva</p>
                {!loadingAnswer && (
                  <button onClick={copyAnswer} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-navy-800">
                    <FiCopy className="h-3.5 w-3.5" /> Copy
                  </button>
                )}
              </div>
              <div className="mt-3">
                {loadingAnswer ? (
                  <div className="space-y-2.5">
                    {[95, 88, 92, 60].map((w, i) => (
                      <div key={i} className="h-3.5 animate-pulse rounded bg-slate-100" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                ) : (
                  <MarkdownAnswer content={displayedText} />
                )}
              </div>
            </div>

            {!loadingAnswer && (
              <div className="mt-8 border-t border-line pt-6">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Continue asking</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts
                    .filter((p) => p !== question)
                    .slice(0, 3)
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => navigate(`/citizen/ai/chat?q=${encodeURIComponent(p)}`)}
                        className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-brass-500 hover:text-navy-800"
                      >
                        {p}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
