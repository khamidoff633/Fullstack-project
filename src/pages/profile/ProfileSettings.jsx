import Container from "../../components/layout/Container";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { api } from "../../lib/api";
import { useEffect, useMemo, useState } from "react";

function normalizeSkills(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

export default function ProfileSettings() {
  const { push } = useToast();
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    location: "",
    skillsText: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const skills = useMemo(() => normalizeSkills(form.skillsText), [form.skillsText]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.request('/profile/me', { auth: true });
        setProfile(data.profile);
        setForm({
          displayName: data.profile.displayName || "",
          bio: data.profile.bio || "",
          location: data.profile.location || "",
          skillsText: (data.profile.skills || []).join(', '),
        });
      } catch (e) {
        push(e.message || 'Failed to load profile', 'error');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = await api.request('/profile/me', {
        method: 'PATCH',
        auth: true,
        body: {
          displayName: form.displayName,
          bio: form.bio,
          location: form.location,
          skills,
        },
      });
      setProfile(data.profile);
      push('Saved ✅', 'success');
    } catch (e) {
      push(e.message || 'Save failed', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">Profile settings</h1>
          <p className="mt-2 text-sm text-ink-500">Update your public profile.</p>

          {!profile ? null : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              <Input placeholder="Display name" value={form.displayName} onChange={(e) => set('displayName', e.target.value)} />
              <Input placeholder="Location" value={form.location} onChange={(e) => set('location', e.target.value)} />
              <Input placeholder="Skills (comma separated)" value={form.skillsText} onChange={(e) => set('skillsText', e.target.value)} />
              <textarea
                className="w-full rounded-lg border border-line bg-paper-50 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                rows={4}
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => set('bio', e.target.value)}
              />
              <Button disabled={busy} type="submit" variant="primary">{busy ? 'Saving...' : 'Save changes'}</Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
