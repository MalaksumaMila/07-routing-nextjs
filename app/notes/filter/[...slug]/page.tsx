import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

interface SlugPageProps {params: Promise<{ slug: string[]}>};

export default async function SlugPage({params}: SlugPageProps) {

    const slug = await params
  const queryClient = new QueryClient();

  

  const initialQuery = '';
  const initialPage = 1;
  const sortOrder = 'created';
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: [{slug}, initialQuery, initialPage, sortOrder, perPage],
    queryFn: () => fetchNotes(initialQuery, initialPage, sortOrder, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <{slug}
        initialQuery={initialQuery}
        initialPage={initialPage}
        sortOrder={sortOrder}
        perPage={perPage}
      />
    </HydrationBoundary>
  );
}
