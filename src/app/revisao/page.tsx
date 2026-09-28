import { ReviewView } from "@/modules/agreement"
import {
  fetchOffer,
  fetchPaymentMethods,
  OfferUnavailable,
  offerQuery,
  paymentMethodsQuery,
} from "@/modules/catalog"
import { paymentMethodFromSearchParam, readSearchParam } from "@/shared/utils/search-params"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import type { RevisaoPageProps } from "./types"

export default async function Page({ searchParams }: RevisaoPageProps) {
  const params = await searchParams
  const offerId = readSearchParam(params.oferta)
  const paymentMethodId = paymentMethodFromSearchParam(readSearchParam(params.forma))

  if (!offerId || !paymentMethodId) {
    return <OfferUnavailable />
  }

  const queryClient = new QueryClient()
  const offer = await queryClient.fetchQuery({
    ...offerQuery(offerId),
    queryFn: () => fetchOffer(offerId),
  })
  const paymentMethods = await queryClient.fetchQuery({
    ...paymentMethodsQuery,
    queryFn: fetchPaymentMethods,
  })
  const paymentMethod = paymentMethods.find((method) => method.id === paymentMethodId)

  if (!offer || !paymentMethod) {
    return <OfferUnavailable />
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewView
        offer={offer}
        paymentMethodId={paymentMethodId}
        paymentMethodName={paymentMethod.name}
        simulateError={readSearchParam(params.checkout) === "erro"}
      />
    </HydrationBoundary>
  )
}
