import Container from "../components/layout/Container";

export default function About() {
  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <h1 className="text-3xl font-semibold">About Jobify</h1>
        <p className="mt-4 text-ink-600 max-w-2xl">
          Jobify is a modern job board UI project. It's built to look premium, load fast, and scale.
          You can later connect it to a real backend (Node/Express + MongoDB) and make it a real product.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Fast UI", d: "Vite + React + Tailwind, optimized for speed." },
            { t: "Reusable Components", d: "Cards, badges, buttons and layouts." },
            { t: "Ready for Backend", d: "Data layer can be swapped to API easily." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl2 bg-paper-50 border border-line shadow-soft p-6">
              <div className="font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-ink-600">{x.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
