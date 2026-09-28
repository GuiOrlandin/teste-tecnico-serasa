import { calculateAmounts } from "./calculate-amounts"
import type { Offer, Seed } from "../types"

const seeds: Seed[] = [
  {
    id: "banco-horizonte",
    initials: "BH",
    creditor: "Banco Horizonte",
    product: "Cartão de crédito",
    since: "mar/2023",
    negotiatedAmountCents: 68_900,
    discountPercent: 80,
    condition: { type: "cash" },
  },
  {
    id: "conecta-telecom",
    initials: "CT",
    creditor: "Conecta Telecom",
    product: "Conta de celular",
    since: "ago/2024",
    negotiatedAmountCents: 9_890,
    discountPercent: 76,
    condition: { type: "cash" },
  },
  {
    id: "loja-vitrine",
    initials: "LV",
    creditor: "Loja Vitrine",
    product: "Crediário",
    since: "jan/2024",
    negotiatedAmountCents: 45_000,
    discountPercent: 64,
    condition: {
      type: "down-payment-and-installments",
      downPaymentCents: 9_000,
      installmentCount: 4,
      installmentAmountCents: 9_000,
    },
  },
]

export function listOffers(): Offer[] {
  const offers = seeds.map((seed) => ({
    ...seed,
    ...calculateAmounts(seed.negotiatedAmountCents, seed.discountPercent),
    isBestOffer: false,
  }))
  const highestPercent = Math.max(
    ...offers.map((offer) => offer.discountPercent),
  )
  const bestOfferIndex = offers.findIndex(
    (offer) => offer.discountPercent === highestPercent,
  )

  return offers.map((offer, index) => ({
    ...offer,
    isBestOffer: index === bestOfferIndex,
  }))
}

export function getOffer(id: string | undefined) {
  if (!id) return undefined
  return listOffers().find((offer) => offer.id === id)
}
