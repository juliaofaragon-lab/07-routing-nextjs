import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

const NOTE_TAGS: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;

  if (slug.length !== 1) {
    notFound();
  }

  const selectedTag = slug[0];
  const tag =
    selectedTag === 'all'
      ? undefined
      : NOTE_TAGS.find((noteTag) => noteTag === selectedTag);

  if (selectedTag !== 'all' && !tag) {
    notFound();
  }

  if (!process.env.NEXT_PUBLIC_NOTEHUB_TOKEN) {
    return (
      <main>
        <p>
          NoteHub API token is not configured. Add the{' '}
          <code>NEXT_PUBLIC_NOTEHUB_TOKEN</code> environment variable and
          redeploy the application.
        </p>
      </main>
    );
  }

  const queryClient = new QueryClient();
  const initialQuery = {
    queryKey: ['notes', 1, '', tag] as const,
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  };

  await queryClient.prefetchQuery(initialQuery);

  const queryState = queryClient.getQueryState(initialQuery.queryKey);
  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={selectedTag} tag={tag} />
    </HydrationBoundary>
  );
}
