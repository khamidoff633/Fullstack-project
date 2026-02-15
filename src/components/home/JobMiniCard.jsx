import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";
import { formatSalary } from "../../utils/format";

export default function JobMiniCard({ job }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center font-semibold">
            {job.companyName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-ink-500">{job.companyName}</div>
          </div>
        </div>
        {job.remote ? (
          <span className="px-3 py-1 rounded-full text-xs bg-accent-50 text-accent-800 border border-line">
            Remote
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-600">
        <span className="inline-flex items-center gap-1">
          <MapPin size={16} className="text-ink-500" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase size={16} className="text-ink-500" /> {job.type}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="font-semibold">{formatSalary(job.salaryMin, job.salaryMax)}</div>
        <Link to={`/jobs/${job.id}`} className="text-sm font-medium text-brand-900 hover:underline">
          Details
        </Link>
      </div>
    </motion.div>
  );
}
