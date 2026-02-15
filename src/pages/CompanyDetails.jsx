import { Link, useParams } from "react-router-dom";
import { companies } from "../data/companies";
import { jobs } from "../data/jobs";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export default function CompanyDetails() {
  const { id } = useParams();
  const company = companies.find((c) => String(c.id) === String(id));
  const companyJobs = jobs.filter(
    (j) => (j.companyId && String(j.companyId) === String(id)) || j.companyName === company?.name
  );

  if (!company) {
    return (
      <div className="min-h-screen bg-paper-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-semibold">Company not found</h1>
          <Link className="mt-4 inline-block text-brand-900 hover:underline" to="/companies">
            ← Back to companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link className="text-sm text-ink-500 hover:underline" to="/companies">
              ← Companies
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">{company.name}</h1>
            <p className="mt-2 text-ink-600 dark:text-slate-300">
              {company.industry} • {company.location} • {company.size}
            </p>
          </div>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-950"
          >
            Visit website
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 border border-line bg-white dark:bg-slate-900 dark:border-slate-800 lg:col-span-2">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-3 text-ink-600 leading-relaxed dark:text-slate-300">
              {company.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {(company.tags ?? []).slice(0, 8).map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 border border-line bg-white dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-lg font-semibold">Quick facts</h2>
            <div className="mt-4 space-y-3 text-sm text-ink-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Open roles</span>
                <span className="font-medium text-ink-900 dark:text-slate-50">
                  {company.openRoles}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Founded</span>
                <span className="font-medium text-ink-900 dark:text-slate-50">{company.founded}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Remote policy</span>
                <span className="font-medium text-ink-900 dark:text-slate-50">
                  {company.remotePolicy}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Jobs at {company.name}</h2>
            <Link className="text-sm text-brand-900 hover:underline" to="/jobs">
              Browse all jobs
            </Link>
          </div>

          {companyJobs.length === 0 ? (
            <Card className="mt-4 p-6 border border-line bg-white dark:bg-slate-900 dark:border-slate-800">
              <p className="text-ink-600 dark:text-slate-300">
                Hozircha bu kompaniyada joblar yo‘q.
              </p>
            </Card>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {companyJobs.slice(0, 6).map((j) => (
                <Link key={j.id} to={`/jobs/${j.id}`}>
                  <Card className="p-5 border border-line bg-white hover:shadow-soft transition-shadow dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{j.title}</div>
                        <div className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                          {j.location} • {j.type}
                        </div>
                      </div>
                      {j.remote && <Badge variant="success">Remote</Badge>}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
