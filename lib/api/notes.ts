import axios from 'axios';

import type { CreateNoteData, Note, NoteTag } from '@/types/note';

const noteHubToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

noteHubApi.interceptors.request.use((config) => {
  if (!noteHubToken) {
    throw new Error(
      'NEXT_PUBLIC_NOTEHUB_TOKEN is missing. Add it to .env.local and Vercel Environment Variables.',
    );
  }

  config.headers.Authorization = `Bearer ${noteHubToken}`;
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const response = await noteHubApi.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteHubApi.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await noteHubApi.post<Note>('/notes', data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteHubApi.delete<Note>(`/notes/${id}`);
  return response.data;
}
