import type { Offer } from "@/modules/catalog"

export type ReviewViewProps = {
  offer: Offer
  paymentMethodId: "pix" | "boleto"
  paymentMethodName: string
  simulateError: boolean
}
