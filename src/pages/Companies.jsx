import { useMemo, useState } from "react";
import Container from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { CompanyCard } from "../components/companies/CompanyCard";
import companies from "../data/companies";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Companies() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return companies;
    return companies.filter((c) =>
      [c.name, c.industry, c.location].some((x) => String(x).toLowerCase().includes(s))
    );
  }, [q]);

  return (
    <div className="bg-paper-100 text-ink-900 dark:bg-slate-900 dark:text-slate-100">
      <section className="bg-paper-50 border-b border-line dark:bg-slate-900/40 dark:border-slate-800">
        <Container className="py-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Companies</h1>
              <p className="mt-2 text-sm text-ink-500 dark:text-slate-300 max-w-xl">
                Browse companies and discover teams hiring right now.
              </p>
            </div>

            <div className="w-full md:w-[420px]">
              <Input
                placeholder="Search companies by name, industry, location..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl2 bg-brand-900 text-paper-50 p-6 border border-paper-50/10 overflow-hidden relative">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-600/40 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold">Hiring?</div>
                <div className="text-paper-50/80 text-sm">
                  Post a job and reach thousands of candidates.
                </div>
              </div>
              <Link
                to="/post"
                className="inline-flex justify-center rounded-xl px-5 py-3 font-medium text-white bg-accent-600 hover:bg-accent-700 transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-center text-ink-500 dark:text-slate-300">No companies found.</div>
        ) : null}
      </Container>
    </div>
  );
}
