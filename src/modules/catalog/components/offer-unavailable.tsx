import Link from "next/link"

export function OfferUnavailable() {
  return (
    <section className="mx-auto flex max-w-lg flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Oferta indisponível
      </h1>
      <p className="text-sm text-slate-600">
        Não encontramos essa oferta. Volte à listagem para escolher outra.
      </p>
      <Link
        className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline"
        href="/ofertas"
      >
        Voltar à listagem
      </Link>
    </section>
  )
}
