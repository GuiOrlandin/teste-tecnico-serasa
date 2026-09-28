export async function copyPixCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    return "Código copiado."
  } catch {
    return "Não foi possível copiar. Selecione o código acima."
  }
}
