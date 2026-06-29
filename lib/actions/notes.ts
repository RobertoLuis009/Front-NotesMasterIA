"use server";

import { apiFetch } from "../api";

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteWithScore extends NoteResponse {
  score: number;
}

export interface NoteInput {
  title: string;
  content: string;
  isFavorite?: boolean;
}

export async function createNote(data: NoteInput): Promise<NoteResponse> {
  return apiFetch<NoteResponse>("/api/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getNotes(): Promise<NoteResponse[]> {
  return apiFetch<NoteResponse[]>("/api/notes");
}

export async function getRecentNotes(): Promise<NoteResponse[]> {
  return apiFetch<NoteResponse[]>("/api/notes/recent");
}

export async function getNote(id: number): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(`/api/notes/${id}`);
}

export async function getFavoriteNotes(): Promise<NoteResponse[]> {
  return apiFetch<NoteResponse[]>("/api/notes/favorites");
}

export async function updateNote(
  id: number,
  data: Partial<NoteInput>,
): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(`/api/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function searchNotes(q: string): Promise<NoteWithScore[]> {
  return apiFetch<NoteWithScore[]>(
    `/api/notes/search?q=${encodeURIComponent(q)}`,
  );
}

export async function getSimilarNotes(id: number): Promise<NoteWithScore[]> {
  return apiFetch<NoteWithScore[]>(`/api/notes/${id}/similar`);
}

export async function getConnectionInsights(): Promise<{ count: number }> {
  return apiFetch<{ count: number }>("/api/notes/insights/connections");
}

export async function getNoteCount(): Promise<{ count: number }> {
  return apiFetch<{ count: number }>("/api/notes/insights/count");
}
