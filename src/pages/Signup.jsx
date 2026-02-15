import Container from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/Toast";
import { Select } from "../components/ui/Select";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { push } = useToast();
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const user = await register(form);
      push("Account created ✅", "success");
      if (!user.profileCompleted) nav("/create-profile");
      else nav("/");
    } catch (err) {
      push(err.message || "Signup failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-md mx-auto rounded-xl2 bg-paper-50 border border-line shadow-soft p-6">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-ink-500">Sign up and complete your profile.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Input placeholder="Full name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
            <Input placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <Input placeholder="Password (min 8)" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} />

            <Select
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              options={[
                { value: "candidate", label: "Candidate (job seeker)" },
                { value: "employer", label: "Employer (post jobs)" },
              ]}
            />

            <Button disabled={busy} type="submit" variant="primary" className="w-full">
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
