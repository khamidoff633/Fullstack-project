const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getTokens() {
  return {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  };
}

function setTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

async function request(path, { method = 'GET', body, auth = false, headers = {}, retry = true } = {}) {
  const url = `${API_URL}${path}`;
  const h = { 'Content-Type': 'application/json', ...headers };

  if (auth) {
    const { accessToken } = getTokens();
    if (accessToken) h.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });

  // try refresh on 401
  if (res.status === 401 && auth && retry) {
    const { refreshToken } = getTokens();
    if (refreshToken) {
      const rr = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (rr.ok) {
        const data = await rr.json();
        setTokens({ accessToken: data.accessToken });
        return request(path, { method, body, auth, headers, retry: false });
      }
    }
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function upload(path, file, { auth = true } = {}) {
  const API = API_URL;
  const url = `${API}${path}`;
  const form = new FormData();
  form.append('file', file);

  const headers = {};
  if (auth) {
    const { accessToken } = getTokens();
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, { method: 'POST', headers, body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || `Upload failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  request,
  upload,
  setTokens,
  clearTokens,
  getTokens,
  API_URL,
};
