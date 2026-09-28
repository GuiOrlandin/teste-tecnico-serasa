import { getOffer } from "@/modules/catalog";
import { http, HttpResponse } from "msw";
import type { AgreementRequest } from "../types";
import { buildInstrument } from "../utils/instrument";

export const agreementHandlers = [
  http.get("*/api/agreements", ({ request }) => {
    const url = new URL(request.url);
    const offerId = url.searchParams.get("oferta") ?? undefined;
    const forma = url.searchParams.get("forma");
    const paymentMethodId =
      forma === "pix" || forma === "boleto" ? forma : undefined;

    if (!offerId || !paymentMethodId || !getOffer(offerId)) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(buildInstrument(offerId, paymentMethodId));
  }),
  http.post("*/api/agreements", async ({ request }) => {
    const body = (await request.json()) as AgreementRequest;

    if (body.simulateError) {
      return new HttpResponse(null, { status: 500 });
    }

    if (!getOffer(body.offerId)) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(
      buildInstrument(body.offerId, body.paymentMethodId),
    );
  }),
];
