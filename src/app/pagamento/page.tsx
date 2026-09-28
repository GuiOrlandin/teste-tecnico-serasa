import { PaymentView } from "@/modules/agreement";
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
import type { PagamentoPageProps } from "./types";

export default async function Page({ searchParams }: PagamentoPageProps) {
  const params = await searchParams;
  const offerId = readSearchParam(params.oferta);
  const paymentMethodId =
    paymentMethodFromSearchParam(readSearchParam(params.forma)) ?? "pix";

  const queryClient = new QueryClient();
  const offer = await queryClient.query({
    ...offerQuery(offerId),
    queryFn: () => fetchOffer(offerId),
  });

  if (!offer) {
    return <OfferUnavailable />;
  }

  await queryClient.query({
    ...paymentMethodsQuery,
    queryFn: fetchPaymentMethods,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentView offer={offer} paymentMethodId={paymentMethodId} />
    </HydrationBoundary>
  );
}
