import { useMemo, useState } from "react";
import Modal from "../ui/Modal";
import { useToast } from "../../hooks/useToast";

export default function QuickApplyModal({ open, job, onClose }) {
  const { addToast } = useToast();
  const title = useMemo(() => {
    if (!job) return "Quick apply";
    return `Apply to ${job.title} · ${job.company}`;
  }, [job]);

  const [form, setForm] = useState({ name: "", email: "", portfolio: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      addToast({ type: "error", message: "Name va email kiriting" });
      return;
    }
    addToast({ type: "success", message: "Ariza yuborildi (demo) ✅" });
    onClose?.();
    setForm({ name: "", email: "", portfolio: "" });
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid gap-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Full name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-slate-800 dark:bg-slate-900"
            placeholder="John Doe"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-slate-800 dark:bg-slate-900"
            placeholder="you@email.com"
            type="email"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Portfolio (optional)
          </label>
          <input
            value={form.portfolio}
            onChange={(e) => setForm((p) => ({ ...p, portfolio: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-slate-800 dark:bg-slate-900"
            placeholder="https://github.com/username"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Send application
          </button>
        </div>
      </form>
    </Modal>
  );
}
