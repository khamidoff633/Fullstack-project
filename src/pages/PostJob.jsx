import Container from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const { push } = useToast();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    type: "Full-time",
    remote: true,
    salaryMin: "",
    salaryMax: "",
    description: "",
    tags: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        title: form.title,
        companyName: form.companyName,
        location: form.location,
        type: form.type,
        remote: Boolean(form.remote),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        description: form.description,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 20),
      };

      const data = await api.request('/jobs', { method: 'POST', auth: true, body: payload });
      push('Job published ✅', 'success');
      nav(`/jobs/${data.job._id}`);
    } catch (err) {
      if (err.status === 428) {
        push('Complete your profile first', 'error');
        nav('/create-profile');
        return;
      }
      push(err.message || 'Failed to publish job', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">Post a Job</h1>
          <p className="mt-2 text-sm text-ink-500">Create a listing in minutes.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Input placeholder="Job title" value={form.title} onChange={(e) => set("title", e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Company name" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
              <Input placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                options={[
                  { value: "Full-time", label: "Full-time" },
                  { value: "Part-time", label: "Part-time" },
                  { value: "Contract", label: "Contract" },
                  { value: "Internship", label: "Internship" },
                ]}
              />
              <Input placeholder="Salary min" value={form.salaryMin} onChange={(e) => set("salaryMin", e.target.value)} />
              <Input placeholder="Salary max" value={form.salaryMax} onChange={(e) => set("salaryMax", e.target.value)} />
            </div>

            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => set('tags', e.target.value)} />

            <textarea
              className="w-full rounded-lg border border-line bg-paper-50 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
              rows={6}
              placeholder="Short description (min 20 chars)"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />

            <Button disabled={busy} type="submit" variant="primary" className="w-full sm:w-auto">
              {busy ? "Publishing..." : "Publish"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
