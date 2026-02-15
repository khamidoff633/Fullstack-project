import Container from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/Toast";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const { push } = useToast();
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const user = await login({ email, password: pass });
      push("Signed in ✅", "success");
      if (!user.profileCompleted) nav("/create-profile");
      else nav("/");
    } catch (err) {
      push(err.message || "Login failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-md mx-auto rounded-xl2 bg-paper-50 border border-line shadow-soft p-6">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-ink-500">Use your email and password.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
            <Button disabled={busy} type="submit" variant="primary" className="w-full">
              {busy ? "Signing in..." : "Sign in"}
            </Button>

            <button
              type="button"
              onClick={() => nav("/signup")}
              className="text-sm text-ink-500 hover:text-ink-900"
            >
              No account? Create one
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
