import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api/notes';

import NoteDetailsClient from './NoteDetails.client';

export const dynamic = 'force-dynamic';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const noteQuery = {
    queryKey: ['note', id] as const,
    queryFn: () => fetchNoteById(id),
  };

  await queryClient.prefetchQuery(noteQuery);

  const queryState = queryClient.getQueryState(noteQuery.queryKey);
  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
