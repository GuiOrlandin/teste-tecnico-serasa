import type { PaymentMethod } from "../types"

const paymentMethods: PaymentMethod[] = [
  {
    id: "pix",
    name: "Pix",
    badge: "Mais rápido",
    description: "Pagamento na hora, sem sair de casa",
  },
  {
    id: "boleto",
    name: "Boleto",
    description: "Pague no app do banco ou em lotéricas",
  },
]

export function listPaymentMethods() {
  return paymentMethods
}

export function getPaymentMethod(id: string | undefined) {
  return paymentMethods.find((paymentMethod) => paymentMethod.id === id)
}
