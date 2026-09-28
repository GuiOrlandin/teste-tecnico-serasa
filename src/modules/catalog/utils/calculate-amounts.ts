export function calculateAmounts(
  negotiatedAmountCents: number,
  discountPercent: number,
) {
  const remainingPercent = 100 - discountPercent
  const originalAmountCents = Math.round(
    (negotiatedAmountCents * 100) / remainingPercent,
  )

  return {
    originalAmountCents,
    discountAmountCents: originalAmountCents - negotiatedAmountCents,
  }
}
