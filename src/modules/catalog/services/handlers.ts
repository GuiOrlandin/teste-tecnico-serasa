import { http, HttpResponse } from "msw";
import { getOffer, listOffers } from "../utils/offers";
import { listPaymentMethods } from "../utils/payment-methods";

export const catalogHandlers = [
  http.get("*/api/offers", () => HttpResponse.json(listOffers())),
  http.get("*/api/offers/:id", ({ params }) => {
    const offer = getOffer(String(params.id));
    if (!offer) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(offer);
  }),
  http.get("*/api/payment-methods", () =>
    HttpResponse.json(listPaymentMethods()),
  ),
];
