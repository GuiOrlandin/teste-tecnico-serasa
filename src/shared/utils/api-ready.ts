let resolveReady: () => void = () => {}

function createWait() {
  if (process.env.VITEST === "true" || typeof window === "undefined") {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    resolveReady = resolve
  })
}

let wait = createWait()

export function whenApiReady() {
  return wait
}

export function markApiReady() {
  resolveReady()
  wait = Promise.resolve()
}
