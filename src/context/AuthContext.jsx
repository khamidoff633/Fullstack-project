import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function bootstrap() {
    try {
      const has = api.getTokens().accessToken;
      if (!has) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await api.request('/auth/me', { auth: true });
      setUser(data.user);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async register(payload) {
        const data = await api.request('/auth/register', { method: 'POST', body: payload });
        api.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        setUser(data.user);
        return data.user;
      },
      async login(payload) {
        const data = await api.request('/auth/login', { method: 'POST', body: payload });
        api.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        setUser(data.user);
        return data.user;
      },
      async logout() {
        const { refreshToken } = api.getTokens();
        try {
          if (refreshToken) await api.request('/auth/logout', { method: 'POST', body: { refreshToken } });
        } finally {
          api.clearTokens();
          setUser(null);
        }
      },
      async refreshMe() {
        const data = await api.request('/auth/me', { auth: true });
        setUser(data.user);
        return data.user;
      },
    }),
    [user, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const v = useContext(AuthCtx);
  if (!v) throw new Error('useAuth must be used inside AuthProvider');
  return v;
}
