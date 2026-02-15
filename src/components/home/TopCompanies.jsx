import { motion } from "framer-motion";

const companies = [
  { name: "TechCorp", meta: "Software • 1k-5k" },
  { name: "DesignHub", meta: "Design • 50-200" },
  { name: "DataSystems", meta: "Data • 200-500" },
  { name: "CloudNine", meta: "Cloud • 500-1k" },
  { name: "FinPeak", meta: "Fintech • 200-500" },
  { name: "Marketly", meta: "Marketing • 50-200" },
];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TopCompanies() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Top Companies</h2>
          <p className="mt-1 text-sm text-ink-500">
            Explore companies hiring right now.
          </p>
        </div>
        <a className="text-sm font-medium text-brand-900 hover:underline" href="/companies">
          View all
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((c) => (
          <div
            key={c.name}
            className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6 flex items-center gap-4 group"
          >
            <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center font-semibold">
              {initials(c.name)}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-ink-500">{c.meta}</div>
            </div>
            <span className="text-sm font-medium text-accent-700 group-hover:underline">
              Open roles
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
