import { QueryClient } from "@tanstack/react-query"

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  const options = {
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  }

  if (typeof window === "undefined") {
    return new QueryClient(options)
  }

  browserQueryClient ??= new QueryClient(options)
  return browserQueryClient
}
