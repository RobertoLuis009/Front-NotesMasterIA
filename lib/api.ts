import { auth0 } from './auth0';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const session = await auth0.getSession();
  if (!session) throw new Error('Unauthenticated');

  const accessToken = session.tokenSet.accessToken;
  if (!accessToken) throw new Error('No access token available');

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'API error');
  }

  return res.json() as Promise<T>;
}
