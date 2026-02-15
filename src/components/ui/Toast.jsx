import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((payload, type = "info") => {
    // Supports both usages:
    // 1) push('Saved', 'success')
    // 2) push({ message: 'Saved', type: 'success' })
    const id = crypto?.randomUUID?.() || String(Date.now() + Math.random());

    let msg = payload;
    let t = type;

    if (payload && typeof payload === "object") {
      if ("message" in payload) msg = payload.message;
      if ("type" in payload) t = payload.type;
    }

    const safeMessage = typeof msg === "string" ? msg : String(msg ?? "");

    setToasts((prev) => [...prev, { id, message: safeMessage, type: t }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 2500);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "rounded-xl border shadow-soft px-4 py-3 text-sm bg-paper-50 border-line " +
              (t.type === "success"
                ? "text-brand-900"
                : t.type === "error"
                ? "text-red-700"
                : "text-ink-700")
            }
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
