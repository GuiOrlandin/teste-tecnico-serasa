"use client";

import Link from "next/link";
import { Avatar } from "@/shared/components/avatar";
import { usePathname, useSearchParams } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const offerId = searchParams.get("oferta");
  const paymentMethodId = searchParams.get("forma");
  const backHref =
    pathname.startsWith("/simulacao") && offerId && paymentMethodId
      ? `/revisao?oferta=${offerId}&forma=${paymentMethodId}`
      : pathname.startsWith("/revisao") && offerId
        ? `/pagamento?oferta=${offerId}${paymentMethodId ? `&forma=${paymentMethodId}` : ""}`
        : pathname.startsWith("/pagamento")
          ? "/ofertas"
          : undefined;

  return (
    <header className="relative flex h-[4.25rem] items-center justify-between border-b border-[#e6ebf2] bg-white px-4 sm:px-10">
      {backHref ? (
        <Link
          href={backHref}
          aria-label="Voltar"
          className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-[#3b6fd8] hover:bg-slate-100 md:hidden"
        >
          <span aria-hidden="true">‹</span>
        </Link>
      ) : null}
      <p
        className={`text-[15px] font-semibold tracking-tight text-slate-900 ${backHref ? "pl-10 md:pl-0" : ""}`}
      >
        Minhas Dívidas
      </p>
      <p className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:inline">
          Olá, Maria
        </span>
        <Avatar initials="MS" isHeader label="Maria" />
      </p>
    </header>
  );
}
