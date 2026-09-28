import { conditionLabel } from "@/modules/catalog";
import { Avatar } from "@/shared/components/avatar";
import { formatCurrency } from "@/shared/utils/format-currency";
import Link from "next/link";
import { SummaryLine } from "./components/summary-line";
import type { AgreementSummaryProps } from "./types";

export function AgreementSummary({
  offer,
  mode,
  paymentMethodName,
  dueDate,
  condition,
}: AgreementSummaryProps) {
  if (mode === "compact") {
    return (
      <section
        className="panel overflow-hidden border border-[#e6ebf2]"
        aria-label="Oferta escolhida"
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <Avatar initials={offer.initials} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-5 text-slate-900">
              {offer.creditor}
            </p>
            <p className="text-sm leading-5 text-slate-600">
              <span className="font-semibold text-slate-900">
                {formatCurrency(offer.negotiatedAmountCents)}
              </span>{" "}
              {offer.condition.type === "cash"
                ? "à vista"
                : conditionLabel(offer.condition)}{" "}
              <s className="text-slate-400">
                {formatCurrency(offer.originalAmountCents)}
              </s>
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-[#eaf6f2] px-1.5 py-0.5 text-xs font-semibold text-[#5a6472]">
            -{offer.discountPercent}%
          </span>
        </div>
        <Link
          className="flex cursor-pointer items-center gap-1 border-t border-[#e6eaee] px-5 py-5 text-sm font-medium text-[#3b6fd8]"
          href="/ofertas"
        >
          Trocar oferta
          <span aria-hidden="true">›</span>
        </Link>
      </section>
    );
  }

  return (
    <section
      className="panel border border-[#e6ebf2] p-5"
      aria-label="Resumo do acordo"
    >
      <h2 className="font-semibold text-slate-900">Resumo do acordo</h2>
      <div className="mt-4 flex items-center gap-3">
        <Avatar initials={offer.initials} />
        <div>
          <p className="font-semibold text-slate-900">{offer.creditor}</p>
          <p className="text-sm text-slate-600">
            {offer.product} · desde {offer.since}
          </p>
        </div>
      </div>
      <dl className="mt-4 divide-y divide-slate-100 text-sm">
        <SummaryLine
          term="Valor original"
          value={formatCurrency(offer.originalAmountCents)}
        />
        <SummaryLine
          term="Desconto"
          value={`- ${formatCurrency(offer.discountAmountCents)} (${offer.discountPercent}%)`}
          highlighted
        />
        <SummaryLine term="Condição" value={condition ?? ""} />
        <SummaryLine
          term="Forma de pagamento"
          value={paymentMethodName ?? ""}
        />
        <SummaryLine term="Vencimento" value={dueDate ?? ""} />
        <SummaryLine
          term="Valor negociado"
          value={formatCurrency(offer.negotiatedAmountCents)}
          strong
        />
      </dl>
    </section>
  );
}
