import { motion } from "framer-motion";

const items = [
  {
    name: "Ava Johnson",
    role: "Product Designer",
    text: "Clean UI and super fast filters. I found interviews within a week.",
  },
  {
    name: "Daniel Kim",
    role: "Frontend Engineer",
    text: "The saved jobs and quick apply flow feels premium and simple.",
  },
  {
    name: "Sofia Perez",
    role: "Marketing Lead",
    text: "Great companies and clear job details. Love the categories section.",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <div>
        <h2 className="text-xl font-semibold">What people say</h2>
        <p className="mt-1 text-sm text-ink-500">
          Feedback from candidates and recruiters.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <div
            key={t.name}
            className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6"
          >
            <p className="text-sm text-ink-600">“{t.text}”</p>
            <div className="mt-4">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-ink-500">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
