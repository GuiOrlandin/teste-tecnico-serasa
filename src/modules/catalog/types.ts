export type Condition =
  | { type: "cash" }
  | {
      type: "down-payment-and-installments"
      downPaymentCents: number
      installmentCount: number
      installmentAmountCents: number
    }

export type Offer = {
  id: string
  initials: string
  creditor: string
  product: string
  since: string
  negotiatedAmountCents: number
  discountPercent: number
  originalAmountCents: number
  discountAmountCents: number
  isBestOffer: boolean
  condition: Condition
}

export type Seed = Omit<
  Offer,
  "originalAmountCents" | "discountAmountCents" | "isBestOffer"
>

export type PaymentMethod = {
  id: "pix" | "boleto"
  name: string
  description: string
  badge?: string
}
