// Thin fetch wrapper for the KEAGROW backend (server/index.js).
// Requests are relative ('/api/...') so this works both behind the
// Vite dev proxy and when Express serves the built frontend itself.

const TOKEN_KEY = 'keagrow_admin_token';

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    const body = await res.json().catch(() => ({}));
    if (token) {
      // We sent an existing session token and it was rejected —
      // that's a genuinely expired/invalid session.
      clearAdminToken();
      throw new Error('Session expired. Please log in again.');
    }
    // No token was sent (e.g. the login request itself) — this is
    // just the server's own rejection (wrong password), not an
    // expired session, so show its real message.
    throw new Error(body.error || 'Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  login: (password: string) =>
    request<{ token: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  getProjects: <T>() => request<T>('/api/projects'),
  createProject: <T>(project: unknown) =>
    request<T>('/api/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: <T>(id: string, project: unknown) =>
    request<T>(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  deleteProject: (id: string) => request<void>(`/api/projects/${id}`, { method: 'DELETE' }),

  getInquiries: <T>() => request<T>('/api/inquiries'),
  createInquiry: <T>(inquiry: unknown) =>
    request<T>('/api/inquiries', { method: 'POST', body: JSON.stringify(inquiry) }),
  updateInquiry: <T>(id: string, patch: unknown) =>
    request<T>(`/api/inquiries/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  confirmInquiry: <T>(id: string) => request<T>(`/api/inquiries/${id}/confirm`, { method: 'POST' }),
  deleteInquiry: (id: string) => request<void>(`/api/inquiries/${id}`, { method: 'DELETE' }),
};
