"use client";

import { LoadingScreen } from "@/shared/components/loading-screen";
import { useQuery } from "@tanstack/react-query";
import { fetchOffers } from "../services/fetch-catalog";
import { offersQuery } from "../services/queries";
import { OfferCard } from "./components/offer-card";

export function OffersView() {
  const query = useQuery({
    ...offersQuery,
    queryFn: fetchOffers,
  });

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Escolha como quitar sua dívida
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ofertas para limpar seu nome. Os valores já incluem os descontos.
        </p>
      </div>
      {query.isError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {query.data
            ? "Não foi possível atualizar as ofertas. Os valores em tela continuam válidos."
            : "Não foi possível carregar as ofertas."}
        </p>
      ) : null}
      {query.data ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {query.data.map((offer) => (
            <li key={offer.id}>
              <OfferCard offer={offer} />
            </li>
          ))}
        </ul>
      ) : (
        <LoadingScreen label="Carregando ofertas" layout="cards" />
      )}
    </section>
  );
}
