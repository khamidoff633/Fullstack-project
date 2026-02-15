import { Search, Sparkles, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & filter",
    text: "Role, level, salary, remote — hammasi bir joyda. URL bilan saqlanadi.",
  },
  {
    icon: Sparkles,
    title: "Save & compare",
    text: "Yoqqan joblarni saqlab, tez solishtirasan. (localStorage)",
  },
  {
    icon: Send,
    title: "Quick apply",
    text: "2 ta maydon, bir click — demo ariza yuborish.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="mt-2 text-ink-600 dark:text-slate-300">
            Minimal, tez va professional UX.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-line bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-900 ring-1 ring-brand-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
              <s.icon size={18} />
            </div>
            <h3 className="mt-4 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
