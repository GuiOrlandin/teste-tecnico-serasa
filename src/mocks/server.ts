import { agreementHandlers } from "@/modules/agreement/services/handlers";
import { catalogHandlers } from "@/modules/catalog/services/handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...catalogHandlers, ...agreementHandlers);
