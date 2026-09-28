import type { LoadingScreenProps } from "./types";

const block = "rounded-md bg-[#e6ebf2] motion-safe:animate-pulse";

export function LoadingScreen({ label, layout }: LoadingScreenProps) {
  if (layout === "instrument") {
    return (
      <section
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-slate-900">{label}</h1>
        <p className="text-sm text-slate-600">
          O acordo foi confirmado. O pagamento está sendo preparado.
        </p>
        <InstrumentSkeleton />
      </section>
    );
  }

  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {layout === "cards" ? <CardSkeleton /> : <RowSkeleton />}
    </div>
  );
}

function InstrumentSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="panel overflow-hidden border border-[#e6ebf2]"
    >
      <div className="h-1 overflow-hidden bg-[#e6ebf2]">
        <div className="loading-track h-full w-1/3 bg-[#3b6fd8]" />
      </div>
      <div className="p-5">
        <div className={`h-5 w-44 ${block}`} />
        <div className={`mt-3 h-4 w-full ${block}`} />
        <div className={`mt-2 h-4 w-4/5 ${block}`} />
        <div className="mt-6 h-36 rounded-xl bg-[#f4f6f8] motion-safe:animate-pulse" />
        <div className="mt-4 h-11 rounded-lg bg-[#d7e2f8] motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <ul aria-hidden="true" className="mt-4 grid gap-4 md:grid-cols-2">
      {["primeira", "segunda", "terceira"].map((card) => (
        <li key={card} className="panel border border-[#e6ebf2] p-5">
          <div className="flex gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-[#e6ebf2] motion-safe:animate-pulse" />
            <div className="min-w-0 flex-1">
              <div className={`h-4 w-32 ${block}`} />
              <div className={`mt-2 h-3 w-40 ${block}`} />
            </div>
          </div>
          <div className={`mt-6 h-3 w-24 ${block}`} />
          <div className={`mt-3 h-6 w-36 ${block}`} />
          <div className="mt-8 h-11 rounded-lg bg-[#d7e2f8] motion-safe:animate-pulse" />
        </li>
      ))}
    </ul>
  );
}

function RowSkeleton() {
  return (
    <div aria-hidden="true" className="mt-4 space-y-3">
      {["pix", "boleto"].map((row) => (
        <div key={row} className="panel border border-[#e6ebf2] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-4 w-4 rounded-full border-2 border-[#c5d4f2]" />
            <div className="min-w-0 flex-1">
              <div className={`h-4 w-16 ${block}`} />
              <div className={`mt-2 h-3 w-56 ${block}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
