"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import type { QueryClientWrapperProps } from "./types"

export function QueryClientWrapper({
  client,
  children,
}: QueryClientWrapperProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
