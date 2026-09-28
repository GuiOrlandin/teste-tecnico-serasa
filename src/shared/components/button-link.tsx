import Link from "next/link"
import type { ButtonLinkProps } from "./types"

const primary =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3b6fd8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#315fb8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fb8]"

const text =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-transparent px-4 text-sm font-semibold text-[#3b6fd8] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fb8]"

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const appearance = variant === "text" ? text : primary
  return <Link className={`${appearance} ${className ?? ""}`} {...props} />
}
