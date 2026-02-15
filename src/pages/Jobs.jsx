import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobList } from '../components/jobs/JobList';
import { Pagination } from '../components/jobs/Pagination';
import { Select } from '../components/ui/Select';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { jobs } from '../data/jobs';
import { filterJobs, sortJobs, paginateJobs, getTotalPages } from '../utils/filters';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedJobs, setSavedJobs] = useLocalStorage('savedJobs', []);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    type: '',
    remote: false,
    salaryMin: '',
    salaryMax: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Read quick-filters from URL (e.g. /jobs?tag=Remote, /jobs?q=frontend)
  useEffect(() => {
    const tag = searchParams.get('tag');
    const q = searchParams.get('q');

    if (!tag && !q) return;

    setCurrentPage(1);
    setFilters((prev) => {
      const next = { ...prev };
      if (q) next.keyword = q;

      if (tag) {
        if (tag.toLowerCase() === 'remote') {
          next.remote = true;
          // Keep keyword unchanged so user can still type
        } else {
          next.keyword = tag;
        }
      }
      return next;
    });
  }, [searchParams]);

  // Apply filters and sorting
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = filterJobs(jobs, filters);
    let sorted = sortJobs(filtered, sortBy);
    return sorted;
  }, [filters, sortBy]);

  // Get jobs for current page
  const currentJobs = useMemo(() => {
    return paginateJobs(filteredAndSortedJobs, currentPage, 6);
  }, [filteredAndSortedJobs, currentPage]);

  const totalPages = useMemo(() => {
    return getTotalPages(filteredAndSortedJobs, 6);
  }, [filteredAndSortedJobs]);

  const handleToggleSave = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
    setFilters({
      keyword: '',
      location: '',
      type: '',
      remote: false,
      salaryMin: '',
      salaryMax: ''
    });
  };

  const setFiltersAndResetPage = (next) => {
    setCurrentPage(1);
    setFilters(next);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tiny loading animation when filters/sort/page change (UX polish)
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 220);
    return () => clearTimeout(t);
  }, [filters, sortBy, currentPage]);

  return (
    <div className="min-h-screen bg-paper-100 dark:bg-slate-900">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink-900 mb-2">Find Your Perfect Job</h1>
          <p className="text-ink-600">
            {filteredAndSortedJobs.length} jobs found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <JobFilters
              filters={filters}
              onFilterChange={setFiltersAndResetPage}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-ink-600">Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40"
                >
                  <option value="newest">Newest</option>
                  <option value="salary">Highest Salary</option>
                  <option value="company">Company Name</option>
                </Select>
              </div>
            </div>

            {/* Job List */}
            <JobList
              jobs={currentJobs}
              savedJobs={savedJobs}
              onToggleSave={handleToggleSave}
              isLoading={isLoading}
              onClearFilters={handleClearFilters}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
