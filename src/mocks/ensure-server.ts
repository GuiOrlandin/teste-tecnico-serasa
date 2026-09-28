import { server } from "./server"

const runtime = globalThis as typeof globalThis & {
  __mswServerStarted?: boolean
}

export function ensureServerApi() {
  if (typeof window !== "undefined" || runtime.__mswServerStarted) {
    return
  }

  server.listen({ onUnhandledRequest: "bypass" })
  runtime.__mswServerStarted = true
}
