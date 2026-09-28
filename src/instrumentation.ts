export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return
  }

  const { ensureServerApi } = await import("./mocks/ensure-server")
  ensureServerApi()
}
