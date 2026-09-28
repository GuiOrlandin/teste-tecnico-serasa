export type CivilDay = {
  year: number;
  month: number;
  day: number;
};

export type DueDate = {
  label: string;
  date: string;
};

export type Instrument =
  | {
      type: "pix";
      copyPasteCode: string;
    }
  | {
      type: "boleto";
      digitableLine: string;
      dueDate: string;
    };

export type AgreementRequest = {
  offerId: string;
  paymentMethodId: "pix" | "boleto";
  simulateError: boolean;
};
