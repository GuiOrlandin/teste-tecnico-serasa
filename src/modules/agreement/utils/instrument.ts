import { agreementDueDate } from "./due-date"
import type { Instrument } from "../types"

export function buildInstrument(
  offerId: string,
  paymentMethodId: "pix" | "boleto",
): Instrument {
  if (paymentMethodId === "pix") {
    return {
      type: "pix",
      copyPasteCode: `SIMULACAO-PIX-${offerId}`,
    }
  }

  return {
    type: "boleto",
    digitableLine: "00000.00000 00000.000000 00000.000000 0 00000000000000",
    dueDate: agreementDueDate(paymentMethodId).date,
  }
}
