import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatSalary, formatTimeAgo } from "../../utils/format";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import QuickApplyModal from "./QuickApplyModal";

export function JobCard({ job, isSaved = false, onToggleSave }) {
  const { addToast } = useToast();
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="p-6 border border-line bg-paper-50 shadow-soft">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center font-semibold">
              {job.companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                <Link to={`/jobs/${job.id}`} className="hover:underline">
                  {job.title}
                </Link>
              </h3>
              <p className="text-ink-500">{job.companyName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {job.remote && <Badge variant="success">Remote</Badge>}
            <button
              onClick={() => {
                onToggleSave?.(job.id);
                addToast({
                  type: isSaved ? "info" : "success",
                  message: isSaved
                    ? "Saved ro‘yxatdan olib tashlandi"
                    : "Saved ro‘yxatga qo‘shildi",
                });
              }}
              className={
                "h-10 w-10 rounded-xl border transition-all flex items-center justify-center " +
                (isSaved
                  ? "bg-accent-600 text-white border-accent-600 hover:bg-accent-700 hover:shadow-[0_0_22px_rgba(249,115,22,0.35)]"
                  : "bg-paper-100 text-ink-900 border-line hover:bg-paper-200")
              }
              title={isSaved ? "Unsave" : "Save"}
              aria-label={isSaved ? "Unsave job" : "Save job"}
            >
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-500">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.type}</span>
          <span>•</span>
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags?.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-ink-500">{formatTimeAgo(job.postedAt)}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setApplyOpen(true)}
              className="rounded-xl bg-brand-900 px-3 py-2 text-sm font-medium text-white hover:bg-brand-950"
            >
              Quick apply
            </button>
            <Link to={`/jobs/${job.id}`} className="text-brand-900 font-medium hover:underline">
              View details
            </Link>
          </div>
        </div>

        <QuickApplyModal open={applyOpen} job={{
          id: job.id,
          title: job.title,
          company: job.companyName,
        }} onClose={() => setApplyOpen(false)} />
      </Card>
    </motion.div>
  );
}
