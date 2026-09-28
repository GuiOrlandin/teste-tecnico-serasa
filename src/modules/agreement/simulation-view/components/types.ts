import type { Offer } from "@/modules/catalog"
import type { Instrument } from "../../types"

export type SimulationContentProps = {
  offer: Offer
  instrument: Instrument
  dueDateLabel: string
  paymentMethodName: string
  condition: string
}
