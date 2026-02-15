const logos = ["Stripe", "Notion", "Shopify", "Figma", "Vercel", "Linear"];

export default function TrustedBy() {
  return (
    <section className="mt-14">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-ink-600 dark:text-slate-300">
            Trusted by teams
          </p>
          <p className="text-xs text-ink-500 dark:text-slate-400">
            (Demo logos — branding uchun joy)
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="flex items-center justify-center rounded-2xl bg-paper-50 px-3 py-4 text-sm font-semibold text-ink-600 ring-1 ring-line dark:bg-slate-900/40 dark:text-slate-300 dark:ring-slate-800"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
