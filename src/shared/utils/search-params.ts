export function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function paymentMethodFromSearchParam(
  value: string | undefined,
): "pix" | "boleto" | undefined {
  if (value === "pix" || value === "boleto") return value
  return undefined
}
