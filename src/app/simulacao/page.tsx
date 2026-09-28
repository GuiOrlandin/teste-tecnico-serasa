import {
  fetchInstrument,
  instrumentQuery,
  SimulationView,
} from "@/modules/agreement";
import {
  fetchOffer,
  fetchPaymentMethods,
  offerQuery,
  OfferUnavailable,
  paymentMethodsQuery,
} from "@/modules/catalog";
import {
  paymentMethodFromSearchParam,
  readSearchParam,
} from "@/shared/utils/search-params";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { SimulacaoPageProps } from "./types";

const olderThanBrowserConfirmation = 0;

export default async function Page({ searchParams }: SimulacaoPageProps) {
  const params = await searchParams;
  const offerId = readSearchParam(params.oferta);
  const paymentMethodId = paymentMethodFromSearchParam(
    readSearchParam(params.forma),
  );
  const queryClient = new QueryClient();
  const offer = await queryClient.query({
    ...offerQuery(offerId),
    queryFn: () => fetchOffer(offerId),
  });
  const paymentMethods = await queryClient.query({
    ...paymentMethodsQuery,
    queryFn: fetchPaymentMethods,
  });
  const paymentMethod = paymentMethods.find(
    (method) => method.id === paymentMethodId,
  );

  if (!offer || !paymentMethod) {
    return <OfferUnavailable />;
  }

  const instrument = await fetchInstrument(offer.id, paymentMethod.id);
  queryClient.setQueryData(
    instrumentQuery(offer.id, paymentMethod.id).queryKey,
    instrument,
    { updatedAt: olderThanBrowserConfirmation },
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SimulationView
        offer={offer}
        paymentMethodId={paymentMethod.id}
        paymentMethodName={paymentMethod.name}
      />
    </HydrationBoundary>
  );
}
