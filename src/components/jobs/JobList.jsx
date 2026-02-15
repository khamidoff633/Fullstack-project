import React from 'react';
import { JobCard } from './JobCard';

function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="h-4 w-2/3 rounded bg-paper-100 dark:bg-slate-800" />
      <div className="mt-3 h-3 w-1/2 rounded bg-paper-100 dark:bg-slate-800" />
      <div className="mt-5 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-paper-100 dark:bg-slate-800" />
        <div className="h-6 w-20 rounded-full bg-paper-100 dark:bg-slate-800" />
      </div>
      <div className="mt-6 h-3 w-3/4 rounded bg-paper-100 dark:bg-slate-800" />
      <div className="mt-2 h-3 w-2/3 rounded bg-paper-100 dark:bg-slate-800" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-paper-100 dark:bg-slate-800" />
        <div className="h-9 w-28 rounded-xl bg-paper-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export function JobList({ jobs, savedJobs, onToggleSave, isLoading = false, onClearFilters }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-ink-900 mb-2">No jobs found</h3>
        <p className="text-ink-500 mb-6">
          Try adjusting your filters or search terms to find more opportunities.
        </p>

        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-950"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedJobs.includes(job.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
