"use client";

import {
  conditionLabel,
  fetchPaymentMethods,
  paymentMethodsQuery,
  type PaymentMethod,
} from "@/modules/catalog";
import { Button } from "@/shared/components/button";
import { ButtonLink } from "@/shared/components/button-link";
import { LoadingScreen } from "@/shared/components/loading-screen";
import { formatCurrency } from "@/shared/utils/format-currency";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AgreementSummary } from "../components/agreement-summary";
import { agreementDueDate } from "../utils/due-date";
import { PaymentMethodDetail } from "./components/payment-method-detail";
import type { PaymentViewProps } from "./types";

export function PaymentView({
  offer,
  paymentMethodId: initialPaymentMethodId = "pix",
}: PaymentViewProps) {
  const router = useRouter();
  const [paymentMethodId, setPaymentMethodId] = useState<PaymentMethod["id"]>(
    initialPaymentMethodId,
  );
  const query = useQuery({
    ...paymentMethodsQuery,
    queryFn: fetchPaymentMethods,
  });
  const dueDate = agreementDueDate(paymentMethodId);

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Como você quer pagar?
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Escolha a forma de pagamento do seu acordo.
        </p>
        {query.isError ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            {query.data
              ? "Não foi possível atualizar as formas de pagamento. As opções em tela continuam válidas."
              : "Não foi possível carregar as formas de pagamento."}
          </p>
        ) : null}
        {query.data ? (
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Forma de pagamento</legend>
            {query.data.map((paymentMethod) => (
              <label
                key={paymentMethod.id}
                className={`panel block min-h-11 cursor-pointer border p-4 ${paymentMethodId === paymentMethod.id ? "border-[#3b6fd8]" : "border-[#e6ebf2]"}`}
              >
                <span className="flex items-start gap-3">
                  <input
                    className="mt-1"
                    type="radio"
                    name="payment-method"
                    value={paymentMethod.id}
                    checked={paymentMethodId === paymentMethod.id}
                    onChange={() => setPaymentMethodId(paymentMethod.id)}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      {paymentMethod.id === "pix" ? (
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className="h-4 w-4 text-slate-700"
                        >
                          <path
                            d="M8 1.2 10.2 3.4 8 5.6 5.8 3.4Z"
                            fill="currentColor"
                          />
                          <path
                            d="M12.6 5.8 14.8 8 12.6 10.2 10.4 8Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8 10.4 10.2 12.6 8 14.8 5.8 12.6Z"
                            fill="currentColor"
                          />
                          <path
                            d="M3.4 5.8 5.6 8 3.4 10.2 1.2 8Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className="h-4 w-4 text-slate-700"
                        >
                          <path
                            d="M2 3h1.2v10H2zm2 0h.6v10H4zm1.4 0H7v10H5.4zM8 3h1.6v10H8zm2.4 0H12v10h-1.6zm2.2 0H14v10h-1.4z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      <span className="font-semibold text-slate-900">
                        {paymentMethod.name}
                      </span>
                      {paymentMethod.badge ? (
                        <span className="rounded-md bg-[#eaf6f2] px-2 py-0.5 text-xs font-semibold text-[#5a6472]">
                          {paymentMethod.badge}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      {paymentMethod.description}
                    </span>
                  </span>
                </span>
                {paymentMethodId === paymentMethod.id ? (
                  <PaymentMethodDetail
                    paymentMethodId={paymentMethod.id}
                    dueDate={dueDate.date}
                  />
                ) : null}
              </label>
            ))}
          </fieldset>
        ) : (
          <LoadingScreen label="Carregando formas de pagamento" layout="rows" />
        )}
      </div>
      <aside>
        <AgreementSummary offer={offer} mode="compact" />
        <div className="panel mt-4 border border-[#e6ebf2] p-4">
          <p className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Valor do acordo</span>
            <span className="font-bold text-slate-900">
              {formatCurrency(offer.negotiatedAmountCents)}
            </span>
          </p>
          <p className="sr-only">{conditionLabel(offer.condition)}</p>
          <Button
            type="button"
            className="mt-4"
            disabled={!paymentMethodId}
            onClick={() =>
              router.push(
                `/revisao?oferta=${offer.id}&forma=${paymentMethodId}`,
              )
            }
          >
            Ir para revisão
            <span aria-hidden="true">›</span>
          </Button>
          <p className="mt-1 text-center">
            <ButtonLink
              href="/ofertas"
              variant="text"
              className="inline-flex w-auto min-w-24"
            >
              Voltar
            </ButtonLink>
          </p>
        </div>
      </aside>
    </section>
  );
}
