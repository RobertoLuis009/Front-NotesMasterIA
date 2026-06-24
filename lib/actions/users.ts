'use server';

import { apiFetch } from '../api';

export interface UserResponse {
  id: number;
  auth0Id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export async function getMe(): Promise<UserResponse> {
  return apiFetch<UserResponse>('/api/users/me');
}

export async function syncUser(): Promise<UserResponse> {
  return apiFetch<UserResponse>('/api/users/me', { method: 'POST' });
}
