import { QueryClient } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { QueryClientWrapper } from "./components/query-client-wrapper";

type RenderWithApiOptions = Omit<RenderOptions, "wrapper"> & {
  queryClient?: QueryClient;
};

export function renderWithApi(
  ui: ReactElement,
  options?: RenderWithApiOptions,
) {
  const { queryClient: providedClient, ...renderOptions } = options ?? {};
  const queryClient =
    providedClient ??
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

  return render(ui, {
    ...renderOptions,
    wrapper: ({ children }) => (
      <QueryClientWrapper client={queryClient}>{children}</QueryClientWrapper>
    ),
  });
}
