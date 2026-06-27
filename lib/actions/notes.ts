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
  isFavorite?: boolean;
}

export async function createNote(data: NoteInput): Promise<NoteResponse> {
  return apiFetch<NoteResponse>('/api/notes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getNotes(): Promise<NoteResponse[]> {
  return apiFetch<NoteResponse[]>('/api/notes');
}

export async function getNote(id: number): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(`/api/notes/${id}`);
}

export async function getFavoriteNotes(): Promise<NoteResponse[]> {
  return apiFetch<NoteResponse[]>('/api/notes/favorites');
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

