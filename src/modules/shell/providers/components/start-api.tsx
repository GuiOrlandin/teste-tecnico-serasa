"use client"

import { useEffect } from "react"
import { markApiReady } from "@/shared/utils/api-ready"

let apiStartup: Promise<void> | undefined

export function StartApi() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      markApiReady()
      return
    }

    apiStartup ??= import("@/mocks/browser")
      .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
      .then(() => undefined)
      .finally(() => {
        markApiReady()
      })
  }, [])

  return null
}
