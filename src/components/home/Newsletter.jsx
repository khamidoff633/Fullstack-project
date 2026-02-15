import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl2 bg-brand-900 text-paper-50 p-8 border border-paper-50/10 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-600/40 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-xl bg-paper-50/10 border border-paper-50/15 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Get job alerts</h2>
            <p className="mt-2 text-paper-50/80 text-sm max-w-xl">
              Weekly updates with new roles, remote opportunities, and top companies.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            className="w-full sm:w-80 rounded-xl bg-paper-50 text-ink-900 px-4 py-3 outline-none"
            placeholder="Enter your email"
          />
          <button className="rounded-xl px-6 py-3 font-medium text-white transition-all bg-accent-600 hover:bg-accent-700 hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]">
            Subscribe
          </button>
        </div>
      </div>
    </motion.section>
  );
}
