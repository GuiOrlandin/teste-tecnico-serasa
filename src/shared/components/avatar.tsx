import type { AvatarProps } from "./types";

export function Avatar({ initials, isHeader = false, label }: AvatarProps) {
  const appearance = isHeader
    ? "h-10 w-10 bg-[#e7f1fb] text-[#7ea0c4]"
    : "h-11 w-11 border border-[#d5dbe3] bg-white text-[#1a213a]";

  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-full text-xs font-semibold ${appearance}`}
    >
      {initials}
    </span>
  );
}
