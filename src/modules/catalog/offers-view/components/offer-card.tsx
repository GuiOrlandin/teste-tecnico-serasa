import { Avatar } from "@/shared/components/avatar";
import { ButtonLink } from "@/shared/components/button-link";
import { formatCurrency } from "@/shared/utils/format-currency";
import { conditionLabel } from "../../utils/condition-label";
import type { OfferCardProps } from "./types";

export function OfferCard({ offer }: OfferCardProps) {
  const titleId = `offer-${offer.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="panel flex h-full flex-col border border-[#e6ebf2] p-5"
    >
      {offer.isBestOffer ? (
        <p className="mb-3 flex w-fit items-center gap-1 rounded-md bg-[#2ea88b] px-2 py-1 text-xs font-semibold text-white">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
            <path
              d="M8 1.8 9.4 5.2 13 5.5 10.3 7.8 11.2 11.3 8 9.4 4.8 11.3 5.7 7.8 3 5.5 6.6 5.2Z"
              fill="currentColor"
            />
          </svg>
          Melhor oferta
        </p>
      ) : null}
      <div className="flex gap-3">
        <Avatar initials={offer.initials} />
        <div>
          <h2 id={titleId} className="font-semibold text-slate-900">
            {offer.creditor}
          </h2>
          <p className="text-sm text-slate-500">
            {offer.product} · desde {offer.since}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        <span className="sr-only">Valor original </span>
        <s>De {formatCurrency(offer.originalAmountCents)}</s>
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-2">
        <span className="text-lg font-bold text-[#000824]">
          <span className="sr-only">Valor negociado </span>
          Por {formatCurrency(offer.negotiatedAmountCents)}
        </span>
        <span className="rounded-md bg-[#eaf6f3] px-2 py-0.5 text-xs font-semibold text-[#000824]">
          {offer.discountPercent}% de desconto
        </span>
      </p>
      <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-4 w-4 text-slate-400"
        >
          <rect
            x="2"
            y="3"
            width="12"
            height="11"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M2 6.5h12M5 2v3M11 2v3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        {conditionLabel(offer.condition)}
      </p>
      <div className="mt-auto pt-6">
        <ButtonLink
          href={`/pagamento?oferta=${offer.id}`}
          aria-label={`Continuar com ${offer.creditor}`}
        >
          Continuar
          <span aria-hidden="true">›</span>
        </ButtonLink>
      </div>
    </article>
  );
}
