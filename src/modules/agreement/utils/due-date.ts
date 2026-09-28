import type { CivilDay, DueDate } from "../types"

const TIME_ZONE = "America/Sao_Paulo"

export function agreementDueDate(
  paymentMethodId: "pix" | "boleto",
  now = new Date(),
): DueDate {
  const today = civilDayInBrasilia(now)

  if (paymentMethodId === "pix") {
    return { label: `Hoje, ${formatDay(today)}`, date: formatDay(today) }
  }

  const limit = addBusinessDays(today, 3)
  return {
    label: `Até ${formatDay(limit)}`,
    date: formatDay(limit),
  }
}

export function civilDayInBrasilia(now: Date): CivilDay {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value)

  return { year: read("year"), month: read("month"), day: read("day") }
}

function addBusinessDays(start: CivilDay, businessDays: number): CivilDay {
  let current = start
  let remaining = businessDays

  while (remaining > 0) {
    current = addDays(current, 1)
    const weekday = toUtcDate(current).getUTCDay()
    if (weekday !== 0 && weekday !== 6) {
      remaining -= 1
    }
  }

  return current
}

function addDays(day: CivilDay, amount: number): CivilDay {
  const date = toUtcDate(day)
  date.setUTCDate(date.getUTCDate() + amount)
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}

function toUtcDate(day: CivilDay) {
  return new Date(Date.UTC(day.year, day.month - 1, day.day))
}

function formatDay(day: CivilDay) {
  const text = (value: number) => String(value).padStart(2, "0")
  return `${text(day.day)}/${text(day.month)}/${day.year}`
}
