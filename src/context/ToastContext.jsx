import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback(
    (message, opts = {}) => {
      const id = ++idCounter;
      const toast = { id, message, type: opts.type || "info", title: opts.title };
      setToasts((prev) => [...prev, toast]);
      timers.current[id] = setTimeout(() => remove(id), opts.duration || 4200);
      return id;
    },
    [remove]
  );

  const api = {
    push,
    success: (message, opts) => push(message, { ...opts, type: "success" }),
    error: (message, opts) => push(message, { ...opts, type: "error" }),
    info: (message, opts) => push(message, { ...opts, type: "info" }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="pointer-events-auto flex items-start gap-3 rounded-lg border border-line bg-white p-3.5 shadow-lift"
              role="status"
            >
              <span
                className={cnIcon(t.type)}
              >
                {t.type === "success" && <FiCheckCircle className="h-4.5 w-4.5" />}
                {t.type === "error" && <FiAlertTriangle className="h-4.5 w-4.5" />}
                {t.type === "info" && <FiInfo className="h-4.5 w-4.5" />}
              </span>
              <div className="flex-1 min-w-0">
                {t.title && <p className="text-sm font-semibold text-ink">{t.title}</p>}
                <p className="text-sm text-slate-700 leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
                aria-label="Dismiss notification"
              >
                <FiX className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function cnIcon(type) {
  const base = "mt-0.5 shrink-0 rounded-full p-1";
  if (type === "success") return `${base} bg-pine-100 text-pine-700`;
  if (type === "error") return `${base} bg-alert-100 text-alert-700`;
  return `${base} bg-navy-50 text-navy-700`;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
