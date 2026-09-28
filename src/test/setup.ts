import { server } from "@/mocks/server";
import { markApiReady } from "@/shared/utils/api-ready";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  markApiReady();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
