import type { Offer, PaymentMethod } from "@/modules/catalog"

export type PaymentViewProps = {
  offer: Offer
  paymentMethodId?: PaymentMethod["id"]
}
