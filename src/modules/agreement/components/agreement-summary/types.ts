import type { Offer } from "@/modules/catalog";

export type AgreementSummaryProps = {
  offer: Offer;
  mode: "compact" | "full";
  paymentMethodName?: string;
  dueDate?: string;
  condition?: string;
};
