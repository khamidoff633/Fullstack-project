import { useState } from "react";

const faqs = [
  {
    q: "Bu real backend bormi?",
    a: "Hozircha yo‘q — bu portfolio uchun front-end demo. Backend qo‘shish oson (REST/GraphQL).",
  },
  {
    q: "Saved jobs qayerda saqlanadi?",
    a: "Brauzer localStorage’da. Refresh qilsang ham qoladi.",
  },
  {
    q: "Filterlar URL’da saqlanadimi?",
    a: "Ha. Linkni ulashsang ham aynan shu filterlar bilan ochiladi.",
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((p) => !p)}
      className="w-full rounded-2xl border border-line bg-white p-5 text-left shadow-soft dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold">{q}</div>
        <span className="text-sm text-ink-500 dark:text-slate-400">
          {open ? "−" : "+"}
        </span>
      </div>
      {open && <p className="mt-3 text-sm text-ink-600 dark:text-slate-300">{a}</p>}
    </button>
  );
}

export default function FAQPreview() {
  return (
    <section className="mt-14">
      <div>
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <p className="mt-2 text-ink-600 dark:text-slate-300">
          Tez-tez so‘raladigan savollar.
        </p>
      </div>
      <div className="mt-6 grid gap-3">
        {faqs.map((f) => (
          <Item key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}
