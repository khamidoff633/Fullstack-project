import Container from "../../components/layout/Container";
import { Badge } from "../../components/ui/Badge";
import { api } from "../../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.request(`/profile/${username}`);
        setProfile(data.profile);
      } catch (e) {
        setErr(e.message || 'Profile not found');
      }
    })();
  }, [username]);

  if (err) {
    return (
      <div className="bg-paper-100 dark:bg-slate-900">
        <Container className="py-10">
          <div className="text-ink-500">{err}</div>
        </Container>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="rounded-xl2 border border-line bg-paper-50 overflow-hidden">
          {profile.coverUrl ? (
            <img src={profile.coverUrl} alt="cover" className="w-full h-36 object-cover" />
          ) : (
            <div className="w-full h-20 bg-paper-100" />
          )}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-paper-100" />
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">{profile.displayName}</h1>
                <div className="text-sm text-ink-500">@{profile.username}{profile.location ? ` • ${profile.location}` : ''}</div>
                {profile.bio ? <p className="mt-3 text-ink-700">{profile.bio}</p> : null}

                {profile.skills?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {profile.links?.github ? <a className="underline" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a> : null}
                  {profile.links?.linkedin ? <a className="underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
                  {profile.links?.portfolio ? <a className="underline" href={profile.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a> : null}
                  {profile.links?.website ? <a className="underline" href={profile.links.website} target="_blank" rel="noreferrer">Website</a> : null}
                  {profile.links?.telegram ? <span className="text-ink-500">Telegram: {profile.links.telegram}</span> : null}
                </div>

                {profile.companyName ? (
                  <div className="mt-6 rounded-lg border border-line bg-paper-100 p-4">
                    <div className="font-semibold">{profile.companyName}</div>
                    {profile.companyDescription ? <p className="text-sm text-ink-500 mt-1">{profile.companyDescription}</p> : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
