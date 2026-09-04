import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface SlugPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  const tag = slug[0];
  const queryClient = new QueryClient();

  const initialQuery = '';
  const initialPage = 1;
  const sortOrder = 'created';
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery, initialPage, sortOrder, perPage, tag],
    queryFn: () =>
      fetchNotes(initialQuery, initialPage, sortOrder, perPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialQuery={initialQuery}
        initialPage={initialPage}
        sortOrder={sortOrder}
        perPage={perPage}
        tag={tag}
      />
    </HydrationBoundary>
  );
}
