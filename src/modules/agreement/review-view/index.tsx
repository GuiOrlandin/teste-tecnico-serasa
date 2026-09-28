"use client";

import { conditionLabel } from "@/modules/catalog";
import { Button } from "@/shared/components/button";
import { ButtonLink } from "@/shared/components/button-link";
import { formatCurrency } from "@/shared/utils/format-currency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AgreementSummary } from "../components/agreement-summary";
import { confirmAgreement } from "../services/confirm-agreement";
import { instrumentQuery } from "../services/queries";
import { agreementDueDate } from "../utils/due-date";
import type { ReviewViewProps } from "./types";

const visibleTerms = [
  "O desconto vale apenas com o pagamento até o vencimento.",
  "Sem pagamento, o acordo é cancelado e a dívida volta ao valor original.",
  "Após a compensação, o credor tem até 5 dias úteis para retirar a negativação.",
];

export function ReviewView({
  offer,
  paymentMethodId,
  paymentMethodName,
  simulateError,
}: ReviewViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dueDate = agreementDueDate(paymentMethodId);
  const condition = conditionLabel(offer.condition);
  const confirmation = useMutation({
    mutationFn: confirmAgreement,
    onSuccess: (instrument) => {
      queryClient.setQueryData(
        instrumentQuery(offer.id, paymentMethodId).queryKey,
        instrument,
      );
      router.push(`/simulacao?oferta=${offer.id}&forma=${paymentMethodId}`);
    },
  });

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Revise seu acordo
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Confira os dados antes de confirmar.
        </p>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <AgreementSummary
            offer={offer}
            mode="full"
            paymentMethodName={paymentMethodName}
            dueDate={dueDate.label}
            condition={condition}
          />
          <section className="panel mt-4 border border-[#e6ebf2] p-5">
            <h2 className="font-semibold text-slate-900">Termos do acordo</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {visibleTerms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
            <details className="mt-3 text-sm">
              <summary className="flex cursor-pointer items-center gap-1 font-semibold text-blue-700">
                Ler termos completos
                <span aria-hidden="true">›</span>
              </summary>
              <p className="mt-2 text-slate-700">
                O acordo vale para a oferta escolhida e para a forma de
                pagamento selecionada. O valor negociado já inclui o desconto. A
                compensação segue o prazo da forma escolhida, e a retirada da
                negativação acontece depois dela.
              </p>
            </details>
            <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 border-t border-slate-100 pt-4 text-sm text-slate-800">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              Li e aceito os termos do acordo
            </label>
          </section>
        </div>
        <aside className="panel border border-[#e6ebf2] p-5 lg:sticky lg:top-6 lg:self-start">
          <p className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Valor do acordo</span>
            <span className="font-bold text-slate-900">
              {formatCurrency(offer.negotiatedAmountCents)}
            </span>
          </p>
          <Button
            type="button"
            className="mt-4"
            disabled={!termsAccepted || confirmation.isPending}
            onClick={() =>
              confirmation.mutate({
                offerId: offer.id,
                paymentMethodId,
                simulateError,
              })
            }
          >
            Confirmar acordo
            <span aria-hidden="true">›</span>
          </Button>
          <p className="mt-1 text-center">
            <ButtonLink
              href={`/pagamento?oferta=${offer.id}&forma=${paymentMethodId}`}
              variant="text"
              className="inline-flex w-auto min-w-24"
            >
              Voltar
            </ButtonLink>
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
            >
              <circle
                cx="8"
                cy="8"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 5v3.2L10.2 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            {paymentMethodId === "pix"
              ? "Após confirmar, geramos o QR Code e o Pix copia e cola."
              : `Após confirmar, geramos o boleto com vencimento em ${dueDate.date}.`}
          </p>
        </aside>
      </div>
      {confirmation.isError ? (
        <p
          role="alert"
          className="fixed bottom-6 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg"
        >
          Não foi possível confirmar o acordo. Tente de novo.
        </p>
      ) : null}
    </section>
  );
}
