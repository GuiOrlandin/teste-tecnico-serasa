const staleTime = 60_000;

export const offersQuery = {
  queryKey: ["offers"] as const,
  staleTime,
};

export function offerQuery(id: string | undefined) {
  return {
    queryKey: ["offers", id] as const,
    staleTime,
  };
}

export const paymentMethodsQuery = {
  queryKey: ["payment-methods"] as const,
  staleTime,
};
