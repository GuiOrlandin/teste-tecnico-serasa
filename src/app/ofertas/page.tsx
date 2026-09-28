import { fetchOffers, offersQuery, OffersView } from "@/modules/catalog";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.query({
    ...offersQuery,
    queryFn: fetchOffers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OffersView />
    </HydrationBoundary>
  );
}
