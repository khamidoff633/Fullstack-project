import { motion } from "framer-motion";
import { Briefcase, Building2, Sparkles } from "lucide-react";

const items = [
  { icon: Briefcase, label: "Active Jobs", value: "10,000+" },
  { icon: Building2, label: "Companies", value: "2,400+" },
  { icon: Sparkles, label: "Hires This Month", value: "1,200+" },
];

export default function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center">
              <it.icon size={18} />
            </div>
            <div>
              <div className="text-2xl font-semibold">{it.value}</div>
              <div className="text-sm text-ink-500">{it.label}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.section>
  );
}
