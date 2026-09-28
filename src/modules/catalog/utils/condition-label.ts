import { formatCurrency } from "@/shared/utils/format-currency"
import type { Condition } from "../types"

export function conditionLabel(condition: Condition) {
  if (condition.type === "cash") {
    return "À vista · pagamento único"
  }

  const downPayment = formatCurrency(condition.downPaymentCents)
  const installment = formatCurrency(condition.installmentAmountCents)
  return `Entrada de ${downPayment} + ${condition.installmentCount}x de ${installment}`
}
