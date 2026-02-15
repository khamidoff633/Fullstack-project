export function filterJobs(jobs, filters) {
  return jobs.filter(job => {
    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(keyword);
      const matchesCompany = job.companyName.toLowerCase().includes(keyword);
      const matchesTags = job.tags.some(tag => tag.toLowerCase().includes(keyword));
      
      if (!matchesTitle && !matchesCompany && !matchesTags) {
        return false;
      }
    }

    // Location filter
    if (filters.location && job.location.toLowerCase().indexOf(filters.location.toLowerCase()) === -1) {
      return false;
    }

    // Job type filter
    if (filters.type && job.type !== filters.type) {
      return false;
    }

    // Remote filter
    if (filters.remote && !job.remote) {
      return false;
    }

    // Salary range filter
    if (filters.salaryMin && job.salaryMax < filters.salaryMin) {
      return false;
    }
    
    if (filters.salaryMax && job.salaryMin > filters.salaryMax) {
      return false;
    }

    return true;
  });
}

export function sortJobs(jobs, sortBy) {
  const sortedJobs = [...jobs];
  
  switch (sortBy) {
    case 'newest':
      return sortedJobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    
    case 'salary':
      return sortedJobs.sort((a, b) => b.salaryMax - a.salaryMax);
    
    case 'company':
      return sortedJobs.sort((a, b) => a.companyName.localeCompare(b.companyName));
    
    default:
      return sortedJobs;
  }
}

export function paginateJobs(jobs, currentPage, jobsPerPage = 6) {
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  return jobs.slice(startIndex, endIndex);
}

export function getTotalPages(jobs, jobsPerPage = 6) {
  return Math.ceil(jobs.length / jobsPerPage);
}
