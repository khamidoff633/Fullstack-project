import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/real/hero.png";

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const q = query.trim();
    navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
  };

  const handleQuickTag = (tag) => {
    navigate(`/jobs?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative overflow-hidden text-paper-50">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-900/70 dark:bg-night-950/75" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-accent-600 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-600 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-center"
        >
          Find Your Dream Job
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="mt-4 text-center text-paper-50/80 max-w-2xl mx-auto"
        >
          Discover opportunities at top companies. Your next career move starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-xl2 bg-paper-50/10 border border-paper-50/15 backdrop-blur">
            <div className="flex items-center gap-2 flex-1 rounded-xl bg-paper-50 px-4 py-3 text-ink-900">
              <Search size={18} className="text-ink-500" />
              <input
                className="w-full outline-none bg-transparent text-sm"
                placeholder="Search jobs, companies, skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-xl px-6 py-3 font-medium text-white transition-all
                bg-accent-600 hover:bg-accent-700
                shadow-[0_0_0_0_rgba(249,115,22,0.0)]
                hover:shadow-[0_0_30px_0_rgba(249,115,22,0.35)]"
            >
              Search
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-paper-50/80">
            {["Remote", "Frontend", "UI/UX", "Product", "Marketing"].map((t) => (
              <button
                key={t}
                onClick={() => handleQuickTag(t)}
                className="px-3 py-1 rounded-full border border-paper-50/20 bg-paper-50/5 hover:bg-paper-50/10 hover:border-paper-50/30 transition"
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
