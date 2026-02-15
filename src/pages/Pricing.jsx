import Container from "../components/layout/Container";

const plans = [
  { name: "Free", price: "$0", perks: ["Browse jobs", "Save jobs", "Email alerts (limited)"] },
  { name: "Pro", price: "$9/mo", perks: ["Unlimited alerts", "Priority listings", "Early access drops"] },
  { name: "Recruiter", price: "$49/mo", perks: ["Post jobs", "Featured listings", "Applicant inbox"] },
];

export default function Pricing() {
  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Pricing</h1>
          <p className="mt-2 text-sm text-ink-500">Simple plans for candidates and recruiters.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.name} className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-3xl font-semibold">{p.price}</div>
              <ul className="mt-5 space-y-2 text-sm text-ink-600">
                {p.perks.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>

              <button className="mt-6 w-full rounded-xl px-5 py-3 font-medium text-white bg-accent-600 hover:bg-accent-700 transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.35)]">
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
