"use client";

import { conditionLabel, OfferUnavailable } from "@/modules/catalog";
import { LoadingScreen } from "@/shared/components/loading-screen";
import { useQuery } from "@tanstack/react-query";
import { fetchInstrument } from "../services/fetch-instrument";
import { instrumentQuery } from "../services/queries";
import { agreementDueDate } from "../utils/due-date";
import { SimulationContent } from "./components/simulation-content";
import type { SimulationViewProps } from "./types";

export function SimulationView({
  offer,
  paymentMethodId,
  paymentMethodName,
}: SimulationViewProps) {
  const confirmedInstrument = useQuery({
    ...instrumentQuery(offer.id, paymentMethodId),
    queryFn: () => fetchInstrument(offer.id, paymentMethodId),
  });

  if (confirmedInstrument.isPending) {
    return <LoadingScreen label="Preparando o pagamento" layout="instrument" />;
  }

  if (!confirmedInstrument.data) {
    return <OfferUnavailable />;
  }

  const dueDateLabel =
    confirmedInstrument.data.type === "boleto"
      ? `Até ${confirmedInstrument.data.dueDate}`
      : agreementDueDate(paymentMethodId).label;

  return (
    <SimulationContent
      offer={offer}
      instrument={confirmedInstrument.data}
      dueDateLabel={dueDateLabel}
      paymentMethodName={paymentMethodName}
      condition={conditionLabel(offer.condition)}
    />
  );
}
