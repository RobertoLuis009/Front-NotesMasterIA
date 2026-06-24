'use server';

import { apiFetch } from '../api';

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteInput {
  title: string;
  content: string;
}

export async function createNote(data: NoteInput): Promise<NoteResponse> {
  return apiFetch<NoteResponse>('/api/notes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateNote(
  id: number,
  data: Partial<NoteInput>,
): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(`/api/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
