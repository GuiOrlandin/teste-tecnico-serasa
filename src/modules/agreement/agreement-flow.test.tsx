import { QueryClient } from "@tanstack/react-query"
import { cleanup, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { beforeEach, expect, test, vi } from "vitest"
import { PaymentView, ReviewView, SimulationView } from "@/modules/agreement"
import { getOffer } from "@/modules/catalog"
import { server } from "@/mocks/server"
import { renderWithApi } from "@/test/render"

const push = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/pagamento",
  useSearchParams: () => new URLSearchParams("oferta=banco-horizonte"),
}))

beforeEach(() => {
  push.mockReset()
})

test("parte do Pix, segue com Boleto e só confirma com os termos aceitos", async () => {
  const user = userEvent.setup()
  const offer = getOffer("banco-horizonte")
  if (!offer) {
    throw new Error("Banco Horizonte is missing from the catalog.")
  }

  renderWithApi(<PaymentView offer={offer} />)

  expect(await screen.findByRole("radio", { name: /Pix/ })).toBeChecked()
  await user.click(screen.getByRole("radio", { name: /Boleto/ }))
  await user.click(screen.getByRole("button", { name: "Ir para revisão" }))

  expect(push).toHaveBeenCalledWith(
    "/revisao?oferta=banco-horizonte&forma=boleto",
  )

  cleanup()
  renderWithApi(
    <ReviewView
      offer={offer}
      paymentMethodId="boleto"
      paymentMethodName="Boleto"
      simulateError={false}
    />,
  )

  const confirm = screen.getByRole("button", { name: "Confirmar acordo" })
  const terms = screen.getByRole("checkbox", {
    name: "Li e aceito os termos do acordo",
  })

  expect(confirm).toBeDisabled()
  await user.click(terms)
  expect(confirm).toBeEnabled()
  expect(screen.getByRole("link", { name: "Voltar" })).toHaveAttribute(
    "href",
    "/pagamento?oferta=banco-horizonte&forma=boleto",
  )
})

test("retoma a forma gravada na url ao voltar para o pagamento", async () => {
  const offer = getOffer("banco-horizonte")
  if (!offer) {
    throw new Error("Banco Horizonte is missing from the catalog.")
  }

  renderWithApi(<PaymentView offer={offer} paymentMethodId="boleto" />)

  expect(await screen.findByRole("radio", { name: /Boleto/ })).toBeChecked()
  expect(screen.getByRole("radio", { name: /Pix/ })).not.toBeChecked()
})

test("mantém a revisão quando o checkout responde 500", async () => {
  const user = userEvent.setup()
  const offer = getOffer("banco-horizonte")
  if (!offer) {
    throw new Error("Banco Horizonte is missing from the catalog.")
  }

  renderWithApi(
    <ReviewView
      offer={offer}
      paymentMethodId="pix"
      paymentMethodName="Pix"
      simulateError
    />,
  )

  await user.click(
    screen.getByRole("checkbox", { name: "Li e aceito os termos do acordo" }),
  )
  await user.click(screen.getByRole("button", { name: "Confirmar acordo" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Não foi possível confirmar o acordo. Tente de novo.",
  )
  expect(
    screen.getByRole("checkbox", { name: "Li e aceito os termos do acordo" }),
  ).toBeChecked()
  expect(
    screen.getByRole("heading", { name: "Revise seu acordo" }),
  ).toBeInTheDocument()
})

test("a simulação mostra o instrumento devolvido pelo checkout", async () => {
  const user = userEvent.setup()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  const offer = getOffer("banco-horizonte")
  if (!offer) {
    throw new Error("Banco Horizonte is missing from the catalog.")
  }

  server.use(
    http.post("/api/agreements", () =>
      HttpResponse.json({
        type: "pix",
        copyPasteCode: "CODIGO-DO-POST",
      }),
    ),
  )

  renderWithApi(
    <ReviewView
      offer={offer}
      paymentMethodId="pix"
      paymentMethodName="Pix"
      simulateError={false}
    />,
    { queryClient },
  )

  await user.click(
    screen.getByRole("checkbox", { name: "Li e aceito os termos do acordo" }),
  )
  await user.click(screen.getByRole("button", { name: "Confirmar acordo" }))

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith(
      "/simulacao?oferta=banco-horizonte&forma=pix",
    )
  })

  cleanup()
  renderWithApi(
    <SimulationView
      offer={offer}
      paymentMethodId="pix"
      paymentMethodName="Pix"
    />,
    { queryClient },
  )

  expect(await screen.findByText("CODIGO-DO-POST")).toBeInTheDocument()
})
