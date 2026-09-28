import { whenApiReady } from "@/shared/utils/api-ready"
import type { AgreementRequest, Instrument } from "../types"

export async function confirmAgreement(
  request: AgreementRequest,
): Promise<Instrument> {
  await whenApiReady()
  const response = await fetch("/api/agreements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Could not confirm the agreement.")
  }

  return response.json() as Promise<Instrument>
}
