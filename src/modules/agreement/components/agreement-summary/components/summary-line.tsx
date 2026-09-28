import type { SummaryLineProps } from "./types"

export function SummaryLine({
  term,
  value,
  highlighted = false,
  strong = false,
}: SummaryLineProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-slate-600">{term}</dt>
      <dd
        className={
          highlighted
            ? "font-semibold text-emerald-700"
            : strong
              ? "font-bold text-slate-900"
              : "text-slate-900"
        }
      >
        {value}
      </dd>
    </div>
  )
}
