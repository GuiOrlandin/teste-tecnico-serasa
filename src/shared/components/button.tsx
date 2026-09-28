import type { ButtonProps } from "./types"

const primary =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3b6fd8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#315fb8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fb8] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"

export function Button({ className, ...props }: ButtonProps) {
  return <button className={`${primary} ${className ?? ""}`} {...props} />
}
