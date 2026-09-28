"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const steps = [
  { id: "ofertas", label: "Ofertas" },
  { id: "pagamento", label: "Pagamento" },
  { id: "revisao", label: "Revisão" },
] as const

export function Steps() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const offerId = searchParams.get("oferta")
  const paymentMethodId = searchParams.get("forma")
  const onSimulation = pathname.startsWith("/simulacao")
  const current = pathname.startsWith("/pagamento")
    ? "pagamento"
    : pathname.startsWith("/revisao")
      ? "revisao"
      : "ofertas"
  const currentIndex = onSimulation
    ? steps.length
    : steps.findIndex((step) => step.id === current)

  const hrefs: Record<(typeof steps)[number]["id"], string | undefined> = {
    ofertas: "/ofertas",
    pagamento: offerId
      ? `/pagamento?oferta=${offerId}${paymentMethodId ? `&forma=${paymentMethodId}` : ""}`
      : undefined,
    revisao:
      offerId && paymentMethodId
        ? `/revisao?oferta=${offerId}&forma=${paymentMethodId}`
        : undefined,
  }

  return (
    <nav aria-label="Etapas do acordo">
      <ol className="grid grid-cols-3 gap-1.5">
        {steps.map((step, index) => {
          const status =
            index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming"
          const className = `flex min-h-12 items-center justify-center gap-1.5 px-2 text-sm ${
            status === "upcoming"
              ? "font-medium text-slate-400"
              : status === "current"
                ? "font-bold text-slate-900"
                : "font-medium text-slate-800"
          }`
          const href = status === "upcoming" ? undefined : hrefs[step.id]
          const content = (
            <>
              {status === "complete" ? (
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-emerald-600">
                  <path
                    d="M3.2 8.4 6.3 11.4 12.8 4.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
              {status === "current" ? <span className="sr-only">Passo atual: </span> : null}
              {status === "complete" ? <span className="sr-only">Concluído: </span> : null}
              {step.label}
            </>
          )

          const track = (
            <span
              aria-hidden="true"
              className={`h-1 rounded-full ${status === "upcoming" ? "bg-slate-200" : "bg-[#3b6fd8]"}`}
            />
          )

          return (
            <li key={step.id} className="flex flex-col gap-2">
              {track}
              {href ? (
                <Link
                  href={href}
                  className={className}
                  aria-current={status === "current" ? "step" : undefined}
                >
                  {content}
                </Link>
              ) : (
                <span className={`${className} cursor-default`} aria-disabled="true">
                  {content}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
