import type { PaymentMethodDetailProps } from "./types"

export function PaymentMethodDetail({
  paymentMethodId,
  dueDate,
}: PaymentMethodDetailProps) {
  if (paymentMethodId === "pix") {
    return (
      <span className="mt-3 block space-y-2 rounded-xl bg-[#f4f6f8] p-3 text-sm text-slate-600">
        <span className="flex items-start gap-2">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500">
            <rect x="2" y="2" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="9" y="2" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="2" y="9" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="10" y="10" width="1.5" height="1.5" fill="currentColor" />
            <rect x="12.5" y="10" width="1.5" height="1.5" fill="currentColor" />
            <rect x="10" y="12.5" width="1.5" height="1.5" fill="currentColor" />
          </svg>
          Depois de confirmar o acordo, geramos o QR Code e o código Pix copia e cola.
        </span>
        <span className="flex items-start gap-2">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500">
            <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 5v3.2L10.2 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          O pagamento é compensado em poucos minutos.
        </span>
      </span>
    )
  }

  return (
    <span className="mt-3 block space-y-2 rounded-xl bg-[#f4f6f8] p-3 text-sm text-slate-600">
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500">
          <rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 6.5h12M5 2v3M11 2v3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Vencimento em {dueDate} (3 dias úteis).
      </span>
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500">
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5v3.2L10.2 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        A compensação leva até 3 dias úteis após o pagamento.
      </span>
    </span>
  )
}
