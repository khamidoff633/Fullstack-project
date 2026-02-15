import { motion } from "framer-motion";

const cats = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Product",
  "Data",
];

export default function Categories() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Top Categories</h2>
          <p className="mt-1 text-sm text-ink-500">
            Browse jobs by category to find the best match.
          </p>
        </div>
        <span className="text-xs text-ink-500">Updated daily</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            className="px-4 py-2 rounded-full border border-line bg-paper-100 hover:bg-brand-100 text-sm transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </motion.section>
  );
}
