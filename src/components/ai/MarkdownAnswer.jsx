import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownAnswer({ content }) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-ink prose-a:text-navy-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
