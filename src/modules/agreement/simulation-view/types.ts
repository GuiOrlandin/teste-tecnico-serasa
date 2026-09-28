import type { Offer, PaymentMethod } from "@/modules/catalog"

export type SimulationViewProps = {
  offer: Offer
  paymentMethodId: PaymentMethod["id"]
  paymentMethodName: string
}
