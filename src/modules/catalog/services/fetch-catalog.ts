import { whenApiReady } from "@/shared/utils/api-ready";
import { requestUrl } from "@/shared/utils/request-url";
import type { Offer, PaymentMethod } from "../types";

async function fetchJson<T>(path: string): Promise<T> {
  await whenApiReady();
  const response = await fetch(requestUrl(path), { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not refresh the data.");
  }

  return response.json() as Promise<T>;
}

export function fetchOffers() {
  return fetchJson<Offer[]>("/api/offers");
}

export async function fetchOffer(id: string | undefined) {
  if (!id) {
    return null;
  }

  await whenApiReady();
  const response = await fetch(
    requestUrl(`/api/offers/${encodeURIComponent(id)}`),
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Could not refresh the data.");
  }

  return response.json() as Promise<Offer>;
}

export function fetchPaymentMethods() {
  return fetchJson<PaymentMethod[]>("/api/payment-methods");
}
