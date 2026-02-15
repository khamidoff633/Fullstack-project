import Container from "../components/layout/Container";
import { JobCard } from "../components/jobs/JobCard";
import { jobs } from "../data/jobs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMemo } from "react";

export default function Saved() {
  const [savedJobs, setSavedJobs] = useLocalStorage("savedJobs", []);

  const savedList = useMemo(() => {
    const set = new Set(savedJobs);
    return jobs.filter((j) => set.has(j.id));
  }, [savedJobs]);

  const toggleSave = (id) => {
    setSavedJobs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <h1 className="text-3xl font-semibold">Saved Jobs</h1>
        <p className="mt-2 text-sm text-ink-500">Your bookmarked jobs in one place.</p>

        {savedList.length === 0 ? (
          <div className="mt-10 rounded-xl2 border border-line bg-paper-50 p-8 text-center text-ink-500">
            No saved jobs yet. Open a job and click the bookmark ⭐️
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedList.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
