import type Link from "next/link";
import type { ComponentProps } from "react";

export type AvatarProps = {
  initials: string;
  isHeader?: boolean;
  label?: string;
};

export type ButtonProps = ComponentProps<"button">;

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "text";
};
export type LoadingScreenProps = {
  label: string;
  layout: "cards" | "rows" | "instrument";
};
