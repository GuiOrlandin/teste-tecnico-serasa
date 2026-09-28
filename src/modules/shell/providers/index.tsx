"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { StartApi } from "./components/start-api"
import type { ProvidersProps } from "./types"
import { getQueryClient } from "./utils/get-query-client"

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <StartApi />
      {children}
    </QueryClientProvider>
  )
}
