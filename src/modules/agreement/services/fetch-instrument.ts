import { whenApiReady } from "@/shared/utils/api-ready"
import { requestUrl } from "@/shared/utils/request-url"
import type { Instrument } from "../types"

export function fetchInstrument(
  offerId: string,
  paymentMethodId: "pix" | "boleto",
) {
  const params = new URLSearchParams({
    oferta: offerId,
    forma: paymentMethodId,
  })

  return fetchJson(`/api/agreements?${params.toString()}`)
}

async function fetchJson(path: string): Promise<Instrument> {
  await whenApiReady()
  const response = await fetch(requestUrl(path), { cache: "no-store" })

  if (!response.ok) {
    throw new Error("Could not load the instrument.")
  }

  return response.json() as Promise<Instrument>
}
