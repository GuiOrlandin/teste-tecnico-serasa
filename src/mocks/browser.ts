import { agreementHandlers } from "@/modules/agreement/services/handlers";
import { catalogHandlers } from "@/modules/catalog/services/handlers";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...catalogHandlers, ...agreementHandlers);
