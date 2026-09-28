const bars = [
  1, 1, 2, 1, 1, 3, 1, 2, 1, 1, 4, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1, 4, 1, 2, 1, 1,
]

export function IllustrativeBarcode() {
  let cursor = 2
  const marks = bars.map((thickness) => {
    const mark = { x: cursor, thickness }
    cursor += thickness + 1
    return mark
  })

  return (
    <svg
      role="img"
      aria-label="Código de barras ilustrativo da simulação"
      viewBox="0 0 80 36"
      className="mx-auto h-24 w-full max-w-sm border border-slate-200 bg-white px-3 py-2"
    >
      {marks.map((mark) => (
        <rect
          key={mark.x}
          x={mark.x}
          y="2"
          width={mark.thickness}
          height="26"
          fill="#0f172a"
        />
      ))}
      <text
        x="40"
        y="34"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="3.2"
        fontFamily="ui-monospace, monospace"
      >
        84660 00006 8900
      </text>
    </svg>
  )
}
