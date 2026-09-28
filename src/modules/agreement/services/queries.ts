const freshUntilReload = Number.POSITIVE_INFINITY;

export function instrumentQuery(
  offerId: string,
  paymentMethodId: "pix" | "boleto",
) {
  return {
    queryKey: ["instrument", offerId, paymentMethodId] as const,
    staleTime: freshUntilReload,
  };
}
