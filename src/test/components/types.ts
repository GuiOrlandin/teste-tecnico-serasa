import type { QueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"

export type QueryClientWrapperProps = {
  client: QueryClient
  children: ReactNode
}
