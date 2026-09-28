import { Button } from "@/shared/components/button"
import { ButtonLink } from "@/shared/components/button-link"
import { formatCurrency } from "@/shared/utils/format-currency"
import { useState } from "react"
import { IllustrativeBarcode } from "./illustrative-barcode"
import type { SimulationContentProps } from "./types"
import { copyPixCode } from "../utils/copy-pix-code"

export function SimulationContent({
  offer,
  instrument,
  dueDateLabel,
  paymentMethodName,
  condition,
}: SimulationContentProps) {
  const [copyNotice, setCopyNotice] = useState("")

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-950">
        Simulação — nenhum pagamento será cobrado.
      </p>
      <h1 className="text-2xl font-semibold text-slate-900">
        Pagamento do acordo
      </h1>
      <p className="text-sm text-slate-600">
        {offer.creditor} · {paymentMethodName} · {condition} ·{" "}
        {formatCurrency(offer.negotiatedAmountCents)}
      </p>
      {instrument.type === "pix" ? (
        <div className="panel border border-[#e6ebf2] p-5">
          <IllustrativeBarcode />
          <p className="mt-4 text-sm font-semibold text-slate-900">
            Código Pix copia e cola
          </p>
          <p className="mt-2 break-all rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-800">
            {instrument.copyPasteCode}
          </p>
          <Button
            type="button"
            className="mt-4"
            onClick={() => {
              if (instrument.type !== "pix") return
              void copyPixCode(instrument.copyPasteCode).then(setCopyNotice)
            }}
          >
            Copiar código
          </Button>
          <p role="status" className="mt-2 min-h-6 text-sm text-slate-700">
            {copyNotice}
          </p>
          <p className="text-sm text-slate-600">
            Vencimento: {dueDateLabel}. O pagamento desta simulação seria
            compensado em poucos minutos.
          </p>
        </div>
      ) : (
        <div className="panel border border-[#e6ebf2] p-5">
          <h2 className="font-semibold text-slate-900">Boleto</h2>
          <p className="mt-2 text-sm text-slate-600">Linha digitável</p>
          <p className="mt-2 break-all rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-800">
            {instrument.digitableLine}
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Vencimento: {dueDateLabel}.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            A compensação desta simulação levaria até 3 dias úteis após o
            pagamento.
          </p>
        </div>
      )}
      <ButtonLink
        href={`/revisao?oferta=${offer.id}&forma=${instrument.type}`}
        variant="text"
      >
        Voltar
      </ButtonLink>
    </section>
  )
}
