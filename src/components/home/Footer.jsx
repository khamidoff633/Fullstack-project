export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-50 dark:bg-slate-900/40 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 md:justify-between">
          <div>
            <div className="font-semibold text-lg">Jobify</div>
            <p className="mt-2 text-sm text-ink-500 dark:text-slate-300 max-w-sm">
              A premium job board UI built with React + Tailwind. Fast, clean and modern.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2">
              <div className="font-semibold">Product</div>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="/jobs">Jobs</a>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="/companies">Companies</a>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="/pricing">Pricing</a>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Company</div>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="/about">About</a>
              <a className="block text-ink-500 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white" href="/contact">Contact</a>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Legal</div>
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
