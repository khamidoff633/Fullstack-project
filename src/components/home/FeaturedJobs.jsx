import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import jobs from "../../data/jobs";
import JobMiniCard from "./JobMiniCard";

export default function FeaturedJobs() {
  const featuredJobs = jobs.slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Featured Jobs</h2>
        <p className="mt-2 text-sm text-ink-500">
          Hand-picked opportunities from top companies
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredJobs.map((job) => (
          <JobMiniCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/jobs"
          className="rounded-xl px-6 py-3 font-medium text-white transition-all bg-accent-600 hover:bg-accent-700 hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]"
        >
          Browse all jobs
        </Link>
      </div>
    </motion.section>
  );
}
