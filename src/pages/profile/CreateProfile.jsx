import Container from "../../components/layout/Container";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

function normalizeSkills(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

export default function CreateProfile() {
  const { user, refreshMe } = useAuth();
  const { push } = useToast();
  const nav = useNavigate();

  const isEmployer = user?.role === "employer";

  const [busy, setBusy] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    displayName: user?.fullName || "",
    bio: "",
    location: "",
    avatarUrl: "",
    coverUrl: "",
    skillsText: "",
    github: "",
    linkedin: "",
    portfolio: "",
    telegram: "",
    website: "",

    resumeUrl: "",

    companyName: "",
    companyLogoUrl: "",
    industry: "",
    companySize: "",
    companyDescription: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const skills = useMemo(() => normalizeSkills(form.skillsText), [form.skillsText]);

  async function uploadFile(kind, file) {
    if (!file) return;
    try {
      if (kind === "avatar") setAvatarUploading(true);
      if (kind === "cover") setCoverUploading(true);
      if (kind === "resume") setResumeUploading(true);
      if (kind === "company-logo") setLogoUploading(true);

      const data = await api.upload(`/upload/${kind}`, file, { auth: true });
      const url = `${api.API_URL.replace(/\/api$/, "")}${data.url}`;

      if (kind === "avatar") set("avatarUrl", url);
      if (kind === "cover") set("coverUrl", url);
      if (kind === "resume") set("resumeUrl", url);
      if (kind === "company-logo") set("companyLogoUrl", url);

      push("Uploaded ✅", "success");
    } catch (e) {
      push(e.message || "Upload failed", "error");
    } finally {
      setAvatarUploading(false);
      setCoverUploading(false);
      setResumeUploading(false);
      setLogoUploading(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        username: form.username,
        displayName: form.displayName,
        bio: form.bio,
        location: form.location,
        avatarUrl: form.avatarUrl,
        coverUrl: form.coverUrl,
        skills,
        links: {
          github: form.github,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
          telegram: form.telegram,
          website: form.website,
        },
        resumeUrl: form.resumeUrl,
        companyName: form.companyName,
        companyLogoUrl: form.companyLogoUrl,
        industry: form.industry,
        companySize: form.companySize,
        companyDescription: form.companyDescription,
      };

      await api.request("/profile", { method: "POST", auth: true, body: payload });
      await refreshMe();
      push("Profile created 🎉", "success");
      nav(`/u/${form.username.toLowerCase()}`);
    } catch (err) {
      push(err.message || "Failed to create profile", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold">Create profile</h1>
          <p className="mt-2 text-sm text-ink-500">
            Complete your profile to unlock posting/applying.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Username (e.g. bahriddin_dev)" value={form.username} onChange={(e) => set("username", e.target.value)} />
              <Input placeholder="Display name" value={form.displayName} onChange={(e) => set("displayName", e.target.value)} />
            </div>

            <textarea
              className="w-full rounded-lg border border-line bg-paper-50 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
              rows={4}
              placeholder="Short bio"
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} />
              <Input placeholder="Skills (comma separated)" value={form.skillsText} onChange={(e) => set("skillsText", e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Avatar</div>
                <input type="file" accept="image/*" onChange={(e) => uploadFile("avatar", e.target.files?.[0])} />
                {avatarUploading ? <div className="text-sm text-ink-500 mt-1">Uploading...</div> : null}
                {form.avatarUrl ? <img src={form.avatarUrl} alt="avatar" className="mt-3 w-16 h-16 rounded-full object-cover" /> : null}
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Cover</div>
                <input type="file" accept="image/*" onChange={(e) => uploadFile("cover", e.target.files?.[0])} />
                {coverUploading ? <div className="text-sm text-ink-500 mt-1">Uploading...</div> : null}
                {form.coverUrl ? <img src={form.coverUrl} alt="cover" className="mt-3 w-full max-w-sm h-20 rounded-lg object-cover" /> : null}
              </div>
            </div>

            {!isEmployer ? (
              <div className="rounded-xl2 border border-line bg-paper-50 p-4">
                <div className="font-semibold">Candidate</div>
                <p className="text-sm text-ink-500 mt-1">Optional, but professional.</p>
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Resume (PDF)</div>
                  <input type="file" accept="application/pdf" onChange={(e) => uploadFile("resume", e.target.files?.[0])} />
                  {resumeUploading ? <div className="text-sm text-ink-500 mt-1">Uploading...</div> : null}
                  {form.resumeUrl ? <div className="text-sm text-ink-500 mt-2">Uploaded ✅</div> : null}
                </div>
              </div>
            ) : (
              <div className="rounded-xl2 border border-line bg-paper-50 p-4">
                <div className="font-semibold">Employer</div>
                <p className="text-sm text-ink-500 mt-1">Company profile is required.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Input placeholder="Company name" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                  <Input placeholder="Industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Input placeholder="Company size (e.g. 1-10)" value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
                  <div>
                    <div className="text-sm font-medium mb-2">Company logo</div>
                    <input type="file" accept="image/*" onChange={(e) => uploadFile("company-logo", e.target.files?.[0])} />
                    {logoUploading ? <div className="text-sm text-ink-500 mt-1">Uploading...</div> : null}
                    {form.companyLogoUrl ? <img src={form.companyLogoUrl} alt="logo" className="mt-3 w-16 h-16 rounded-lg object-cover" /> : null}
                  </div>
                </div>
                <textarea
                  className="w-full rounded-lg border border-line bg-paper-50 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300 mt-4"
                  rows={4}
                  placeholder="Company description"
                  value={form.companyDescription}
                  onChange={(e) => set("companyDescription", e.target.value)}
                />
              </div>
            )}

            <div className="rounded-xl2 border border-line bg-paper-50 p-4">
              <div className="font-semibold">Links</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input placeholder="GitHub URL" value={form.github} onChange={(e) => set("github", e.target.value)} />
                <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
                <Input placeholder="Portfolio URL" value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} />
                <Input placeholder="Website URL" value={form.website} onChange={(e) => set("website", e.target.value)} />
                <Input placeholder="Telegram (username or link)" value={form.telegram} onChange={(e) => set("telegram", e.target.value)} />
              </div>
            </div>

            <Button disabled={busy} type="submit" variant="primary" className="w-full sm:w-auto">
              {busy ? "Saving..." : "Create profile"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
