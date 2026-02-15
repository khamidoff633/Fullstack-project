import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { jobs as demoJobs } from "../data/jobs";
import { formatDate, formatSalary } from "../utils/format";
import { motion } from "framer-motion";
import { Bookmark, MapPin, Building2, Briefcase } from "lucide-react";
import { useToast } from "../components/ui/Toast";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const isMongoId = (v) => /^[a-f0-9]{24}$/i.test(String(v || ""));

export default function JobDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { push } = useToast();
  const { user } = useAuth();

  const [savedJobs, setSavedJobs] = useLocalStorage("savedJobs", []);
  const [jobApi, setJobApi] = useState(null);
  const [apiErr, setApiErr] = useState("");

  useEffect(() => {
    if (!isMongoId(id)) return;
    (async () => {
      try {
        const data = await api.request(`/jobs/${id}`);
        setJobApi(data.job);
      } catch (e) {
        setApiErr(e.message || "Job not found");
      }
    })();
  }, [id]);

  const jobDemo = useMemo(() => demoJobs.find((j) => j.id === Number(id)), [id]);
  const job = jobApi || jobDemo;

  const jobId = jobApi ? jobApi._id : jobDemo?.id;
  const isSaved = jobId ? savedJobs.includes(jobId) : false;

  const toggleSave = () => {
    if (!jobId) return;
    setSavedJobs((prev) => {
      const next = prev.includes(jobId) ? prev.filter((x) => x !== jobId) : [...prev, jobId];
      push(prev.includes(jobId) ? "Removed from saved." : "Saved job.", "success");
      return next;
    });
  };

  const apply = async () => {
    if (!jobApi) {
      push("Apply works only for jobs created in backend (for now).", "error");
      return;
    }
    if (!user) {
      nav('/signin');
      return;
    }
    try {
      await api.request(`/applications/jobs/${jobApi._id}/apply`, { method: 'POST', auth: true, body: { coverLetter: '' } });
      push('Applied ✅', 'success');
    } catch (e) {
      if (e.status === 428) {
        push('Complete your profile first', 'error');
        nav('/create-profile');
        return;
      }
      push(e.message || 'Apply failed', 'error');
    }
  };

  if (!job) {
    return (
      <Container className="py-12">
        <div className="rounded-xl2 border border-line bg-paper-50 p-8 text-center">
          <h1 className="text-2xl font-semibold">Job not found</h1>
          <p className="mt-2 text-sm text-ink-500">{apiErr || "The job you’re looking for doesn’t exist."}</p>
          <Link className="mt-6 inline-block text-brand-900 hover:underline" to="/jobs">
            Back to Jobs
          </Link>
        </div>
      </Container>
    );
  }

  const companyName = job.companyName || job.company || "Company";
  const postedAt = job.createdAt || job.postedAt;

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <Link to="/jobs" className="text-sm text-ink-500 hover:text-ink-900 dark:text-slate-100">
                ← Back to jobs
              </Link>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold">{job.title}</h1>
                  <div className="mt-2 flex flex-wrap gap-2 items-center text-sm text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      <Building2 size={16} className="text-ink-500" /> {companyName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={16} className="text-ink-500" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase size={16} className="text-ink-500" /> {job.type}
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleSave}
                  className={
                    "h-11 px-4 rounded-xl border transition-all inline-flex items-center gap-2 " +
                    (isSaved
                      ? "bg-accent-600 text-white border-accent-600 hover:bg-accent-700 hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]"
                      : "bg-paper-50 text-ink-900 border-line hover:bg-paper-100 dark:bg-slate-900")
                  }
                >
                  <Bookmark size={18} />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.remote ? <Badge variant="success">Remote</Badge> : <Badge variant="secondary">On-site</Badge>}
                <Badge variant="secondary">{formatSalary(job.salaryMin, job.salaryMax)}</Badge>
              </div>

              <Card className="mt-6 p-6">
                <h2 className="text-lg font-semibold">About the role</h2>
                <p className="mt-3 text-ink-600 leading-relaxed">{job.description}</p>

                {job.tags?.length ? (
                  <div className="mt-6">
                    <div className="text-sm font-semibold">Tags</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs bg-paper-50 border border-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {postedAt ? <div className="mt-6 text-sm text-ink-500">Posted {formatDate(postedAt)}</div> : null}
              </Card>
            </div>

            <div className="w-full lg:w-[360px]">
              <Card className="p-6 sticky top-24">
                <div className="text-sm text-ink-500">Salary range</div>
                <div className="mt-1 text-2xl font-semibold">{formatSalary(job.salaryMin, job.salaryMax)}</div>

                <Button
                  onClick={apply}
                  variant="primary"
                  className="mt-6 w-full shadow-[0_0_0_0_rgba(249,115,22,0.0)] hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]"
                >
                  Apply now
                </Button>

                <Button asChild variant="secondary" className="mt-3 w-full">
                  <Link to="/companies">View company</Link>
                </Button>

                {!jobApi ? (
                  <div className="mt-4 text-xs text-ink-500">
                    Note: Demo jobs are static. Jobs created from backend support Apply.
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
