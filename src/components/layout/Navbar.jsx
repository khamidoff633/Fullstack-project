import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Bookmark, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import useSavedJobs from "../../hooks/useSavedJobs";
import { useAuth } from "../../context/AuthContext";

const nav = [
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedCount } = useSavedJobs();
  const [dark, setDark] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    setDark((v) => {
      const next = !v;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-brand-900/95 text-white backdrop-blur dark:border-night-line dark:bg-night-950/80">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link to="/" className="font-semibold text-lg tracking-tight">
            Jobify
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={
                  "px-3 py-2 rounded-lg text-sm transition-colors " +
                  (isActive(n.to) ? "bg-paper-50/10" : "hover:bg-paper-50/10")
                }
              >
                {n.label}
              </Link>
            ))}

            <Link
              to="/saved"
              className={
                "px-3 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-2 " +
                (isActive("/saved") ? "bg-paper-50/10" : "hover:bg-paper-50/10")
              }
            >
              <Bookmark size={16} />
              Saved
              {savedCount > 0 ? (
                <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-accent-600">{savedCount}</span>
              ) : null}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-xl bg-paper-50/10 hover:bg-paper-50/15 border border-paper-50/10 flex items-center justify-center transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <>
                {!user.profileCompleted ? (
                  <Link
                    to="/create-profile"
                    className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 transition-all"
                  >
                    Complete profile
                  </Link>
                ) : (
                  <Link
                    to="/settings/profile"
                    className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white bg-paper-50/10 hover:bg-paper-50/15 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2"><User size={16}/> Profile</span>
                  </Link>
                )}

                <Link
                  to="/post"
                  className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white
                    bg-accent-600 hover:bg-accent-700 transition-all
                    shadow-[0_0_0_0_rgba(249,115,22,0.0)]
                    hover:shadow-[0_0_28px_0_rgba(249,115,22,0.35)]"
                >
                  Post a Job
                </Link>

                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                  className="rounded-xl px-4 py-2 text-sm font-medium bg-paper-50 text-ink-900 hover:bg-paper-50/90 transition-colors inline-flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/post"
                  className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white
                    bg-accent-600 hover:bg-accent-700 transition-all
                    shadow-[0_0_0_0_rgba(249,115,22,0.0)]
                    hover:shadow-[0_0_28px_0_rgba(249,115,22,0.35)]"
                >
                  Post a Job
                </Link>

                <Link
                  to="/signin"
                  className="rounded-xl px-4 py-2 text-sm font-medium bg-paper-50 text-ink-900 hover:bg-paper-50/90 transition-colors"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
