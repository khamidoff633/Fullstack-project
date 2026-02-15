import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-50 dark:bg-night-950/40 dark:border-night-line">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 md:justify-between">
          <div>
            <div className="font-semibold text-lg">Jobify</div>
            <p className="mt-2 text-sm text-ink-500 dark:text-slate-300 max-w-sm">
              Premium job board UI — built with React + Tailwind. Clean, fast, responsive.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2">
              <div className="font-semibold">Explore</div>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/jobs">Jobs</Link>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/companies">Companies</Link>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/saved">Saved</Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Company</div>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/post">Post a Job</Link>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/pricing">Pricing</Link>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/about">About</Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Support</div>
              <Link className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" to="/contact">Contact</Link>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="#">Privacy</a>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="#">Terms</a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-ink-500 dark:text-slate-400">
          © {new Date().getFullYear()} Jobify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
