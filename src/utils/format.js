// Time ago
export function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

// Salary formatter
export function formatSalary(min, max) {
  if (!min && !max) return "Negotiable";

  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }

  if (min) {
    return `From $${min.toLocaleString()}`;
  }

  return `Up to $${max.toLocaleString()}`;
}
export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);

  // invalid date bo‘lsa
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
