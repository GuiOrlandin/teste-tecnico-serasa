import { screen } from "@testing-library/react"
import { test, expect } from "vitest"
import { OffersView } from "@/modules/catalog"
import { renderWithApi } from "@/test/render"

test("mostra as três ofertas, o destaque e o valor real da Conecta", async () => {
  renderWithApi(<OffersView />)

  const horizonte = await screen.findByRole("article", {
    name: "Banco Horizonte",
  })
  const conecta = screen.getByRole("article", { name: "Conecta Telecom" })
  const vitrine = screen.getByRole("article", { name: "Loja Vitrine" })

  expect(horizonte).toHaveTextContent("Melhor oferta")
  expect(conecta).not.toHaveTextContent("Melhor oferta")
  expect(vitrine).not.toHaveTextContent("Melhor oferta")
  expect(conecta).toHaveTextContent("412,08")
  expect(conecta).toHaveTextContent("98,90")
})
