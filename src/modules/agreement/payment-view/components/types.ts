import type { PaymentMethod } from "@/modules/catalog"

export type PaymentMethodDetailProps = {
  paymentMethodId: PaymentMethod["id"]
  dueDate: string
}
