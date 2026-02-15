import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export function CompanyCard({ company }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="p-6 overflow-hidden">
        {company.cover ? (
          <div className="mb-5 -mx-6 -mt-6">
            <img
              src={company.cover}
              alt=""
              className="h-28 w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-900 dark:bg-slate-800 dark:text-slate-100 flex items-center justify-center font-semibold">
              {company.logoText}
            </div>
            <div>
              <Link
                to={`/companies/${company.id}`}
                className="font-semibold hover:underline"
              >
                {company.name}
              </Link>
              <div className="text-sm text-ink-500 dark:text-slate-300">
                {company.industry} • {company.size}
              </div>
            </div>
          </div>

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white"
            title="Website"
          >
            <ExternalLink size={18} />
          </a>
        </div>

        <p className="mt-4 text-sm text-ink-600 dark:text-slate-200 line-clamp-3">{company.about}</p>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-ink-500 dark:text-slate-300">{company.location}</span>
          <Link
            to={`/companies/${company.id}`}
            className="px-3 py-1 rounded-full bg-accent-50 text-accent-800 border border-line hover:bg-accent-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            {company.openRoles} roles
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
